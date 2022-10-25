<!--  -->
<template>
  <el-table :data="tableDate" style="width: 100%" border>
    <el-table-column prop="id" label="编号"> </el-table-column>
    <el-table-column prop="username" label="账号"> </el-table-column>
    <el-table-column prop="nickName" label="姓名"> </el-table-column>
    <el-table-column prop="email" label="邮箱"> </el-table-column>
    <el-table-column prop="createTime" label="添加时间"> </el-table-column>
    <el-table-column prop="loginTime" label="最后登录"> </el-table-column>
    <el-table-column prop="status" label="编号"> </el-table-column>
    <el-table-column prop="prop" label="操作"> </el-table-column>
  </el-table>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref } from "vue";
import { getAdminList } from "../../../request/api";
const state = reactive<{ tableDate: {}[] }>({
  tableDate: [],
});
const { tableDate } = toRefs(state);
getAdminList({
  keyword: "",
  pageSize: 10,
  pageNum: 1,
}).then((res) => {
  if (res.code === 200) {
    tableDate.value = res.data.list;
  }
});
</script>
<style lang='less' scoped>
</style>