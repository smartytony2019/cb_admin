<!--
@Author:      tony
@Date:        2019-01-04T10:00:00+08:00
@Description: 活动配置
-->
<template>
  <el-form ref="form" :model="form" label-width="150px" :rules="rules" size="mini">
    <el-form-item label="类目" prop="cateName">
      <el-select v-model="form.cateName" placeholder="请选择活动区域">
        <el-option
          v-for="item in options"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="标题" prop="title">
      <el-input v-model="form.title" />
    </el-form-item>

    <el-form-item label="图片" prop="img">
      <el-upload
        class="avatar-uploader"
        action=""
        :http-request="httpRequest"
        :show-file-list="false"
      >
        <img v-if="form.img" :src="form.img" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon" />
      </el-upload>
    </el-form-item>

    <el-form-item label="内容" prop="content" style="height:250px">
      <quill-editor
        ref="myQuillEditor"
        v-model="form.content"
        :options="editorOption"
        style="height:170px"
      />
    </el-form-item>

    <el-form-item label="类型" prop="type">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option
          v-for="item in options2"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="语言" prop="language">
      <el-select v-model="form.language" placeholder="请选择活动区域">
        <el-option
          v-for="item in options3"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="序号" prop="sorted">
      <el-input v-model="form.sorted" />
    </el-form-item>

    <el-form-item label="启用" prop="isEnable">
      <el-switch v-model="form.isEnable" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="handleSubmit">{{ $t('button.confirm') }}</el-button>
      <el-button @click="cancel">{{ $t('button.cancel') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import api from '@/api'

export default {
  name: 'CreateOrUpdate',
  components: { quillEditor },
  props: {
    id: {
      type: Number,
      default: 0
    },
    form: {
      type: Object,
      default: () => {}
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

      options2: [{
        code: '600020',
        name: '首充'
      }, {
        code: '600021',
        name: '注册送'
      }, {
        code: '600022',
        name: '其它'
      }],

      options3: [{
        code: 'zh',
        name: '中文'
      }, {
        code: 'en',
        name: '英语'
      }, {
        code: 'vi',
        name: '越南语'
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
      console.log(tab, event)
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
