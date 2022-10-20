<!--  -->
<template>
 <div class="homepage_container">
     <div class="homepage_header">头部</div>
     <div class="homepage_menu">菜单</div>
     <div class="homepage_content">右侧内容</div>
 </div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref} from 'vue'

</script>
<style lang='less' scoped>
.homepage_container {
  position: relative;
  height: 100%;
  width: 100%;
  .homepage_header {
    height: 70px;
    background-color: antiquewhite;
  }
  .homepage_menu {
    position: absolute;
    top: 70px;
    left: 0;
    bottom: 0;
    width: 250px;
    background-color: beige;
  }
  .homepage_content {
    position: absolute;
    top: 70px;
    right: 0;
    left: 250px;
    bottom: 0;
    background-color: skyblue;
  }
}
</style>