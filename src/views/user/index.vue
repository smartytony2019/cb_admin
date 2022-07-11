<template>
  <div class="app-container">
    <el-form ref="form" :model="params" :inline="true" size="mini">
      <el-form-item :label="$t('form.username')">
        <el-input v-model="params.username" :placeholder="$t('placeholder.username')" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{ $t('form.search') }}</el-button>
      </el-form-item>
    </el-form>
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
      </el-table>
      <div class="paginationClass" style="float:right">
        <el-pagination
          :current-page="params.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="params.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { getUserList } from '@/api/user'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      total: 0,
      list: null,
      listLoading: true,
      params: {
        current: 1,
        size: 10,
        username: '',
        region: ''
      }
    }
  },
  created() {
    this.fetchData()
    console.log(this.$i18n.locale)
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getUserList(this.params).then(response => {
        console.log(response)
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    switchLanguage(language) {
      this.$store.dispatch('app/setLanguage', language)
      window.location.reload()
    },
    onSubmit() {
      console.log(111)
    },
    handleSizeChange(val) {
      this.params.size = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.params.current = val
      this.fetchData()
    }
  }
}
</script>
