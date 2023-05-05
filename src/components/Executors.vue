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
          <q-td>{{ props.row.email.email }}</q-td>
          <q-td>{{ props.row.fullname.first_name }}</q-td>
          <q-td>{{ props.row.fullname.last_name }}</q-td>
          <button class="btn" @click="deleteSubject(props.row.id)">
            Удалить
          </button>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { defineComponent, computed, reactive } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    store.dispatch("fetchGroupResponsibles");
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

    return {
      executors,
      columns,
      pagination,
    };
  },
});
</script>
