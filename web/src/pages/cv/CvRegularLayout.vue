<template>
  <router-link
    v-if="locale === 'ja-JP'"
    class="mb-2 block text-center print:hidden sm:text-right"
    to="cv/jp"
  >
    ※厚生労働省様式はこちら⇨
  </router-link>
  <CvHeaderLarge class="hidden lg:flex" :personal-info="personalInfo" />
  <CvHeaderSmall class="lg:hidden" :personal-info="personalInfo" />
  <CvBody :cv-data="cvData" />
</template>

<script setup lang="ts">
import type { CvData } from "shared/dist/data.model";
import { type Ref } from "vue";
import DataService from "@/services/data.service";
import CvDataService from "@/services/data.service";
import CvHeaderSmall from "@/pages/cv/components/cv-header/CvHeaderSmall.vue";
import CvBody from "@/pages/cv/components/CvBody.vue";
import CvHeaderLarge from "@/pages/cv/components/cv-header/CvHeaderLarge.vue";
import localeService from "@/services/locale.service";

const cvData: Ref<CvData> = CvDataService.getCvData();
const personalInfo = DataService.getPersonalInfo();
const locale = localeService.getCurrentLocale();
</script>
