<template>
  <div>
    <h4>Пользователей онлайн: {{ usersOnline }}</h4>
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
            v-for="(msg, index) in msgHistory"
            :key="index"
            :name="
              msg.Distributor
                ? msg.Distributor?.name_organisation
                : msg.Wirehouse_owner?.name_organisation
            "
            :text="[msg.message]"
            :sent="msg[userType]?.email == userEmail"
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

    <div>
      <!-- <q-select
        name="role"
        label="Выбрать пользователя"
        v-model="userType"
        :options="usersOption"
      /> -->

      <form @submit.prevent="createChat" action="">
        <input
          class="formInput"
          v-model="nameNewChat"
          type="text"
          placeholder="Новый чат"
        />
        <!-- <button type="submit">Создать чат</button> -->
      </form>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
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

const submit = () => {
  socket.emit("message", {
    email: localStorage.getItem("email"),
    msg: inputMsg.value,
  });

  inputMsg.value = "";
};

socket.on("connect", function () {
  console.log("Connected!");
});

// socket.on("message", (data) => {
//   console.log(data);
// });

// watch(roomId, () => {
//   const choicedRoom = roomsOptions.value.filter(
//     (el) => el.value == roomId.value
//   );
//   socket.emit("joinRoom", {
//     roomName: choicedRoom[0].label,
//     roomId: choicedRoom[0].value,
//   });
//   console.log("roomName", choicedRoom[0].label);
// });

onMounted(() => {
  socket.emit("connection", localStorage.getItem("email"), (data) => {
    rooms.value = data;
    store.commit("setRooms", rooms.value);
    console.log("chats", data);
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
