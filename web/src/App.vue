<template>
  <main class="text-gray-500">
    <router-view></router-view>
  </main>
</template>

<script setup lang="ts">
import LocaleService from "@/services/locale.service";
import DataService from "@/services/data.service";
import { onBeforeMount, watch } from "vue";
import { useI18n } from "vue-i18n";

LocaleService.setCurrentLocale(
  LocaleService.getDefaultLocaleFromLocalStorage()
);
DataService.initializeWatches();

const { t } = useI18n();

const fullName = DataService.getFullName();
onBeforeMount(() =>
  watch(fullName, () => {
    document.title = `${fullName.value} ― ${t("webpage_title")}`;
  })
);
</script>
