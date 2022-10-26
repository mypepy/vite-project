<!--  -->
<template>
  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column prop="id" label="编号"></el-table-column>
    <el-table-column prop="username" label="账号"></el-table-column>
    <el-table-column prop="nickName" label="姓名"></el-table-column>
    <el-table-column prop="email" label="邮箱"></el-table-column>
    <el-table-column label="添加时间">
      <template #default="scoped">
        {{ formateDate(scoped.row.createTime) }}
      </template>
    </el-table-column>
    <el-table-column label="最后登录">
      <template #default="scoped">
        {{ formateDate(scoped.row.loginTime) }}
      </template>
    </el-table-column>
    <el-table-column label="是否启用">
      <template #default="scoped">
        <el-switch
          v-model="scoped.row.status"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
      </template>
    </el-table-column>
    <el-table-column prop="prop" label="操作">
      <template #default="{ row }">
        <el-button type="text">分配角色</el-button>
        <el-button type="text" @click="editAdmin(row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <EditAdmin
    :visible="visible"
    @close="closeDialog"
    :form="rowData"
  ></EditAdmin>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref } from "vue";
import { getAdminList } from "../../../request/api";
import EditAdmin from "./components/editAdmin.vue";
let state = reactive<{
  tableData: {}[];
  visible: boolean;
  rowData: AdminObjItf;
}>({
  tableData: [],
  visible: false,
  rowData: {},
});
let { tableData, visible, rowData } = toRefs(state);
const fetchData = () => {
  getAdminList({
    keyword: "",
    pageSize: 10,
    pageNum: 1,
  }).then((res) => {
    if (res.code === 200) {
      tableData.value = res.data.list;
    }
  });
};
fetchData();
// 点击编辑
const editAdmin = (row: AdminObjItf) => {
  visible.value = true;
  rowData.value = row;
};
// 隐藏弹框
const closeDialog = (r?: "reload") => {
  visible.value = false;
  if (r === "reload") {
    // 更新表格数据
    fetchData();
  }
};
// 格式化时间
const formateDate = (time: string | undefined) => {
  if (!time) return "";
  const date = new Date(time);
  let year = date.getFullYear();
  let month = addZero(date.getMonth() + 1);
  let day = addZero(date.getDate());
  let hour = addZero(date.getHours());
  let min = addZero(date.getMinutes());
  let sec = addZero(date.getSeconds());
  return `${year}-${month}-${day}-${hour}-${min}-${sec}`;
};
const addZero = (num: number) => {
  return num > 9 ? num : "0" + num;
};
</script>
<style lang='less' scoped>
</style>