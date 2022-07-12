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
        <el-button type="primary" @click="fetchData">{{ $t('button.search') }}</el-button>
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
        <el-table-column prop="username" :label="$t('member.flow.table.username')" />
        <el-table-column prop="beforeMoney" :label="$t('member.flow.table.beforeMoney')" />
        <el-table-column prop="afterMoney" :label="$t('member.flow.table.afterMoney')" />
        <el-table-column prop="flowMoney" :label="$t('member.flow.table.flowMoney')" />
        <el-table-column prop="itemCodeDefault" :label="$t('member.flow.table.item')" />
        <el-table-column prop="createTime" :label="$t('member.flow.table.createTime')" />
      </el-table>
    </template>
    <!-- 列表 - end -->

    <!-- 分页 - start -->
    <pagination v-show="total>0" :total="total" :page.sync="params.current" :limit.sync="params.size" @pagination="fetchData" />
    <!-- 分页 - end -->

    <!-- 弹框(添加/修改) - start -->
    <el-dialog v-if="dialogVisible" :title="$t('global.operation')" :visible.sync="dialogVisible">
      <create-or-update :id="id" @cancel="dialogVisible = false" />
    </el-dialog>
    <!-- 弹框(添加/修改) - end -->
  </div>
</template>

<script>
import api from '@/api/index'
import CreateOrUpdate from './components/CreateOrUpdate'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination, CreateOrUpdate },
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
  watch: {
    '$i18n.locale'(newValue) {
      this.fetchData()
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.memberFlow.getList(this.params).then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
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
