<!--
@Author:      tony
@Date:        2019-01-04T10:00:00+08:00
@Description: 会员记录
-->
<template>
  <div class="app-container">
    <!-- 搜索框 - start -->
    <el-form ref="form" :model="params" :inline="true" size="mini">
      <el-form-item>
        <el-input v-model="params.username" placeholder="请输入会员名" />
      </el-form-item>

      <el-form-item>
        <el-select v-model="params.item" placeholder="类型">
          <el-option
            v-for="item in type"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-select v-model="params.timeType" placeholder="时间类型 ">
          <el-option
            v-for="item in timeType"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        -
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
      </el-form-item>
    </el-form>
    <!-- 搜索框 - end -->

    <!-- 列表 - start -->
    <template>
      <el-table :data="list" style="width: 100%" size="mini">
        <el-table-column prop="username" label="会员名" />
        <el-table-column prop="domain" label="域名" />
        <el-table-column prop="device" label="设备" />
        <el-table-column prop="regIp" label="注册ip" />
        <el-table-column prop="regTime" label="注册时间" />
        <el-table-column prop="loginIp" label="登录ip" />
        <el-table-column prop="loginTime" label="登录时间" />
        <el-table-column prop="type" label="类型" />
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
        end: '',
        item: ''
      },
      type: [],
      timeType: [
        {
          id: 1,
          name: '注册时间'
        },
        {
          id: 2,
          name: '登录时间'
        }
      ]
    }
  },
  watch: {
    '$i18n.locale'(newValue) {
      this.fetch()
    }
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      // 类型
      const res = await api.member.findByRecordType(this.params)
      console.log(res)
      if (res && res.code === 0) {
        this.type = res.data
      }

      this.fetch()
    },
    async fetch() {
      const res = await api.member.findRecordPage(this.params)
      if (res && res.code === 0) {
        this.list = res.data.records
        this.total = res.data.total
      }
    }
  }
}
</script>
