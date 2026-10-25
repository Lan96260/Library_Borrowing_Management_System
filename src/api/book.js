// 图书相关接口
import request from '@/utils/request'

// 分页获取图书列表：GET /api/books?page=
export const getBooks = (page) => request.get('/books', { params: { page } })

// 新增图书：POST /api/books
export const addBook = (data) => request.post('/books', data)

// 编辑图书：PUT /api/books/:id
export const updateBook = (id, data) => request.put(`/books/${id}`, data)

// 删除图书：DELETE /api/books/:id
export const deleteBook = (id) => request.delete(`/books/${id}`)

// 测试响应拦截器 500 分支：GET /api/error
export const testError = () => request.get('/error')