# 📚 图书借阅管理系统

基于 **Vue 3 + Vite** 的前端图书借阅管理系统。包含登录、图书列表、借阅记录等功能，采用 `<script setup>` 组合式 API 语法与 Vue Router 4 单页路由。

## ✨ 功能特性

- 🔐 **登录鉴权**：模拟登录写入 `localStorage` token，路由守卫拦截未登录访问
- 📖 **图书列表**：展示馆藏图书及在馆/外借状态
- 📗 **借阅记录**：展示借出与应还日期
- 🎨 **统一设计系统**：基于 OKLCH 色彩令牌，非对称左对齐后台布局

## 🛠 技术栈

| 技术 | 版本 | 说明 |
|---|---|---|
| Vue | ^3.5.44 | 前端框架，`<script setup>` 语法 |
| Vite | ^8.3.4 | 构建工具 |
| Vue Router | ^4.6.4 | 路由管理 |

## 📦 安装

```bash
npm install
```

## 🚀 启动开发服务器

```bash
npm run dev
```

启动后访问 `http://localhost:5173/`。

## 🏗 项目结构

```
.
├── index.html                  # HTML 入口
├── vite.config.js              # Vite 配置（含 @ 路径别名）
├── src/
│   ├── main.js                 # 应用入口，注册 router
│   ├── App.vue                 # 根组件（仅保留 <router-view/>）
│   ├── style.css               # 全局设计令牌与基础样式
│   ├── router/
│   │   └── index.js            # 路由配置、鉴权守卫、404 兜底
│   ├── components/
│   │   └── Layout.vue          # 侧边栏父布局
│   └── views/
│       ├── Login.vue           # 登录页
│       ├── BookList.vue        # 图书列表
│       └── BorrowRecord.vue    # 借阅记录
```

## 📖 使用流程

1. 访问任意受保护页面（如 `/books`、`/borrow`），未登录会被路由守卫重定向到 `/login`。
2. 在登录页点击「模拟登录」按钮，写入 `library_token` 后跳转图书列表。
3. 通过左侧边栏在「图书列表」与「借阅记录」间切换。
4. 点击「退出登录」清除 token，回到登录页。

## ⚙️ 路由与鉴权说明

- **路由懒加载**：所有页面通过 `() => import(...)` 按需加载。
- **嵌套路由**：`Layout.vue` 作为父布局，`/books`、`/borrow` 为子页面。
- **鉴权**：`beforeEach` 全局守卫读取 `localStorage` 中的 `library_token`，`meta.requiresAuth` 标记需登录页面。
- **404 兜底**：未匹配路径重定向到登录页。
- **滚动行为**：前进/后退恢复原位置，普通跳转回到顶部。

## 🧱 常用脚本

```bash
npm run dev       # 启动开发服务器
npm run build     # 生产构建
npm run preview   # 预览构建产物
```