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

        <el-form-item label="序号" prop="sorted">
          <el-input v-model="form.sorted" />
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

export default {
  name: 'Operate',
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      form: {
        username: '',
        domain: '',
        isEnable: ''
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
    },
    async fetch() {
    },

    async back() {
      this.$router.go(-1)
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
