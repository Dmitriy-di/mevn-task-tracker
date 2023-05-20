<template>
  <div>
    <h5 class="flex flex-center">Добавление в команды</h5>
    <div class="wrapper join">
      <div class="join__block">
        <q-form
          @submit.prevent="addNewExecuter"
          class="join__form-executer q-mr-xl"
        >
          <q-input
            name="name"
            type="text"
            placeholder="Имя"
            v-model="formExec.name"
          />
          <q-input
            name="surname"
            type="text"
            placeholder="Фамилия"
            v-model="formExec.surname"
          />
          <q-input
            name="eMail"
            type="text"
            class="q-mb-sm"
            placeholder="Почта"
            v-model="formExec.eMail"
          />

          <q-input
            name="password"
            type="text"
            class="q-mb-sm"
            placeholder="Пароль"
            v-model="formExec.password"
          />

          <q-select
            name="role"
            label="Роль пользователя"
            v-model="formExec.role"
            :options="roleOptions"
          />

          <q-checkbox v-model="formExec.isModerator" label="Модератор" />
          <div>
            <q-btn :disabled="disableRedBtn" type="submit"
              >Добавить в группу</q-btn
            >
          </div>
        </q-form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";

import { createSubject } from "../services/subjects.service";

export default defineComponent({
  components: {},
  setup() {
    const roleOptions = ref([
      { label: "Ответственный", value: "ответственный" },
      { label: "Исполнитель", value: "исполнитель" },
    ]);

    const disableRedBtn = ref(false);

    const formExec = ref({
      name: "",
      surname: "",
      eMail: "",
      role: "",
      isModerator: false,
      password: "",
    });

    const addNewExecuter = () => {
      console.log("formExec", formExec.value);
      let role = "";

      console.log(1, formExec.value.role.value);
      if (formExec.value.role.value == "ответственный") {
        role = "6454a1cf13681c3e308f8e70";
      } else {
        role = "6454a1b713681c3e308f8e6f";
      }
      console.log(1, role);

      createSubject({
        fullname: {
          first_name: formExec.value.name,
          last_name: formExec.value.surname,
        },
        email: formExec.value.eMail,
        group: role,
        password: formExec.value.password,
        moderator: formExec.value.isModerator,
      });
    };

    onMounted(() => {
      if (localStorage.moderator != "true") {
        disableRedBtn.value = true;
      }
    });

    return {
      addNewExecuter,
      disableRedBtn,
      roleOptions,
      formExec,
    };
  },
});
</script>

<style lang="scss">
.wrapper {
}
.join {
  display: flex;
  padding: 20px;
  &__block {
  }
  &__form-executer {
  }
}
</style>
