<template>
  <div class="activated-container">
    <div class="activated-title">检查状态: {{ message }}</div>
    <div class="activated-text">将在{{ time }}秒自动后返回首页！</div>
    <div class="activated-button">
      <el-button type="primary" @click="backToHome" >返回首页</el-button>
    </div>
  </div>
</template>

<script>
import {activateUser} from "@/api/user";

export default {
  data() {
    return {
      message: "",
      uuid: "",
      time: 10,
    }
  },

  created() {
    this.uuid = this.$route.query.uuid;
  },
  beforeMount() {
    this.checkActivate();
  },
  methods: {
    checkActivate() {
      activateUser(this.uuid).then(response => {
        if (response.status === 200) {
          this.message = "账号激活成功！"
        }
      }).catch(error => {
        console.log(error);
      })

      let timer = setInterval(() => {
        this.time--;
        if (this.time === 0) {
          clearInterval(timer);
          this.$router.push({path: "/"});
        }
      }, 1000);
    },
    backToHome() {
      this.$router.push({path: "/"});
    }
  }
}
</script>

<style scoped lang="scss">
.activated {
  &-container {
    display: flex;
    flex-direction: column;
    margin: 10px 20px 30px 40px;
  }
  &-title {
    font-size: 30px;
    line-height: 46px;
  }
  &-text {
    font-size: 15px;
    line-height: 46px;
  }
  &-button {
    width: 80px;
  }
}
</style>
