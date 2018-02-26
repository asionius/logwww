<template>
<div class="login">
  <el-form :model="user" label-width="120px" label-position="right" ref="user" style="width: 90%;">
    <el-form-item label="用户名" prop="username">
    <el-input v-model="user.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="user.password"></el-input>
    </el-form-item>
     <el-form-item>
    <el-button type="primary" @click="onSubmit">登录</el-button>
    <router-link to="signup"><el-button>注册</el-button></router-link>
  </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {
    onSubmit() {
      if (!this.user.username || !this.user.password) {
        this.$message.warning("请输入用户名和密码");
        return;
      }
      this.$fetch.api_users
        .login({
          username: this.user.username,
          password: this.user.password
        })
        .then(data => {
            if(data.code == 0)
            {
                this.$router.push('/search');
            }
        })
        .catch(err => {
            console.err(err);
            this.$message.error(err.msg);
        });
    }
  }
};
</script>

<style>

</style>
