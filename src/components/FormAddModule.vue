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
          v-model="form.name"
          label="Название"
          class="col-11 q-mb-sm"
          required
        />

        <q-input
          outlined
          v-model="form.description"
          label="Описание"
          class="col-11 q-mb-sm"
          required
        />

        <q-input
          filled
          v-model="form.dateStart"
          name="dateStart"
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
                <q-date v-model="form.dateStart" mask="YYYY-MM-DD HH:mm">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
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
                <q-time
                  v-model="form.dateStart"
                  mask="YYYY-MM-DD HH:mm"
                  format24h
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          filled
          v-model="form.dateEnd"
          name="dateEnd"
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
                <q-date v-model="form.dateEnd" mask="YYYY-MM-DD HH:mm">
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
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
                <q-time
                  v-model="form.dateEnd"
                  mask="YYYY-MM-DD HH:mm"
                  format24h
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

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
import { createModule } from "../services/index";

export default defineComponent({
  components: {},
  setup() {
    const $q = useQuasar();
    const store = useStore();
    const model = ref(null);
    const indexResponsible = ref(0);
    const name = ref("");
    const RESPONSIBLES = computed(() => store.getters.RESPONSIBLES);
    const options = computed(() => store.getters.OPTIONS_RESPONSIBLES);

    const form = ref({
      name: "",
      description: "",
      dateStart: "2019-02-01 12:44",
      dateEnd: "2019-02-01 12:44",
      responsible: "",
    });

    const createNewModule = async () => {
      await createModule({
        name: form.value.name,
        description: form.value.description,
        dateTimeStart: form.value.dateStart,
        dateTimeEnd: form.value.dateEnd,
        responsible: RESPONSIBLES.value[indexResponsible.value]._id,
      });
      store.dispatch("fetchModules");
    };

    watch(model, () => {
      indexResponsible.value = options.value.indexOf(model.value);
    });

    return {
      createNewModule,
      options,
      model,
      name,
      form,
    };
  },
});
</script>

<style></style>
