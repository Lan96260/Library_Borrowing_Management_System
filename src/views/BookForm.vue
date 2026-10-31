<template>
  <div class="page">
    <h2>图书信息录入（增强表单）</h2>

    <el-form label-width="120px" class="form-box">
      <!-- 普通的输入框，用来填书名 -->
      <el-form-item label="书名">
        <el-input v-model="formData.bookName" placeholder="请输入书名" />
      </el-form-item>

      <!-- 1. 评分组件 el-rate -->
      <el-form-item label="图书评分">
        <el-rate
          v-model="formData.rating"
          show-score
          text-color="#ff9900"
        />
      </el-form-item>

      <!-- 2. 开关组件 el-switch -->
      <el-form-item label="是否上架">
        <el-switch
          v-model="formData.isAvailable"
          active-text="上架可借"
          inactive-text="下架不可借"
        />
      </el-form-item>

      <!-- 3. 数字输入框 el-input-number -->
      <el-form-item label="库存数量">
        <el-input-number
          v-model="formData.stock"
          :min="0"
          :max="100"
          label="库存数量"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">保存图书</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus' // 用于弹出提示框

// 定义表单数据对象
const formData = ref({
  bookName: '',
  rating: 0, // 默认0星
  isAvailable: true, // 默认上架
  stock: 10 // 默认库存10本
})

// 点击保存按钮触发的函数
const submitForm = () => {
  // 这里可以把 formData 打印到控制台看看数据
  console.log('提交的数据：', formData.value)

  // 弹出一个成功的提示
  ElMessage.success('图书信息保存成功！')
}
</script>

<style scoped>
.page {
  max-width: 600px;
  margin: 20px auto;
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}
h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 20px;
  color: #303133;
}
.form-box {
  margin-top: 20px;
}
</style>