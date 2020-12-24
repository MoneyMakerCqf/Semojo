<template>
  <div style="margin-left: 15%;margin-top: 2%; width: 70%" align="center">
    <el-tabs tab-position=left style="height: 550px;" v-model="activeTab" @tab-click="handleTabClick">
      <el-tab-pane label="Products" style="height: 550px" name="Products">
        <div style="margin-top:25px; margin-left:50px;">
          <div style="display:flex">
            <div style="width:50%" align="left"><h4>{{total}} repository results</h4></div>

            <div style="width:46.5%" align="right">
              <template>
                <el-select v-model="value" placeholder="please choose" @change="handleSelectChange">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </div>
          </div>
          <template>
            <div class="infinite-list-wrapper" style="overflow:auto;width:100%;height:450px;">
              <ul
                class="list"
                v-infinite-scroll="load"
                infinite-scroll-disabled="disabled"
                style="list-style:none;">
                <li v-for="item in show_list" class="list-item">
                  <div align="left">
                    <i class="el-icon-notebook-2"></i>
                    <el-link
                      target="_blank"
                      style="color:#000;text-decoration:none;"
                      class=navigation_fontsize>
                      {{item.name}}
                    </el-link>
                    <el-rate
                      v-model="item.star"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}">
                    </el-rate>
                    <div> Price: {{item.price}}</div>
                    <div> Contributors: {{item.contributors}}</div>
                    <div> Tags:{{item.tags}} </div>
                    <div> description: {{item.description}}</div>
                  </div>
                </li>
              </ul>
              <p v-if="loading">loading&nbsp;&nbsp;<i class="el-icon-loading"></i></p>
            </div>
          </template>
        </div>
      </el-tab-pane>

      <el-tab-pane label="Codes" name="Codes">
        <div style="margin-top:25px; margin-left:50px;">
          <div style="display:flex">
            <div style="width:50%" align="left"><h4>{{total}} repository results</h4></div>
          </div>
          <template>
            <div class="infinite-list-wrapper" style="overflow:auto;width:100%;height:350px;">
              <ul
                class="list"
                v-infinite-scroll="load"
                infinite-scroll-disabled="disabled"
                style="list-style:none;">
                <li v-for="item in show_list" class="list-item">
                  <div align="left">
                    <i class="el-icon-notebook-2"></i>
                    <el-link
                      target="_blank"
                      style="color:#000;text-decoration:none;"
                      class=navigation_fontsize>
                      {{item.name}}
                    </el-link>
                    <div> Code: {{item.code}}</div>
                  </div>
                </li>
              </ul>
              <p v-if="loading">loading&nbsp;&nbsp;<i class="el-icon-loading"></i></p>
            </div>
          </template>
        </div>
      </el-tab-pane>

