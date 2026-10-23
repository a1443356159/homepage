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

## Knowledge base

`/blog` lists public notes by category, with tag filters and full-text search.
Filters are saved in the URL for sharing. Article pages generate a table of contents
from level 2 and 3 headings. Existing note URLs are preserved.

Add a Markdown file under `src/content/posts/` (subfolders are supported):

```markdown
---
title: "Your note title"
description: "A short summary for the knowledge base."
date: 2026-10-23
category: "AI Systems"
tags: ["Inference", "Serving"]
draft: true
---

## Overview

Write your note here.
```

Set `draft: false` when ready to publish. Drafts are excluded from the index, search,
and generated article routes. Categories and tags appear automatically once a note
is published; omitted categories default to `Uncategorized`. Optionally add an
`updated: YYYY-MM-DD` date to move a revised note up in the list. Search includes
the title, summary, category, tags, and Markdown body and requires JavaScript;
articles and the complete note list remain readable without it. Search is performed
locally in the visitor's browser.

Run `npm run build` to validate content before pushing to the deployment branch.

## GGgame 发布

GGgame 的开发源码在 [GameFactory-3A/games/gggame](https://github.com/a1443356159/GameFactory-3A/tree/main/games/gggame)。
本仓库仅保存 `gggame-release/`、`public/gggame/` 构建产物和 `/projects/GGgame` 页面入口。
请在源码仓库修改、测试、构建，再运行 `npm run export:homepage -- /path/to/homepage` 同步发布。
`gggame-release/source.json` 记录对应源码提交。不要直接修改压缩后的发布文件。
