<template>
  <div class="wrapper">
    <section class="get-in-touch">
      <h3 class="title">Новый модуль</h3>
      <form
        class="contact-form flex flex-center row"
        @submit.prevent="createNewModule"
      >
        <q-input
          outlined
          v-model="name"
          label="Название"
          class="col-11 q-mb-sm"
          required
        />

        <div class="q-pa-md" style="max-width: 300px">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input
              filled
              v-model="date"
              name="date"
              outlined
              label="Время начала"
              class="col-11 q-mb-sm"
              required
            >
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <div>
              <q-btn label="Submit" type="submit" color="primary" />
            </div>
          </q-form>
        </div>

        <q-input
          outlined
          v-model="endData"
          label="Дата окончания"
          class="col-11 q-mb-sm"
          required
        />

        <q-input
          outlined
          v-model="endTime"
          label="Время окончания"
          class="col-11 q-mb-sm"
          required
        />

        <q-select
          outlined
          v-model="model"
          :options="options"
          label="Ответсвенный"
          class="col-11 q-mb-sm"
        />
        <div class="form-field col-lg-12 justify-between flex">
          <q-btn
            color="primary"
            label="Создать"
            type="submit"
            class="submit-btn"
          />
          <q-btn color="primary" label="Отменить" v-close-popup />
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
export default defineComponent({
  components: {},
  setup() {
    const $q = useQuasar();
    const store = useStore();
    const model = ref(null);
    const indexResponsible = ref(0);
    const name = ref("");
    const startData = ref("");
    const startTime = ref("");
    const endData = ref("");
    const endTime = ref("");
    const RESPONSIBLES = computed(() => store.getters.RESPONSIBLES);
    const options = computed(() => store.getters.OPTIONS_RESPONSIBLES);

    const date = ref("2019-02-01 12:44");

    const createNewModule = () => {};

    const onSubmit = (evt) => {
      // const formData = new FormData(evt.target);
      // const data = [];

      // for (const [name, value] of formData.entries()) {
      //   data.push({
      //     name,
      //     value,
      //   });
      // }

      // console.log("formData", formData);
      // console.log("data", data);
      console.log(evt.target.elements.date.value);
    };

    watch(model, () => {
      indexResponsible.value = options.value.indexOf(model.value);
    });

    return {
      createNewModule,
      onSubmit,
      options,
      model,
      name,
      startData,
      startTime,
      endData,
      endTime,
      date,
    };
  },
});
</script>

<style></style>
