<template>
<div>
    <div style="display: inline-block; text-align: left;">
        <el-form :model="searchForm" label-width="140px" :rules="searchFormRule" label-position="right" ref="searchForm" style="width: 90%;">
        <el-form-item label="请选择服务器" prop="servers">
            <el-select class="select-server" multiple v-model="searchForm.servers">
                <el-option v-for="server in servers" :key="server.id" :label="server" :value="server">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="timeRange">
            <el-popover slot="label" trigger="hover" placement="top">
                <span>时间范围尽量小于一天</span>
                <i slot="reference" class="el-icon-warning">请选择时间范围</i>
            </el-popover>
            <el-date-picker
                v-model="searchForm.timeRange"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                align="right">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="搜索内容" prop="content">
            <el-input v-model="searchForm.content"></el-input>
        </el-form-item>
        <el-form-item label="是否生成下载文件" prop="generateDownloadFile">
            <el-switch v-model="searchForm.generateDownloadFile"></el-switch>
        </el-form-item>
        <el-form-item label="操作">
            <el-button @click="search">查询</el-button>
        </el-form-item>
        <el-form-item label="查询结果文件">
          <div v-show="downloadVisible">
            <a :download="downloadFile" href="/result.txt">点击下载查询结果</a>
          </div>
        </el-form-item>
        </el-form>
    </div>
    <div>
      <pre style="text-align: left;">{{list}}</pre>
    </div> 
</div>
</template>

<script>
export default {
  data() {
    return {
      downloadVisible: false,
      downloadFile: "result.txt",
      searchForm: {
        servers: "",
        timeRange: "",
        content: "",
        generateDownloadFile: false
      },
      searchFormRule: {
        servers: [
          { required: true, trigger: "change", message: "请选择服务器" }
        ],
        timeRange: [
          { required: true, trigger: "change", message: "请选择服务器" }
        ],
        content: [
          { required: true, trigger: "blur", message: "请输入要查找的内容" }
        ]
      },
      servers: [
        "10.255.157.131",
        "124.207.236.29",
        "124.207.236.30",
        "124.207.236.40",
        "124.207.236.41",
        "124.207.236.42",
        "124.207.236.43",
        "124.207.236.44",
        "124.207.236.45",
        "124.207.236.46",
        "124.207.253.84",
        "124.207.253.85",
        "172.17.100.26",
        "172.17.100.27",
        "172.17.100.34"
      ],
      ss: "",
      timeRange: "",
      list: ""
    };
  },
  methods: {
    setFileVisible(visible) {
      this.downloadVisible = visible;
    },
    search() {
      if (
        this.searchForm.timeRange[1].getTime() -
          this.searchForm.timeRange[0].getTime() >
        1000 * 60 * 60 * 24
      ) {
        this.$message.warning("请选择时间差小于一天");
        return;
      }
      this.$refs.searchForm.validate(valid => {
        if (!valid) return false;
        const loading = this.$loading({
          lock: true,
          text: "正在查询请稍后....",
          spinner: "el-icon-loading"
        });
        this.$fetch.api_users
          .search({
            servers: this.searchForm.servers,
            timeRange: this.searchForm.timeRange,
            content: this.searchForm.content,
            generateDownloadFile: this.searchForm.generateDownloadFile
          })
          .then(data => {
            loading.close();
            if (this.searchForm.generateDownloadFile) {
              this.downloadVisible = true;
              return;
            }

            this.list = data.data;
            if (this.list.length == 0) this.$message.warning("没有查询到结果");
            // this.$refs.searchForm.resetFields();
          })
          .catch(err => {
            console.error(err);
            this.$message.error(err.msg);
            loading.close();
          });
      });
    }
  },
  watch: {
    "searchForm.generateDownloadFile": function(n, o) {
      this.downloadVisible = false;
    }
  }
};
</script>

<style>

</style>
