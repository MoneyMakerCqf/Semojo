<template>
  <div style="margin-left: 15%;margin-top: 2%; width: 70%" align="center">
    <el-tabs tab-position=left style="height: 550px;">
      <el-tab-pane label="Artifacts" style="height: 550px">
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
                      class=navigation_fontsize
                      v-bind:href="item.href">
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
      <el-tab-pane label="Code">

      </el-tab-pane>
      <el-tab-pane label="Issues">

      </el-tab-pane>
      <el-tab-pane label="Discussions">

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

      show_list: [],
      list: [{id:1, name:"cqfwuwuwu", star:4.5, price:"50", contributors:"cqf,zf", tags:"Java", description:"this is my final ripple, JOJO", DBid:5,update_time:2020/11/24,score:82},
        {id:2, name:"cqfwuwuwu", star:5, price:"50", contributors:"cqf,zf", tags:"Java", description:"this is my final ripple, JOJO", DBid:5,update_time:2020/11/24,score:82},
        {id:3, name:"cqfwuwuwu", star:3, price:"50", contributors:"cqf,zf", tags:"Java", description:"this is my final ripple, JOJO", DBid:5,update_time:2020/11/24,score:82},
        {id:4, name:"cqfwuwuwu", star:2, price:"50", contributors:"cqf,zf", tags:"Java", description:"this is my final ripple, JOJO", DBid:5,update_time:2020/11/24,score:82},
        {id:5, name:"cqfwuwuwu", star:4, price:"50", contributors:"cqf,zf", tags:"Java", description:"this is my final ripple, JOJO", DBid:5,update_time:2020/11/24,score:82},
        {id:6, name:"cqfwuwuwu", star:3, price:"50", contributors:"cqf,zf", tags:"Java", description:"this is my final ripple, JOJO", DBid:5,update_time:2020/11/24,score:82},
        {id:7, name:"cqfwuwuwu", star:4.5, price:"50", contributors:"cqf,zf", tags:"Java", description:"this is my final ripple, JOJO", DBid:5,update_time:2020/11/24,score:82},
        {id:8, name:"cqfwuwuwu", star:5, price:"50", contributors:"cqf,zf", tags:"Java", description:"this is my final ripple, JOJO", DBid:5,update_time:2020/11/24,score:82},
        {id:9, name:"cqfwuwuwu", star:5, price:"50", contributors:"cqf,zf", tags:"Java", description:"this is my final ripple, JOJO", DBid:5,update_time:2020/11/24,score:82},
        {id:10, name:"cqfwuwuwu", star:4, price:"50", contributors:"cqf,zf", tags:"Java", description:"this is my final ripple, JOJO", DBid:5,update_time:2020/11/24,score:82},],

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
    searchfor(search) {
      axios({
        method: 'post',
        url: '/search',
        data: {
          'search': search,
        },
        headers:{
          "Authorization": 'Bearer '+store.getters.getToken,
        }
      })
    },
    handleSelectChange(val){

    },
    handleCommand(command) {
      if (command=="userpage"){
        window.location.href="./"+ store.getters.getUsername + "/userpage";
      }else if (command=="contributor"){
        window.location.href="./contributor.html";
      }else {
        localStorage.clear();
        window.location.href="./homepage.html";
      }
    }
  },
  mounted() {
    this.total = 10;
    this.img_src = window.localStorage.getItem('img_src')
    axios({
      method: 'get',
      url: '/products',
      params: {
        type: 'Artifacts',
        search: window.localStorage.getItem("search"),
      },
    }).then(res => {  //res是返回结果
      if (res.data['code']==20200){
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
  height: 125px;
  line-height: 20px;
  background: #e8f3fe;
  margin: 10px;
  color: #000000;
}
</style>
