<template>
  <div>
    <div class="columns is-centered">
      <div class="column is-5 has-text-centered">

        <qrcode-vue :value="value" :size="size" level="H"></qrcode-vue>
        <!--  -->
        <br />
        <button class="button is-info">send mail</button> &nbsp;
        <button class="button is-success" @click="generateTag">Generate Tag</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import QrcodeVue from "qrcode.vue";
export default {
  props: ["data"],

  data() {
    return {
      value: "",
      value: `${process.env.VUE_APP_BACKEND}/qr?id=${this.data.id}`,
      size: 300
    };
  },
  components: {
    QrcodeVue
  },
  methods: {
    generateTag() {
      this.$router.push({ name: "generate-tag", params: { data : this.data } });
    }
  }
};
</script>