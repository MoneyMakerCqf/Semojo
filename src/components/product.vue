<template>
  <div align="center">
    <div style="margin-left:200px;" align="left">
      <h1>ALL PRODUCTS</h1>
      <el-radio-group v-model="language" style="margin-top: 15px" size="medium" @change="handleLanguageChange">
        <el-radio-button label="All Languages"></el-radio-button>
        <el-radio-button label="Java"></el-radio-button>
        <el-radio-button label="C++"></el-radio-button>
        <el-radio-button label="python"></el-radio-button>
        <el-radio-button label="GO"></el-radio-button>
        <el-radio-button label="HTML"></el-radio-button>
        <el-radio-button label="JavaScript"></el-radio-button>
      </el-radio-group>
      <br>
      <el-radio-group v-model="type" style="margin-top: 15px" size="medium" @change="handleTypeChange">
        <el-radio-button label="All Types"></el-radio-button>
        <el-radio-button label="Text editing"></el-radio-button>
        <el-radio-button label="Algoritm"></el-radio-button>
        <el-radio-button label="AI"></el-radio-button>
        <el-radio-button label="ARM"></el-radio-button>
      </el-radio-group>
    </div>
    <template>
      <br>
      <div class="infinite-list-wrapper" style="overflow:auto;width:80%;" align="center">
        <ul	class="list"
             style="list-style:none;">
          <li v-for="item in show_list" class="list-item">
            <div align="left" style="margin-left: 25px; display: flex">
              <div style="width: 80%">
                <i class="el-icon-notebook-2"></i>
                <el-link
                  target="_blank"
                  style="color:#000000;text-decoration:none;"
                  class=navigation_fontsize
                  @click="linkDetail(item.DBid)">
                  {{item.name}}
                </el-link>
                <el-progress style="width: 40%" :percentage="item.satisfaction">satisfaction</el-progress>
                <div> Price: {{item.price}}</div>
                <div> Contributors: {{item.contributors}}</div>
                <div> Language: {{item.language}}</div>
                <div style="display: inline"> Tags:
                  <div v-for="tag in item.tags" style="display: inline-flex">
                    <p> {{tag}} </p>
                  </div>
                </div>
                <div> description: {{item.description}}</div>
              </div>
              <div style="width: 15%;" align="right">
                <el-button type="primary" style="margin-top: 30%" @click="purchase(item.DBid)">purchase</el-button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </template>
    <br>
    <div style="margin-left:50px;">
      <el-pagination
        :background="true"
        :page-size="8"
        :pager-count="5"
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "project",
  data () {
    return {
      language: 'All Languages',
      type: 'All Types',
      loading: false,
      id: 1,
      total: 0,
      current_page: 1,
      show_list:[],
      conditional_list:[],
      list: [],
    };
  },
  methods: {
    searchfor(search) {

    },
    handleCurrentChange(val) {
      this.current_page = val;
      this.show_list.splice(0,this.show_list.length);
      for (let i=(this.current_page-1)*8; i<this.current_page*8 && i<this.total; i++){
        this.show_list.push(this.conditional_list[i]);
      }
      window.scrollTo(0, 0);
    },
    handleLanguageChange(val) {
      this.language = val;
      this.conditional_list = [];
      for (let i = 0, length = this.list.length; i < length; i++) {
        if((this.list[i].language==this.language||this.language=='All Languages') && (this.list[i].tags.includes(this.type) || this.type=='All Types')){
          this.conditional_list.push(this.list[i]);
        }
      }
      this.total = this.conditional_list.length;
      this.current_page = 1;
      this.show_list.splice(0,this.show_list.length);
      for (let i=0; i<8 && i<this.total; i++){
        this.show_list.push(this.conditional_list[i]);
      }
    },
    handleTypeChange(val) {
      this.type = val;
      this.conditional_list = [];
      for (let i = 0, length = this.list.length; i < length; i++) {
        if((this.list[i].tags.includes(this.type) ||this.type=='All Types') && (this.list[i].language==this.language || this.language=='All Languages')){
          this.conditional_list.push(this.list[i]);
        }
      }
      this.total = this.conditional_list.length;
      this.current_page = 1;
      this.show_list.splice(0,this.show_list.length);
      for (let i=0; i<8 && i<this.total; i++){
        this.show_list.push(this.conditional_list[i]);
      }
    },
    handleCommand(command) {
      if (command=="userpage"){
        window.location.href="./"+ store.getters.getUsername + "/userpage";
      }else if (command=="contributor"){
        window.location.href="./contributor.html";
      }else {
        this.is_login = false;
        localStorage.clear();
        window.location.href="./homepage.html";
      }
    },
    linkDetail(DBid) {

    },
    purchase(DBid){

    }
  },
  mounted() {
    if(this.$root.is_login) {
      this.$axios({
        method: 'get',
        url: '/products',
        params: {
          limit: -1,
          start: -1,
          tag: "-1",
          lang: "-1",
        },
      }).then(res => {  //res是返回结果
        if (res.data['code'] == 20200) {
          let datalist = [];
          datalist = res.data['data'];
          console.log(datalist);
          for (let i = 0, length = datalist.length; i < length; i++) {
            let product = {
              id: i + 1,
              name: datalist[i].productName,
              satisfaction: datalist[i].revierStar,
              price: datalist[i].currentPrice,
              contributors: datalist[i].creator,
              language: datalist[i].language,
              tags: datalist[i].tags,
              description: datalist[i].outline,
              DBid: datalist[i].productId,
            }
            console.log(product.name);
            this.list.push(product);
            this.conditional_list.push(product);
          }
          this.total = this.conditional_list.length;
          for (let i = 0; i < 8 && i < this.total; i++) {
            this.show_list.push(this.conditional_list[i]);
          }
        }
      })
    } else {
      this.$router.push('/')
      this.$message({
        message:'请先登录',
        type:'warning'
      })
    }
  }
}
</script>

<style scoped>
.list .list-item {
  height: 140px;
  line-height: 20px;
  background: #e8f3fe;
  margin: 10px;
  color: #000000;
}
</style>
