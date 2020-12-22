export default {
  name: 'productDetail',
  data() {
    return {
      productName: 'Slay the fire',
      productId: this.$route.params.id,
      tabPosition: 'top',
      activeTab: 'first',
      product: {
        name: 'Products1',
        currentPrice: '$3.2',
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
    }
  },

  methods: {
    handleClick(tab, event) {
      //this.tableData = []
      if(tab.name == 'docker'){
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

    },
    addtestcase() {

    }
  }
}
