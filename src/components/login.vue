<template>
  <div class="background">
    <div style="margin-left:63%; width: 450px;" align="left">
      <br><br><br><br>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" method="post" action="/login">
        <el-form-item prop="username">
          <el-input placeholder="input username" v-model="ruleForm.username" clearable></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input placeholder="input password" v-model="ruleForm.password" clearable show-password></el-input>
        </el-form-item>
      </el-form>

      <div style="margin-left: 100px; line-height: 25px; display: flex">
        <div style="width: 60%;">
          <el-link
            :underline="false"
            href="http://baidu.com"
            type="info"
            target="_blank"
          >
            forget password?
          </el-link>
          <br>
          <el-link
            :underline="false"
            type="info"
            target="_blank"
            @click="toRegister()"
          >
            New to SEMojo? Sign up!
          </el-link>
        </div>
        <div style="width: 39%;" align="right">
          <el-button type="primary" @click="submitForm('ruleForm')">login</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import { mapMutations } from 'vuex'
export default {
  name: "login",
  data() {
    var check_username = (rule, value, callback) => {
      if (this.ruleForm.username.length>=12) {
        callback(new Error('username should less than 12 characters'));
      } else {
        callback();
      }
    };
    var check_password = (rule, value, callback) => {
      if (this.ruleForm.password.length>=18) {
        callback(new Error('password should less than 18 characters'));
      } else {
        callback();
      }
    };
    return {
      search: '',
      ruleForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: 'please input username', trigger: 'blur' },
          { validator: check_username, trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'please input password', trigger: 'blur' },
          { validator: check_password, trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    ...mapMutations(['changeLogin']),
    submitForm(formName) {
      let _this=this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/login',
            data: qs.stringify({
              'username': this.ruleForm.username,
              'password': this.ruleForm.password,
            }),
            headers:{
              'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
              "Authorization": " ",
            }
          }).then(res => {  //res是返回结果
            if (res.data['code']=="200"){
              _this.userToken='Bearer '+res.data['token'];

              _this.changeLogin({Authorization: _this.userToken});
              this.$message({
                message:'登录成功',
                type:'success'
              })
              this.$root.is_login = true;
              this.$root.username = this.ruleForm.username;
              localStorage.username = this.ruleForm.username;
              //获取role
              let roleArray = [];
              roleArray = res.data['role'].split(",");
              if (roleArray[0] == "ROLE_CONTRIBUTOR"){
                localStorage.role = 2;
              } else if (roleArray[0] == "ROLE_CUSTOMER") {
                localStorage.role = 1;
              } else {
                localStorage.role = 3;
              }
              this.$router.push('/homepage')
            }else {
              this.$message({
                message:'用户名或者密码错误',
                type:'warning'
              })
            }
          }).catch(err => { //请求失败就会捕获报错信息
            console.log('服务器连接失败');
            console.log(err);
            this.$message({
              message:'服务器连接失败',
              type:'warning'
            })
          })
        }
      });
    },
    searchfor(search) {

    },
    toRegister(){
      this.$router.push('/register');
    },
  },
}
</script>

<style scoped>
.background {
  position: relative;
  background: url("../assets/Login_background.jpg");
  background-color: #E9EEF3;
  background-position: center top;
  background-size: 100% 100%;
  color: #333;
  text-align: center;
  height:620px;
  line-height: 60px;
}
</style>
