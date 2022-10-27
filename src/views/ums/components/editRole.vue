<!--  -->
<template>
  <el-dialog title="" v-model="visible" :before-close="close">
    <el-form :model="form">
      <el-form-item>
        <el-select multiple v-model="roles">
          <el-option
            v-for="role in form.roleList"
            :label="role.name"
            :value="role.id"
          >
          </el-option>
        </el-select> </el-form-item
    ></el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="updateRole">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref, watch } from "vue";
import {updateAdminRole} from '../../../../request/api'
const roles = ref<number[]>([]);
const prop = defineProps<{
  visible: boolean;
  form: AdminRoleFormData;
}>();
const emits = defineEmits<{
  (event: "close"): void;
}>();
watch(
  () => prop.form.userRole,
  () => {
    roles.value = prop.form.userRole.map((item) => item.id);
  }
);
const close = () => {
  emits("close");
};
const updateRole = () => {
    updateAdminRole({adminId:prop.form.adminId,roleIds:roles.value.join(',')}).then(res=>{
        if(res.code===200){
            close();
        }
    })
  
};
</script>
<style lang='less' scoped>
</style>