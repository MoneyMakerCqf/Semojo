import axios from 'axios'

export default {
  name: "Profile",
  data() {
    return {
      tabPosition: 'left',
      //1-customer 2-contributor 3-administrator
      role: 3,
      username: this.$route.params.name,
      activeName: '',
      activeTab: 'first',
      avatarImage: '../assets/bg3.jpg',

      //个人信息
      origin: {
        name: 'Paul',
        address: 'SUSTECH',
        email: '3522715211@qq.com',
        gender: 'Male',
        phoneNum: '13822810293',
        qqNum: '3522715211',
        weChatNum: 'zsz100123',
      },

      //Products Contributed
      productsContributed: [
        {
          name: 'AI helper',
        },
        {
          name: 'Algorithm helper',
        }
      ],

      //Products Purchased
      productsPurchased: [
        {
          name: 'AI helper'
        },
        {
          name: 'Algorithm helper'
        }
      ],

      //申请信息
      permissions: [{
        name: 'Zhu',
      },
        {
          name: 'Xu',
        },
        {
          name: 'Zhao',
        }],

      //new product
      newProduct: {
        productName: '',
        description: '',
        fixed_price: '',
      },

      //manage products
      manage: [{
        name: 'Product 1',
        url: 'www.baidu.com',
      },
        {
          name: 'Product 2',
          url: 'www.baidu.com',
        }]
    }
  },

  methods: {
    //点击标签对应事件
    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.name == 'first'){
        //获取个人信息
        console.log("first");
      } else if (tab.name == 'second'){
        //manage product
        console.log("second");
      } else if (tab.name == 'third'){
        //permission application
        console.log("third");
      } else if (tab.name == 'fourth'){
        //create new product
        console.log("fourth");
      } else if (tab.name == 'fifth'){
        //products contributed
        console.log("fifth");
      } else if (tab.name == 'sixth'){
        //products purchased
        console.log("sixth");
      } else if (tab.name == 'seventh'){
        //To be contributor
        console.log("seventh");
      }
    },

    //获取用户信息
    getProfile: function () {
      axios({
        method: 'get',
        url: '/customer/' + this.username + '/info',
      }).then(res => {  //res是返回结果
        console.log(res);
        if (res.data['code'] == "200") {
          let temp = res.data['data'];
          this.origin.name = store.getters.getUsername;
          this.origin.address = temp.address;
          this.origin.email = temp.email;
          this.origin.gender = temp.gender;
          this.origin.phoneNum = temp.phoneNum;
          this.origin.qqNum = temp.qqNum;
          this.origin.weChatNum = temp.weChatNum;
          this.origin.portrait = temp.portrait;
        } else {
          this.$message({
            message: 'connect wrong',
            type: 'warning'
          })
        }
      });
    },

    //获取用户已购买的产品的信息
    getPurchased: function () {
      axios({
        method: 'get',
        url: '/customer/' + store.getters.getUsername + '/userpage/products',
        headers: {
          "authorization": 'Bearer ' + store.getters.getToken,
        }
      }).then(res => {  //res是返回结果
        console.log(res);
        if (res.data['code'] == "200") {
          let datalist = res.data['data'];
          for (let i = 0, length = datalist.length; i < length; i++) {
            let product = {
              productId: datalist[i].productId,
              productName: datalist[i].productName,
              url: 'www.baidu.com',
            }
            this.products.push(product);
          }
        } else {
          this.$message({
            message: 'connect wrong',
            type: 'warning'
          })
        }
      });
    },

    //更新用户信息
    updateProfile: function () {
      //发送修改后的信息
      axios.put('/info/' + store.getters.getUsername, this.origin).then(res => {
        if (res.data.code === 10200) {
          //console.log(res);
          this.$message('上传成功');
          this.getProfile;
        } else {
          this.$message('失败')
        }
      })
    },

    //获取申请成为contributor的用户列表


  },

  mounted() {
    this.getProfile();
  }
}
