<!--
@Author:      tony
@Date:        2022-10-07T10:00:00+08:00
@Description: 打码审计
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
        <el-table-column prop="sn" label="订单号" />
        <el-table-column prop="amount" label="打码量" />
        <el-table-column prop="beforeAmount" label="之前打码量" />
        <el-table-column prop="requireAmount" label="要求打码量" />
        <el-table-column prop="finishAmount" label="完成打码量" />
        <el-table-column prop="status" label="状态" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="updateTime" label="更新时间" />
        <el-table-column align="center" :label="$t('member.list.table.operate')">
          <template slot-scope="scope">
            <el-button type="warning" size="mini" @click="$router.push({path:'/activity/rule?id='+scope.row.id})">标记完成</el-button>
          </template>
        </el-table-column>
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
      const res = await api.finance.findAuditPage(this.params)
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
