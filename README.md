# PaperPlane Next

# 命令

```bash
# 开发模式
pnpm dev

# 打包为 standalone
pnpm build

# [生产环境] 以生产模式运行打包好的代码
pnpm start:prod

# 修改 theme.ts 后，需重新生成 theme.css
pnpm theme

# 修改 schema.prisma 后，需重新生成类型
pnpm db:gen

# 修改 schema.prisma 后，应用到数据库并生成 SQL 文件
pnpm db:mi

# [生产环境] 以生成模式迁移数据库结构
pnpm db:deploy
```

# 开发需知

- 修改 `/src/app/theme.ts` 后，需运行 `pnpm theme` 生成新的 `theme.css`；
