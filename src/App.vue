<template>
  <div>
    <div class="title">
      <img alt="Vue logo" src="./assets/logo.png" />
      <h1>北陸鉄道石川線駅名表示</h1>
    </div>
    <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
    <PataPata />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import PataPata from "./components/PataPataArray.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    PataPata,
  },
};
</script>
