<template>
  <div id="navi">
    <el-row :gutter="10" type="flex">
      <el-col :span="3">
        <router-link to='/homepage' class="el-col">
          <img border="0" src="../assets/logo.png" style="height:50%; width:50%; margin-top: 4px"/>
          <p style="color:#FFFFFF; width:15%;">SEMojo</p>
        </router-link>
      </el-col>

      <el-col :span="2" >
        <el-link
          target="_blank"
          class="navigation_fontsize"
          @click="toProduct()"
        >Products
        </el-link>
      </el-col>

      <el-col :span="2" >
        <el-link
          href="/swagger-ui.html"
          target="_blank"
          class="navigation_fontsize"
        >Support
        </el-link>
      </el-col>

      <el-col :span="4">
        <br>
      </el-col>

      <el-col :span="4" :offset="4" v-show="!this.$root.is_login">
        <el-input
          placeholder="Search SEMojo"
          v-model="search">
          <el-button slot="append" icon="el-icon-search" @click="searchfor('search')"></el-button>
        </el-input>
      </el-col>

      <el-col :span="4" :offset="8" v-show="this.$root.is_login" style="margin-top: 3px">
        <el-input
          placeholder="Search SEMojo"
          v-model="search">
          <el-button slot="append" icon="el-icon-search" @click="searchfor('search')"></el-button>
        </el-input>
      </el-col>

      <el-col :span="2" v-show="! this.$root.is_login">
        <el-link
          class="navigation_fontsize"
          @click="toLogin()"
        >Sign in
        </el-link>
      </el-col>

      <el-col :span="2" v-show="! this.$root.is_login">
        <el-link
          :underline="false"
          @click="toRegister()">
          <el-button type="primary">Sign up</el-button>
        </el-link>
      </el-col>

      <el-col :span="2" v-show=" this.$root.is_login">
        <el-dropdown @command="handleCommand" style="margin-top: 5px">
          <span class="el-dropdown-link">
            <el-avatar :src="this.$root.img_src"></el-avatar>
          </span>
          <el-dropdown-menu slot="dropdown" style="margin-top: -10px">
            <el-dropdown-item command="userpage">Your profile</el-dropdown-item>
            <el-dropdown-item command="logout">sign out</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>

    </el-row>
  </div>
</template>

<script>
export default {
  name: "navigation",
  data () {
    return {
      search: '',
      fit: 'fill',
    };
  },
  methods: {
    handleCommand(command) {
      if (command=="userpage"){
        this.$router.push('/'+this.$root.username+'/userpage')
      }else {
        localStorage.clear();
        this.$root.is_login = false
        this.$router.push('/')
      }
    },
    toProduct(){
      this.$router.push('/product');
    },
    toSupport(){
      this.$router.push('/support');
    },
    toLogin(){
      this.$router.push('/');
    },
    toRegister(){
      this.$router.push('/register');
    },
    searchfor(searchitem){
      this.$router.push('/search');
    }
  }
}
</script>

<style scoped>
#navi {
  height: 60px;
  background-color: black;
}
.el-col {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.navigation_fontsize {
  font-size: 17px;
  color: #FFFFFF;
}
</style>
