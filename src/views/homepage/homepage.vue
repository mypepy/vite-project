<!--  -->
<template>
  <div class="common-layout">
    <el-container>
      <el-header>电商运营管理系统</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="2"
            text-color="#fff"
            :unique-opened="true"
            :router="true"
          >
            <el-sub-menu
              :index="menu.id + ''"
              v-for="menu in newMenus"
              :key="menu.id"
            >
              <template #title>
                <el-icon><location /></el-icon>
                <span>{{ menu.title }}</span>
              </template>
              <template v-for="submenu in menu.children">
                <el-menu-item
                  :index="'/' + menu.name + '/' + submenu.name"
                  v-if="submenu.hidden==0"
                  :key="submenu.id"
                  >{{ submenu.title }}</el-menu-item
                ></template
              >
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-container>
          <el-main><router-view></router-view></el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>


<script lang='ts' setup>
import { reactive, toRefs, ref, computed } from "vue";
import { useStore } from "vuex";
interface MenuObj {
  parentId: number;
  id: number;
  children?: MenuObj[];
  title: string;
  hidden: 0 | 1;
  name: string;
}
interface NewMenus {
  [key: number]: MenuObj;
}
const store = useStore();
const newMenus = computed<NewMenus>(() => store.getters.getNewMenus);
</script>
<style lang='less' scoped>
.common-layout {
  height: 100%;
}
</style>