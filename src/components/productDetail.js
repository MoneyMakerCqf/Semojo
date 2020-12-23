export default {
  name: 'productDetail',
  data() {
    return {
      productName: 'Night City',
      productId: this.$route.params.id,
      tabPosition: 'top',
      activeTab: 'first',
      dialogFormVisible: false,
      testresult: 'Result is: This team pass CS307 OOAD successfully',
      role: localStorage.role,
      product: {
        name: 'Products1',
        currentPrice: '3.2',
        price: '$5.40',
        contributor: 'CHEN XU ZHU ZHAO',
        tags: 'Python Java JavaScript',
        status: 'final version',
        saleVolume: '5000',
        releaseDate: '2020/11/20',
        recentUpdateDate: '2020/11/24',
        description: 'This is about AI',
        rating: 4.6,
      },
      tableData: [{
        testcase: 'testcase_01',
        describe: 'This is the first testcase of the product, test its performance'
      }],
      ruleForm: {
        name: '',
        describe: '',
      },
      rules: {
        name: [
          {required: true, message: 'please input name', trigger: 'blur'}
        ],
        describe: [
          {required: true, message: 'please choose describe', trigger: 'change'}
        ],
      },
      tableInformation: [
        {
          name: 'Current Price',
          value: '',
        },
        {
          name:'Price',
          value: '',
        },
        {
          name:'Contributors',
          value: '',
        },
        {
          name:'Tags',
          value: '',
        },
        {
          name:'Status',
          value: '',
        },
        {
          name:'Sale Volume',
          value: '',
        },
        {
          name:'Release Date',
          value: '',
        },
        {
          name:'Recent Update Date',
          value: '',
        },
        {
          name:'Description',
          value: '',
        },
        {
          name:'Ratings',
          value: '',
        },
      ],
    }
  },
  methods: {
    getProductInformation: function () {
      this.$axios({
        method: 'get',
        url: '/product/' + this.productId
      }).then(res => {  //res是返回结果
        if (res.data['code'] == 20200) {
          let data = res.data['data'];
          this.product.name = data.productName;
          this.productName = data.productName;
          this.product.price = data.fixPrice;
          this.product.currentPrice = data.currentPrice;
          this.product.contributor = data.owners;
          this.product.tags = data.tags;
          this.product.status = data.status;
          this.product.saleVolume = data.salesVolume;
          this.product.releaseDate = data.create_time;
          this.product.recentUpdateDate = data.update_time;
          this.product.description = data.outline;
          this.product.rating = data.reviewStar;
          this.tableInformation[0].value = '$' + this.product.currentPrice;
          this.tableInformation[1].value = '$' + this.product.price;
          this.tableInformation[2].value = this.product.contributor;
          this.tableInformation[3].value = this.product.tags;
          this.tableInformation[4].value = this.product.status;
          this.tableInformation[5].value = this.product.saleVolume;
          this.tableInformation[6].value = this.product.releaseDate.substring(0, 10);
          this.tableInformation[7].value = this.product.recentUpdateDate.substring(0, 10);
          this.tableInformation[8].value = this.product.description;
          this.tableInformation[9].value = this.product.rating;
        }
      }).catch(function (error) { // 请求失败处理
        console.log(error);
      });
    },
    handleClick(tab, event) {
      //this.tableData = []
      if (tab.name == 'docker') {
        this.$axios({
          method: 'get',
          url: '',
        }).then(res => {  //res是返回结果
          console.log(res);
          if (res.data['code'] == "200") {
            let datalist = [];
            datalist = res.data['data'];
            for (let i = 0, length = datalist.length; i < length; i++) {
              let testcase = {
                testcase: datalist[i].testcasename,
                describe: datalist[i].describe,
              }
              this.tableData.push(testcase);
            }
          } else {
            this.$message({
              message: 'connect wrong',
              type: 'warning'
            })
          }
        });
      }
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    runtest(index, rows) {
      this.$axios({
        method: 'get',
        url: '/test/' + index,
      }).then(res => {  //res是返回结果
        if (res.data['code'] == "200") {
          this.testresult = res.data['testcode']
        } else {
          this.$message({
            message: 'connect wrong',
            type: 'warning'
          })
        }
      });
    },
    addtestcase() {
      this.dialogFormVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let testcase = {
            testcase: this.ruleForm.name,
            describe: this.ruleForm.describe,
            //上传的测试文件
          }
          this.tableData.push(testcase);
          this.dialogFormVisible = false;
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },

  mounted() {
    this.getProductInformation();
  }

}
