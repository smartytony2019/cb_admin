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
        <el-table-column
          prop="name"
          label="名称"
        />
        <el-table-column
          prop="odds"
          label="赔率"
        />
        <el-table-column align="center" :label="$t('member.list.table.operate')">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="createOrUpdate(scope.row.id)">
              修改
            </el-button>
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
      params: {
        gameId: 0,
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
      const res = await api.hash.findOdds(this.params)
      if (res && res.code === 0) {
        this.list = res.data
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
