<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="项目名称">
        <el-input v-model="form.name" />
      </el-form-item>
<!--      <el-form-item label="Activity zone">-->
<!--        <el-select v-model="form.region" placeholder="please select your zone">-->
<!--          <el-option label="Zone one" value="shanghai" />-->
<!--          <el-option label="Zone two" value="beijing" />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="Activity time">-->
<!--        <el-col :span="11">-->
<!--          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%;" />-->
<!--        </el-col>-->
<!--        <el-col :span="2" class="line">-</el-col>-->
<!--        <el-col :span="11">-->
<!--          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%;" />-->
<!--        </el-col>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="Instant delivery">-->
<!--        <el-switch v-model="form.delivery" />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="Activity type">-->
<!--        <el-checkbox-group v-model="form.type">-->
<!--          <el-checkbox label="Online activities" name="type" />-->
<!--          <el-checkbox label="Promotion activities" name="type" />-->
<!--          <el-checkbox label="Offline activities" name="type" />-->
<!--          <el-checkbox label="Simple brand exposure" name="type" />-->
<!--        </el-checkbox-group>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="Resources">-->
<!--        <el-radio-group v-model="form.resource">-->
<!--          <el-radio label="Sponsor" />-->
<!--          <el-radio label="Venue" />-->
<!--        </el-radio-group>-->
<!--      </el-form-item>-->
      <el-form-item label="Activity form">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import {createProgramList} from "@/api/program";

export default {
  data() {
    return {
      form: {
        name: '',
        description: '',
      }
    }
  },
  methods: {
    onSubmit() {
      createProgramList(this.form).then(response => {
        this.$message('已创建!');
        console.log(this.form);
        this.$router.push('/programs/index');
      }).catch(error => {
        // 处理异常，例如显示错误信息
        console.error('发生异常：', error)
        // 其他异常处理逻辑
      });

    },
    onCancel() {
      this.$message({
        message: '取消创建!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

