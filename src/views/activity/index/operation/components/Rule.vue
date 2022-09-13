<!--
@Author:      tony
@Date:        2019-01-04T10:00:00+08:00
@Description: 活动规则
-->
<template>
  <el-form ref="form" :model="form" label-width="150px" :rules="rules" size="mini">

    <el-form-item label="币种" prop="symbol">
      <el-select v-model="form.symbol" placeholder="请选择" @change="handleCycleChange">
        <el-option
          v-for="item in symbal"
          :key="item.code"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
    </el-form-item>

    <template v-if="configform.type === '600021'">
      <el-form-item label="金额" prop="money">
        <el-input v-model="form.money" />
      </el-form-item>
    </template>
    <template v-else>

      <el-form-item label="周期" prop="cycle">
        <el-select v-model="form.cycle" placeholder="请选择" @change="handleCycleChange">
          <el-option
            v-for="item in cycle"
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

      <el-form-item label="彩金打码倍数" prop="jackpotBetMul">
        <el-input v-model="form.jackpotBetMul" />
      </el-form-item>

      <el-form-item label="计算方式" prop="calcMode">
        <el-select v-model="form.calcMode" placeholder="请选择">
          <el-option
            v-for="item in calcMode"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="领取方式" prop="receiveMode">
        <el-select v-model="form.receiveMode" placeholder="请选择">
          <el-option
            v-for="item in receiveMode"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="限制项" prop="limitItem">
        <el-select v-model="form.limitItem" placeholder="请选择">
          <el-option
            v-for="item in limitItem"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-divider content-position="center">规则项</el-divider>

      <el-form-item label="">
        <el-row v-for="(item, index) in form.items" :key="index">
          <el-col class="group1" :span="3" />
          <el-col class="group2" :span="4">
            <el-select v-model="form.items[index].type" placeholder="请选择">
              <el-option
                v-for="item1 in ruleItemType"
                :key="item1.code"
                :label="item1.name"
                :value="item1.code"
              />
            </el-select>
          </el-col>
          <template v-if="item.type === 1">
            <el-col class="group3" :span="4"><el-input v-model="form.items[index].min" /></el-col>
            <el-col class="group3 line" :span="1">-</el-col>
            <el-col class="group3" :span="4"><el-input v-model="form.items[index].max" /></el-col>
          </template>
          <template v-else>
            <el-col class="group3" :span="4"><el-input v-model="form.items[index].min" /></el-col>
          </template>
          <el-col class="group4" :span="3"><el-input v-model="form.items[index].ratio" placeholder="赠送比例" /></el-col>
          <el-col class="group5" :span="1"><i v-if="index === form.items.length-1" class="el-icon-circle-plus" @click="handleRuleItemAppendClick" /></el-col>
        </el-row>
      </el-form-item>
    </template>
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
      rows: 1,

      options4: [{
        code: '1',
        name: 'TRX'
      }, {
        code: '2',
        name: 'USDT'
      }],

      loading: false,
      userListOptions: [],
      dialogVisible: true,
      rules: {
        username: [{ validator: validateRequire }]
      },
      cycle: [],
      calcMode: [],
      receiveMode: [],
      limitItem: [],
      ruleItemType: [],
      symbal: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      // 规则周期
      let res = await api.activity.findRuleCycle({})
      if (res && res.code === 0) {
        this.cycle = res.data
      }

      // 计算模式
      res = await api.activity.findCalcMode({})
      if (res && res.code === 0) {
        this.calcMode = res.data
      }

      // 计算模式
      res = await api.activity.findReceiveMode({})
      if (res && res.code === 0) {
        this.receiveMode = res.data
      }

      // 限制项
      res = await api.activity.findLimitItem({})
      if (res && res.code === 0) {
        this.limitItem = res.data
      }

      // 规则项类型
      res = await api.activity.findRuleItemType({})
      if (res && res.code === 0) {
        this.ruleItemType = res.data
      }

      // 规则项类型
      res = await api.site.symbol({})
      if (res && res.code === 0) {
        this.symbal = res.data
      }

      this.handleRuleItemAppendClick()
    },
    handleCycleChange() {
      console.log(this.form)
    },

    async fetch() {
      const res = api.member.get({ id: this.id })
      if (res && res.code === 0) {
        this.form = res.data
      }
    },
    // 规则项添加点击事件
    handleRuleItemAppendClick() {
      this.form.items.push({
        type: 1,
        min: '',
        max: '',
        ratio: ''
      })
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
