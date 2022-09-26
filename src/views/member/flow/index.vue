<!--
@Author:      tony
@Date:        2019-01-04T10:00:00+08:00
@Description: 会员流水
-->
<template>
  <div class="app-container">
    <!-- 搜索框 - start -->
    <el-form ref="form" :model="params" :inline="true" size="mini">
      <el-form-item>
        <el-input v-model="params.username" :placeholder="$t('placeholder.username')" />
      </el-form-item>

      <el-form-item>
        <el-select v-model="params.item" placeholder="帐变项">
          <el-option
            v-for="item in items"
            :key="item.code"
            :label="item.name"
            :value="item.code"
          />
        </el-select>
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
      </el-form-item>
    </el-form>
    <!-- 搜索框 - end -->

    <!-- 列表 - start -->
    <template>
      <el-table :data="list" style="width: 100%" size="mini">
        <el-table-column prop="username" label="会员名" />
        <el-table-column prop="beforeMoney" label="帐变前金额" />
        <el-table-column prop="afterMoney" label="帐变后金额" />
        <el-table-column prop="flowMoney" label="帐变金额" />
        <el-table-column prop="item" label="帐变项" />
        <el-table-column prop="createTime" label="帐变时间" />
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
      items: []
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
      const res = await api.member.findByFlowItem(this.params)
      if (res && res.code === 0) {
        this.items = res.data
      }

      this.fetch()
    },
    async fetch() {
      const res = await api.member.findFlowPage(this.params)
      if (res && res.code === 0) {
        this.list = res.data.records
        this.total = res.data.total
      }
    }
  }
}
</script>
