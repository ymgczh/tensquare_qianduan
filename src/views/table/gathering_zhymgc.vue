<template>
  <div class="block">
    <br />
    <el-form :inline="true">
      <el-form-item label="活动名称">
        <el-input v-model="searchMap.name" />
      </el-form-item>
      <el-form-item label="活动日期">
        <el-date-picker v-model="searchMap.starttime_1" type="date" placeholder="选择开始日期"></el-date-picker>
        <el-date-picker v-model="searchMap.starttime_2" type="date" placeholder="选择结束日期"></el-date-picker>
      </el-form-item>
      <el-button @click="fetchData()" type="primary">查询</el-button>
      <el-button @click="handleEdit('')" type="primary">新增</el-button>
    </el-form>

    <el-table :data="list" stripe style="width: 100%">
      <el-table-column prop="id" label="活动ID" width="180"></el-table-column>
      <el-table-column prop="name" label="活动名称" width="180"></el-table-column>
      <el-table-column prop="sponsor" label="主办方" width="180"></el-table-column>
      <el-table-column prop="address" label="活动地址" width="180"></el-table-column>
      <el-table-column prop="starttime" label="开始时间" width="180"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row.id)" type="text" size="small">修改</el-button>
          <el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="fetchData"
      @current-change="fetchData"
      :current-page="currentPage"
      :page-sizes="[5,10,20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form label-width="80px">
        <el-form-item label="活动名称">
          <el-input v-model="pojo.name"></el-input>
        </el-form-item>
        <el-form-item label="基本地址">
          <el-input v-model="pojo.address"></el-input>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker v-model="pojo.starttime" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="截止日期">
          <el-date-picker v-model="pojo.endtime" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="报名截止">
          <el-date-picker v-model="pojo.enrolltime" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="活动详情">
          <el-input type="textarea" :rows="2" v-model="pojo.detail"></el-input>
        </el-form-item>
        <el-form-item label="是否可见">
          <el-switch active-value="1" inactive-value="0" v-model="pojo.state"></el-switch>
        </el-form-item>

        <el-form-item label="选择城市">
          <el-select v-model="pojo.city" placeholder="请选择">
            <el-option
              v-for="item in cityList"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="hanleSave()">保存</el-button>
          <el-button @click="dialogFormVisible=false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import gatheringApi from "@/api/gathering_zhymgc";
import cityApi from "@/api/city";

export default {
  data() {
    return {
      list: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      searchMap: {},
      dialogFormVisible: false,
      pojo: {},
      cityList: [],
      id: ""
    };
  },
  created() {
    this.fetchData();
    cityApi.getList().then(response => {
      this.cityList = response.data;
    });
  },
  methods: {
    fetchData() {
      gatheringApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then(response => {
          this.list = response.data.rows;
          this.total = response.data.total;
        });
    },
    hanleSave() {
      gatheringApi.update(this.id, this.pojo).then(response => {
        this.$message({
          message: response.message,
          type: response.flag ? "success" : "error"
        });

        if (response.flag) {
          this.fetchData();
        }
      });

      this.dialogFormVisible = false;
    },
    handleEdit(id) {
      this.id = id;
      this.dialogFormVisible = true;
      if (id != "") {
        gatheringApi.findById(id).then(response => {
          if (response.flag) {
            this.pojo = response.data;
          }
        });
      } else {
        this.pojo = {};
      }
    },
    handleDelete(id) {
      gatheringApi.deleteById(id).then(response => {
        if (response.flag) {
          this.$message({
            message: response.message,
            type: response.flag ? "success" : "error"
          });
        }
      });
    }
  }
};
</script>
