<template>
<router-view></router-view>
</template>

<script lang='ts' setup>
import { reactive, toRefs, ref} from 'vue'

</script>
<style lang='less'>
@import url("./assets/styles/rebase.less");
#app{
  width: 100%;
  height: 100%;
}
.common-layout{
    // background-color: red;
  }
</style>