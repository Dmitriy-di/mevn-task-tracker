<template>
  <div class="modules q-pa-md">
    <modulesModules v-if="showTableModules()" />
    <modulesTasks v-else />

    <q-uploader :auto-upload="false" :multiple="false" @added="onFileAdded">
      <div class="row items-center">
        <q-icon name="cloud_upload" size="2em" />
        <span class="text-h6">Upload file</span>
      </div>
    </q-uploader>
    <q-btn label="Upload" @click="uploadFile()" />
    <input type="file" @change="uploadFile" />
    <q-btn label="Получить" @click="getFile()" />
    <q-btn label="Получить по айди превью" @click="getFileById()" />
    <q-btn
      label="Удалить файл"
      @click="deleteFileById('645eab1d843dbe3da54e6a0a')"
    />
    <Draggable v-model="treeData" />
  </div>
</template>

<script>
import { computed, reactive, watch, ref } from "vue";
import { useStore } from "vuex";
// import { useQuery } from "@vue/apollo-composable";
import modulesTasks from "../pages/composables/modulesTasks.vue";
import modulesModules from "../pages/composables/modulesModules.vue";
import { BaseTree, Draggable, pro } from "@he-tree/vue";
import "@he-tree/vue/style/default.css";
import axios from "axios";

export default {
  components: {
    modulesTasks,
    modulesModules,
    Draggable,
  },

  setup() {
    const store = useStore();

    const MODULES = computed(() => store.getters.MODULES);

    const module_index = computed(() => store.getters.MODULE_INDEX);

    const showTableModules = () => {
      return module_index.value <= -1;
    };
    //=====================
    const treeData = ref([
      {
        text: "Projects",
        children: [
          {
            text: "Frontend",
            children: [
              {
                text: "Vue",
                children: [
                  {
                    text: "Nuxt",
                  },
                ],
              },
              {
                text: "React",
                children: [
                  {
                    text: "Next",
                  },
                ],
              },
              {
                text: "Angular",
              },
            ],
          },
          {
            text: "Backend",
          },
        ],
      },
      { text: "Photos" },
      { text: "Videos" },
    ]);

    const FL = ref();
    const onFileAdded = (file) => {
      console.log(file);
      FL.value = file;
    };

    const uploadFile = (event) => {
      const file = event.target.files[0];
      console.log(file);

      const author = {
        name: "John Doe",
        email: "johndoe@example.com",
        // Другие поля пользователя
      };

      const formData = new FormData();
      formData.append("file", file);
      formData.append("author", JSON.stringify(author));

      console.log(formData.has("author")); // Выведет true, если поле присутствует
      console.log(formData.get("author"));

      axios

        .post("http://localhost:3000/api/v1/files", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("File uploaded successfully");
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    };

    const getFile = () => {
      axios
        .get("http://localhost:3000/api/v1/files")
        .then((response) => {
          // Обработка успешного ответа
          console.log(response.data); // Здесь вы можете использовать полученные файлы
        })
        .catch((error) => {
          // Обработка ошибки
          console.error(error);
        });
    };

    const getFileById = () => {
      axios
        .get(
          "http://localhost:3000/api/v1/files/645e8579ee7a81f4c8a9695c/preview"
        )
        .then((response) => {
          // Обработка успешного ответа
          console.log(response.data); // Здесь вы можете использовать полученные файлы
        })
        .catch((error) => {
          // Обработка ошибки
          console.error(error);
        });
    };

    const deleteFileById = (id) => {
      axios
        .delete(`http://localhost:3000/api/v1/files/${id}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return {
      getFileById,
      getFile,
      showTableModules,
      MODULES,
      onFileAdded,
      uploadFile,
      treeData,
      deleteFileById,
    };
  },
};
</script>

<style lang="scss">
.assigned {
  background-color: rgb(199, 21, 160);
}
.accomplished {
  background-color: rgb(235, 220, 20);
}
.completed {
  background-color: rgb(100, 207, 67);
}
</style>
