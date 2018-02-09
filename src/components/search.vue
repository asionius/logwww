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
        <el-form-item>
            <el-button @click="search">查询</el-button>
        </el-form-item>
        </el-form>
    </div>
    <div>
        {{list}}
    </div> 
</div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        servers: "",
        timeRange: "",
        content: ""
      },
      searchFormRule: {
        servers: [
          { required: true, trigger: "change", message: "请选择服务器" }
        ],
        timeRange: [{ required: true, trigger: "change", message: "请选择服务器" }],
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
    search() {
      this.$refs.searchForm.validate(valid => {
        if (!valid) return false;
        this.$fetch.api_users
          .search({
            servers: this.searchForm.servers,
            timeRange: this.searchForm.timeRange,
            content: this.searchForm.content
          })
          .then(data => {
            list = data.data;
            this.$refs.searchForm.resetFields();
          })
          .catch(err => {
            console.error(err);
            this.$message.error(err.msg);
          });
      });
    }
  }
};
</script>

<style>

</style>
