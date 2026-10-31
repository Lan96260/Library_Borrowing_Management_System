<template>
  <div class="calendar-container">
    <el-calendar v-model="value">
      <template #date-cell="{ data }">
        <el-tooltip
          v-if="getDueBooks(data.day).length > 0"
          effect="dark"
          placement="top"
        >
          <template #content>
            <div v-for="book in getDueBooks(data.day)" :key="book.title">
              📚 {{ book.title }} (借阅人: {{ book.user }})
            </div>
          </template>

          <div class="date-cell">
            <span>{{ data.day.split('-').slice(1).join('-') }}</span>
            <span class="dot"></span>
          </div>
        </el-tooltip>

        <div v-else class="date-cell">
          <span>{{ data.day.split('-').slice(1).join('-') }}</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(new Date())

const dueRecords = [
  { date: '2026-10-31', title: '三国演义', user: '张三' },
  { date: '2026-10-31', title: '活着', user: '李四' },
  { date: '2026-11-14', title: '西游记', user: '王五' },
]

const getDueBooks = (dateStr) => {
  return dueRecords.filter(item => item.date === dateStr)
}
</script>

<style scoped>
.calendar-container {
  max-width: 900px;
  margin: 20px auto;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}
.date-cell {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dot {
  position: absolute;
  bottom: 2px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #f56c6c;
}
</style>