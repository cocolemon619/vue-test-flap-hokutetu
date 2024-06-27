<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Hello Vue 3.0 + Vite" />
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
