<template>
  <div>
    <h5>Исполнители</h5>
    <q-table
      v-if="!executors.length == 0"
      class="q-mx-lg"
      :rows="executors"
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
          <q-td>{{ props.row.email }}</q-td>
          <q-td>{{ props.row.first_name }}</q-td>
          <q-td>{{ props.row.last_name }}</q-td>
          <button
            v-if="!disableRedBtn"
            class="btn"
            @click="deleteSub(props.row.id)"
          >
            Удалить
          </button>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent, computed, reactive, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { deleteSubject } from "../services/index";

export default defineComponent({
  setup() {
    const store = useStore();
    const disableRedBtn = ref(false);

    const pagination = reactive({
      rowsPerPage: 10,
      page: 1,
      sortBy: "name",
    });

    const columns = [
      { name: "Почта", align: "left", label: "Почта", field: "Почта" },
      { name: "Имя", align: "left", label: "Имя", field: "Имя" },
      { name: "Фамилия", align: "left", label: "Фамилия", field: "Фамилия" },
      { name: "Действия", align: "left", label: "Действия", field: "Действия" },
    ];

    const executors = computed(() => store.getters.EXECUTORS);

    const deleteSub = (id) => {
      deleteSubject(id);
      store.dispatch("fetchGroupRExecutors");
    };

    onMounted(() => {
      if (localStorage.moderator != "true") {
        disableRedBtn.value = true;
      }
    });

    return {
      disableRedBtn,
      deleteSub,
      executors,
      columns,
      pagination,
    };
  },
});
</script>
