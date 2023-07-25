<template>
  <div>
    <h4>Chat</h4>
  </div>
</template>

<script>
import { defineComponent, computed, reactive, ref, onMounted } from "vue";
const { io } = require("socket.io-client");
const socket = io("http://localhost:3000");

export default defineComponent({
  setup() {
    socket.emit("events", { name: "Nest" });
    return {};
  },
});
</script>
