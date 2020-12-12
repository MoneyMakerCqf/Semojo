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
        this.getProfile();
        console.log("first");
      } else if (tab.name == 'second'){
        //manage product
        console.log("second");
      } else if (tab.name == 'third'){
        //permission application
        this.getPermissions();
        console.log("third");
      } else if (tab.name == 'fourth'){
        //create new product
        console.log("fourth");
      } else if (tab.name == 'fifth'){
        //products contributed
        console.log("fifth");
      } else if (tab.name == 'sixth'){
        //products purchased
        this.getPurchased();
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
        url: '/customer/' + this.username + '/userpage/info',
      }).then(res => {  //res是返回结果
        console.log(res);
        if (res.data['code'] == "200") {
          let temp = res.data['data'];
          this.origin.name = this.username;
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
        url: '/customer/' + this.username + '/userpage/products',
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
            this.productsPurchased.push(product);
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
      axios.put('/info/' + this.username, this.origin).then(res => {
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
    getPermissions: function () {
      axios({
        method: 'get',
        url: '/admin/' + this.username + '/userpage/authlist',
      }).then(res => {  //res是返回结果
        console.log(res);
        if (res.data['code'] == 200) {
          let datalist = res.data['data'];
          for (let i = 0, length = datalist.length; i < length; i++) {
            console.log(datalist[i]);
            let permission = {
              name: datalist[i].username,
              url: "www.baidu.com"
            }
            this.permissions.push(permission);
          }
        } else {
          this.$message({
            message: 'connect wrong',
            type: 'warning'
          })
        }
      });
    },

    //创建新产品
    creatNewProduct: function () {
      this.dialogFormVisible = false;
      let fd = new FormData();
      fd.append('productName', this.newProduct.productName);
      fd.append('username', this.username);
      fd.append('outline', this.newProduct.description);
      fd.append('fixed_price', this.newProduct.fixed_price);
      fd.append('authority', " ")

      axios.post('./product', fd).then(res => {
          console.log(res)
          if (res.data['code'] == 20200) {
            axios({
              method: 'get',
              url: './userpage/contributed_products',
            }).then(res => {  //res是返回结果
              console.log(res);
              axios({
                method: 'get',
                url: './userpage/contributed_products',
              }).then(res => {  //res是返回结果
                console.log(res);
                if (res.data['code'] == 200) {
                  let datalist = res.data['data'];
                  for (let i = 0, length = datalist.length; i < length; i++) {
                    console.log(datalist[i]);
                    let product = {
                      name: datalist[i].productName,
                      url: "./product/" + datalist[i].productId,
                    }
                    this.productsContributed.push(product);
                  }
                } else {
                  this.$message({
                    message: '更新失败',
                    type: 'warning'
                  })
                }
              }).catch(function (error) { // 请求失败处理
                console.log(error);
              });
            }).catch(function (error) { // 请求失败处理
              console.log(error);
            });

          } else {
            this.$message('失败')
          }
        }
      )
      //axios传送数据
    },

  },

  mounted() {
    this.getProfile();
  }
}
