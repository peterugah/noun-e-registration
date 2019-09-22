<template>
  <div>
    <br />
    <div class="columns is-centered" style="padding: 1em">
      <div class="column is-3">
        <div class="field">
          <div class="control">
            <button class="button is-fullwidth is-inverted is-info">{{items.length}} item(s) added</button>
          </div>
        </div>

        <!--  -->
        <search-comp @user="addUser"></search-comp>
        <!--  -->

        <br />
        <div class="field" v-if="items.length > 0">
          <div class="control">
            <button
              @click="createTags"
              :class="{'is-loading' : loading}"
              class="button is-warning"
            >Create Tags</button>
          </div>
        </div>
      </div>
      <div class="column is-3 box">
        <div v-for="(item , index) in items" :key="index" class="notification is-info">
          <p>{{item.name}}</p>
          <p>{{item.designation}}</p>
          <p>{{item.institution}}</p>
          <button @click="items.splice(index , 1)" class="delete" />
          <div class="level is-mobile">
            <button
              @click="reArrange(index ,i)"
              class="level-item button is-small"
              :class="{'is-warning' : index == i}"
              v-for="(item , i) in 4"
              :key="i"
            >{{i+1}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import SearchComp from "@/components/_SearchUser.vue";
export default {
  components: {
    SearchComp
  },
  data() {
    return {
      items: [],
      name: "",
      email: "",
      institution: "",
      designation: "",
      other: "",
      loading: false,
      data: ""
    };
  },
  methods: {
    reArrange(curindex, selectedindex) {
      this.items = this.items.filter(item => {
        return item.name.trim() !== "";
      });
      console.log("Getting here...");
      // check if item has upto 4 items
      const len = 4 - this.items.length;
      if (len !== 4) {
        for (let i = 0; i < len; i++) {
          this.items.push({
            name: "",
            email: "",
            designation: "",
            institution: ""
          });
        }
      }
      // swap
      let temp = this.items[selectedindex];
      this.items[selectedindex] = this.items[curindex];
      this.items[curindex] = temp;
      console.log(this.items[selectedindex]);
      console.log(this.items[curindex]);
      //
      // console.log(this.items);
    },
    addUser(user) {
      this.name = user.name;
      this.institution = user.institution;
      this.designation = user.designation;
      this.email = user.emails.pop();
      this.add();
    },
    add() {
      if (this.items.length == 4) {
        return false;
      }
      if (
        !this.name.trim() ||
        // !this.institution.trim() ||
        !this.designation.trim()
      ) {
        return false;
      }
      this.items.push(this.returnData());
      this.name = "";
      this.email = "";
      this.institution = "";
      this.designation = "";
    },
    returnData() {
      return {
        name: this.name,
        email: this.email,
        institution: this.institution,
        designation:
          this.designation.trim() == "other" ? this.other : this.designation
      };
    },
    createTags() {
      if (this.items.length == 0) {
        return false;
      }
      this.loading = true;
      axios({
        url: `${process.env.VUE_APP_BACKEND}/generate-tags`,
        method: "POST",
        data: { items: this.items }
        // responseType: "arraybuffer"
      })
        .then(({ data }) => {
          this.loading = false;
          if (data.err) {
            throw data.msg;
          }
          const link = `${process.env.VUE_APP_BACKEND}/download?file=${data}`;
          window.open(link);

          this.reset();
          this.others = "";
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    reset() {
      this.items = [];
      this.name = "";
      this.email = "";
      this.institution = "";
      this.designation = "";
    },
    register() {
      this.loading = true;
      axios({
        url: `${process.env.VUE_APP_BACKEND}/register`,
        method: "POST",
        data: this.items
      })
        .then(({ data }) => {
          this.loading = false;
          if (data.err) {
            throw data.msg;
          }
          // navigate to qr screen
          this.$router.push({ name: "qr", params: { data } });
          console.log(data);
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    }
  }
};
</script>