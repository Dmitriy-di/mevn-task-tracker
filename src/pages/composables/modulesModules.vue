<template>
  <div>
    <q-table
      :rows="MOUDLE2"
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
            {{
              props.row.responsible?.fullname.first_name +
              " " +
              props.row.responsible?.fullname.last_name
            }}
          </q-td>
          <q-td>{{ props.row.dateTimeEnd }}</q-td>
          <q-td>{{ props.row.dateTimeStart }}</q-td>
          <q-td>
            {{
              props.row.tasks.reduce(function (a, b) {
                if (b.status == "assigned") {
                  return ++a;
                } else return a;
              }, 0)
            }}
          </q-td>
          <q-td>
            {{
              props.row.tasks.reduce(function (a, b) {
                if (b.status == "accomplished") {
                  return ++a;
                } else return a;
              }, 0)
            }}
          </q-td>
          <q-td>
            {{
              props.row.tasks.reduce(function (a, b) {
                if (b.status == "Completed") {
                  return ++a;
                } else return a;
              }, 0)
            }}
          </q-td>
          <q-td>
            <q-btn
              :disabled="disableRedBtn"
              @click.self="set_id($event, props.row, task)"
              class="q-mr-sm btn"
              :id="props.row.id"
            >
              Редактировать
            </q-btn>
            <q-btn
              :disabled="disableRedBtn"
              class="btn"
              @click="deleteModule(props.row)"
              >Удалить</q-btn
            >
          </q-td>
        </q-tr>
      </template>

      <template v-slot:top-left="props">
        <q-btn
          :disabled="disableAddBtn"
          class="q-mt-sm"
          color="green"
          @click="showForm_addModule = !showForm_addModule"
          >Добавить модуль</q-btn
        >
      </template>
    </q-table>

    <!-- <q-dialog v-model="showForm_addModule">
    <FormAddModule />
  </q-dialog>
  <q-dialog v-model="showForm_updateModule">
    <FormUpdateModule :mod="currentModuleClickUp" :idUpdateModule="id" />
  </q-dialog> -->
  </div>
</template>

<script>
import { computed, reactive, watch, ref, onMounted } from "vue";
import { useStore } from "vuex";
// import { GetPropertyStatus } from "src/api/main/queryes";
// import { useQuery } from "@vue/apollo-composable";
// import { DeleteTask, DeleteModule } from "src/api/main/mutations.js";
// import { useMutation } from "@vue/apollo-composable";
import { useQuasar } from "quasar";

export default {
  // components: {
  //   FormAddModule,
  //   FormUpdateModule,
  // },

  // OnMounted() {
  //   if (sessionStorage.role !== "Владелец") {
  //     this.disableAddBtn = true;
  //     this.disableRedBtn = true;
  //   }
  // },

  setup() {
    const id = ref(0);
    const idUpdateModule = ref(0);
    const idModule = ref(0);
    const store = useStore();

    const showForm_addModule = ref(false);
    let showForm_updateModule = ref(false);

    const currentModuleClickUp = ref();
    const MODULES = computed(() => store.getters.MODULES);
    const module_index = computed(() => store.getters.MODULE_INDEX);
    const current_module = reactive({});
    const propertyStatus = reactive({});

    const MOUDLE2 = ref([]);

    watch(MODULES, () => {
      MOUDLE2.value = [];

      MODULES.value.map((mod) => {
        MOUDLE2.value.push(mod);
      });

      console.log(MOUDLE2.value);
    });

    const pagination = reactive({
      rowsPerPage: 10,
      page: 1,
      sortBy: "name",
    });

    const columns = [
      {
        name: "Модуль",
        align: "left",
        label: "Модуль",
        field: "Модуль",
        sortable: true,
      },
      {
        name: "Ответственный",
        align: "left",
        label: "Ответственный",
        field: "Ответственный",
        sortable: true,
      },
      {
        name: "Дата начала",
        align: "left",
        label: "Дата начала",
        field: "Дата начала",
      },
      {
        name: "Дата окончания",
        align: "left",
        label: "Дата окончания",
        field: "Дата окончания",
      },
      {
        name: "Назначенные задачи",
        align: "left",
        label: "Назначенные задачи",
        field: "Назначенные задачи",
        sortable: true,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
      },
      {
        name: "Выполненные задачи",
        align: "left",
        label: "Выполненные задачи",
        field: "Выполненные задачи",
        sortable: true,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
      },
      {
        name: "Завершненные задачи",
        label: "Завершенные задачи",
        align: "left",
        field: "Завершенные задачи",
        sortable: true,
        sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
      },
      { name: "Действия", label: "Действия", align: "left", field: "Действия" },
    ];

    const disableAddBtn = ref(false);
    const disableRedBtn = ref(false);

    // onMounted(() => {
    //   if (sessionStorage.role !== "Владелец") {
    //     disableAddBtn.value = true;
    //     disableRedBtn.value = true;
    //   }
    // });
    const $q = useQuasar();
    // const deleteModule = async function (mod) {
    //   try {
    //     const apolloClient = new ApolloClient(getClientOptions());
    //     provideApolloClient(apolloClient);
    //     for (let task of mod.property8) {
    //       const { mutate } = useMutation(DeleteTask, () => ({
    //         variables: {
    //           id: task.id,
    //         },
    //       }));
    //       await mutate();
    //     }
    //     const { mutate } = useMutation(DeleteModule, () => ({
    //       variables: {
    //         id: mod.id,
    //       },
    //     }));
    //     mutate();
    //   } catch (err) {
    //     console.log("Ошибка", err);
    //   }
    // };

    const get_module = function (module_index) {
      current_module.values = MODULES.value[module_index.value];
    };

    //Получение свойства Status для определения статуса задачи по id
    // const { onResult } = useQuery(GetPropertyStatus);
    // onResult((queryResult) => {
    //   propertyStatus.values = queryResult.data.property.meta.options;
    // });

    watch(
      () => store.getters.MODULE_INDEX,
      () => get_module(module_index)
    );

    return {
      current_module,
      // deleteModule,
      propertyStatus,
      currentModuleClickUp,
      id,
      idModule,
      idUpdateModule,
      showForm_updateModule,
      showForm_addModule,
      MODULES,
      disableAddBtn,
      disableRedBtn,
      columns,
      MOUDLE2,
      pagination,
      set_id(env, mod, task) {
        id.value = env.target.id;
        idUpdateModule.value = env.target.id;
        currentModuleClickUp.value = mod;
        showForm_updateModule.value = !showForm_updateModule.value;
      },
    };
  },
};
</script>
