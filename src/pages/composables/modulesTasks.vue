<template>
  <div>
    <h5>{{ MODULES[module_index].name }}</h5>

    <q-table
      v-if="!MODULES[module_index].tasks.length == 0"
      :rows="MODULES[module_index].tasks"
      :columns="columns"
      :pagination="pagination"
      :pagination-labels="{
        rowsPerPage: 'Строк на странице',
        rowsPerPageAll: 'Все',
      }"
      :rows-per-page-options="[5, 10, 20]"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td>{{ props.row.name }}</q-td>
          <q-td>
            {{ props.row.description }}
          </q-td>

          <q-td
            :class="
              props.row.status == 'assigned'
                ? 'assigned'
                : props.row.status == 'accomplished'
                ? 'accomplished'
                : 'completed'
            "
          >
            {{
              (function () {
                if (props.row.status == "assigned") {
                  return "Назначена";
                } else if (props.row.status == "accomplished")
                  return "Выполнена";
                else if (props.row.status == "Completed") return "Завершена";
              })()
            }}
          </q-td>

          <q-td>
            {{
              props.row.executor?.fullname?.first_name +
              " " +
              props.row.executor?.fullname?.last_name
            }}
          </q-td>

          <q-td>
            <button
              class="q-mr-sm btn"
              @click.self="set_id($event, props.row)"
              :id="props.row.id"
            >
              Редактировать
            </button>
            <button class="btn" @click="delTask(props.row._id)">Удалить</button>
            <button class="btn" @click.self="set_id2(props.row)">Файлы</button>
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-btn
      class="q-mt-sm"
      color="green"
      @click="showForm_addTask = !showForm_addTask"
      >Добавить задачу</q-btn
    >
    <div v-if="MODULES[module_index].tasks.length == 0">Список задач пуст</div>

    <q-dialog v-model="showForm_addTask">
      <FormAddTask :idModule="MODULES[module_index]._id" />
    </q-dialog>

    <q-dialog v-model="showForm_updateTask">
      <FormUpdateTask :task="currentTaskClickUp" :id="id" />
    </q-dialog>

    <q-dialog v-model="showForm_filesForm">
      <FormFiles :task="currentTaskClickUp" />
    </q-dialog>
  </div>
</template>

<script>
import { computed, ref, reactive, watch } from "vue";
import { useStore } from "vuex";
import FormAddTask from "components/FormAddTask.vue";
import { deleteTask } from "../../services/index";
import { useQuasar } from "quasar";
import FormUpdateTask from "../../components/FormUpdateTask.vue";
import FormFiles from "../../components/Files.vue";

export default {
  components: {
    FormAddTask,
    FormUpdateTask,
    FormFiles,
  },

  setup() {
    const id = ref(0);
    const idUpdateModule = ref(0);
    const store = useStore();
    const showForm_addTask = ref(false);
    const showForm_updateTask = ref(false);
    const showForm_filesForm = ref(false);
    const currentTaskClickUp = ref();
    const $q = useQuasar();
    const MODULES = computed(() => store.getters.MODULES);
    const module_index = computed(() => store.getters.MODULE_INDEX);

    // watch(MODULES, () => {
    //   currentTaskClickUp.value = MODULES.value.filter(
    //     (a) => a.tasks._id == currentTaskClickUp.value._id
    //   );
    // });

    const pagination = reactive({
      rowsPerPage: 10,
      page: 1,
      sortBy: "name",
    });

    const columns = [
      { name: "Задача", align: "left", label: "Задача", field: "Задача" },
      { name: "Описание", align: "left", label: "Описание", field: "Описание" },
      { name: "Статус", align: "left", label: "Статус", field: "Статус" },
      {
        name: "Исполнитель",
        align: "left",
        label: "Исполнитель",
        field: "Исполнитель",
      },
      { name: "Действия", align: "left", label: "Действия", field: "Действия" },
    ];

    const delTask = async (id) => {
      await deleteTask(id);
      store.dispatch("fetchTasks");
      store.dispatch("fetchModules");
    };

    return {
      showForm_addTask,
      showForm_updateTask,
      module_index,
      showForm_filesForm,
      delTask,
      id,
      idUpdateModule,
      currentTaskClickUp,
      MODULES,
      columns,
      pagination,
      set_id(env, task) {
        id.value = env.target.id;
        idUpdateModule.value = env.target.id;
        currentTaskClickUp.value = task;
        showForm_updateTask.value = !showForm_updateTask.value;
      },
      set_id2(task) {
        showForm_filesForm.value = !showForm_filesForm.value;
        currentTaskClickUp.value = task;
      },
    };
  },
};
</script>

<style>
.assigned {
  background-color: rgb(199, 21, 160) !important;
}
.accomplished {
  background-color: rgb(235, 220, 20) !important;
}
.completed {
  background-color: rgb(100, 207, 67) !important;
}
</style>
