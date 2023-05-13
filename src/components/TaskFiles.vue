<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Size</th>
          <th>Preview</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="file in files" :key="file.id">
          <td>{{ file.name }}</td>
          <td>{{ file.size }}</td>
          <td>
            <button @click="showImage(file)">Show Preview</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="selectedFile">
      <img :src="selectedFile.previewUrl" alt="Preview" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { getPreviewFile } from "../sdk/file";

const files = ref([]);
const selectedFile = ref(null);

// Загрузка списка файлов

files.value = getPreviewFile("645f9468e597d2cb24392c7d");
axios
  .get("/api/files")
  .then((response) => {
    files.value = response.data;
  })
  .catch((error) => {
    console.error("Error fetching files:", error);
  });

// Показать превью файла
const showImage = (file) => {
  selectedFile.value = file;
};
</script>
