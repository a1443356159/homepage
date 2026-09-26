# GGgame 联机文字版

入口：`https://www.yuanyiyan.com/projects/GGgame`。此仓库包含网页和房间服务。
当前代码支持创建/加入房间、邀请链接、房主开局、电脑对手、同步猜拳、并发行动与队列、观战、重连、再来一局。

正式房间服务：`https://gggame-rooms.yuanyiyan.workers.dev`。公开地址保存在 `gggame/deployment.json`，生产构建默认使用它；本地开发仍默认连接本地 Worker。`PUBLIC_GGGAME_SERVER` 可覆盖默认地址。

## 运算在哪里

```text
手机 / 电脑浏览器 ── HTTPS ── Vercel 上的 Astro 静态网页
       │
       └── WSS ── Cloudflare Worker ── 每个房间的 Durable Object
                                      ├─ 权威游戏规则与计时
                                      ├─ 私有出拳和会话身份
                                      └─ SQLite 支持的持久化存储、下一次结算闹钟
```

不需要 GPU 或自购服务器。每个房间由一个 Durable Object 统一处理，避免多个服务器实例各算各的。
浏览器的倒计时仅作显示，操作合法性、步数、动作结束和胜负全部由服务端决定。
WebSocket 使用 hibernation API；动作按照下一次截止时间设置 alarm，不每帧写数据库。
服务重启/休眠唤醒后恢复状态和私有出拳，补算到当前服务端时间。

托管参考：[Workers + Durable Objects](https://developers.cloudflare.com/durable-objects/)、[WebSocket hibernation](https://developers.cloudflare.com/durable-objects/best-practices/websockets/)、[免费额度及计费](https://developers.cloudflare.com/durable-objects/platform/pricing/)。
免费额度适合小规模试用，但真实使用量仍取决于房间数、消息频率、电脑对手及存储操作。上线后在 Cloudflare 仪表盘查看用量。

## 本机试玩（无需 Cloudflare 账号）

需要 Node >= 22.12。

```sh
npm ci
npm run gggame:dev
```

另开终端：

```sh
npm run astro -- dev --background --host 127.0.0.1 --port 4321
```

打开 `http://127.0.0.1:4321/projects/GGgame`。本机默认连接 `http://127.0.0.1:8787`。
创建房间后，用另一个浏览器/无痕窗口打开邀请链接，或者添加电脑。
会话放在 sessionStorage；刷新可恢复身份，不同浏览器可以代表不同玩家。
本地邀请地址只对本机可用；公网朋友需要下面的正式部署。
停止网页：`npm run astro -- dev stop`；停止房间服务：对应终端 Ctrl-C。

## 正式部署

1. 注册或登录 Cloudflare。此配置使用 SQLite Durable Objects，免费 Workers 计划也支持。
2. 在仓库目录执行：

   ```sh
   npx wrangler login
   npx wrangler whoami
   npm run gggame:deploy
   ```

   `login` 会打开 Cloudflare 的浏览器授权页。不要把密码或 API token 发到聊天或提交进 Git。
   部署命令会给出类似 `https://gggame-rooms.<你的子域>.workers.dev` 的地址。
   首次使用时按 Cloudflare 提示设置 workers.dev 子域。

3. 当前正式服务地址已经写入 `gggame/deployment.json`，合并到网站生产分支后，Vercel 构建会自动使用它，无需额外账号授权或环境变量。若部署到其他账号，更新此 JSON，或者在 Vercel 的 homepage 项目 Environment Variables 中覆盖：

   ```text
   PUBLIC_GGGAME_SERVER=https://gggame-rooms.<你的子域>.workers.dev
   ```

   这是公开服务地址，不是密钥。设置 Production 环境，然后将本分支合并到网站生产分支并重新部署。
   构建时读入此变量；只修改环境变量但不重建，不会改变已经发布的网页。

4. 检查 `<服务地址>/health` 返回 `ok: true`，再用两个浏览器打开正式页面完成一轮猜拳和一个行动。

生产来源白名单在 `wrangler.jsonc`，目前允许两个正式域名：`https://www.yuanyiyan.com` 和 `https://yuanyiyan.com`。
Vercel 预览域名要逐个加入白名单并重新部署 Worker；不要把所有来源开放。
没有配置服务地址时，网页会明确显示尚未配置，不会假装已联机。

## 规则和联机约定

- 每人起始在自己家，1 条裤子、最多 3 条，无刀。裤子为护甲。
- 同时猜拳，平局全员重来；每位赢家获得输家人数的步数。用完所有步数且所有动作执行完后进入下一轮。
- 拿刀/穿裤子各 1s，移动 2s，脱裤子/割各 3s，各消耗 1 步。刀永久持有。
- 各人独立并发；自己被动作锁定时，后续指令 FIFO 排队。提交时预留步数，不额外加冷却。
- 移动立即进入独立户外，完成后才到目的地。穿裤子/拿刀可在任意位置；脱/割需要同地点。
- 割需要刀和无裤子的对手；结算时若目标穿上裤子或不在同地点，失败但仍消耗步数与时间。
- 同刻结算顺序：拿刀 > 移动 > 穿 > 脱 > 割；同类按服务端收到的提交顺序。整批结算完才启动下一批队列。
- 最后一人存活即胜利。被割出局会清空其动作和队列。
- **新增联机约定**：客户端每 15s 发一次心跳，75s 未收到消息则退出本局。动作和其他玩家不会因某人断线暂停。刷新重连可恢复原身份；超时出局后不会复活。
- 断线房主的权限转交给仍在房间的人类玩家。活跃对局不支持中途加入新玩家；出局者可观战。
- 30 分钟没有客户端消息的房间删除。当前试玩服务每房间最多 64 人，这是运行保护，不是玩法规则。
- 不设置出拳/思考限时：仍在线但不行动的人会等待；限时规则尚未加入。

## 验证

```sh
npm run gggame:test
npm run build
npx wrangler deploy --env='' --dry-run
# 先启动上面的本地网页与 Worker；首次运行需要安装浏览器
npx playwright install chromium
npm run gggame:e2e
# 验证正式网站和正式房间服务
GGGAME_WEB_URL=https://www.yuanyiyan.com GGGAME_ROOM_URL=https://gggame-rooms.yuanyiyan.workers.dev npm run gggame:e2e
```

规则测试覆盖同时结算、穿裤子使割无效、独立户外、队列取消、步数、AI 及房间身份/持久化/重连。
浏览器测试用 3 个独立身份完成一整局，验证未揭晓出拳、刷新恢复队列、统一赢家、390px 手机布局，以及人机模式和来源限制。
测试输出写到被忽略的 `.gggame-test-results/`。Cloudflare 正式环境延迟与大陆网络可达性需要部署后再实测。

## 文件

- `gggame/rules.js`：从 GameFactory-3A 中 GGgame 原型迁移的纯规则核心。
- `gggame/room.js`：服务端房间、身份、幂等序号、重连宽限和时间推进。
- `gggame/worker.js`：HTTP/WebSocket、来源白名单、持久化、alarm。
- `src/pages/projects/GGgame.astro`、`src/gggame/`：网页和交互。
- `public/gggame/fonts/`：Noto Sans SC 的页面字符子集，遵循随附 OFL；缺失字符回退系统字体。

不要记录会话 token 或私有出拳到公共日志；只有房间存储包含这些数据。客户端不发送可采信的 actor、时间或状态。
