<template>
  <div>
    <div class="container">
      <div class="outer">
        <div class="flap" id="flap" :style="flapStyle"></div>
        <div class="flap top"></div>
        <div class="flap bottom"></div>
        <div class="gap"></div>
      </div>
    </div>
    <button @click="start" :disabled="isProcessing">Start</button>
    <button @click="slow" :disabled="isProcessing">Slow</button>
  </div>
</template>

<script>
export default {
  name: "PataPata",
  data() {
    return {
      flapStyle: {}, 
      animation: "", 
      outputText: "", 
      isProcessing: false, 
      station_array: ["野町","西泉","新西金沢","押野","野々市","野々市工大前","馬替",
      "額住宅前","乙丸","四十万","陽羽里","曽谷","道法寺","井口","小柳","日御子","鶴来"], 
      // station_array:["野町","工大前","鶴来"], // 簡易版
      currentStationIndex: 0, 
      reverseOrder: false 
    };
  },
  methods: {
    async start() {
      if (!this.isProcessing) {
        this.isProcessing = true;
        await this.turnWithInput(this.station_array[this.currentStationIndex], 60);
        this.updateCurrentStationIndex();
        this.isProcessing = false;
      }
    },

    async slow() {
      if (!this.isProcessing) {
        this.isProcessing = true;
        await this.turnWithInput(this.station_array[this.currentStationIndex], 300);
        this.updateCurrentStationIndex();
        this.isProcessing = false;
      }
    },

    async updateCurrentStationIndex() {
      if (this.currentStationIndex === this.station_array.length - 1) {
        this.reverseOrder = true;
      } else if (this.currentStationIndex === 0 && this.reverseOrder) {
        this.reverseOrder = false;
      }

      if (this.reverseOrder) {
        this.currentStationIndex--;
      } else {
        this.currentStationIndex++;
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
