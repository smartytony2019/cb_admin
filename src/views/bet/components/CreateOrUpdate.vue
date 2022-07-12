<template>
  <div class="operation-container">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item :label="$t('member.list.form.username')" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <el-form-item :label="$t('member.list.form.pwd')" prop="pwd">
        <el-input v-model="form.pwd" />
      </el-form-item>
      <el-form-item :label="$t('member.list.form.confirmPwd')" prop="pwd">
        <el-input v-model="form.pwd" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">{{$t('button.confirm')}}</el-button>
        <el-button  @click="cancel">{{$t('button.cancel')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from '@/api'

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
        callback(new Error(this.$t('global.inputEmptyError')))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      userListOptions: [],
      rules: {
        username: [{ validator: validateRequire }]
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
      api.member.get({ id: this.id }).then(response => {
        console.log(response)
        this.form = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '发布文章成功',
            type: 'success',
            duration: 2000
          })
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

</style>
