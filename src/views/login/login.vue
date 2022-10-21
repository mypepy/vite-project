<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    class="demo-ruleForm"
  >
    <el-form-item prop="username">
      <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item prop="pwd">
      <el-input v-model="ruleForm.pwd" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="loginFn()">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref } from "vue";
import { adminLoginApi, getAdminInfoApi } from "../../../request/api";
import cookie from "js-cookie";
import { useRouter } from "vue-router";
import {useStore} from 'vuex'
const state = reactive({
  ruleForm: {
    username: "admin",
    pwd: "123456",
  },
});
const validatePwd = (
  rule: unknown,
  value: string | undefined,
  cb: (msg?: string) => void
) => {
  if (!value) {
    cb("密码不能为空");
  } else {
    cb();
  }
};
// 校验规则
const rules = reactive({
  username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
  pwd: [{ validator: validatePwd, trigger: "blur" }],
});
let { ruleForm } = toRefs(state);
// 获取路由对象
let router = new useRouter();
// 获取vuex对象
let store=useStore();
// 获取form组件对象
let ruleFormRef = ref();
const loginFn = () => {
  ruleFormRef.value
    .validate()
    .then(() => {
      adminLoginApi({
        password: ruleForm.value.pwd,
        username: ruleForm.value.username,
      }).then((res) => {
        if (res.code === 200) {
          // 存储token
          // js-cookie
          cookie.set("token", res.data.tokenHead + res.data.token, {
            expires: 7,
          });
          // 获取用户信息
          getAdminInfoApi().then((res) => {
            if (res.code === 200) {
              // 存储的vuex
              store.commit('UPDATEMENUS',res.data.menus);
              router.push("/homepage");
              
            }
          });
        }
      });
    })
    .catch(() => {
      console.log("校验不通过");
    });
};
</script>
<style lang='less' scoped>
</style>