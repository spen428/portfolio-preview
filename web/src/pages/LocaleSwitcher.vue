<template>
  <button
    id="locale-switcher"
    class="aspect-square h-full transition"
    @click="toggleLocale()"
  >
    <img
      :src="currentLocale.icon"
      :alt="currentLocale.name"
      class="inline h-full opacity-75 hover:opacity-100"
    />
  </button>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import LocaleService from "@/services/locale.service";

const { t } = useI18n();
const locale = LocaleService.getCurrentLocale();
const localeMetadata = LocaleService.getLocaleMetadata();
const localeIndex = computed(() => {
  return localeMetadata.findIndex((x) => x.locale === locale.value);
});
const currentLocale = computed(() => localeMetadata[localeIndex.value]);

const updateIndexHtml = () => {
  document.querySelector("html")?.setAttribute("lang", locale.value);
  const titleElement = document.querySelector("title");
  if (!titleElement) return;
  titleElement.innerText = t("webpage_title");
};

const toggleLocale = () => {
  const nextLocaleIndex = (localeIndex.value + 1) % localeMetadata.length;
  locale.value = localeMetadata[nextLocaleIndex].locale;
  updateIndexHtml();
  LocaleService.saveDefaultLocaleToLocalStorage(locale.value);
};

updateIndexHtml();
</script>
