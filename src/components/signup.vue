<template>
<div class="signup">
  <el-form :model="user" label-width="120px" label-position="right" ref="user" style="width: 90%;">
    <el-form-item label="用户名" prop="username">
    <el-input v-model="user.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="user.password"></el-input>
    </el-form-item>
    <el-form-item label="重复密码" prop="rpassword">
    <el-input type="password" v-model="user.rpassword"></el-input>
    </el-form-item>
     <el-form-item>
    <el-button type="primary" @click="onSubmit">注册</el-button>
    <router-link to="login"><el-button>登录</el-button></router-link>
  </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  data() {
    return {
      user: {
      }
    };
  },
  methods: {
    onSubmit() {
      if (!this.user.username || !this.user.password || !this.user.rpassword) {
        this.$message.warning("请将信息填写完整");
        return;
      }
      if(this.user.password !== this.user.rpassword)
      {
          this.$message.warning("密码不一致")
          return; 
      }
      this.$fetch.api_users
        .signup({
          username: this.user.username,
          password: this.user.password
        })
        .then(data => {
            if(data.code == 0)
            {
                this.$router.push('/login');
            }
        })
        .catch(err => {
            console.error(err);
            this.$message.error(err.msg);
        });
    }
  }
};
</script>

<style>

</style>
