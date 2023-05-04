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

export default {
  components: {
    modulesTasks,
    modulesModules,
  },

  setup() {
    const store = useStore();

    const MODULES = computed(() => store.getters.MODULES);

    const module_index = computed(() => store.getters.MODULE_INDEX);

    const showTableModules = () => {
      return module_index.value <= -1;
    };

    return {
      showTableModules,
      MODULES,
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
