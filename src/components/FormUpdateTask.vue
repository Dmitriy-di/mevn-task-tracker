<template>
  <div class="wrapper">
    <section class="get-in-touch">
      <h3 class="title">Обновить задачу</h3>
      <q-form
        class="contact-form row flex-center"
        @submit.prevent="updTask($event)"
      >
        <q-input
          outlined
          v-model="form.name"
          name="name"
          id="name"
          class="col-11 q-mb-sm"
          type="text"
          label="Название"
        />

        <q-input
          outlined
          v-model="form.description"
          name="description"
          id="description"
          class="col-11 q-mb-sm"
          type="text"
          label="Описание"
        />

        <q-select
          outlined
          class="col-11 q-mb-sm"
          v-model="modelStatus"
          :options="optionsStatus"
          label="Статус"
        />

        <q-select
          class="col-11 q-mb-sm"
          outlined
          v-model="model"
          :options="options"
          label="Исполнитель"
        />

        <div class="form-field col-lg-12 justify-between flex">
          <q-btn color="green" type="submit" label="Обновить" />
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
import { updateTask } from "../services/index";

export default defineComponent({
  props: {
    id: String,
    task: Object,
  },

  setup(props) {
    const $q = useQuasar();
    const store = useStore();
    const options = computed(() => store.getters.OPTIONS_EXECUTORS);
    const EXECUTORS = computed(() => store.getters.EXECUTORS);
    const MODULES = computed(() => store.getters.MODULES);
    const optionsModules = computed(() => store.getters.OPTIONS_MODULES);
    const module_index = computed(() => store.getters.MODULE_INDEX);
    const model = ref(null);
    const modelStatus = ref(null);
    const modelModule = ref(null);
    const indexExecutor = ref(0);
    const optionsStatus = ["Назначена", "Выполнена", "Завершена"];
    const statusId = ref("");

    const form = ref({
      name: props.task.name,
      description: props.task.description,

      modelStatus: () => {
        let statusId = props.task.status;
        if (statusId == "assigned") {
          modelStatus.value = "Назначена";
        } else if (statusId == "accomplished") {
          modelStatus.value = "Выполнена";
        } else {
          modelStatus.value = "Завершена";
        }
      },
    });

    statusId.value = props.task.status;

    if (props.task.status == "assigned") {
      modelStatus.value = "Назначена";
    } else if (props.task.status == "accomplished") {
      modelStatus.value = "Выполнена";
    } else {
      modelStatus.value = "Завершена";
    }

    model.value =
      props.task.executor?.fullname.first_name +
      " " +
      props.task.executor?.fullname.last_name;

    indexExecutor.value = options.value.indexOf(model.value);

    watch(model, () => {
      indexExecutor.value = options.value.indexOf(model.value);
    });

    watch(modelStatus, () => {
      if (modelStatus.value == "Назначена") {
        statusId.value = "assigned";
      } else if (modelStatus.value == "Выполнена") {
        statusId.value = "accomplished";
      } else {
        statusId.value = "Completed";
      }
    });

    //   modulee: MODULES.value[module_index.value]._id,
    const updTask = async (e) => {
      await updateTask(props.task._id, {
        name: e.target.elements.name.value,
        description: e.target.elements.description.value,
        status: statusId.value,
        executor: EXECUTORS.value[indexExecutor.value]._id,
      });
      store.dispatch("fetchModules");
      store.dispatch("fetchTasks");
    };

    return {
      options,
      modelStatus,
      model,
      modelModule,
      updTask,
      optionsModules,
      optionsStatus,
      form,
    };
  },
});
</script>

<style></style>
