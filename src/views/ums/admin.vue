<!--  -->
<template>
<el-button type="primary" @click="editAdmin">添加用户</el-button>

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
        <el-button type="text" @click="allocRole(row.id)">分配角色</el-button>
        <el-button type="text" @click="editAdmin(row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <EditAdmin
    :visible="visible"
    @close="closeDialog"
    :form="rowData"
  ></EditAdmin>
  <EditRole
    :visible="roleVisible"
    :form="roleData"
    @close="closeRoleDialog"
  ></EditRole>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref } from "vue";
import {
  getAdminList,
  getRoleListAll,
  getAdminRoleByID,
} from "../../../request/api";
import EditAdmin from "./components/editAdmin.vue";
import EditRole from "./components/editRole.vue";
let state = reactive<{
  tableData: {}[];
  visible: boolean;
  rowData: AdminObjItf;
  roleVisible: boolean;
  roleData: AdminRoleFormData;
}>({
  tableData: [],
  visible: false,
  rowData: {},
  roleVisible: false,
  roleData: {
    userRole: [],
    roleList: [],
    adminId: 0,
  },
});
let { tableData, visible, rowData, roleVisible, roleData } = toRefs(state);
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
// 获取所有角色
getRoleListAll().then((res) => {
  if (res.code === 200) {
    roleData.value.roleList = res.data;
  }
});
// 点击分配角色
const allocRole = (id: number) => {
  getAdminRoleByID(id).then((res) => {
    if (res.code === 200) {
      roleVisible.value = true;
      rowData.value.adminId = id;
      roleData.value.userRole = res.data;
    }
  });
};
// 关闭弹框
const closeRoleDialog = () => {
  roleVisible.value = false;
};
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