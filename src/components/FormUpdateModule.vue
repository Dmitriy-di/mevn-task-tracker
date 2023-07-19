<template>
  <div class="wrapper">
    <section class="get-in-touch">
      <h3 class="title">Редактирование модуля</h3>
      <q-form
        class="contact-form row flex-center"
        @submit.prevent="upModule($event)"
      >
        <q-input
          outlined
          v-model="form.name"
          label="Название"
          class="col-11 q-mb-sm"
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
          label="Время окончания"
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
          <q-btn type="submit" color="green" label="Обновить" />
          <q-btn color="primary" label="Отменить" v-close-popup />
        </div>
      </q-form>
    </section>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { updateModule } from "../services/index";

export default defineComponent({
  props: {
    idUpdateModule: Number,
    mod: Object,
  },

  setup(props) {
    const $q = useQuasar();
    const store = useStore();
    const model = ref(null);
    const indexResponsible = ref(0);

    const form = ref({
      name: props.mod.name,
      dateStart: props.mod.dateTimeStart,
      dateEnd: props.mod.dateTimeEnd,
    });

    model.value =
      props.mod.subject.first_name + " " + props.mod.subject.last_name;

    const options = computed(() => store.getters.OPTIONS_RESPONSIBLES);
    indexResponsible.value = options.value.indexOf(model.value);
    const responsible = computed(() => store.getters.RESPONSIBLES);

    watch(model, () => {
      indexResponsible.value = options.value.indexOf(model.value);
    });
    console.log(form.value.dateStart);

    const upModule = async () => {
      let data = {
        name: form.value.name,
        dateTimeStart: form.value.dateStart,
        dateTimeEnd: form.value.dateEnd,
        subject: responsible.value[indexResponsible.value].id,
      };

      console.log(props, data);
      await updateModule(props.idUpdateModule, data);
      store.dispatch("fetchModules");
      store.dispatch("fetchTasks");
    };

    return {
      upModule,
      options,
      model,
      form,
    };
  },
});
</script>
<style></style>
