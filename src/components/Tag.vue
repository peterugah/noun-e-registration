<template>
  <div>
    <div class="columns is-centered notPrint" >
      <div class="column is-5 has-text-centered ">
        <!--  -->
        <div class="field notPrint">
          <div class="control">
            <button class="button is-success" @click="print">Print</button>
            &nbsp;
            <router-link to="/" tag="button" class="button">home</router-link>
          </div>
        </div>
        <img :src="link" alt="" id="image">
      </div>
    </div>
  </div>
</template>
<style >
  @media print {
    *{
      padding:0;
      margin:0;
    }

      .notPrint{
        display:none;
      }

  }
</style>
<script>
import axios from "axios";


export default {
  mounted() {
    console.log(this.link)
  },
  props: ["data"],
  data() {
    return {
      link: `${process.env.VUE_APP_BACKEND}/tag?id=${this.data.id}`
    };
  },
  methods: {
    print(){
      window.print()
    }
  },
};
</script>