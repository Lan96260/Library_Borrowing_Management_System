// MSW 接口 mock：用 http / HttpResponse 模拟后端接口
import { http, HttpResponse } from 'msw'

// 内存中的图书数据（模拟数据库）
let books = [
  { id: 1, title: '三国演义', author: '罗贯中', status: '在馆' },
  { id: 2, title: '红楼梦', author: '曹雪芹', status: '在馆' },
  { id: 3, title: '活着', author: '余华', status: '外借' },
]

// 自增 id 计数器
let nextId = 4

// 成功响应包装：统一业务协议 { code, data }，供响应拦截器解包
const ok = (data) => HttpResponse.json({ code: 200, data, message: 'ok' })

// 演示用：响应拦截器的 401 / 500 两个分支
// 401：要求带 Authorization 头，否则返回 401
// 500：始终返回 500，触发拦截器的服务器错误提示

// 导出所有 mock 接口处理器，供 worker.use() / setupServer() 使用
export const handlers = [
  // 1. 登录：接收用户名/密码，返回 token 与用户信息
  http.post('/api/login', async ({ request }) => {
    const { username } = await request.json()
    return ok({
      token: 'mock-token',
      userInfo: { name: username, role: '管理员' },
    })
  }),

  // 2. 分页获取图书列表：?page=&pageSize=
  // 6. 当 page 超过总页数时返回空数据（模拟无更多数据）
  http.get('/api/books', ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') || 1)
    const pageSize = Number(url.searchParams.get('pageSize') || 10)

    const total = books.length
    const pages = Math.max(1, Math.ceil(total / pageSize))

    // 请求的页超出范围 → 返回空列表与总条数
    if (page > pages) {
      return ok({ list: [], total, page, pageSize })
    }

    const list = books.slice((page - 1) * pageSize, page * pageSize)
    return ok({ list, total, page, pageSize })
  }),

  // 3. 新增图书：body 为图书字段，自动分配 id
  http.post('/api/books', async ({ request }) => {
    const body = await request.json()
    const book = { id: nextId++, status: '在馆', ...body }
    books.push(book)
    return ok(book)
  }),

  // 4. 编辑图书：按 :id 找到并合并更新
  http.put('/api/books/:id', async ({ params, request }) => {
    const id = Number(params.id)
    const patch = await request.json()
    const index = books.findIndex((b) => b.id === id)
    if (index === -1) return HttpResponse.json({ error: '图书不存在' }, { status: 404 })
    books[index] = { ...books[index], ...patch }
    return ok(books[index])
  }),

  // 5. 删除图书：按 :id 从数组移除
  http.delete('/api/books/:id', ({ params }) => {
    const id = Number(params.id)
    const index = books.findIndex((b) => b.id === id)
    if (index === -1) return HttpResponse.json({ error: '图书不存在' }, { status: 404 })
    books.splice(index, 1)
    return ok({ success: true })
  }),

  // 6. 演示 401：必须携带 Authorization 头，否则触发响应拦截器的清空登录态并跳转
  http.get('/api/protected', ({ request }) => {
    if (!request.headers.get('Authorization')) {
      return HttpResponse.json({ code: 401, message: '未登录' }, { status: 401 })
    }
    return ok({ protected: true })
  }),

  // 7. 演示 500：始终返回 500，触发响应拦截器的服务器错误提示
  http.get('/api/error', () => {
    return HttpResponse.json({ code: 500, message: '服务器错误' }, { status: 500 })
  }),
]