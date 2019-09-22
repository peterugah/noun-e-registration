<template>
  <div class="columns is-centered">
    <div class="column is-3 box">
      <div class="field">
        <div class="control">
          <label for class="label">Enter Code</label>
          <input v-model="code" type="password" class="input" />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button @click="login" class="button is-info">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      code: ""
    };
  },
  methods: {
    login() {
      if (
        process.env.VUE_APP_CODE.trim().toLowerCase() !==
        this.code.trim().toLowerCase()
      ) {
        alert("wrong code entered...");
        return;
      }
      // login this computer
      window.localStorage.setItem("loggedIn", true);
      this.$router.push({name : "register"})
    }
  }
};
</script>