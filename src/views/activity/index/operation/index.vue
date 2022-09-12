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
          <Rule :configform="form" />
        </el-tab-pane>
        <!-- 活动规则 - end -->
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
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        callback(new Error(this.$t('global.inputEmptyError')))
      } else {
        callback()
      }
    }
    return {
      tabPosition: 'left',
      options: [{
        code: '600010',
        name: '限时活动'
      }, {
        code: '600011',
        name: '新手活动'
      }, {
        code: '600012',
        name: '日常活动'
      }],

      imageUrl: '',
      activeName: 'config',

      texts: '',
      // 编辑器配置
      editorOption: {
        placeholder: '在这里输入内容',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], //  加粗、倾斜、下划线、删除线
            ['blockquote', 'code-block'], // 引用代码块
            [{ 'header': 1 }, { 'header': 2 }], // 标题，键值对应的形式，1，2 表示字体大小
            [{ 'list': 'ordered' }, { 'list': 'bullet' }], // 列表
            [{ 'script': 'sub' }, { 'script': 'super' }], // 上下标
            [{ 'indent': -1 }, { 'indent': +1 }], // 缩进
            [{ 'direction': 'rtl' }], // 文本方向
            [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // 几级标题
            [{ 'color': [] }, { 'background': [] }], // 字体颜色，字体背景颜色
            [{ 'font': [] }], // 字体
            [{ 'align': [] }], // 对齐方式
            ['clean'], // 清除
            ['image', 'video'] // 上传图片、上传视频
          ]
        }
      },

      loading: false,
      userListOptions: [],
      dialogVisible: true,
      rules: {
        username: [{ validator: validateRequire }]
      },
      form: {
        cateName: '',
        title: '',
        img: '',
        content: '',
        sorted: '',
        type: '',
        language: '',
        isEnable: ''
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
    handleSubmit() {
      console.log(this.form)
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
</style>
