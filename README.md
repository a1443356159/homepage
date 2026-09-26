# Yuanyi Yan — Personal Homepage

Academic personal website built with [Astro](https://astro.build), Tailwind CSS 4,
MDX, and Astro Content Collections.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start dev server (localhost:4321)
npm run build      # build static site to dist/
npm run preview    # preview the production build
```

## Content

- `src/content/projects/` — project entries (markdown + frontmatter)
- `src/content/publications/` — publication entries
- `src/content/posts/` — blog posts

Profile information, honors, projects, publications, and posts are maintained
in the corresponding page or content files above.

## GGgame 发布

GGgame 的开发源码在 [GameFactory-3A/games/gggame](https://github.com/a1443356159/GameFactory-3A/tree/main/games/gggame)。
本仓库仅保存 `gggame-release/`、`public/gggame/` 构建产物和 `/projects/GGgame` 页面入口。
请在源码仓库修改、测试、构建，再运行 `npm run export:homepage -- /path/to/homepage` 同步发布。
`gggame-release/source.json` 记录对应源码提交。不要直接修改压缩后的发布文件。
