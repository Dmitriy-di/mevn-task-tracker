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
            <q-btn
              color="primary"
              flat
              dense
              icon="delete"
              @click="deleteFileF(props.row)"
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
import { defineComponent, ref, watch } from "vue";
import {
  bytesToSize,
  getPreviewFile,
  deleteFile,
} from "../services/files.service";
import { useStore } from "vuex";
import { deleteFileObj } from "../services/filesObj.service";

export default defineComponent({
  props: {
    files: Array,
  },

  setup(props) {
    const files = ref();
    const selectedFile = ref(null);
    const store = useStore();
    files.value = props.files;

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

    const showImage = async (file) => {
      selectedFile.value = await getPreviewFile(file.idFile);
    };

    const deleteFileF = async (file) => {
      console.log(file);
      await deleteFileObj(file._id);
      await deleteFile(file.idFile);
      store.dispatch("fetchModules");
    };

    return {
      files,
      selectedFile,
      columns,
      showImage,
      deleteFileF,
    };
  },
});
</script>

<style></style>
