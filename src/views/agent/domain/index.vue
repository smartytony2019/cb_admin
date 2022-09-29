<!--
@Author:      tony
@Date:        2019-01-04T10:00:00+08:00
@Description: 推广域名
-->
<template>
  <div class="app-container">
    <!-- 搜索框 - start -->
    <el-form ref="form" :model="params" :inline="true" size="mini">
      <el-form-item>
        <el-input v-model="params.username" :placeholder="$t('placeholder.username')" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetch">搜索</el-button>
        <el-button type="info" @click="$router.push({path:'/agent/domain/operate'})">添加</el-button>
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
        />
        <el-table-column
          prop="domain"
          label="域名"
        />
        <el-table-column
          prop="enable"
          label="是否启用"
        >
          <template slot-scope="scope">
            <el-button v-if="scope.row.enable" size="mini" type="success" icon="el-icon-check" circle />
            <el-button v-else size="mini" type="danger" icon="el-icon-close" circle />
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 列表 - end -->

  </div>
</template>

<script>
import api from '@/api/index'

export default {
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
      const res = await api.agent.findDomain(this.params)
      if (res && res.code === 0) {
        this.list = res.data
      }
    }
  }
}
</script>
