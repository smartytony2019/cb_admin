<!--
@Author:      tony
@Date:        2019-01-04T10:00:00+08:00
@Description: 代理佣金记录
-->
<template>
  <div class="app-container">
    <!-- 搜索框 - start -->
    <el-form ref="form" :model="params" :inline="true" size="mini">
      <el-form-item>
        <el-input v-model="params.username" :placeholder="用户名" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetch">搜索</el-button>
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
          prop="sn"
          label="序号"
          align="center"
        />
        <el-table-column
          prop="money"
          label="佣金"
          align="center"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
        />
        <el-table-column
          prop="status"
          label="状态"
          align="center"
        />

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
      const res = await api.agent.findCommissionRecordPage(this.params)
      if (res && res.code === 0) {
        this.list = res.data.records
        this.total = res.data.total
      }
    }
  }
}
</script>
