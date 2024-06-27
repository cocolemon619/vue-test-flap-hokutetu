<template>
  <div>
    <div class="container">
      <div class="outer">
        <div class="flap" id="flap" :style="flapStyle">{{ animation }}</div>
        <div class="flap top"></div>
        <div class="flap bottom"></div>
        <div class="gap"></div>
      </div>
    </div>
    <input type="text" v-model="inputText" placeholder="Enter text" />
    <button @click="start" :disabled="isProcessing">Start</button>
    <button @click="slow" :disabled="isProcessing">Slow</button>
  </div>
</template>

<script>
export default {
  name: "PataPata",
  data() {
    return {
      flapStyle: {}, // Add flapStyle data property
      animation: "", // Add animation data property
      inputText: "", // Add inputText data property
      outputText: "", // Add outputText data property
      isProcessing: false // Add isProcessing data property
    };
  },
  methods: {
    async start() {
      if (!this.isProcessing && this.inputText) {
        this.isProcessing = true;
        await this.turnWithInput(this.inputText, 60);
        this.isProcessing = false;
      }
    },

    async slow() {
      if (!this.isProcessing && this.inputText) {
        this.isProcessing = true;
        await this.turnWithInput(this.inputText, 200);
        this.isProcessing = false;
      }
    },

    async turnWithInput(text, duration) {
      this.outputText = ""; // Reset outputText
      for (let i = 0; i < text.length; i++) {
        this.outputText += text.charAt(i);
        await this.turnFlap(this.outputText, duration);
      }
    },

    async turnFlap(nextMsg, duration) {
      const flap = document.querySelector("#flap");
      const flapT = document.querySelector(".flap.top");
      const flapB = document.querySelector(".flap.bottom");

      flapT.innerHTML = nextMsg;
      flap.style.zIndex = 11;
      flapB.style.zIndex = 12;
      flapT.style.zIndex = 10;
      flapT.style.display = "block";
      flapB.style.display = "block";

      let animation = flap.animate([{ transform: "rotateX(-90deg)" }], {
        duration: duration,
      });
      await animation.finished;

      flap.style.transform = "rotateX(90deg)";
      flap.innerHTML = nextMsg;
      flap.style.zIndex = 11;
      flapB.style.zIndex = 10;
      flapT.style.zIndex = 12;

      animation = flap.animate([{ transform: "rotateX(0deg)" }], {
        duration: duration,
        fill: "forwards",
      });
      await animation.finished;
      animation.commitStyles();
      animation.cancel();

      flapB.innerHTML = flap.innerHTML;
      flapB.style.display = "none";
      flapT.style.display = "none";
    },
  },
};
</script>
