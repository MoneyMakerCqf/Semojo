<template>
  <div align="center">
<!--    根据language和tags筛选项目-->
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
      <br>
    </div>
<!--    展示项目的表格-->
    <template>
      <br>
      <div class="infinite-list-wrapper" style="overflow:auto;width:80%;" align="center">
        <div style="width: 95%">
          <el-table
            v-loading="loading"
            :data="show_list">
            <el-table-column
              label="Name"
              width="150">
              <template slot-scope="scope">
                <i class="el-icon-folder"></i>
                <el-button
                  size="small"
                  type="text"
                  style="font-size:16px"
                  @click="linkDetail(scope.row.DBid)">
                  {{scope.row.name}}
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              label="Satisfaction"
              width="150">
              <template slot-scope="scope">
                <el-rate
                  v-model="scope.row.satisfaction"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}">
                </el-rate>
              </template>
            </el-table-column>
            <el-table-column
              prop="price"
              label="Price($)"
              width="90">
            </el-table-column>
            <el-table-column
              prop="contributors"
              label="Contributors"
              width="150">
            </el-table-column>
            <el-table-column
              prop="language"
              label="Language"
              width="150">
            </el-table-column>
            <el-table-column
              prop="tags"
              label="Tags"
              width="100">
            </el-table-column>
            <el-table-column
              prop="description"
              label="Description"
              width="200">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="operation"
              width="150">
              <template slot-scope="scope">
                <el-button
                  @click="purchase(scope.$index, show_list)"
                  size="small"
                  type="primary"
                  style="font-size:16px">
                  purchase
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <br>
    </template>
<!--   分页-->
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
<!--    购买弹窗-->
    <el-dialog title="Pay for it" :visible.sync="dialogFormVisible">
      <el-card :body-style="{ padding: '0px' }">
        <img src="../assets/payment.jpg" class="image" >
      </el-card>
      <el-button @click="paysuccess" type="primary">
        Already paid~
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "project",
  data () {
    return {
      language: 'All Languages',
      type: 'All Types',
      loading: true,
      id: 1,
      total: 0,
      current_page: 1,
      show_list:[],
      conditional_list:[],
      list: [],
      dialogFormVisible: false,
      tractionid: '',
    };
  },
  methods: {
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
       this.$router.push('/product/' + DBid)
    },
    purchase(index,rows){
      this.$axios({
        method: 'post',
        url: '/customer/'+localStorage.username+'/product/'+this.show_list[index].DBid+'/transaction',
        data: {
          products: this.show_list[index].DBid
        },
      }).then(res =>{
        if (res.data['code']==200){
          this.dialogFormVisible=true
          this.tractionid=res.data['data'].id
        }else {
        }
      }).catch(error =>{
        console.log(error)
      })
    },
    paysuccess(){
      this.$axios({
        method: 'put',
        url: '/customer/'+localStorage.username+'/transaction/'+this.tractionid,
        params: {
          status: 'PurchasedSuccess'
        }
      }).then(res =>{
        if(res.data['code']==200){
          this.dialogFormVisible=false
          this.$message({
            message:'purchase success',
            type:'success'
          })
        }else {
          this.$message({
            message:'purchase unsuccess',
            type:'warning'
          })
        }
      })
    }
  },
  mounted() {
    if(localStorage.getItem('Authorization')) {
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
            this.list.push(product);
            this.conditional_list.push(product);
          }
          this.total = this.conditional_list.length;
          for (let i = 0; i < 8 && i < this.total; i++) {
            this.show_list.push(this.conditional_list[i]);
          }
          this.loading=false
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
  .image {
  height: 400px;
  width: 250px;
  display: block;
  }
</style>
