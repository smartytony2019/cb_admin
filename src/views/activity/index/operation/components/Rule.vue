<!--
@Author:      tony
@Date:        2019-01-04T10:00:00+08:00
@Description: 活动规则
-->
<template>
  <el-form ref="form" :model="form" label-width="150px" :rules="rules" size="mini">
    <el-form-item label="周期" prop="cycle">
      <el-select v-model="form.cycle" placeholder="请选择" @change="handleCycleChange">
        <el-option
          v-for="item in options"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
    </el-form-item>

    <el-form-item v-if="form.cycle === '6'" label="天数" prop="days">
      <el-input v-model="form.username" />
    </el-form-item>

    <el-form-item label="提现打码倍数" prop="withdrawBetMul">
      <el-input v-model="form.withdrawBetMul" />
    </el-form-item>

    <el-form-item label="金额" prop="money">
      <el-input v-model="form.money" />
    </el-form-item>

    <el-form-item label="币种" prop="symbol">
      <el-input v-model="form.symbol" />
    </el-form-item>

    <el-form-item label="计算方式" prop="calcMode">
      <el-select v-model="form.calcMode" placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="领取方式" prop="receiveMode">
      <el-select v-model="form.receiveMode" placeholder="请选择">
        <el-option
          v-for="item in options2"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="限制项" prop="limitItem">
      <el-select v-model="form.limitItem" placeholder="请选择">
        <el-option
          v-for="item in options3"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="">
      <el-row v-for="(item, index) in rows" :key="index">
        <el-col class="group1" :span="3">规则项{{ item }}:</el-col>
        <el-col class="group2" :span="4">
          <el-select v-model="form.language" placeholder="类型">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-col>
        <el-col class="group3" :span="4"><el-input v-model="form.username" /></el-col>
        <el-col class="group3 line" :span="1">-</el-col>
        <el-col class="group3" :span="4"><el-input v-model="form.username" /></el-col>
        <el-col class="group4" :span="3"><el-input v-model="form.username" placeholder="赠送比例" /></el-col>
        <el-col class="group5" :span="1"><i v-if="item === rows" class="el-icon-circle-plus" @click="rows += 1" /></el-col>
      </el-row>
    </el-form-item>

  </el-form>
</template>

<script>
import api from '@/api'

export default {
  name: 'CreateOrUpdate',
  props: {
    id: {
      type: Number,
      default: 0
    },
    configform: {
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
      rows: 1,
      options: [{
        code: '1',
        name: '一次'
      }, {
        code: '2',
        name: '不限次数'
      }, {
        code: '3',
        name: '一天一次'
      }, {
        code: '4',
        name: '一周一次'
      }, {
        code: '5',
        name: '一月一次'
      }, {
        code: '6',
        name: '自定义天数'
      }],

      options1: [{
        code: '1',
        name: '固定金额'
      }, {
        code: '2',
        name: '百分比'
      }],

      options2: [{
        code: '1',
        name: '直接发放'
      }, {
        code: '2',
        name: '后端审核'
      }, {
        code: '3',
        name: '自动发放'
      }],

      options3: [{
        code: '1',
        name: '充值'
      }, {
        code: '2',
        name: '打码'
      }],

      loading: false,
      userListOptions: [],
      dialogVisible: true,
      rules: {
        username: [{ validator: validateRequire }]
      },
      form: {
        cycle: '',
        days: '',
        withdrawBetMul: '',
        calcMode: '',
        receiveMode: '',
        money: '',
        symbol: '',
        limitItem: '',
        limitLev: ''
      }
    }
  },
  created() {
    // this.init()
  },
  methods: {
    handleCycleChange() {
      console.log(this.form)
    },

    async fetch() {
      const res = api.member.get({ id: this.id })
      if (res && res.code === 0) {
        this.form = res.data
      }
    },
    handleSubmit() {
      console.log(this.configform)
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
  .line {
    width:1%;
    text-align:center;
  }
  .group1 {
    text-align:right;
    padding-right: 10px;
  }
  .group2 {
    margin: 0 20px 0 0;
  }
  .group4 {
    margin: 0 10px 0 20px;
  }
  .el-row {
    margin-bottom:10px;
  }
</style>
