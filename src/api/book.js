// 图书相关接口
import request from '@/utils/request'

// 分页 + 关键字获取图书列表：GET /api/books?page=&pageSize=&keyword=
export const getBooks = ({ page, pageSize, keyword } = {}) =>
  request.get('/books', { params: { page, pageSize, keyword } })

// 新增图书：POST /api/books
export const addBook = (data) => request.post('/books', data)

// 编辑图书：PUT /api/books/:id
export const updateBook = (id, data) => request.put(`/books/${id}`, data)

// 删除图书：DELETE /api/books/:id
export const deleteBook = (id) => request.delete(`/books/${id}`)

// 测试响应拦截器 500 分支：GET /api/error
export const testError = () => request.get('/error')