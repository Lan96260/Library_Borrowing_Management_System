<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { getBooks, addBook, updateBook, deleteBook } from '@/api/book'
import MyPagination from '@/components/MyPagination.vue'

// 图书数据 / 加载状态
const books = ref([])
const loading = ref(false)

// 分页与搜索状态
const page = ref(1)
const pageSize = ref(5)
const total = ref(0)
const keyword = ref('')

// 弹窗状态：是否打开、是否是编辑模式、编辑中的图书 id
const dialogOpen = ref(false)
const isEdit = ref(false)
const editingId = ref(null)

// 表单数据 + 校验规则（书名、作者必填）
const formRef = ref(null)
const form = reactive({ title: '', author: '' })
const rules = {
  title: [{ required: true, message: '请输入书名', trigger: 'blur' }],
  author: [{ required: true, message: '请输入作者', trigger: 'blur' }],
}

// 拉取图书列表（带分页与搜索参数）
async function loadBooks() {
  loading.value = true
  try {
    const { list, total: t } = await getBooks({
      page: page.value,
      pageSize: pageSize.value,
      keyword: keyword.value,
    })
    books.value = list
    total.value = t
  } finally {
    loading.value = false
  }
}
onMounted(loadBooks)

// 搜索 / 清空搜索：重置到第一页后重新请求
function handleSearch() {
  page.value = 1
  loadBooks()
}

// 打开新增弹窗：清空表单并重置校验
function openAdd() {
  isEdit.value = false
  form.title = ''
  form.author = ''
  formRef.value?.clearValidate()
  dialogOpen.value = true
}

// 打开编辑弹窗：记录当前行 id 并回填数据
function openEdit(row) {
  isEdit.value = true
  editingId.value = row.id
  form.title = row.title
  form.author = row.author
  formRef.value?.clearValidate()
  dialogOpen.value = true
}

// 提交：先 validate 校验，通过后再新增或编辑，成功后关闭并刷新列表
async function submit() {
  await formRef.value.validate()
  if (isEdit.value) {
    // 编辑需带 id
    await updateBook(editingId.value, form)
  } else {
    await addBook(form)
  }
  dialogOpen.value = false
  ElMessage.success(isEdit.value ? '保存成功' : '新增成功')
  if (!isEdit.value) {
    page.value = 1 // 新增后回到第 1 页，让新书置顶可见
  }
  loadBooks()
}

// 删除：确认后调用接口并刷新
async function removeBook(row) {
  if (!(await ElMessageBox.confirm(`确认删除《${row.title}》？`, '提示', { type: 'warning' }).catch(() => null))) return
  await deleteBook(row.id)
  ElMessage.success('删除成功')
  loadBooks()
}
</script>

<template>
  <div class="page card">
    <!-- 页头：标题 + 搜索框 + 新增按钮同一行 -->
    <div class="page-head">
      <h1>图书列表</h1>
      <div class="toolbar">
        <!-- 搜索框：左侧加放大镜图标，宽度适中 -->
        <el-input
          v-model="keyword"
          placeholder="搜索书名或作者"
          :prefix-icon="Search"
          clearable
          class="search"
          @keyup.enter="handleSearch"
          @clear="handleSearch"
        />
        <el-button @click="handleSearch">搜索</el-button>
        <!-- 核心操作：醒目主色实心按钮 -->
        <el-button type="primary" @click="openAdd">新增图书</el-button>
      </div>
    </div>

    <!-- 表格：v-loading 绑定加载态；数据为空时显示 el-empty；row-key 用 id 保证行身份稳定 -->
    <el-table :data="books" v-loading="loading" empty-text="暂无数据" row-key="id">
      <el-table-column prop="title" label="书名" min-width="200" />
      <el-table-column prop="author" label="作者" min-width="160" />
      <!-- 操作列：编辑 / 删除（删除用淡红，减少视觉噪音） -->
      <el-table-column label="操作" width="160">
        <template #default="{ row }">
          <el-button type="primary" link size="small" @click="openEdit(row)">编辑</el-button>
          <el-button type="danger" link size="small" @click="removeBook(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件：靠右对齐 + 上边距 -->
    <MyPagination
      v-model:page="page"
      v-model:page-size="pageSize"
      :total="total"
      class="pager"
      @change="loadBooks"
    />

    <!-- 新增 / 编辑共用弹窗 -->
    <el-dialog v-model="dialogOpen" :title="isEdit ? '编辑图书' : '新增图书'" width="420px">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="48px">
        <el-form-item label="书名" prop="title">
          <el-input v-model="form.title" placeholder="请输入书名" />
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="form.author" placeholder="请输入作者" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogOpen = false">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
/* 页面主体：白色卡片包裹（圆角 8px + 轻阴影） */
.page {
  max-width: 860px;
  margin: 0 auto;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

/* 页头：标题与工具栏分居两侧 */
.page-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}
.page-head h1 {
  font-size: 20px;
  color: var(--ink); /* 标题加深 */
}

/* 工具栏：搜索框 + 按钮一行 */
.toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
}
.search {
  width: 240px;
}

/* 分页：右对齐 + 上边距 */
.pager {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

/* 表格美化：表头浅灰 + 加粗，数据行加高 */
:deep(.el-table th) {
  background: #fafafa;
  color: var(--ink);
  font-weight: 600;
}
:deep(.el-table .el-table__row) {
  height: 50px;
}

/* 操作列按钮：缩小字号，删除按钮淡红 */
:deep(.el-button--primary.is-link) {
  font-size: 13px;
}
:deep(.el-button--danger.is-link) {
  font-size: 13px;
  color: #e8695e;              /* 淡红 */
}
:deep(.el-button--danger.is-link:hover) {
  color: #d94a3d;              /* 悬停加深 */
}
</style>