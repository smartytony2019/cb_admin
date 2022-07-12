<!--
  注单列表
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
          prop="username"
          :label="$t('bet.lottery.table.username')"
        />
        <el-table-column
          prop="cateNameCode"
          :label="$t('bet.lottery.table.cateNameCode')"
        />
        <el-table-column
          prop="gameNameCode"
          :label="$t('bet.lottery.table.gameNameCode')"
        />
        <el-table-column
          prop="playNameCode"
          :label="$t('bet.lottery.table.playNameCode')"
        />
        <el-table-column
          prop="playCodeNameCode"
          :label="$t('bet.lottery.table.playCodeNameCode')"
        />
        <el-table-column
          prop="hashResult"
          :label="$t('bet.lottery.table.hashResult')"
        >
          <template slot-scope="scope">
            <a style="color: #409eff;">{{ scope.row.hashResult && scope.row.hashResult.substr(-6, 6) }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="num"
          :label="$t('bet.lottery.table.num')"
        />
        <el-table-column
          prop="odds"
          :label="$t('bet.lottery.table.odds')"
        />
        <el-table-column
          prop="money"
          :label="$t('bet.lottery.table.money')"
        />
        <el-table-column
          prop="profitMoney"
          :label="$t('bet.lottery.table.profitMoney')"
        />
        <el-table-column
          prop="payoutMoney"
          :label="$t('bet.lottery.table.payoutMoney')"
        />
        <el-table-column
          prop="createTime"
          :label="$t('bet.lottery.table.createTime')"
          min-width="110"
        />
        <el-table-column
          prop="updateTime"
          :label="$t('bet.lottery.table.updateTime')"
          min-width="110"
        />
        <el-table-column
          prop="status"
          :label="$t('bet.lottery.table.status')"
        />

        <!-- <el-table-column align="center" :label="$t('member.list.table.operate')" min-width="120">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="createOrUpdate(scope.row.id)">
              {{ $t('button.edit') }}
            </el-button>
            <el-button type="success" size="mini" @click="createOrUpdate(scope.row.id)">
              {{ $t('button.delete') }}
            </el-button>
          </template>
        </el-table-column> -->
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
      api.bet.draw(this.params).then(response => {
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
    },
    formatter(row, colum, cellValue) {
      return cellValue.substr(-6, 6)
    }
  }
}
</script>
