<!--
@Author:      tony
@Date:        2019-01-04T10:00:00+08:00
@Description: 注单列表
-->
<template>
  <div class="app-container">
    <!-- 搜索框 - start -->
    <div class="page-search">
      <span>搜索:</span>
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
          <el-button type="primary" @click="fetch">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 搜索框 - end -->

    <!-- 列表 - start -->
    <template>
      <el-table
        :data="list"
        style="width: 100%"
        size="mini"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          prop="username"
          label="会员名"
          align="center"
        />
        <el-table-column
          prop="cateName"
          label="类目"
          align="center"
        />
        <el-table-column
          prop="gameName"
          label="彩种"
          align="center"
        />
        <el-table-column
          prop="playName"
          label="玩法"
          align="center"
        />
        <el-table-column
          prop="content"
          label="内容"
          align="center"
        />
        <el-table-column
          prop="blockHash"
          label="开奖"
          align="center"
        >
          <template slot-scope="scope">
            <a style="color: #409eff;">{{ scope.row.blockHash && scope.row.blockHash.substr(-6, 6) }}</a>
          </template>
        </el-table-column>
        <el-table-column
          prop="result"
          label="结果"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.result===1" :class="{blue:scope.row.result===1}">{{ formatter(result, scope.row.result) }}</span>
            <span v-if="scope.row.result===2" :class="{red:scope.row.result===2}">{{ formatter(result, scope.row.result) }}</span>
            <span v-if="scope.row.result===3" :class="{normal:scope.row.result===3}">{{ formatter(result, scope.row.result) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="odds"
          label="赔率"
          align="center"
        />
        <el-table-column
          prop="money"
          label="单注金额"
          align="center"
        />
        <el-table-column
          prop="moneyAmount"
          label="单注总额"
          align="center"
        />
        <el-table-column
          prop="profitMoney"
          label="盈利"
          align="center"
        />
        <el-table-column
          prop="payoutMoney"
          label="派彩"
          align="center"
        />
        <el-table-column
          prop="createTime"
          label="下注时间"
          min-width="110"
          align="center"
        />
        <el-table-column
          prop="updateTime"
          label="更新时间"
          min-width="110"
          align="center"
        />
        <el-table-column
          prop="status"
          label="状态"
          align="center"
        >
          <template slot-scope="scope">
            {{ formatter(status, scope.row.status) }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" min-width="120">
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
    <pagination v-show="total>0" :total="total" :page.sync="params.current" :limit.sync="params.size" @pagination="fetch" />
    <!-- 分页 - end -->

  </div>
</template>

<script>
import api from '@/api'
import Pagination from '@/components/Pagination'

export default {
  components: { Pagination },
  data() {
    return {
      id: 0,
      dialogVisible: false,
      total: 0,
      list: null,
      params: {
        current: 1,
        size: 10,
        username: '',
        start: '',
        end: ''
      },
      status: [],
      result: []
    }
  },
  // watch: {
  //   '$i18n.locale'(newValue) {
  //     this.fetchData()
  //   }
  // },
  created() {
    this.init()
  },
  methods: {
    async init() {
      let res = await api.hash.findBetStatus({})
      if (res && res.code === 0) {
        this.status = res.data
      }

      res = await api.hash.findBetResult({})
      if (res && res.code === 0) {
        this.result = res.data
      }

      this.fetch()
    },
    fetch() {
      api.hash.findBetPage(this.params).then(response => {
        this.list = response.data.records
        this.total = response.data.total
      })
    },
    onSubmit() {
      console.log(111)
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.result === 2) {
        return 'success-row'
      }
      if (row.result === 3) {
        return 'warning-row'
      }
    },
    formatter(arr, item) {
      let res = ''
      for (let i = 0; i < arr.length; i++) {
        const e = arr[i]
        if (e.code === item) {
          res = e.name
          break
        }
      }
      return res
    }
  }
}
</script>
