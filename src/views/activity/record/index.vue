<!--
@Author:      tony
@Date:        2019-01-04T10:00:00+08:00
@Description: 活动规则
-->
<template>
  <div class="app-container">
    <!-- 搜索框 - start -->
    <div class="page-search">
      <span>搜索:</span>
      <el-form ref="form" :model="params" :inline="true" size="mini">
        <el-form-item>
          <el-select v-model="params.cateCode" clearable placeholder="类目">
            <el-option
              v-for="item in cate"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-select v-model="params.type" clearable placeholder="类型">
            <el-option
              v-for="item in type"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            />
          </el-select>
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
      >
        <el-table-column
          prop="activityTitle"
          label="标题"
          align="center"
        />
        <el-table-column
          prop="username"
          label="用户名"
          align="center"
        />
        <el-table-column
          prop="money"
          label="创建时间"
          align="center"
        />
        <el-table-column
          prop="symbol"
          label="赠送币种"
          align="center"
        />
        <el-table-column
          prop="status"
          label="状态"
          align="center"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
        />

        <el-table-column align="center" :label="$t('member.list.table.operate')">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="$router.push({path:'/activity/operate?id='+scope.row.id})">编辑</el-button>
            <el-button type="success" size="mini" @click="del(scope.row.sn)">删除</el-button>
          </template>
        </el-table-column></el-table>
    </template>
    <!-- 列表 - end -->

    <!-- 分页 - start -->
    <pagination v-show="total>0" :total="total" :page.sync="params.current" :limit.sync="params.size" @pagination="fetch" />
    <!-- 分页 - end -->

  </div>
</template>

<script>
/* eslint-disable */
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
        cateCode: '',
        type: '',
        start: '',
        end: ''
      },

      cate: [],
      type: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    /**
     * 初始化数据
     */
    async init() {
      let res = null
      // 类目
      res = await api.activity.findCate({})
      if (res && res.code === 0) {
        this.cate = res.data.filter(f => f.code > 0)
      }

      // 类型
      res = await api.activity.findType({})
      if (res && res.code === 0) {
        this.type = res.data
      }

      this.fetch()
    },

    /**
     * 获取数据
     */
    async fetch() {
      const res = await api.activityRecord.findPage(this.params)
      this.list = res.data.records
      this.total = res.data.total
    },

    /**
     * 删除
     * @param {String} sn 编号
     */
    async del(sn) {
      const cb = async() => {
        const res = await api.activity.del({ sn })
        if (res && res.code === 0) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.fetch()
        } else {
          this.$message({
            type: 'warning',
            message: '删除失败!'
          })
        }
      }

      this.$confirm('确定要删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(cb).catch(() => {})
    },

    /**
     * 格式化
     * @param {Array} arr 数组数据
     * @param {Integer} code 编码
     */
    formatter(arr, code) {
      let result = "";
      for(let i=0; i<arr.length; i++) {
        if(arr[i].code === code) {
          result = arr[i].name
          break
        }
      }
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
</style>