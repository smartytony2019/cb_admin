<!--
@Author:      tony
@Date:        2019-01-04T10:00:00+08:00
@Description: 代理佣金
-->
<template>
  <div class="app-container">
    <!-- 搜索框 - start -->
    <el-form ref="form" :model="params" :inline="true" size="mini">
      <el-form-item>
        <el-input v-model="params.username" :placeholder="用户名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
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
        <el-table-column
          prop="username"
          label="用户名"
          align="center"
        />
        <el-table-column
          prop="totalCommission"
          label="总佣金"
          align="center"
        />
        <el-table-column
          prop="totalPerformance"
          label="总业绩"
          align="center"
        />
        <el-table-column
          prop="selfCommission"
          label="自营佣金"
          align="center"
        />
        <el-table-column
          prop="selfPerformance"
          label="自营业绩"
          align="center"
        />
        <el-table-column
          prop="teamPerformance"
          label="团队业绩"
          align="center"
        />
        <el-table-column
          prop="teamCount"
          label="团队人数"
          align="center"
        />
        <el-table-column
          prop="directPerformance"
          label="直属业绩"
          align="center"
        />
        <el-table-column
          prop="directCount"
          label="直属人数"
          align="center"
        />
        <el-table-column
          prop="subPerformance"
          label="下属业绩"
          align="center"
        />
        <el-table-column
          prop="rebate"
          label="返佣比"
          align="center"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
        />
        <el-table-column
          prop="isAccount"
          label="是否入帐"
          align="center"
        >
          <template slot-scope="scope">
            <el-button v-if="scope.row.isAccount" size="mini" type="success" icon="el-icon-check" circle />
            <el-button v-else size="mini" type="danger" icon="el-icon-close" circle />
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
      total: 0,
      list: null,
      listLoading: true,
      params: {
        level: 0,
        child: '',
        puid: 0,
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
      const res = await api.agent.findCommissionPage(this.params)
      if (res && res.code === 0) {
        this.list = res.data.records
        this.total = res.data.total
      }
    },
    handleSearch() {
      this.params.level = 0
      this.params.puid = 0
      this.params.child = ''
      this.fetch()
    },
    handleChild(flag, row) {
      this.params.level = row.level
      // 查看上级
      if (flag === 0) {
        this.params.puid = row.puid
        this.params.child = ''
        this.fetch()
      }

      // 查看下级
      if (flag === 1) {
        this.params.puid = 0
        this.params.child = row.child
        this.fetch()
      }
    }
  }
}
</script>
