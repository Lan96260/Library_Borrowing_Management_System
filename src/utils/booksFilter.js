// 纯函数：图书列表的分页 + 关键字过滤（从 mock/handlers.js 中抽出，便于单元测试）
// 输入任意图书数组，输出 { list, total, page, pageSize }
// 关键字会同时匹配书名(title)或作者(author)
export function paginate(list, { page = 1, pageSize = 10, keyword = '' } = {}) {
  const kw = keyword.trim()
  const filtered = kw
    ? list.filter((b) => b.title.includes(kw) || b.author.includes(kw))
    : list
  const start = (page - 1) * pageSize
  return {
    list: filtered.slice(start, start + pageSize),
    total: filtered.length,
    page,
    pageSize,
  }
}