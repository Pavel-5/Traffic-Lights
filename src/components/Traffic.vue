<template>
  <div class="blocks">
    <div class="red block" :class="{ active: isRed }">{{ this.countRed }}</div>
    <div class="yellow block" :class="{ active: isYellow }"></div>
    <div class="green block" :class="{ active: isGreen }">
      {{ this.countGreen }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["color"],
  data() {
    return {
      isRed: false,
      isYellow: false,
      isGreen: false,
      countRed: null,
      countYellow: null,
      countGreen: null,
      nextColor: "",
      indexSetTimeout: null,
    };
  },
  methods: {
    timer(color, count) {
      if (color === "yellowToRed") {
        if (count > 1) {
          this.indexSetTimeout = setTimeout(() => {
            this.countYellow--;

            sessionStorage.setItem("countYellow", this.countYellow);

            this.timer(color, --count);
          }, 1000);
        } else {
          this.indexSetTimeout = setTimeout(() => {
            this.nextColor = "yellow";
            this.countYellow = null;

            sessionStorage.setItem("nextColor", this.nextColor);
            sessionStorage.setItem("countYellow", this.countYellow);

            this.$router.push({ path: "/red" });

            this.indexSetTimeout = null;
          }, 1000);
        }
      } else if (color === "yellowToGreen") {
        if (count > 1) {
          this.indexSetTimeout = setTimeout(() => {
            this.countYellow--;

            sessionStorage.setItem("countYellow", this.countYellow);

            this.timer(color, --count);
          }, 1000);
        } else {
          this.indexSetTimeout = setTimeout(() => {
            this.nextColor = "yellow";
            this.countYellow = null;

            sessionStorage.setItem("nextColor", this.nextColor);
            sessionStorage.setItem("countYellow", this.countYellow);

            this.$router.push({ path: "/green" });

            this.indexSetTimeout = null;
          }, 1000);
        }
      } else if (color === "green") {
        if (count > 4) {
          this.indexSetTimeout = setTimeout(() => {
            this.countGreen--;

            sessionStorage.setItem("countGreen", this.countGreen);

            this.timer(color, --count);
          }, 1000);
        } else {
          if (count === 0) {
            this.indexSetTimeout = setTimeout(() => {
              this.countGreen = null;
              this.isGreen = !this.isGreen;
              this.nextColor = "red";

              sessionStorage.setItem("nextColor", this.nextColor);
              sessionStorage.setItem("countGreen", this.countGreen);

              this.$router.push({ path: "/yellow" });

              this.indexSetTimeout = null;
            }, 1000);
          } else if (count % 2 === 1) {
            this.indexSetTimeout = setTimeout(() => {
              this.isGreen = !this.isGreen;

              this.timer(color, --count);
            }, 300);
          } else if (count % 2 === 0) {
            this.indexSetTimeout = setTimeout(() => {
              this.countGreen--;
              this.isGreen = !this.isGreen;

              sessionStorage.setItem("countGreen", this.countGreen);

              this.timer(color, --count);
            }, 700);
          }
        }
      } else {
        if (count > 1)
          this.indexSetTimeout = setTimeout(() => {
            this.countRed--;

            sessionStorage.setItem("countRed", this.countRed);

            this.timer(color, --count);
          }, 1000);
        else {
          this.indexSetTimeout = setTimeout(() => {
            this.countRed = null;
            this.isRed = !this.isRed;
            this.nextColor = "green";

            sessionStorage.setItem("nextColor", this.nextColor);
            sessionStorage.setItem("countRed", this.countRed);

            this.$router.push({ path: "/yellow" });

            this.indexSetTimeout = null;
          }, 1000);
        }
      }
    },

    changeСolor() {
      if (this.nextColor === "red") {
        this.countYellow = sessionStorage.getItem("countYellow")
          ? sessionStorage.getItem("countYellow")
          : 3;

        sessionStorage.removeItem("countRed");
        sessionStorage.removeItem("countGreen");

        this.timer("yellowToRed", this.countYellow);
      } else if (this.nextColor === "yellow") {
        if (this.color === "green") {
          this.countGreen = sessionStorage.getItem("countGreen")
            ? sessionStorage.getItem("countGreen")
            : 15;

          sessionStorage.removeItem("countRed");
          sessionStorage.removeItem("countYellow");

          this.timer("green", Number(this.countGreen) + 1);
        } else {
          this.countRed = sessionStorage.getItem("countRed")
            ? sessionStorage.getItem("countRed")
            : 10;

          sessionStorage.removeItem("countYellow");
          sessionStorage.removeItem("countGreen");

          this.timer("red", this.countRed);
        }
      } else if (this.nextColor === "green") {
        this.countYellow = sessionStorage.getItem("countYellow")
          ? sessionStorage.getItem("countYellow")
          : 3;

        sessionStorage.removeItem("countRed");
        sessionStorage.removeItem("countGreen");

        this.timer("yellowToGreen", this.countYellow);
      }
    },

    setColor() {
      if (this.color === "yellow") {
        this.isYellow = true;
        this.isRed = false;
        this.isGreen = false;
      } else if (this.color === "green") {
        this.isGreen = true;
        this.isRed = false;
        this.isYellow = false;
      } else {
        this.isRed = true;
        this.isYellow = false;
        this.isGreen = false;
      }
    },

    clear() {
      if (this.color === "red" || this.color === "green")
        this.nextColor = "yellow";
      else if (this.color === "yellow") this.nextColor = "green";
      else this.$router.push({ path: "/red" });

      this.countRed = null;
      this.countGreen = null;
    },
  },
  mounted() {
    this.nextColor = sessionStorage.getItem("nextColor")
      ? sessionStorage.getItem("nextColor")
      : "yellow";

    this.setColor();
    this.changeСolor();
  },
  watch: {
    $route() {
      if (this.indexSetTimeout) {
        clearTimeout(this.indexSetTimeout);
        this.clear();
      }

      this.setColor();
      this.changeСolor();
    },
  },
};
</script>

<style>
.blocks {
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: auto;
  padding: 10px 0;
  background-color: #333333;
}

.block {
  height: 200px;
  width: 200px;
  border-radius: 50%;
  opacity: 0.2;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
}

.red {
  background-color: #ff0000;
  color: #ff9d9d;
}

.yellow {
  background-color: #ffff00;
}

.green {
  background-color: #008000;
  color: #60ff5b;
}

.active {
  opacity: 1;
}
</style>