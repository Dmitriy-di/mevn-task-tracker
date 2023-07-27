<template>
  <div>
    <h4>{{ currentRoomId }}</h4>
    <div>
      <q-btn-toggle
        v-model="roomId"
        color="brown"
        text-color="white"
        toggle-color="orange"
        toggle-text-color="black"
        rounded
        unelevated
        glossy
        :options="roomsOptions"
      />
    </div>

    <div
      style="backgroun-color: red"
      class="q-pa-md flex justify-center column"
    >
      <div class="q-pa-md row justify-center">
        <div style="width: 100%; max-width: 400px">
          <!-- <div v-for="msg in msgHistory" :key="msg.id">
            {{ msg.Distributor }}
          </div> -->

          <q-chat-message
            v-for="(msg, index) in chatHistory"
            :key="index"
            :name="msg.subject.first_name"
            :text="[msg.message]"
            :sent="msg.subject.email == userEmail"
          />
        </div>
      </div>

      <form @submit.prevent="submit" action="">
        <input
          class="formInput"
          v-model="inputMsg"
          type="text"
          placeholder="Введите сообщение"
        />
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { useStore } from "vuex";
// import { getUsers } from "../services/index";
// import { getRoom, getRooms } from "../services/index";

const { io } = require("socket.io-client");
const socket = io("http://localhost:3000");

const store = useStore();

const roomId = ref(1);
const inputMsg = ref();
const userType = ref(localStorage.getItem("userRole"));
const msgHistory = ref([]);
const usersOption = ref([]);
const roomsOptions = ref([]);
const nameNewChat = ref();
const userEmail = ref(localStorage.getItem("email"));
let usersOnline = ref(0);
let chatNubmer = ref();
const rooms = ref([]);
const currentRoomId = computed(() => store.getters.CURRENT_ROOM_ID);
const chatHistory = ref([]);
const previousRoomId = ref("");

watch(currentRoomId, () => {
  socket.emit("roomId", currentRoomId.value, (value) => {
    chatHistory.value = value;
    console.log(value);
  });
  console.log(chatHistory.value);
});

const submit = () => {
  console.log(previousRoomId.value);
  socket.emit("message", {
    email: localStorage.getItem("email"),
    msg: inputMsg.value,
    roomId: currentRoomId.value,
    previousRoomId: previousRoomId.value,
  });

  previousRoomId.value = roomId.value;

  inputMsg.value = "";
};

socket.on("connect", function () {
  console.log("Connected!");
});

socket.on("message", (message) => {
  chatHistory.value.push(message);
});

onMounted(() => {
  socket.emit("connection", localStorage.getItem("email"), (data) => {
    rooms.value = data;
    store.commit("setRooms", rooms.value);
  });
});
</script>

<style lang="scss" scoped>
.my-custom-toggle {
  border: 1px solid #027be3;
}
.formInput {
  width: 100%;
}
</style>
