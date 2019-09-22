<template>
  <div>
    <div class="columns is-centered">
      <div class="column is-3">
        <div class="field" v-if="error">
          <div class="notification is-info">
            <span v-html="error"></span>
            <button class="delete" @click="error = null"></button>
          </div>
        </div>
        <!--  -->

        <div class="field">
          <div class="control">
            <label for class="label is-dark">Full Name</label>
            <input type="text" class="input" v-model="name" @focus="error = null" />
          </div>
        </div>
        <!--  -->
        <designation-comp @designation="getDesignation"></designation-comp>
        <!--  -->
        <email-comp @emails="getEmails"></email-comp>
        <!--  -->
        <div class="field">
          <div class="control">
            <label for class="label is-dark">Institution</label>
            <input type="text" class="input" v-model="institution" @focus="error = null" />
          </div>
        </div>

        <div class="field">
          <div class="control">
            <label for class="label">Paid ?</label>
            <label class="radio">
              <input type="radio" name="answer" value="true" v-model="paid" @click="error = null" />
              Yes
            </label>
            <label class="radio">
              <input type="radio" name="answer" value="false" v-model="paid" @click="error = null" />
              No
            </label>
          </div>
        </div>
        <!--  -->
        <div class="field">
          <div class="control">
            <button
              :class="{'is-loading' : loading}"
              @click="addUsers"
              class="button is-warning is-pulled-right"
            >Add User</button>
          </div>
        </div>
      </div>
      <!-- column 2 -->
      <div class="column is-3 box">
        <div class="field">
          <div class="control">
            <button class="button is-fullwidth">{{users.length}} users added</button>
          </div>
        </div>
        <div class="tags">
          <span class="tag" v-for="(user,  index) in users" :key="index">
            {{user.name}}
            <button class="delete" @click="users.splice(index , 1)" />
          </span>
        </div>
        <button
          v-if="users.length > 0"
          :class="{'is-loading' : loading}"
          @click="register"
          class="button is-info is-fullwidth"
        >Register</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import EmailComp from "@/components/_Email.vue";
import DesignationComp from "@/components/_Designation.vue";
export default {
  components: {
    EmailComp,
    DesignationComp
  },
  data() {
    return {
      name: "",
      emails: [],
      institution: "",
      paid: null,
      designation: "",
      loading: false,
      error: null,
      users: []
    };
  },
  methods: {
    getDesignation(designation) {
      this.designation = designation;
      console.log(this.designation);
    },
    getEmails(emails) {
      this.emails = emails;
      console.log(this.emails);
    },
    addUsers() {
      if (this.validateFields()) {
        this.users.push(this.returnData());
        this.name = "";
        this.emails = [];
        this.institution = "";
        this.designation = "";
        this.paid = null;
        console.log(this.users);
        this.$emit("clearEmails");
        this.$emit("clearDesignation");
      }
    },
    validateFields() {
      if (!this.name.trim()) {
        this.error = "please enter the users full name";
        return false;
      }
      if (this.emails.length == 0) {
        this.error = "please enter at least one valid email address";
        return false;
      }
      if (!this.designation.trim()) {
        this.error = "please enter the users designation";
        return false;
      }
      if (!this.paid) {
        this.error = "please specify if this user has paid";
        return false;
      }
      return true;
    },
    returnData() {
      return {
        name: this.name,
        emails: this.emails,
        institution: this.institution,
        designation: this.designation,
        paid: this.paid
      };
    },
    register() {
      this.error = null;
      this.loading = true;
      axios({
        url: `${process.env.VUE_APP_BACKEND}/register`,
        method: "POST",
        data: this.users
      })
        .then(({ data }) => {
          this.loading = false;
          if (data.err) {
            throw data.msg;
          }
          console.log(data);
          this.users = [];
        })
        .catch(err => {
          this.loading = false;
          this.error = err.join("<br>");
        });
    }
  }
};
</script>