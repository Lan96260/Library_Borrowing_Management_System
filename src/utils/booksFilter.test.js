import { describe, it, expect } from 'vitest'
import { paginate } from './booksFilter'

describe('paginate 分页与关键字过滤', () => {
  const data = [
    { id: 1, title: '三国演义', author: '罗贯中' },
    { id: 2, title: '活着', author: '余华' },
    { id: 3, title: '活着再见', author: '余华' },
    { id: 4, title: '西游记', author: '吴承恩' },
  ]

  it('无关键字时按页切片', () => {
    const r = paginate(data, { page: 1, pageSize: 2 })
    expect(r.list.map((b) => b.id)).toEqual([1, 2])
    expect(r.total).toBe(4)
  })

  it('第 2 页返回下一段数据', () => {
    const r = paginate(data, { page: 2, pageSize: 2 })
    expect(r.list.map((b) => b.id)).toEqual([3, 4])
  })

  it('按书名关键字过滤', () => {
    const r = paginate(data, { page: 1, pageSize: 10, keyword: '活着' })
    expect(r.list).toHaveLength(2)
  })

  it('按作者关键字过滤', () => {
    const r = paginate(data, { page: 1, pageSize: 10, keyword: '余华' })
    expect(r.list).toHaveLength(2)
  })

  it('关键字两端空格会被忽略', () => {
    const r = paginate(data, { page: 1, pageSize: 10, keyword: '  余华  ' })
    expect(r.total).toBe(2)
  })

  it('越界页返回空列表', () => {
    const r = paginate(data, { page: 99, pageSize: 5 })
    expect(r.list).toHaveLength(0)
  })

  it('关键字无匹配时 total 为 0', () => {
    const r = paginate(data, { page: 1, pageSize: 5, keyword: '不存在的书' })
    expect(r.total).toBe(0)
  })
})