<template>
  <div>
    <div class="columns is-centered" v-if="loading">
      <div class="column is-3">
        <button class="button is-loading is-info is-fullwidth"></button>
      </div>
    </div>
    <div class="columns is-centered" v-if="!loading">
      <div class="column is-3">
        <div class="panel">
          <p class="panel-heading">Registered Users</p>
          <div class="panel-block">
            <p class="control">
              <input
                @focus="userprop = null"
                class="input is-small"
                type="text"
                placeholder="search"
                v-model="query"
              />
            </p>
          </div>
          <!--  -->
          <div v-if="query.trim().length > 0">
            <a
              class="panel-block"
              v-for="(user  , index) in filteredUsers"
              :key="index"
              @click="selectUser(user)"
            >
              <span class="level-item">{{user.name.toLowerCase()}}</span>
            </a>
          </div>
        </div>
      </div>
      <div class="column is-3 box">
        <div class="field">
          <div class="control">
            <label for class="label is-dark">Full Name</label>
            <input type="text" class="input" v-model="name" @focus="error = null" />
          </div>
        </div>
        <!--  -->
        <designation-comp :desig="desig" @designation="getDesignation"></designation-comp>
        <!--  -->
        <!-- <email-comp v-if="!userprop" @emails="getEmails" :mails="mails"></email-comp> -->
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
              @click="updateUser"
              :class="{'is-loading' : loadingBtn}"
              class="button is-warning is-pulled-right"
            >Upadate User</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import DesignationComp from "@/components/_Designation.vue";
import EmailComp from "@/components/_Email.vue";
export default {
  props: ["userprop"],
  components: {
    DesignationComp,
    EmailComp
  },
  mounted() {
    this.getAllRegisteredUsers();
  },
  watch: {},
  data() {
    return {
      loading: true,
      loadingBtn: false,
      id: "",
      mails: "",
      selectedUser: "",
      name: "",
      institution: "",
      desig: "",
      designation: "",
      paid: "",
      loading: true,
      query: "",
      users: []
    };
  },
  computed: {
    filteredUsers() {
      return this.users.filter(user => {
        // console.log(user.name);
        return (
          user.name.toLowerCase().includes(this.query.trim().toLowerCase()) ||
          user.emails.some(email => {
            return email
              .toLowerCase()
              .includes(this.query.trim().toLowerCase());
          })
        );
      });
    }
  },
  methods: {
    getEmails(emails) {
      this.mails = emails;
    },
    getDesignation(designation) {
      this.designation = designation;
    },
    selectUser(user) {
      this.id = user.id;
      this.name = user.name;
      this.institution = user.institution;
      this.paid = user.paid;
      this.desig = user.designation;
      this.mails = user.emails;
      this.$emit("setDesignation");
    },
    reset() {
      this.name = "";
      this.designation = "";
      this.emails = "";
      this.institution = "";
      this.paid = "";
      this.id = "";
      this.query = "";
      this.$emit("clearEmails");
      this.$emit("clearDesignation");
    },
    returnData() {
      return {
        name: this.name,
        designation: this.designation,
        emails: this.mails,
        institution: this.institution,
        paid: this.paid,
        id: this.id
      };
    },
    updateUser() {
      this.loadingBtn = true;
      axios({
        method: "post",
        url: `${process.env.VUE_APP_BACKEND}/update-user`,
        data: this.returnData()
      })
        .then(({ data }) => {
          this.loadingBtn = false;
          if (data.err) {
            throw data.msg;
          }

          this.getAllRegisteredUsers();
          this.reset();
        })
        .catch(msg => {
          this.loadingBtn = false;
          console.log(msg);
        });
    },
    loadPropData() {
      if (this.userprop) {
        let found = this.users.filter(({ id }) => id == this.userprop.id);
        this.selectUser(found.pop());
      }
    },
    getAllRegisteredUsers() {
      axios({
        method: "GET",
        url: `${process.env.VUE_APP_BACKEND}/all-registered`
      })
        .then(({ data }) => {
          this.loading = false;
          if (data.err) {
            throw data.msg;
          }
          this.users = data;
          this.loadPropData();
        })
        .catch(msg => {
          this.loading = false;
        });
    }
  }
};
</script>