<template>
  <div class="background">
    <div style="margin-left: 73%; width: 300px; line-height: 70px" align="left" >
      <br><br>
        <el-form :hide-required-asterisk="true" :label-position="labelPosition" :model="ruleForm" :rules="rules"
                 ref="ruleForm" label-width="100px" class="demo-ruleForm" method="post" action="/login"
                 style="line-height: 10px">
          <p class="text-color">username</p>
          <el-form-item prop="username">
            <el-input placeholder="input username" v-model="ruleForm.username" clearable></el-input>
          </el-form-item>
          <p class="text-color">password</p>
          <el-form-item prop="password">
            <el-input placeholder="input password" v-model="ruleForm.password" clearable show-password></el-input>
          </el-form-item>
          <p class="text-color">repeat password again</p>
          <el-form-item prop="repeat_password">
            <el-input placeholder="input repeat_password" v-model="ruleForm.repeat_password" clearable show-password></el-input>
          </el-form-item>
          <p class="text-color">email</p>
          <el-form-item prop="email">
            <el-input placeholder="input email" v-model="ruleForm.email" clearable></el-input>
          </el-form-item>
          <p>&nbsp;</p>
          <el-button type="primary" style="width: 100%" @click="submitForm('ruleForm')">Sign up now</el-button>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
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
    var check_repassword = (rule, value, callback) => {
      if (this.ruleForm.repeat_password.length>=18) {
        callback(new Error('password should less than 18 characters'));
      } else if (!(this.ruleForm.password===this.ruleForm.repeat_password)) {
        callback(new Error('These two passwords are different'));
      } else {
        callback();
      }
    };

    return {
      labelPosition: 'top',
      ruleForm: {
        username: '',
        password: '',
        repeat_password: '',
        email: '',
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
        repeat_password: [
          { required: true, message: 'please reinput password', trigger: 'blur' },
          { validator: check_repassword, trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'please input email', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'post',
            url: '/register',
            data: {
              'username': this.ruleForm.username,
              'password': this.ruleForm.password,
              'confirmPassword': this.ruleForm.repeat_password,
              'email': this.ruleForm.email,
            },
          }).then(res => {  //res是返回结果
            console.log(res);
            if (res.data['code']==10200){
              this.$message({
                message:'注册成功',
                type:'success'
              });
              this.$router.push('/')
            }else {
              this.$message({
                message:'注册失败' + res.data['msg'],
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
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    searchfor(search) {

    },
  }
}
</script>

<style scoped>
.background {
  background: url("../assets/Signup_background.jpg");
  background-color: #E9EEF3;
  background-position: center top;
  background-size: 100% 100%;
  color: #333;
  text-align: center;
  height:620px;
  line-height: 60px;
}
div {
  position: relative;
}
.text-color{
  color: white;
}
</style>
