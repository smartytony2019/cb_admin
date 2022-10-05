<template>
  <div class="app-container">
    <!-- 列表 - start -->
    <template>
      <el-table
        :data="list"
        style="width: 100%"
        size="mini"
      >
        <el-table-column
          prop="id"
          label="id"
        />
        <el-table-column
          prop="name"
          label="名称"
        />
        <el-table-column
          prop="sort"
          label="排序"
        />

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
    this.init()
  },
  methods: {
    async init() {
      this.fetch()
    },
    async fetch() {
      const res = await api.game.findCategory(this.params)
      if (res && res.code === 0) {
        this.list = res.data
      }
    }
  }
}
</script>
