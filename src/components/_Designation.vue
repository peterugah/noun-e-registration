<template>
  <div>
    <div class="field">
      <div class="control">
        <label for class="label is-dark">Designation</label>
        <div class="select is-fullwidth">
          <select v-model="designation" @change="changeDesignation">
            <option v-for="(desig , index) in designations" :key="index" :value="desig">{{desig}}</option>
          </select>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="field">
      <div class="control" v-if="designation == 'OTHER'">
        <input
          @blur="changeDesignation"
          type="text"
          class="input"
          v-model="other"
          placeholder="enter the designation"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["desig"],
  mounted() {
    this.$parent.$on("clearDesignation", () => {
      this.designation = "";
      this.other = "";
    });
    this.$parent.$on("setDesignation", () => {
      this.changeDesignation();
    });
  },

  watch: {
    desig() {
      if (this.designations.includes(this.desig)) {
        this.designation = this.desig;
        this.changeDesignation();
      } else {
        this.designation = "OTHER";
        this.other = this.desig;
      }
    }
  },

  data() {
    return {
      designations: [
        "OTHER",
        "KEYNOTE SPEAKER",
        "SPEAKER",
        "MID PRESENTER",
        "PARTICIPANT",
        "DISCUSSANT",
        "USHER",
        "MEDIA",
        "CORPORATE PARTNER",
        "STUDENT",
        "LEAD PRESENTER",
        "EXHIBITOR",
        "ICT",
        "LOC CHAIRPERSON",
        "HOST",
        "COMMITTEE MEMBER",
        "PRO CHANCELLOR",
        "VICE CHANCELLOR"
      ],
      other: "",
      designation: this.desig
    };
  },
  methods: {
    selectedDesig(desig) {
      if (this.desig) {
        if (this.desig == desig) {
          return true;
        }
        return false;
      }
      return false;
    },
    changeDesignation() {
      const desig = this.designation == "OTHER" ? this.other : this.designation;
      this.$emit("designation", desig);
    }
  }
};
</script>