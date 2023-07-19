<template>
  <div class="modules q-pa-md">
    <modulesModules v-if="showTableModules()" />
    <modulesTasks v-else />
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

      const formData = new FormData();
      formData.append("file", file);

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
          "http://localhost:3000/api/v1/files/645f9468e597d2cb24392c7d/preview"
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
