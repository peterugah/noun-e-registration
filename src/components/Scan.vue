<template>
  <div>
    <br />
    <div class="columns is-centered" style="padding: 1em">
      <div class="column is-3">
        <qrcode-stream @decode="decode"></qrcode-stream>
      </div>
      <div class="column is-3 box">
        <div>
          <button class="button is-loading is-fullwidth is-info" v-if="loading"></button>
        </div>
        <div v-if="user">
          <div class="field">
            <div class="control">
              <label for class="label">Name</label>
              <input type="text" disabled :value="user.name" class="input" />
            </div>
            <!--  -->
            <div class="control">
              <label for class="label">Designation</label>
              <input type="text" disabled :value="user.designation" class="input" />
            </div>
            <!--  -->
            <div class="control">
              <label for class="label">Institution</label>
              <input type="text" disabled :value="user.institution" class="input" />
            </div>
            <!--  -->
            <div class="control">
              <label for class="label">Paid</label>
              <button
                class="button"
                :class="{'is-success' : user.paid , 'is-danger' : !user.paid}"
              >{{user.paid == true ? 'YES' : 'NO'}}</button>
              <!-- <button v-if="!user.paid" class="button is-pulled-right is-info">UPDATE TO YES</button> -->
            </div>
            <!--  -->
            <br />
            <div class="field">
              <div class="control">
                <router-link
                  class="button is-fullwidth is-warning"
                  tag="button"
                  :to="{name : 'search' , params : {userprop : user}}"
                >EDIT</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { QrcodeStream } from "vue-qrcode-reader";

export default {
  mounted() {
    // this.getCameras();
  },
  data() {
    return {
      camera: [],
      user: null,
      loading: false
    };
  },
  components: {
    QrcodeStream
  },
  methods: {
    decode(value) {
      const id = value.split("/").pop();
      this.loading = true;
      axios
        .get(`${process.env.VUE_APP_BACKEND}/preview?id=${id}`)
        .then(({ data }) => {
          this.loading = false;
          if (data.err) {
            throw data.msg;
          }
          this.user = data;
        })
        .catch(msg => {
          this.loading = false;
          console.log(msg);
        });
    },
    getCameras() {
      window.navigator.mediaDevices.enumerateDevices().then(devices => {
        devices.forEach(({ deviceId, kind, label, groupId }) => {
          // console.log(groupId)
          if (kind == "videoinput") {
            console.log(deviceId, label);
            this.camera.push({ id: deviceId, name: label });
          }
        });
        console.log("camera is ", this.camera);
        const videoTag = document.querySelector(".camera");

        navigator.mediaDevices
          .getUserMedia({
            video: { videoId: this.camera[1].id }
            // audio: false
          })
          .then(stream => {
            console.log("stream is ", stream);
            videoTag.srcObject = stream;
            console.log(videoTag.srcObject);
          });
        // console.log(this.camera);
      });
    }
  }
};
</script>