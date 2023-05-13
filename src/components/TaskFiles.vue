<template>
  <div>
    <q-table :rows="files" :columns="columns" row-key="id" class="q-mt-md">
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td v-for="col in props.cols" :key="col.name">
            {{ props.row[col.name] }}
          </q-td>
          <q-td>
            <q-btn
              color="primary"
              flat
              dense
              icon="visibility"
              @click="showImage(props.row)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <div v-if="selectedFile">
      <q-img :src="selectedFile" alt="Preview" class="q-mt-md" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { getPreviewFile, bytesToSize } from "../sdk/file";

export default defineComponent({
  props: {
    files: Array,
  },

  setup(props) {
    const files = ref(props.files);
    const selectedFile = ref(null);
    console.log(666, props.files);
    // Колонки таблицы
    const columns = [
      {
        name: "name",
        required: true,
        label: "Название",
        align: "left",
        field: "name",
      },
      {
        name: "size",
        required: true,
        label: "Размер",
        align: "left",
        field: "size",
        format: (val) => bytesToSize(Number(val)),
      },
      {
        name: "uploadDate",
        required: true,
        label: "Дата создания",
        align: "left",
        field: "uploadDate",
      },
    ];

    // Показать превью файла
    const showImage = async (file) => {
      selectedFile.value = await getPreviewFile(file.idFile);
    };

    return {
      files,
      selectedFile,
      columns,
      showImage,
    };
  },
});
</script>

<style>
/* Добавьте свои стили здесь */
</style>
