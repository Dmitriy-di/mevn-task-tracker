<template>
  <q-page class="q-pa-md flex flex-center">
    <div>
      <h5>Регистрация</h5>
      <q-form @submit="RegisterSubmit" @reset="RegisterReset">
        <q-input
          rounded
          v-model="name"
          label="Введите ваше имя"
          type="text"
          readonly
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Введите что нибудь']"
        >
        </q-input>
        <q-input
          rounded
          v-model="surname"
          label="Введите вашу фамилию"
          type="text"
          lazy-rules
          readonly
          :rules="[(val) => (val && val.length > 0) || 'Введите что нибудь']"
        >
        </q-input>
        <q-input
          readonly
          rounded
          v-model="email"
          label="Введите вашу почту"
          type="email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Введите что нибудь']"
        >
        </q-input>
        <q-dialog v-model="prompt" persistent @submit="SetPassword">
          <q-card>
            <q-card-section>
              <div class="text-h6">Код отправлен вам на почту</div>
            </q-card-section>
            <q-card-section>
              <q-input
                rounded
                v-model="code"
                label="Введите ваш код"
                type="password"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Введите что нибудь',
                ]"
              >
              </q-input>
            </q-card-section>
            <q-card-section>
              <q-input
                rounded
                v-model="password"
                label="Введите ваш пароль"
                type="password"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Введите что нибудь',
                ]"
              >
              </q-input>
            </q-card-section>
            <q-card-section>
              <q-input
                rounded
                v-model="password_repeat"
                label="Повторите пароль"
                type="password"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Введите что нибудь',
                ]"
              >
              </q-input>
            </q-card-section>
          </q-card>
        </q-dialog>
        <div class="q-mt-md">
          <q-btn disabled label="Отправить" type="submit" color="primary" />
          <q-btn
            disabled
            label="Сбросить"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
        <p class="q-pt-md">
          Уже есть аккаунт? <router-link to="/Enter">Войдите</router-link>
        </p>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const prompt = ref(false);
    const id = ref(0);
    const email = ref("");
    const password = ref("");
    const password_repeat = ref("");
    const code = ref("");
    const name = ref("");
    const surname = ref("");
    const $router = useRouter();
  },
});
</script>
