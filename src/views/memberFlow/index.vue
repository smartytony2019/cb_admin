<template>
  <div class="app-container">
    <!-- 搜索框 - start -->
    <el-form ref="form" :model="params" :inline="true" size="mini">
      <el-form-item :label="$t('form.username')">
        <el-input v-model="params.username" :placeholder="$t('placeholder.username')" />
      </el-form-item>
      <el-form-item :label="$t('form.username')">
        <el-date-picker
          v-model="value2"
          type="date"
          :placeholder="$t('placeholder.datePicker')"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ $t('button.search') }}</el-button>
      </el-form-item>
    </el-form>
    <!-- 搜索框 - end -->

    <!-- 列表 - start -->
    <template>
      <el-table
        :data="list"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          :label="$t('member.list.table.id')"
          width="180"
        />
        <el-table-column
          prop="username"
          :label="$t('member.list.table.username')"
          width="180"
        />
        <el-table-column
          prop="avatar"
          :label="$t('member.list.table.avatar')"
        />

        <el-table-column align="center" label="Actions" min-width="80">
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

      <!-- 分页 - start -->
      <pagination v-show="total>0" :total="total" :page.sync="params.current" :limit.sync="params.size" @pagination="fetchData" />
      <!-- 分页 - end -->

    </template>
    <!-- 列表 - end -->

    <!-- 弹框(添加/修改) - start -->
    <el-dialog v-if="dialogCreateOrUpdateVisible" :title="$t('global.operation')" :visible.sync="dialogCreateOrUpdateVisible">
      <create-or-update :id="id" />
    </el-dialog>
    <!-- 弹框(添加/修改) - end -->
  </div>
</template>

<script>
import api from '@/api/user'
import CreateOrUpdate from './components/CreateOrUpdate'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination, CreateOrUpdate },
  data() {
    return {
      id: 0,
      dialogCreateOrUpdateVisible: false,
      total: 0,
      list: null,
      listLoading: true,
      params: {
        current: 1,
        size: 10,
        username: '',
        region: ''
      },
      value2: ''
    }
  },
  created() {
    this.fetchData()
    console.log(this.$i18n.locale)
  },
  methods: {
    fetchData() {
      this.listLoading = true
      api.getList(this.params).then(response => {
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
      this.dialogCreateOrUpdateVisible = true
      this.id = id
      console.log(id)
    }
  }
}
</script>
