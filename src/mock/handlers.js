// MSW 接口 mock：用 http / HttpResponse 模拟后端接口
import { http, HttpResponse } from 'msw'

// ============================================================
// 持久化方案：用 localStorage 模拟"数据库"，让新增/编辑/删除在
// 刷新后依然保留。首次访问时无存档，则写入预置的 50 条演示数据。
// ============================================================
const STORAGE_KEY = 'mock-books-db'

// 预置的演示图书数据（默认库），共 50 条以便演示分页
const SEED_BOOKS = [
  { id: 1, title: '三国演义', author: '罗贯中', status: '在馆' },
  { id: 2, title: '红楼梦', author: '曹雪芹', status: '在馆' },
  { id: 3, title: '活着', author: '余华', status: '外借' },
  { id: 4, title: '西游记', author: '吴承恩', status: '在馆' },
  { id: 5, title: '水浒传', author: '施耐庵', status: '外借' },
  { id: 6, title: '呐喊', author: '鲁迅', status: '在馆' },
  { id: 7, title: '围城', author: '钱钟书', status: '在馆' },
  { id: 8, title: '边城', author: '沈从文', status: '外借' },
  { id: 9, title: '平凡的世界', author: '路遥', status: '在馆' },
  { id: 10, title: '白鹿原', author: '陈忠实', status: '在馆' },
  { id: 11, title: '百年孤独', author: '加西亚·马尔克斯', status: '外借' },
  { id: 12, title: '老人与海', author: '海明威', status: '在馆' },
  { id: 13, title: '小王子', author: '圣埃克苏佩里', status: '在馆' },
  { id: 14, title: '傲慢与偏见', author: '简·奥斯汀', status: '外借' },
  { id: 15, title: '飘', author: '玛格丽特·米切尔', status: '在馆' },
  { id: 16, title: '卡拉马佐夫兄弟', author: '陀思妥耶夫斯基', status: '在馆' },
  { id: 17, title: '战争与和平', author: '列夫·托尔斯泰', status: '外借' },
  { id: 18, title: '巴黎圣母院', author: '雨果', status: '在馆' },
  { id: 19, title: '基督山伯爵', author: '大仲马', status: '在馆' },
  { id: 20, title: '茶花女', author: '小仲马', status: '外借' },
  { id: 21, title: '堂吉诃德', author: '塞万提斯', status: '在馆' },
  { id: 22, title: '鲁滨逊漂流记', author: '笛福', status: '在馆' },
  { id: 23, title: '格列佛游记', author: '斯威夫特', status: '外借' },
  { id: 24, title: '雾都孤儿', author: '狄更斯', status: '在馆' },
  { id: 25, title: '大卫·科波菲尔', author: '狄更斯', status: '在馆' },
  { id: 26, title: '高老头', author: '巴尔扎克', status: '外借' },
  { id: 27, title: '欧也妮·葛朗台', author: '巴尔扎克', status: '在馆' },
  { id: 28, title: '羊脂球', author: '莫泊桑', status: '在馆' },
  { id: 29, title: '罪与罚', author: '陀思妥耶夫斯基', status: '外借' },
  { id: 30, title: '安娜·卡列尼娜', author: '列夫·托尔斯泰', status: '在馆' },
  { id: 31, title: '红与黑', author: '司汤达', status: '在馆' },
  { id: 32, title: '悲惨世界', author: '雨果', status: '外借' },
  { id: 33, title: '追忆似水年华', author: '普鲁斯特', status: '在馆' },
  { id: 34, title: '尤利西斯', author: '乔伊斯', status: '在馆' },
  { id: 35, title: '卡夫卡短篇小说集', author: '卡夫卡', status: '外借' },
  { id: 36, title: '局外人', author: '加缪', status: '在馆' },
  { id: 37, title: '鼠疫', author: '加缪', status: '在馆' },
  { id: 38, title: '月亮与六便士', author: '毛姆', status: '外借' },
  { id: 39, title: '刀锋', author: '毛姆', status: '在馆' },
  { id: 40, title: '悉达多', author: '赫尔曼·黑塞', status: '在馆' },
  { id: 41, title: '麦田里的守望者', author: '塞林格', status: '外借' },
  { id: 42, title: '杀死一只知更鸟', author: '哈珀·李', status: '在馆' },
  { id: 43, title: '了不起的盖茨比', author: '菲茨杰拉德', status: '在馆' },
  { id: 44, title: '1984', author: '乔治·奥威尔', status: '外借' },
  { id: 45, title: '动物农场', author: '乔治·奥威尔', status: '在馆' },
  { id: 46, title: '百年好合', author: '王安忆', status: '在馆' },
  { id: 47, title: '活着再见', author: '余华', status: '外借' },
  { id: 48, title: '长恨歌', author: '王安忆', status: '在馆' },
  { id: 49, title: '黄金时代', author: '王小波', status: '在馆' },
  { id: 50, title: '沉默的大多数', author: '王小波', status: '外借' },
]

// 读取存档；无存档则返回 null（用于首次写入种子数据）
function loadDB() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (e) {
    return null
  }
}
// 把当前数组写回 localStorage，让变更在刷新后保留
function saveDB() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
  } catch (e) {
    /* 忽略写入失败（如隐私模式） */
  }
}

// 数据库：优先用存档，否则用预置种子数据并落盘
let books = loadDB()
let nextId = 51
if (!books) {
  books = SEED_BOOKS
  saveDB() // 首次访问：把 50 条预置数据写入存档
} else {
  // 已存在存档：从现有数据推算出下一个自增 id
  nextId = books.reduce((m, b) => Math.max(m, b.id), 0) + 1
}

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

  // 2. 分页 + 关键字获取图书列表：?page=&pageSize=&keyword=
  http.get('/api/books', ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') || 1)
    const pageSize = Number(url.searchParams.get('pageSize') || 10)
    const keyword = (url.searchParams.get('keyword') || '').trim()

    // 按关键字过滤书名或作者
    const filtered = keyword
      ? books.filter((b) => b.title.includes(keyword) || b.author.includes(keyword))
      : books

    const total = filtered.length
    const start = (page - 1) * pageSize
    const list = filtered.slice(start, start + pageSize)
    // 返回时禁用浏览器缓存：确保删除/编辑后重请求能拿到最新数据
    return HttpResponse.json(
      { code: 200, data: { list, total, page, pageSize }, message: 'ok' },
      { headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' } }
    )
  }),

  // 3. 新增图书：body 为图书字段，自动分配 id
  http.post('/api/books', async ({ request }) => {
    const body = await request.json()
    const book = { id: nextId++, status: '在馆', ...body }
    books.unshift(book) // 新书插入队首，第一页即可看到，避免被排到末尾页
    saveDB() // 新增后持久化，刷新保留
    return ok(book)
  }),

  // 4. 编辑图书：按 :id 找到并合并更新
  http.put('/api/books/:id', async ({ params, request }) => {
    const id = Number(params.id)
    const patch = await request.json()
    const index = books.findIndex((b) => b.id === id)
    if (index === -1) return HttpResponse.json({ error: '图书不存在' }, { status: 404 })
    books[index] = { ...books[index], ...patch }
    saveDB() // 编辑后持久化
    return ok(books[index])
  }),

  // 5. 删除图书：按 :id 从数组移除
  http.delete('/api/books/:id', ({ params }) => {
    const id = Number(params.id)
    const index = books.findIndex((b) => b.id === id)
    if (index === -1) return HttpResponse.json({ error: '图书不存在' }, { status: 404 })
    books.splice(index, 1)
    saveDB() // 删除后持久化，刷新不再恢复
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