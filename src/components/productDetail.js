export default {
  name: 'productDetail',
  data() {
    return {
      username: localStorage.username,
      productName: 'Night City',
      radio: '',
      productId: this.$route.params.id,
      tabPosition: 'top',
      activeTab: 'first',
      dialogFormVisible: false,
      dialogResultVisible: false,
      productInfoVisible: false,
      IssueInfoVisible: false,
      SubIssueInfoVisible: false,
      dialogCodeVisible: false,
      dialogArtifactVisible: false,
      dialogTestcaseVisible: false,
      testresult: 'Result is: This team pass CS307 OOAD successfully',
      role: localStorage.role,
      activeName: '1',
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
      issues: [],
      subIssues: [],
      createIssue: {
        title: '',
        outline: '',
        context: '',
      },
      createSubIssue: {
        issueId: '',
        answerToWho: '',
        context: '',
      },
      tableData: [],
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
          name: 'Price',
          value: '',
        },
        {
          name: 'Contributors',
          value: '',
        },
        {
          name: 'Tags',
          value: '',
        },
        {
          name: 'Status',
          value: '',
        },
        {
          name: 'Sale Volume',
          value: '',
        },
        {
          name: 'Release Date',
          value: '',
        },
        {
          name: 'Recent Update Date',
          value: '',
        },
        {
          name: 'Description',
          value: '',
        },
        {
          name: 'Ratings',
          value: '',
        },
      ],
      editProduct: {
        name: '',
        currentPrice: '',
        contributor: [],
        tags: [],
        status: '',
        description: '',
      },
      codes: [],
      testcases: [],
      codeForm: {
        productId: '',
        description: '',
        lang: '',
        file: '',
      },
      artifactForm: {
        productId: '',
        description: '',
        version: '',
        status: '',
        lang: '',
        file: '',
      },
      testcaseForm: {
        productId:'',
        description: '',
        input: '',
        output: '',
        inputDescription: '',
        outputDescription: '',
        status: '',
        file: '',
      },
      artifacts: [],
      subIssueTable: [],
    }
  },
  methods: {
    //获取产品信息
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

    //展示产品信息编辑dialog
    showEditPage: function () {
      this.productInfoVisible = true;
      // 将原始个人信息显示在表单上
      this.editProduct.name = this.product.name;
      this.editProduct.description = this.product.description;
      this.editProduct.currentPrice = this.product.currentPrice;
      this.editProduct.tags = this.product.tags;
      this.editProduct.status = this.product.status;
      this.editProduct.contributor = this.product.contributor;
    },

    //展示Issue创建dialog
    showIssuePage: function () {
      this.IssueInfoVisible = true;
    },

    showSubIssuePage: function () {
      this.SubIssueInfoVisible = true;
    },

    showUploadPage: function () {
        this.dialogCodeVisible = true;
    },

    showArtifactPage: function () {
       this.dialogArtifactVisible = true;
    },

    showTestcasePage: function () {
      this.dialogTestcaseVisible = true;
    },

    //更改产品信息
    updateInfo: function () {
      //发送修改后的信息
      let fd = new FormData();
      fd.append("productName", this.editProduct.name);
      fd.append("outline", this.editProduct.description);
      fd.append("owners", this.editProduct.contributor);
      fd.append("tags", this.editProduct.tags);
      fd.append("status", this.editProduct.status);
      fd.append("currentPrice", this.editProduct.currentPrice);

      let contributor = ''
      for (let i = 0; i < this.editProduct.contributor.length; i++){
        contributor += this.editProduct.contributor[i] + '_';
      }
      contributor = contributor.substring(0, contributor.length - 1);

      let tags = ''
      for (let i = 0; i < this.editProduct.tags.length; i++){
        tags += this.editProduct.tags[i] + '_';
      }
      tags = tags.substring(0, tags.length - 1);

      this.$axios({
        method: 'put',
        url: '/product/' + this.productId,
        params: {
          productName: this.editProduct.name,
          outline: this.editProduct.description,
          currentPrice: this.editProduct.currentPrice,
          status: this.editProduct.status,
          contributors: contributor,
          tags: tags,
        },
      }).then(res => {
        if (res.data['code'] == 200) {
          this.$message('更新成功！');
          this.productInfoVisible = false;
          //重新获取信息
        } else {
          this.$message('更新失败!')
        }
      }).catch(function (error) {
        console.log(error);
      })
    },

    //获取Issue
    getIssues: function () {
      this.$axios({
        method: 'get',
        url: '/product/' + this.productId + '/issues',
      }).then(res => {  //res是返回结果
        console.log(res);
        if (res.data['code'] == "200") {
          this.issues = [];
          let datalist = res.data['data'];
          for (let i = 0, length = datalist.length; i < length; i++) {
            let issue = {
              issueId: datalist[i].issueId,
              title: datalist[i].title,
              outline: datalist[i].outline,
              context: datalist[i].context,
            }
            this.issues.push(issue);
          }
        } else {
          this.$message({
            message: 'connect wrong',
            type: 'warning'
          })
        }
      });
    },

    //获取SubIssue
    getSubIssues: function () {
      this.$axios({
        method: 'get',
        url: '/product/' + this.productId + '/issue/' + this.createSubIssue.issueId + '/sub_issues',
      }).then(res => {  //res是返回结果
        console.log(res);
        if (res.data['code'] == "200") {
          this.subIssueTable = [];
          let datalist = res.data['data'];
          for (let i = 0, length = datalist.length; i < length; i++) {
            let subIssue = {
              answerToWho: datalist[i].answerToWho,
              context: datalist[i].context,
            }
            this.subIssueTable.push(subIssue);
          }
        } else {
          this.$message({
            message: 'connect wrong',
            type: 'warning'
          })
        }
      });
    },

    //创建Issue
    updateIssue: function () {
      let fd = new FormData();
      fd.append("title", this.createIssue.title);
      fd.append("outline", this.createIssue.outline);
      fd.append("context", this.createIssue.context);

      this.$axios.post('/customer/' + this.username + '/product/' + this.productId + '/issue', fd).then(res => {
          console.log(res)
          if (res.data['code'] == 200) {
            this.$message('成功新建Issue');
            this.IssueInfoVisible = false;
            this.getIssues();
          } else {
            this.$message('构建Issue失败');
          }
        }
      )

    },

    //创建SubIssue
    updateSubIssue: function () {
      let fd = new FormData();
      fd.append("answerToWho", this.createSubIssue.answerToWho);
      fd.append("context", this.createSubIssue.context);

      this.$axios.post('/customer/' + this.username + '/product/' + this.productId + '/issue/' + this.createSubIssue.issueId + '/sub_issue', fd).then(res => {
          console.log(res)
          if (res.data['code'] == 200) {
            this.$message('成功新建SubIssue');
            this.SubIssueInfoVisible = false;
            this.getSubIssues();
          } else {
            this.$message('构建SubIssue失败');
          }
        }
      )

    },

    //cancel
    cancel: function () {
      this.productInfoVisible = false;
      this.IssueInfoVisible = false;
      this.SubIssueInfoVisible = false;
      this.dialogCodeVisible = false;
      this.dialogArtifactVisible = false;
      this.dialogTestcaseVisible = false;
    },

    //获取已上传的code文件
    getCodes: function () {
      this.$axios({
        method: 'get',
        url: '/product/' + this.productId + '/codes',
      }).then(res => {  //res是返回结果
        if (res.data['code'] == 200) {
          console.log(res);
          this.codes = [];
          var data = res.data['data'];
          for (let i = 0; i < data.length; i++) {
            let code = {
              id : data[i].id,
              uploader : data[i].uploader,
              description : data[i].description,
              uploadTime : data[i].uploadTime,
              updateTime : data[i].updateTime,
              location : data[i].location,
              fileName : data[i].fileName,
              lang: data[i].lang
            }
            this.codes.push(code);
          }
        }
      })
    },

    //获取Artifacts文件
    getArtifacts: function () {
      this.$axios({
        method: 'get',
        url: '/product/' + this.productId + '/artifacts',
      }).then(res => {  //res是返回结果
        if (res.data['code'] == 200) {
          console.log(res);
          this.artifacts = [];
          var data = res.data['data'];
          for (let i = 0; i < data.length; i++) {
            let artifact = {
              id : data[i].id,
              uploader : data[i].uploader,
              description : data[i].description,
              uploadTime : data[i].upload_time,
              updateTime : data[i].update_time,
              location : data[i].location,
              fileName : data[i].fileName,
              lang: data[i].lang
            }
            this.artifacts.push(artifact);
          }
        }
      })
    },

    //获取testcases文件列表
    getTestcases: function () {
      this.$axios({
        method: 'get',
        url: '/product/' + this.productId + '/testcases',
      }).then(res => {  //res是返回结果
        if (res.data['code'] == 200) {
          console.log(res);
          this.testcases = [];
          var data = res.data['data'];
          for (let i = 0; i < data.length; i++) {
            let testcase = {
              id : data[i].id,
              uploader : data[i].uploader,
              description : data[i].description,
              uploadTime : data[i].uploadTime,
              updateTime : data[i].updateTime,
              location : data[i].location,
              fileName : data[i].fileName,
              testStatus: data[i].testStatus,
            }
            this.testcases.push(testcase);
          }
        }
      })
    },


    //获取文件
    getFile(event) {
      this.codeForm.file = event.target.files[0];
      console.log(this.codeForm.file);
    },

    //获取artifact文件
    getArtifact(event) {
      this.artifactForm.file = event.target.files[0];
      console.log(this.artifactForm.file);
    },

    //获取testcase文件
    getTestcase(event) {
      this.testcaseForm.file = event.target.files[0];
      console.log(this.testcaseForm.file);
    },

    //提交code文件和相关信息
    submitCodeForm(event) {
      event.preventDefault();
      let formData = new FormData();
      formData.append('username', this.username);
      formData.append('productId', this.productId);
      formData.append('description', this.codeForm.description);
      formData.append('lang', this.codeForm.lang);
      formData.append('sourceCode', this.codeForm.file);

      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      ///contributor/{username}/product/{productId}/code
      this.$axios.post('/contributor/' + this.username + '/product/' + this.productId + '/code', formData, config).then(res => {
        if (res.status == 200) {
          console.log(res)
          this.$message("上传成功");
          this.getCodes();
        } else{
          this.$message("上传失败")
        }
      }).catch(function (error) { // 请求失败处理
        console.log(error);
      });
    },

    //提交artifact文件和相关信息
    submitArtifactForm(event) {
      event.preventDefault();
      let formData = new FormData();
      formData.append('username', this.username);
      formData.append('productId', this.productId);
      formData.append('description', this.artifactForm.description);
      formData.append('version', this.artifactForm.version);
      formData.append('status', this.artifactForm.status);
      formData.append('lang', this.artifactForm.lang);
      formData.append('artifact', this.artifactForm.file);

      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$axios.post('/contributor/' + this.username + '/product/' + this.productId + '/artifact', formData, config).then(res => {
        if (res.status == 200) {
          console.log(res)
          this.$message("上传成功");
          this.getArtifacts();
        } else{
          this.$message("上传失败")
        }
      }).catch(function (error) { // 请求失败处理
        console.log(error);
      });
    },

    //提交testcase文件和相关信息
    submitTestcaseForm(event) {
      event.preventDefault();
      let formData = new FormData();
      formData.append('username', this.username);
      formData.append('productId', this.productId);
      formData.append('description', this.testcaseForm.description);
      formData.append('input', this.testcaseForm.input);
      formData.append('output', this.testcaseForm.output);
      formData.append('inputDescription', this.testcaseForm.inputDescription);
      formData.append('outputDescription', this.testcaseForm.outputDescription);
      formData.append('status', this.testcaseForm.status);
      formData.append('uploadFile', this.testcaseForm.file);

      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$axios.post('/contributor/' + this.username + '/product/' + this.productId + '/testcase', formData, config).then(res => {
        if (res.status == 200) {
          console.log(res)
          this.$message("上传成功");
          this.getTestcases();
        } else{
          this.$message("上传失败")
        }
      }).catch(function (error) { // 请求失败处理
        console.log(error);
      });
    },

    //下载code文件
    downloadCode: function (index) {
      this.$axios.get('/contributor/' + this.username + '/product/' + this.productId + '/file', {
        params: {
          fileId: this.codes[index].id,
          type: 'code',
        }
      })
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.$message("下载成功")
          } else {
            this.$message("下载失败")
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    //下载artifact文件
    downloadArtifact: function (index) {
      this.$axios.get('/contributor/' + this.username + '/product/' + this.productId + '/file', {
        params: {
          fileId: this.artifacts[index].id,
          type: 'artifact',
        }
      })
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.$message("下载成功")
          } else {
            this.$message("下载失败")
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    //下载testcase文件
    downloadTestcase: function (index) {
      this.$axios.get('/product/' + this.productId + '/testcases')
        .then(res => {
          if (res.status == 200) {
            console.log(res);
            this.$message("下载成功")
          } else {
            this.$message("下载失败")
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    //手风琴面板事件触发
    handleChange: function (val) {
      this.createSubIssue.issueId = val;
      this.getSubIssues();
      console.log(val);
    },

    //切换标签页事件触发
    handleClick(tab, event) {
      if (tab.name == 'first') {
        this.getProductInformation();
      }
      if (tab.name == 'issues'){
        this.getIssues();
      }
      if (tab.name == 'code'){
        this.getCodes();
      }
      if (tab.name == 'artifact'){
        this.getArtifacts();
      }
      if (tab.name == 'testcase'){
        this.getTestcases();
      }
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

    //获取artifact信息
    getArtifactInformation() {
      this.$axios({
        method: 'get',
        url: '/product/' + this.productId + '/artifacts',
      }).then(res=>{
        if (res.data['code']==200){
          let datalist = [];
          datalist = res.data['data'];
          this.artifacts = [];
          for (let i = 0, length = datalist.length; i < length; i++) {
            let artifact = {
              name: datalist[i].fileName,
              id: datalist[i].id,
            }
            this.artifacts.push(artifact);
          }
          if(this.artifacts.length!=0) {
            this.radio = this.artifacts[0].id
          }
        }
      })
    },
    //获取testcase信息
    getTestcaseInformation() {
      this.$axios({
        method: 'get',
        url: '/product/' + this.productId + '/testcases',
      }).then(res=>{
        if (res.data['code']==200){
          let datalist = [];
          datalist = res.data['data'];
          for (let i = 0, length = datalist.length; i < length; i++) {
            let testcase = {
              testcase: datalist[i].fileName,
              describe: datalist[i].outPutDescription,
              id: datalist[i].id,
            }
            this.tableData.push(testcase);
          }
        }
      })
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },

    runtest(index, rows) {
      this.$axios({
        method: 'get',
        url: '/product/'+this.productId+'/artifacts/'+ this.radio+'/'+this.tableData[index].id,
      }).then(res => {  //res是返回结果
        if (res.data['code'] == "200") {
          this.testresult = res.data['testcode'];
          this.dialogResultVisible = true;
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
    this.getArtifactInformation();
    this.getTestcaseInformation();
  }

}
