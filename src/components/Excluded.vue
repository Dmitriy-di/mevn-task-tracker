<template>
  <div>
    <h5>Исключенные</h5>
    <q-table
      v-if="!excluded.length == 0"
      class="q-mx-lg"
      :rows="excluded"
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

    const excluded = computed(() => store.getters.EXCLUDED);

    return {
      excluded,
      columns,
      pagination,
    };
  },
});
</script>
