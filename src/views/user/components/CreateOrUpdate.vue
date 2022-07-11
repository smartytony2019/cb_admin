<template>
  <div class="operation-container">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item :label="$t('member.list.form.username')">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">确定</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { get } from '@/api/user'

export default {
  name: 'CreateOrUpdate',
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      userListOptions: [],
      rules: {
        image_uri: [{ validator: validateRequire }],
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }]
      },
      form: {
        username: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      console.log('----')
      get({ id: this.id }).then(response => {
        console.log(response)
        this.form = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
          this.postForm.status = 'published'
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

</style>
