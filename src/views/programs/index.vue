<template>
  <div class="app-container">
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.page"
        :page-size="params.page_size"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-table
      :data="listData"
      v-loading="listLoading"
      element-loading-text="加载中"
      fit
      border
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="60">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="300">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        width="300">
        <template #default="{ row }">
          {{ formatDateTime(row.create_time) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="update_time"
        label="上次活动时间"
        width="300">
        <template #default="{ row }">
          {{ formatDateTime(row.update_time) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="is_delete"
        label="是否删除"
        width="100">
        <template #default="{ row }">
          <span v-if="row.is_delete">已删除</span>
          <span v-else>未删除</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="100">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="300"
        align="center">
        <template v-slot="scope" >
          <el-button @click="dialogFormVisible = true;programForm=scope.row" type="primary" size="small">编辑</el-button>
          <el-button @click="deleteClick(scope.row)" type="danger" size="small" v-if="!scope.row.is_delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="编辑项目" :visible.sync="dialogFormVisible">
      <el-form :model="programForm" status-icon ref="programFrom" class="demo-programFrom">
        <el-form-item label="ID" prop="id">
          <el-input type="text" v-model="programForm.id" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="项目名称" prop="name">
          <el-input type="text" v-model="programForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input type="text" v-model="programForm.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;updateClick(programForm.id)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { getProgramList,updateProgram,deleteProgramList } from "@/api/program";


export default {

  data() {
    return {
      listData: null,
      listLoading: true,
      dialogFormVisible: false,
      programForm: {
        id: '',
        name: '',
        description: ''
      },
      params: {
        'page': 1,
        'page_size': 5
      },
      total: 0,
    }
  },

  created() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      this.listLoading = true;
      getProgramList(this.params).then(response =>{
        this.listData = response.data.results;
        this.listLoading = false;
        this.total = response.data.count;
      },);
    },

    handleSizeChange(val) {
      this.params.page_size = val;
      this.fetchData()
    },
    handleCurrentChange(val) {
      this.params.page = val;
      this.fetchData()
    },

    deleteClick(row) {
      this.$confirm('是否删除 “' + row.name + '” ?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });

        deleteProgramList(row.id).then(response => {
          this.fetchData();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },

    updateClick(program_id) {
      updateProgram(program_id, this.programForm).then(response => {
        this.fetchData();
      })
    }
  },

  computed: {
    formatDateTime() {
      return function (dateTimeString) {
        const dateObject = new Date(dateTimeString);
        return `${dateObject.getFullYear()}-${dateObject.getMonth() + 1}-${dateObject.getDate()} ${dateObject.getHours()}:${dateObject.getMinutes()}:${dateObject.getSeconds()}`;
      };
    }
  }
}
</script>

<style scoped lang="scss">

</style>
