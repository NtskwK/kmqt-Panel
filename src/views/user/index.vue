<template>
  <div class="app-container">
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-size="params.page_size"
        layout="total, prev, pager, next, jumper"
        :total="total"
        hide-on-single-page="true">
      </el-pagination>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上次活动时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.last_login }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.date_joined }}
        </template>
      </el-table-column>
      <el-table-column label="是否删除" align="center">
        <template slot-scope="scope">
          {{ scope.row.is_delete ? "已删除" : "未删除" }}
        </template>
      </el-table-column>
<!--      <el-table-column class-name="status-col" label="Status" width="110" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column align="center" prop="created_at" label="Display_time" width="200">-->
<!--        <template slot-scope="scope">-->
<!--          <i class="el-icon-time" />-->
<!--          <span>{{ scope.row.display_time }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
  </div>
</template>

<script>
// import { getProgramList } from '@/api/table'
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
      list: null,
      listLoading: true,
      params: {
        'page': 1,
        'page_size': 5
      },
      total: 0,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleSizeChange(val) {
      this.params.page_size = val;
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.fetchData()
    },

    fetchData() {
      this.listLoading = true
      getUserList(this.params).then(response => {
      // getMemberList().then(response => {
        this.list = response.data.results
        this.listLoading = false
        this.total = response.data.count
      }).catch(error => {
        // 处理异常，例如显示错误信息
        console.error('发生异常：', error)
        // 其他异常处理逻辑
      });
    }
  }
}
</script>
