<template>
  <div>
    <div class="field" v-if="error">
      <div class="control">
        <div class="notification">Email is invalid</div>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <label for class="label">Email</label>
        <input
          @focus="error  = false"
          @keypress="error = false"
          @keypress.enter="addEmail"
          @keypress.tab="addEmail"
          @blur="addIfExists"
          type="text"
          class="input"
          placeholder
          v-model="email"
        />
      </div>
    </div>
    <div class="field">
      <div class="control">
        <div class="tags are-medium">
          <span v-for="(email , index) in emails" :key="index" class="tag">
            {{email}}
            <button class="delete" @click="emails.splice(index , 1)" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["mails"],
  mounted() {
    this.$parent.$on("clearEmails", () => {
      this.email = "";
      this.emails = [];
    });
  },
  data() {
    return {
      email: "",
      emails: [],
      error: false
    };
  },
  watch: {
    mails() {
        this.emails = this.mails;
    }
  },
  methods: {
    addIfExists() {
      if (this.validateEmail()) {
        this.emails.push(this.email.trim());
        this.email = "";
        this.$emit("emails", this.emails);
      }
    },
    addEmail() {
      if (this.validateEmail()) {
        this.emails.push(this.email.trim());
        this.email = "";
        this.$emit("emails", this.emails);
      } else {
        //   an error occured
        this.error = true;
      }
    },
    validateEmail() {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.email.trim().toLowerCase());
    }
  }
};
</script>