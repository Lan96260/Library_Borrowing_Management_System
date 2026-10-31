<script setup>
// 1. 数据源保持不变
const records = [
  { title: '三国演义', borrow: '2026-10-01', due: '2026-10-31', state: '借阅中' },
  { title: '活着', borrow: '2026-10-15', due: '2026-11-14', state: '借阅中' },
]
</script>

<template>
  <div class="page">
    <!-- 页头：标题 + 数量说明 (保持不变) -->
    <div class="page-head">
      <h1>借阅记录</h1>
      <p class="page-sub">共 {{ records.length }} 条借阅记录</p>
    </div>

    <!-- ⚠️ 核心修改：把原来的 <ul> 列表删掉，换成 <el-table> -->
    <el-table :data="records" style="width: 100%" stripe border>

      <!-- 第一列：书名 -->
      <el-table-column prop="title" label="书名" width="200" />

      <!-- 第二列：借出日期 -->
      <el-table-column prop="borrow" label="借出日期" width="150" />

      <!-- 第三列：应还日期 -->
      <el-table-column prop="due" label="应还日期" width="150" />

      <!-- 第四列：状态 (使用 el-tag 实现，替换了原本手写的 span) -->
      <el-table-column label="状态" width="150">
        <template #default="scope">
          <!-- 如果状态是“借阅中”，显示黄色警告标签 -->
          <el-tag v-if="scope.row.state === '借阅中'" type="warning" effect="light" round>
            ● 借阅中
          </el-tag>
          <!-- 如果状态是“已归还”，显示绿色成功标签 -->
          <el-tag v-else-if="scope.row.state === '已归还'" type="success" effect="light" round>
            ● 已归还
          </el-tag>
          <!-- 其他情况（比如逾期），显示红色危险标签 -->
          <el-tag v-else type="danger" effect="light" round>
            ● 已逾期
          </el-tag>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<style scoped>
/* 页面主体：保留你原本写好的白色卡片包裹 */
.page {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.page-head {
  margin-bottom: 20px;
}
.page-head h1 {
  font-size: 20px;
  color: #303133; /* 注意：原代码的 var(--ink) 在你项目里可能没定义，我改成了具体的深色 */
}
.page-sub {
  color: #909399; /* 注意：原代码的 var(--muted) 可能没定义，我改成了具体的浅灰色 */
  margin-top: 4px;
  font-size: 13px;
}

/* ⚠️ 注意：你原来写的关于 .record-list, .record-item 等等的 CSS 样式，我已经全删了。
   因为换成了 el-table，表格自带样式，不需要这些自定义样式了。*/
</style>