<template>
  <div class="app-container system-config">
    <el-tabs v-model="activeName" :tab-position="tabPosition">
      <el-tab-pane v-for="(item,index) in cate" :key="index" :label="item.name" :name="item.code+''">
        <div class="item-list">
          <div v-for="(it, idx) in items" :key="idx" class="item">
            <div class="title">
              {{ it.comment }}：
            </div>

            <div class="content">
              <template v-if="it.type === 'Boolean'">
                <el-switch
                  v-model="it.value"
                  active-color="#13ce66"
                  inactive-color="#dcdfe6"
                  active-text="开启"
                  inactive-text="关闭"
                />
              </template>
              <template v-if="it.type === 'String'">
                <el-input v-model="it.value" />
              </template>
              <template v-if="it.type === 'Integer'">
                <el-input v-model="it.value" />
              </template>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <div class="btn">
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </div>
  </div>

</template>

<script>
import api from '@/api/index'

export default {
  data() {
    return {
      tabPosition: 'left',
      activeName: '1',
      list: null,
      cate: null,
      params: {
        current: 1,
        size: 10,
        username: '',
        start: '',
        end: ''
      }
    }
  },
  computed: {
    items() {
      return this.list.filter(f => f.cate === Number(this.activeName))
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const res = await api.site.config(this.params)
      if (res && res.code === 0) {
        res.data.list.map(m => {
          if (m.type === 'Boolean') {
            m.value = m.value === 'true'
          }

          if (m.type === 'Integer') {
            m.value = Number(m.value)
          }
        })
        this.list = res.data.list
        this.cate = res.data.cate
      }
    },
    handleSubmit() {
      console.log(this.list)
    }
  }
}
</script>

<style lang="scss" scoped>
.system-config {
  .btn {
    display: flex;
    justify-content: center;
  }
  .item-list {
    display:flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding:10px 20px;

    .item {
      width:30%;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding:10px 0;
      height:45px;
      .title {
        padding-right: 5px;
      }
    }
  }

  ::v-deep input {
    height:30px;
  }
}

</style>
