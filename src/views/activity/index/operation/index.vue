<!--
@Author:      tony
@Date:        2019-01-04T10:00:00+08:00
@Description: 操作
-->
<template>
  <div class="operation">
    <div class="operation-title">
      <div class="icon">
        <i class="el-icon-arrow-left" @click="back" />
      </div>
    </div>
    <div class="operation-container">

      <el-form ref="form" :model="form" label-width="150px" :rules="rules" size="mini">
        <el-form-item label="类目" prop="cateCode">
          <el-select v-model="form.cateCode" placeholder="请选择活动区域">
            <el-option
              v-for="item in cate"
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
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="item in type"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="语言" prop="language">
          <el-select v-model="form.language" placeholder="请选择">
            <el-option
              v-for="item in options3"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="启用" prop="isEnable">
          <el-switch v-model="form.isEnable" />
        </el-form-item>

        <el-form-item label="开始时间">
          <el-date-picker
            v-model="form.beginTime"
            type="date"
            placeholder="永久不选"
          />
        </el-form-item>

        <el-form-item label="结束时间">
          <el-date-picker
            v-model="form.finishTime"
            type="date"
            placeholder="永久不选"
          />
        </el-form-item>

        <el-form-item label="序号" prop="sorted">
          <el-input v-model="form.sorted" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="mini" @click="handleSubmit">确定</el-button>
          <el-button size="mini" @click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import api from '@/api'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  name: 'CreateOrUpdate',
  components: { quillEditor },
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请填写。。。'))
      } else {
        callback()
      }
    }
    return {
      tabPosition: 'left',
      rules: {
        title: [{ validator: validateRequire }],
        cateCode: [{ validator: validateRequire }],
        img: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
        type: [{ validator: validateRequire }],
        language: [{ validator: validateRequire }],
        sorted: [{ validator: validateRequire }]
      },
      form: {
        id: '',
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

      cate: [],
      type: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      let res = null
      const id = this.$route.query.id
      if (id && id > 0) {
        res = await api.activity.find({ id })
        if (res && res.code === 0 && res.data) {
          this.form = res.data
        }
      }

      // 类目
      res = await api.activity.findCate({})
      if (res && res.code === 0) {
        this.cate = res.data.filter(f => f.code > 0)
      }

      // 类型
      res = await api.activity.findType({})
      if (res && res.code === 0) {
        this.type = res.data
      }
    },
    async fetch() {
      const res = api.member.get({ id: this.id })
      if (res && res.code === 0) {
        this.form = res.data
      }
    },
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
    async handleSubmit() {
      const cb = async(valid) => {
        if (valid) {
          const res = await api.activity.operate(this.form)
          if (res && res.code === 0) {
            this.$message({ type: 'success', message: '操作成功!' })
            this.back()
          } else {
            this.$message(res.msg || '操作失败')
          }
        } else {
          console.log('error submit!!')
          return false
        }
      }

      this.$refs.form.validate(valid => cb(valid))
    },

    async back() {
      this.$router.go(-1)
      this.$refs.form.resetFields()
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
