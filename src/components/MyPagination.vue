<script setup>
import { ref, watch } from 'vue'

// 声明接收的 props：总条数、当前页、每页条数
const props = defineProps({
  total: { type: Number, default: 0 },
  page: { type: Number, default: 1 },
  pageSize: { type: Number, default: 5 },
})

// 声明事件：update:page / update:pageSize 配合 v-model 双向绑定；change 通知父组件重新请求
const emit = defineEmits(['update:page', 'update:pageSize', 'change'])

// 内部镜像值：真正绑定到 el-pagination 的本地状态（props 是只读的，不能直接改）
const currentPage = ref(props.page)
const currentSize = ref(props.pageSize)

// 父组件通过 v-model 更新 props 时，同步到内部镜像
watch(() => props.page, (v) => (currentPage.value = v))
watch(() => props.pageSize, (v) => (currentSize.value = v))

// 页码切换：回传新页码并触发 change
function onCurrentChange(p) {
  emit('update:page', p)
  emit('change')
}

// 每页条数切换：重置回第 1 页，同时回传新的 page/pageSize 并触发 change
function onSizeChange(s) {
  currentPage.value = 1
  emit('update:page', 1)
  emit('update:pageSize', s)
  emit('change')
}
</script>

<template>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="currentSize"
    :total="total"
    :page-sizes="[5, 10, 20]"
    layout="total, sizes, prev, pager, next"
    @current-change="onCurrentChange"
    @size-change="onSizeChange"
  />
</template>