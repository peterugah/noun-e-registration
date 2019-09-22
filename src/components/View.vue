<template>
  <div class="columns is-centered">
    <div class="column is-5">
      <!--  -->
      <div class="notification is-warning" v-if="error">{{error}}</div>
      <div v-if="record">
        <div class="field">
          <div class="control">
            <label for class="label">Name</label>
            <p>{{record.name}}</p>
          </div>
        </div>
        <!--  -->
        <!-- <div class="field">
          <div class="control">
            <label for class="label">Email</label>
            <p>{{record.emails.join(",")}}</p>
          </div>
        </div> -->
        <!--  -->
        <div class="field">
          <div class="control">
            <label for class="label">Designation</label>
            <p>{{record.designation}}</p>
          </div>
        </div>
        <!--  -->
        <div class="field" v-if="record.institution.trim()">
          <div class="control">
            <label for class="label">Institution</label>
            <p>{{record.designation}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  props: ["id"],
  mounted() {
    this.fetchRecord();
  },
  data() {
    return {
      error: null,
      record: null
    };
  },
  methods: {
    fetchRecord() {
      axios
        .get(`${process.env.VUE_APP_BACKEND}/view/${this.id}`)
        .then(({ data }) => {
          if (data.err) {
            throw data.msg;
          }
          this.record = data;
        })
        .catch(msg => {
          this.error = msg;
        });
    }
  }
};
</script>