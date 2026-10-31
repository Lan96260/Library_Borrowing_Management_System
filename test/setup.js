// Vitest 全局前置脚本：在测试文件执行前运行一次
// 方案：全局注册 Element Plus，让组件测试里的 el-* 组件能被渲染
import { config } from '@vue/test-utils'
import ElementPlus from 'element-plus'

config.global.plugins = [ElementPlus]