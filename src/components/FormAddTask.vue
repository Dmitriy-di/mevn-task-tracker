<template>
  <div class="wrapper">
    <section class="get-in-touch">
      <h3 class="title">Новая задача</h3>
      <q-form
        class="contact-form row flex-center"
        @submit.prevent="createNewTask"
      >
        <q-input
          outlined
          v-model="form.name"
          name="name"
          label="Имя"
          id="name"
          type="text"
          class="col-11 q-mb-sm"
          required
        />

        <q-input
          outlined
          v-model="form.description"
          name="description"
          id="description"
          type="text"
          label="Описание"
          class="col-11 q-mb-sm"
          required
        />

        <q-select
          outlined
          v-model="status"
          :options="optionsStatus"
          label="Статус"
          class="col-11 q-mb-sm"
        />

        <q-select
          outlined
          v-model="model"
          :options="options"
          label="Исполнитель"
          class="col-11 q-mb-sm"
        />

        <div class="form-field col-lg-12 justify-between flex">
          <q-btn color="green" type="submit" label="Создать" />
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
import { createTask } from "../services/index";

export default defineComponent({
  props: {
    idModule: Number,
  },
  setup(props) {
    const $q = useQuasar();
    const store = useStore();
    const model = ref(null);
    const indexExecutor = ref(0);
    const indexModule = ref(0);
    const optionsStatus = ["Назначена", "Выполнена", "Завершена"];
    const descriptionValue = ref("");
    const nameValue = ref("");
    const status = ref("");
    const executors = computed(() => store.getters.EXECUTORS);
    const MODULES = computed(() => store.getters.MODULES);
    const options = computed(() => store.getters.OPTIONS_EXECUTORS);

    const form = ref({
      name: "",
      description: "",
      statusId: "",
    });

    const createNewTask = async () => {
      await createTask({
        name: form.value.name,
        description: form.value.description,
        status: form.value.statusId,
        subject: executors.value[indexExecutor.value].id,
        modulee: props.idModule,
      });
      store.dispatch("fetchModules");
      store.dispatch("fetchTasks");
    };

    watch(model, () => {
      indexExecutor.value = options.value.indexOf(model.value);
    });

    watch(status, () => {
      if (status.value == "Назначена") {
        form.value.statusId = "assigned";
      } else if (status.value == "Выполнена") {
        form.value.statusId = "accomplished";
      } else {
        form.value.statusId = "completed";
      }
    });

    return {
      descriptionValue,
      nameValue,
      options,
      form,
      status,
      model,
      createNewTask,
      optionsStatus,
    };
  },
});
</script>
