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
        <el-table-column
          prop="id"
          :label="$t('member.list.table.id')"
        />
        <el-table-column
          prop="username"
          :label="$t('member.list.table.username')"
        />
        <el-table-column
          prop="money"
          :label="$t('member.list.table.money')"
        />
        <el-table-column
          prop="createTime"
          :label="$t('member.list.table.createTime')"
        />

        <el-table-column align="center" :label="$t('member.list.table.operate')">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="createOrUpdate(scope.row.id)">
              {{ $t('button.edit') }}
            </el-button>
            <el-button type="success" size="mini" @click="createOrUpdate(scope.row.id)">
              {{ $t('button.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 列表 - end -->

    <!-- 分页 - start -->
    <pagination v-show="total>0" :total="total" :page.sync="params.current" :limit.sync="params.size" @pagination="fetchData" />
    <!-- 分页 - end -->

    <!-- 弹框(添加/修改) - start -->
    <el-dialog v-if="dialogVisible" :title="$t('global.operation')" :visible.sync="dialogVisible">
      <create-or-update :id="id" @cancel="dialogVisible = false"/>
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
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.member.getList(this.params).then(response => {
        console.log(response)
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
