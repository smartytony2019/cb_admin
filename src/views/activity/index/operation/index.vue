<template>
  <div class="operation">
    <div class="operation-title">
      <div class="icon">
        <i class="el-icon-arrow-left" @click="$router.go(-1)" />
      </div>
    </div>
    <div class="operation-container">
      <el-tabs v-model="activeName" :tab-position="tabPosition" @tab-click="handleClick">
        <!-- 活动配置 - start -->
        <el-tab-pane label="活动配置" name="config">
          <Config :form="form" />
        </el-tab-pane>
        <!-- 活动配置 - end -->

        <!-- 活动规则 - start -->
        <el-tab-pane label="活动规则" name="rule">
          <Rule :form="ruleForm" :configform="form" />
        </el-tab-pane>
        <!-- 活动规则 - end -->

        <div class="btn">
          <el-button type="primary" size="mini" @click="handleSubmit">确定</el-button>
          <el-button size="mini" @click="$router.go(-1)">取消</el-button>
        </div>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import api from '@/api'

import Config from './components/Config.vue'
import Rule from './components/Rule.vue'

export default {
  name: 'CreateOrUpdate',
  components: { Config, Rule },
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tabPosition: 'left',
      activeName: 'config',

      form: {
        cateCode: '',
        title: '',
        img: '',
        content: '',
        sorted: '',
        type: '',
        beginTime: '',
        finishTime: '',
        language: '',
        isEnable: true
      },
      ruleForm: {
        cycle: '',
        days: '',
        withdrawBetMul: '',
        jackpotBetMul: '',
        calcMode: '',
        receiveMode: '',
        money: '',
        symbol: '',
        limitItem: '',
        limitLev: '',
        items: []
      }
    }
  },
  created() {
    // this.init()
  },
  methods: {
    async httpRequest(data) {
      const base64 = await this.getBase64(data.file)
      this.form.img = base64
      this.$message.success('文件上传成功')
    },
    // 转base64码
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        let fileResult = ''
        reader.readAsDataURL(file)
        // 开始转
        reader.onload = () => {
          fileResult = reader.result
        }
        // 转 失败
        reader.onerror = (error) => {
          reject(error)
        }
        // 转 结束
        reader.onloadend = () => {
          resolve(fileResult)
        }
      })
    },

    handleClick(tab, event) {
    },
    async init() {
      this.fetch()
    },
    async fetch() {
      const res = api.member.get({ id: this.id })
      if (res && res.code === 0) {
        this.form = res.data
      }
    },
    async handleSubmit() {
      const res = await api.activity.create({ ...this.form, ...this.ruleForm })
      console.log(res)
      // this.$refs.form.validate(valid => {
      //   if (valid) {
      //     this.loading = true
      //     this.$notify({
      //       title: '成功',
      //       message: '发布文章成功',
      //       type: 'success',
      //       duration: 2000
      //     })
      //     this.loading = false
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  margin-top:20px;
  width:950px;
  display: flex;
  justify-content: center;
}
</style>
