<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Task tracker </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer class="q-pt-xl" v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-list bordered class="rounded-borders">
          <q-expansion-item
            to="/Chat"
            expand-separator
            icon=""
            :label="`Чат`"
            caption=""
            default-opened
          >
            <q-tabs
              indicator-color="transparent"
              v-for="room in rooms"
              :key="room.id"
              align="left"
              @click="set_room_id(room.name)"
            >
              <q-route-tab>
                <div>{{ room.name }}</div>
              </q-route-tab>
            </q-tabs>
          </q-expansion-item>

          <q-expansion-item
            v-if="!disableRedBtn"
            to="/Team"
            expand-separator
            icon=""
            :label="`Команда`"
            caption=""
            default-opened
          >
            <q-tabs align="left">
              <q-route-tab to="/Executors" label="Исполнители" />
            </q-tabs>

            <q-tabs align="left">
              <q-route-tab to="/Responsible" label="Ответственные" />
            </q-tabs>

            <q-tabs align="left">
              <q-route-tab to="/Excluded" :label="`Исключённые`" />
            </q-tabs>
          </q-expansion-item>

          <q-expansion-item
            v-if="(MODULES.length != 0) | !disableRedBtn"
            to="/Modules"
            expand-separator
            icon=""
            :label="'Модули'"
            caption=""
            default-opened
            @click="get_module_index(-1)"
          >
            <q-tabs
              indicator-color="transparent"
              v-for="(mod, index) in MODULES"
              :key="mod.id"
              align="left"
              @click="get_module_index(index)"
            >
              <q-route-tab to="/Modules">
                <div>{{ mod.name }}</div>
              </q-route-tab>
            </q-tabs>
          </q-expansion-item>

          <q-expansion-item
            v-if="allTasks.length != 0 && !disableRedBtn"
            to="/AllTasks"
            expand-separator
            icon=""
            :label="'Все задачи'"
            caption=""
          >
          </q-expansion-item>
        </q-list>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition name="bounce">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";

//TODO добавить логику доступов: на бэке реализовать получение пользователем только того, к чему у него есть доступ. Также на бэке защитить все запросы регистрацией

export default defineComponent({
  name: "MainLayout",

  setup() {
    const leftDrawerOpen = ref(false);
    const store = useStore();
    const disableRedBtn = ref(false);
    const allTasks = computed(() => store.getters.TASKS);
    const rooms = computed(() => store.getters.ROOMS);
    const get_module_index = function (index) {
      store.commit("setModuleIndex", index);
    };

    const set_room_id = (value) => {
      store.commit("setRoomId", value);
    };

    const MODULES = computed(() => store.getters.MODULES);

    onMounted(() => {
      if (localStorage.moderator != "true") {
        disableRedBtn.value = true;
      }
      store.dispatch("fetchGroupResponsibles");
      store.dispatch("fetchGroupRExecutors");
      store.dispatch("fetchTasks");
      store.dispatch("fetchModules");
      store.dispatch("fetchGroupRExcluded");
    });

    return {
      set_room_id,
      allTasks,
      rooms,
      leftDrawerOpen,
      disableRedBtn,
      tab: "mail",
      get_module_index,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      MODULES,
    };
  },
});
</script>

<style lang="scss">
.q-tabs__content {
  width: 100% !important;
  text-align: left !important;
}

.link {
  color: white;
  text-decoration: none;
}
</style>
