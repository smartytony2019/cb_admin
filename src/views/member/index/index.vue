<!--
@Author:      tony
@Date:        2019-01-04T10:00:00+08:00
@Description: 会员列表
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
        <el-button type="info" @click="handleAdd">{{ $t('button.add') }}</el-button>
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
          prop="depositWallet"
          label="存款钱包"
          align="center"
        />
        <el-table-column
          prop="withdrawWallet"
          label="提款钱包"
          align="center"
        />
        <el-table-column
          prop="money"
          label="金额"
          align="center"
        />
        <el-table-column
          prop="type"
          label="类型"
          align="center"
        >
          <template slot-scope="scope">
            {{ formatter(type, scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column
          prop="isEnable"
          label="状态"
          align="center"
        >
          <template slot-scope="scope">
            <el-button v-if="scope.row.isEnable" size="mini" type="success" icon="el-icon-check" circle />
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
        current: 1,
        size: 10,
        username: '',
        start: '',
        end: ''
      },
      type: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      const res = await api.member.findByType()
      if (res && res.code === 0) {
        this.type = res.data
      }
      this.fetch()
    },
    async fetch() {
      const res = await api.member.findPage(this.params)
      if (res && res.code === 0) {
        this.list = res.data.records
        this.total = res.data.total
      }
    },
    handleAdd() {

    },
    formatter(arr, code) {
      let result = ''
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].code === code) {
          result = arr[i].name
          break
        }
      }
      return result
    }
  }
}
</script>
