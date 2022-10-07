<!--
@Author:      tony
@Date:        2022-10-07T10:00:00+08:00
@Description: 财务管理
-->
<template>
  <div class="app-container">
    <!-- 搜索框 - start -->
    <el-form ref="form" :model="params" :inline="true" size="mini">
      <el-form-item>
        <el-input v-model="params.username" :placeholder="$t('placeholder.username')" />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="params.start"
          type="date"
          :placeholder="$t('placeholder.dateRange.start')"
          size="mini"
        />
        -
        <el-date-picker
          v-model="params.end"
          type="date"
          :placeholder="$t('placeholder.dateRange.end')"
          size="mini"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetch">{{ $t('button.search') }}</el-button>
        <el-button type="info" @click="onSubmit">{{ $t('button.add') }}</el-button>
      </el-form-item>
    </el-form>
    <!-- 搜索框 - end -->

    <!-- 列表 - start -->
    <template>
      <el-table
        :data="list"
        style="width: 100%"
        size="mini"
      >
        <el-table-column prop="username" label="会员名" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="symbol" label="币种" />
        <el-table-column prop="fromAddress" label="转帐地址" />
        <el-table-column prop="toAddress" label="收帐地址" />
        <el-table-column prop="transactionId" label="转帐Id" />
        <el-table-column prop="blockTime" label="转帐时间" />
      </el-table>
    </template>
    <!-- 列表 - end -->

    <!-- 分页 - start -->
    <pagination v-show="total>0" :total="total" :page.sync="params.current" :limit.sync="params.size" @pagination="fetch" />
    <!-- 分页 - end -->
  </div>
</template>

<script>
import api from '@/api/index'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  data() {
    return {
      id: 0,
      dialogVisible: false,
      total: 0,
      list: null,
      listLoading: true,
      params: {
        current: 1,
        size: 10,
        username: '',
        start: '',
        end: ''
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.fetch()
    },
    async fetch() {
      console.log(222)
      const res = await api.finance.findPage(this.params)
      if (res && res.code === 0) {
        this.list = res.data.records
        this.total = res.data.total
      }
    },
    onSubmit() {
      console.log(111)
    },
    createOrUpdate(id) {
      this.dialogVisible = true
      this.id = id
      console.log(id)
    }
  }
}
</script>
