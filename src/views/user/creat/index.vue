<template>
  <div class="register-container">
    <div class="register-text">用户注册</div>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="form.password_1"
          :type="passwordType"
        />
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input
          v-model="form.password_2"
          :type="passwordType"
        />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">注册</el-button>
        <el-button @click="onCancel">回到首页</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {createProgramList} from "@/api/program";
import {createUser} from "@/api/user";

export default {
  data() {
    return {
      form: {
        name: '',
        password_1: '',
        password_2: '',
        email: '',
      },
      passwordType: 'password',
    }
  },
  methods: {
    onSubmit() {
      if (!this.comparePasswords()) {
        this.$message.error('两次输入的密码不一致！');
      } else if (!this.validForm()) {
        this.$message.error('还有未填写的信息！');
      } else {
        const {name, password_1, password_2, email} = this.form;
        const data = {username:name, password:password_1, email};
        createUser(data).then(response => {
          this.$message({
            type: 'success',
            message: '注册信息已提交!',
            duration: 4 * 1000
          })
          setTimeout(() => {
            this.$router.push('/');
          },3 * 1000)

          setTimeout(() =>{
            this.$notify({
              title: '提示',
              message: '请查看邮箱并根据邮件指引激活账号！',
              duration: 10 * 1000
            });
          },3 * 1000)
        }).catch(error => {
          console.log('error：', error)
        });}
    },
    onCancel() {
      this.$router.push({ path: '/' })
    },
    comparePasswords() {
      return (this.form.password_1 === this.form.password_2);
    },
    validForm() {
      return Object.values(this.form).every(value => value !== "")
    },
  }
}
</script>

<style lang="scss" scoped>
.line{
  text-align: center;
}

.register {
  &-container {
    width: 620px;
    max-width: 100%;
    margin: 30px;
  }
  &-text {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

