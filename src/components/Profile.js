export default {
  name: "Profile",
  data() {
    var check_address= (rule, value, callback) => {
      if (this.origin.address.length>=12) {
        callback(new Error('address should less than 12 characters'));
      } else {
        callback();
      }
    };
    var check_email = (rule, value, callback) => {
      var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
      if (!reg.test(this.origin.email)) {
        callback(new Error('please input valid email'));
      } else {
        callback();
      }
    };
    var check_phone= (rule, value, callback) => {
      if (this.origin.phoneNum.length!=11) {
        callback(new Error('please input valid phone number'));
      } else {
        callback();
      }
    };
    var check_QQ= (rule, value, callback) => {
      if (this.origin.qqNum.length>=15) {
        callback(new Error('please input valid QQ number'));
      } else {
        callback();
      }
    };
    var check_Wechat= (rule, value, callback) => {
      if (this.origin.weChatNum.length>=15) {
        callback(new Error('please input valid Wechat number'));
      } else {
        callback();
      }
    };

    return {
      tabPosition: 'left',
      //1-customer 2-contributor 3-administrator
      role: localStorage.role,
      username: this.$route.params.name,
      activeName: '',
      activeTab: 'first',
      avatarImage: '../assets/bg3.jpg',
      loading: false,

      //个人信息
      origin: {
        name: '',
        role: 0,
        address: '',
        email: '',
        gender: '',
        phoneNum: '',
        qqNum: '',
        weChatNum: '',
      },

      rules: {
        address: [
          { required: true, message: 'please input address', trigger: 'blur' },
          { validator: check_address, trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'please input email', trigger: 'blur' },
          { validator: check_email, trigger: 'blur' }
        ],
        phoneNum: [
          { required: true, message: 'please input phone number', trigger: 'blur' },
          { validator: check_phone, trigger: 'blur' }
        ],
        qqNum: [
          { required: true, message: 'please input QQ number', trigger: 'blur' },
          { validator: check_QQ, trigger: 'blur' }
        ],
        weChatNum: [
          { required: true, message: 'please input wechat number', trigger: 'blur' },
          { validator: check_Wechat, trigger: 'blur' }
        ],

      },

      //Products Contributed
      productsContributed: [],

      //Products Purchased
      productsPurchased: [],

      //申请信息
      permissions: [],

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
      if (tab.name == 'first') {
        //获取个人信息
        this.getProfile();
        console.log("first");
      } else if (tab.name == 'second') {
        //manage product
        console.log("second");
      } else if (tab.name == 'third') {
        //permission application
        this.getPermissions();
        console.log("third");
      } else if (tab.name == 'fourth') {
        //create new product
        console.log("fourth");
      } else if (tab.name == 'fifth') {
        //products contributed
        this.getContributedProducts();
        console.log("fifth");
      } else if (tab.name == 'sixth') {
        //products purchased
        this.getPurchased();
        console.log("sixth");
      } else if (tab.name == 'seventh') {
        //To be contributor
        console.log("seventh");
      }
    },

    //获取用户信息
    getProfile: function () {
      this.$axios({
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
          this.role = temp.role;
          this.origin.role = temp.role;
        } else {
          this.$message({
            message: 'connect wrong',
            type: 'warning'
          })
        }
      });
    },

    //申请成为contributor
    applyForContributor: function () {
      //发送请求
      this.$axios.put('/customer/' + this.username + '/userpage/auth').then(res => {
        if (res.data.code === 200) {
          //console.log(res);
          this.$message('请求成功');
        } else {
          this.$message('失败');
        }
      })
    },

    //同意用户申请成为contributor
    clickApprove: function (event) {
      let choose = event.currentTarget.parentElement.parentElement.firstElementChild.getAttribute("class");
      this.$axios({
        method: 'put',
        url: '/admin/' + this.username + '/userpage/auth',
        params: {
          updateType: 'contributor',
          requiredUser: choose,
        },
      }).then(res => {
        if (res.data['code'] == 200) {
          this.$message('更新成功');
          this.getPermissions();
        } else {
          this.$message('更新失败')
        }
      })
    },

    //获取用户已购买的产品的信息
    getPurchased: function () {
      this.loading=true
      this.$axios({
        method: 'get',
        url: '/customer/' + this.username + '/userpage/products',
      }).then(res => {  //res是返回结果
        console.log(res);
        if (res.data['code'] == "200") {
          this.productsPurchased = [];
          let datalist = res.data['data'];
          for (let i = 0, length = datalist.length; i < length; i++) {
            let product = {
              id: datalist[i].productId,
              name: datalist[i].productName,
              url: 'www.baidu.com',
            }
            this.productsPurchased.push(product);
          }
          this.loading=false
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
      this.$axios.put('/info/' + this.username, this.origin).then(res => {
        if (res.data.code === 10200) {
          //console.log(res);
          this.$message('成功更新个人信息');
          this.getProfile();
        } else {
          this.$message('失败')
        }
      }).catch(function (error) {
        //如果邮箱已被使用会报错
        console.log(error);
      })
    },

    //获取申请成为contributor的用户列表
    getPermissions: function () {
      this.$axios({
        method: 'get',
        url: '/admin/' + this.username + '/userpage/authlist',
      }).then(res => {  //res是返回结果
        console.log(res);
        if (res.data['code'] == 200) {
          let datalist = res.data['data'];
          this.permissions = [];
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

    //获取contributor贡献的所有产品列表
    getContributedProducts: function () {
      this.loading=true
      this.$axios({
        method: 'get',
        url: '/contributor/' + this.username + '/userpage/contributed_products',
      }).then(res => {  //res是返回结果
        console.log(res);
        if (res.data['code'] == 200) {
          let datalist = res.data['data'];
          this.productsContributed = [];
          for (let i = 0, length = datalist.length; i < length; i++) {
            console.log(datalist[i]);
            let product = {
              name: datalist[i].productName,
              url: "www.baidu.com",
              productId: datalist[i].productId
            }
            this.productsContributed.push(product);
          }
          this.loading=false
        } else {
          this.$message({
            message: 'connect wrong',
            type: 'warning'
          })
        }
      }).catch(function (error) { // 请求失败处理
        console.log(error);
      })
    },

    //创建新产品
    creatNewProduct: function () {
      let fd = new FormData();
      fd.append('productName', this.newProduct.productName);
      fd.append('username', this.username);
      fd.append('outline', this.newProduct.description);
      fd.append('fixed_price', this.newProduct.fixed_price);
      fd.append('authority', " ")

      this.$axios.post('/contributor/' + this.username + '/product', fd).then(res => {
          console.log(res)
          if (res.data['code'] == 20200) {
            this.$message('成功新建新产品');
          } else {
            this.$message('构建产品失败');
          }
        }
      )
    },

    //跳转到产品编辑界面
    edit: function (index) {
      this.$router.push('/product/' + this.productsContributed[index].productId)
    },

    //删除贡献的产品
    deleteContributed: function (index) {
      this.$axios.delete('/contributor/product/' + this.productsContributed[index].productId).then(res => {
          console.log(res)
          if (res.data['code'] == 200) {
            this.$message('成功删除产品');
            this.getContributedProducts();
          } else {
            this.$message('删除产品失败');
          }
        }
      )
    },

    clickDownload(index){

    }
  },

  mounted() {
    this.getProfile();
  }
}
