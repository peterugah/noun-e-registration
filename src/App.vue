<template>
  <div>
    <logo-comp class="notPrint"></logo-comp>
    <side-bar></side-bar>
    <router-view></router-view>
    <div class="has-text-centered notPrint">
      <br />
      <p>&copy; teckplus technologies</p>
    </div>
  </div>
</template>

<style>
</style>

<script>
import LogoComp from "@/components/Logo.vue";
import SideBar from "@/components/SideBar.vue";
export default {
  components: {
    LogoComp,
    SideBar
  }
};
</script>