<!--      <el-tab-pane label="Issues" name="Issue">-->
<!--        <div style="margin-top:25px; margin-left:50px;">-->
<!--          <div style="display:flex">-->
<!--            <div style="width:50%" align="left"><h4>{{total}} repository results</h4></div>-->
<!--          </div>-->
<!--          <template>-->
<!--            <div class="infinite-list-wrapper" style="overflow:auto;width:100%;height:350px;">-->
<!--              <ul-->
<!--                class="list"-->
<!--                v-infinite-scroll="load"-->
<!--                infinite-scroll-disabled="disabled"-->
<!--                style="list-style:none;">-->
<!--                <li v-for="item in show_list" class="list-item">-->
<!--                  <div align="left">-->
<!--                    <i class="el-icon-notebook-2"></i>-->
<!--                    <el-link-->
<!--                      target="_blank"-->
<!--                      style="color:#000;text-decoration:none;"-->
<!--                      class=navigation_fontsize>-->
<!--                      {{item.name}}-->
<!--                    </el-link>-->
<!--                    <div> Issue: {{item.issue}}</div>-->
<!--                  </div>-->
<!--                </li>-->
<!--              </ul>-->
<!--              <p v-if="loading">loading&nbsp;&nbsp;<i class="el-icon-loading"></i></p>-->
<!--            </div>-->
<!--          </template>-->
<!--        </div>-->
<!--      </el-tab-pane>-->

      <el-tab-pane label="Users" name="Users">
        <div style="margin-top:25px; margin-left:50px;">
          <div style="display:flex">
            <div style="width:50%" align="left"><h4>{{total}} repository results</h4></div>
          </div>
          <template>
            <div class="infinite-list-wrapper" style="overflow:auto;width:100%;height:350px;">
              <ul
                class="list"
                v-infinite-scroll="load"
                infinite-scroll-disabled="disabled"
                style="list-style:none;">
                <li v-for="item in show_list" class="list-item">
                  <div align="left">
                    <i class="el-icon-notebook-2"></i>
                    <el-link
                      target="_blank"
                      style="color:#000;text-decoration:none;"
                      class=navigation_fontsize>
                      {{item.name}}
                    </el-link>
                    <div> Address: {{item.address}}</div>
                    <div> e-mail: {{item.email}}</div>
                  </div>
                </li>
              </ul>
              <p v-if="loading">loading&nbsp;&nbsp;<i class="el-icon-loading"></i></p>
            </div>
          </template>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "search",
  data () {
    return {
      loading: false,
      id: 0,
      total: 0,
      value: 'score',
      activeTab: "Products",
      searchitem: this.$route.params.searchitem,

      show_list: [],
      list: [],

      options: [{
        value: 'score',
        label: 'Best match'
      }, {
        value: 'star',
        label: 'Most stars'
      }, {
        value: 'time',
        label: 'Recently updated'
      }],
    }
  },
  computed: {
    noMore () {
      return this.show_list.length >= this.total
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    load () {
      this.loading = true
      setTimeout(() => {
        for (var i=this.id, j=this.id+5; i<j && i<this.total; i++) {
          this.id ++;
          this.show_list.push(this.list[i]);
        }
        this.loading = false
      }, 1500)
    },
    handleSelectChange(val){

    },
    handleTabClick(tab,event){
      this.id = 0;
      this.total = 0;
      this.show_list = [];
      this.list = [];
      if(tab.name=="Products"){
        this.$axios({
          method: 'get',
          url: '/search/product',
          params: {
            keyword: this.$route.params.searchitem,
          },
        }).then(res => {  //res是返回结果
          if (res.data['code']==200){
            let datalist = [];
            datalist = res.data['data'];
            for (let i = 0, length = datalist.length; i < length; i++) {
              let product = {
                id : i+1,
                name: datalist[i].productName,
                star: datalist[i].revierStar,
                price: datalist[i].currentPrice,
                contributors: datalist[i].creator,
                language: datalist[i].language,
                tags: datalist[i].tags,
                description: datalist[i].outline,
                DBid: datalist[i].productId,
                update_time: datalist[i].update_time,
                score: datalist[i].score,
              };
              this.list.push(product);
            }
            this.total = this.list.length;
            for (let i=this.id; i<5 && i<this.total; i++){
              this.show_list.push(this.list[i]);
              this.id++;
            }
          }
        })
      }else if(tab.name=="Codes"){
        this.changeToCode()
        console.log(this.list)
      }else if(tab.name=="Issues"){
        this.changeToIssue()
      }else {
        this.changeToUser()
      }
    },
    changeToCode() {
      this.$axios({
        method: 'get',
        url: '/search/code',
        params: {
          keyword: this.$route.params.searchitem,
        },
      }).then(res => {  //res是返回结果
        if (res.data['code']==200){
          let datalist = [];
          datalist = res.data['data'];
          for (let i = 0, length = datalist.length; i < length; i++) {
            let product = {
              id : i+1,
              name: datalist[i].ProjectName,
              code: datalist[i].code,
            };
            this.list.push(product);
          }
          this.total = this.list.length;
          for (let i=this.id; i<5 && i<this.total; i++){
            this.show_list.push(this.list[i]);
            this.id++;
          }
        }
      })
    },
    // changeToIssue() {
    //   this.$axios({
    //     method: 'get',
    //     url: '/issues',
    //     params: {
    //       type: 'Issues',
    //       search: window.localStorage.getItem("search"),
    //     },
    //   }).then(res => {  //res是返回结果
    //     if (res.data['code']==200){
    //       let datalist = [];
    //       datalist = res.data['data'];
    //       for (let i = 0, length = datalist.length; i < length; i++) {
    //         let product = {
    //           id : i+1,
    //           name: datalist[i].userName,
    //           issue: datalist[i].issue,
    //         };
    //         this.list.push(product);
    //       }
    //       this.total = this.list.length;
    //       for (let i=this.id; i<5 && i<this.total; i++){
    //         this.show_list.push(this.list[i]);
    //         this.id++;
    //       }
    //     }
    //   })
    // },
    changeToUser() {
      this.$axios({
        method: 'get',
        url: '/search/user',
        params: {
          username: this.$route.params.searchitem,
        },
      }).then(res => {  //res是返回结果
        if (res.data['code']==200){
          let datalist = [];
          datalist = res.data['data'];
          for (let i = 0, length = datalist.length; i < length; i++) {
            let user = {
              name: datalist[i].username,
              address: datalist[i].address,
              email: datalist[i].email,
            };
            this.list.push(user);
          }
          this.total = this.list.length;
          for (let i=this.id; i<5 && i<this.total; i++){
            this.show_list.push(this.list[i]);
            this.id++;
          }
        }
      })
    },

  },
  mounted() {
    this.img_src = window.localStorage.getItem('img_src')
    this.$axios({
      method: 'get',
      url: '/search/product',
      params: {
        keyword: this.$route.params.searchitem,
      },
    }).then(res => {  //res是返回结果
      if (res.data['code']==200){
        let datalist = [];
        datalist = res.data['data'];
        for (let i = 0, length = datalist.length; i < length; i++) {
          let product = {
            id : i+1,
            name: datalist[i].productName,
            star: datalist[i].revierStar,
            price: datalist[i].currentPrice,
            contributors: datalist[i].creator,
            language: datalist[i].language,
            tags: datalist[i].tags,
            description: datalist[i].outline,
            DBid: datalist[i].productId,
            update_time: datalist[i].update_time,
            score: datalist[i].score,
          };
          this.list.push(product);
        }
        this.total = this.list.length;
        for (let i=this.id; i<5 && i<this.total; i++){
          this.show_list.push(this.list[i]);
          this.id++;
        }
      }
    })
  },
}
</script>

<style scoped>
.list .list-item {
  line-height: 20px;
  background: #e8f3fe;
  margin: 10px;
  color: #000000;
}
</style>
