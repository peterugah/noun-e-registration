<template>
  <div>
    <div v-if="loading">
      <button class="button is-loading is-info"></button>
    </div>
    <div class="panel" v-if="!loading">
      <p class="panel-heading">Registered Users</p>
      <div class="panel-block">
        <p class="control">
          <input
            ref="query"
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
</template>
<script>
import axios from "axios";
export default {
  mounted() {
    this.getAllRegisteredUsers();
  },
  data() {
    return {
      loading: false,
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
    selectUser(user) {
      this.$emit("user", user);
      this.query = "";
      this.$refs.query.focus()
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
        })
        .catch(msg => {
          this.loading = false;
        });
    }
  }
};
</script>