# Adding a project

Every project on the site is one `.mdx` file in this folder. To add a
project, copy an existing file, rename it, and edit the frontmatter below.
Nothing else in the codebase needs to change — the projects grid, filters,
and detail pages all read this folder automatically at build time.

```mdx
---
title: "Project name"
slug: "url-safe-slug"          # used at /projects/[slug]
summary: "One or two sentences. Shows on the project card."
category: "ai-research"        # "ai-research" | "web-development" | "creative"
tags: ["Tag One", "Tag Two"]
stack: ["Python", "XGBoost"]   # shown as mono pills
year: "2025"
status: "completed"            # "completed" | "in-progress" | "archived"
order: 10                      # lower numbers sort first
featured: true                 # show in the featured row on the homepage
role: "Solo project"           # optional
links:
  github: "https://github.com/..."
  live: "https://..."
  writeup: "https://..."
---

Full case-study body goes here, written in Markdown/MDX. This renders on
the project's detail page at /projects/[slug].
```

- **To reorder:** change the `order` value. Lower sorts first.
- **To recategorize:** change `category`.
- **To edit:** open the file and change the text — the site rebuilds from
  the same source.
- **To remove:** delete the file.
