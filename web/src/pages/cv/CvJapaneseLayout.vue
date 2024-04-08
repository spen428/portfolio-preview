<template>
  <div class="mx-auto flex max-w-3xl flex-col gap-4 print:m-8">
    <router-link class="self-center print:hidden sm:self-end" to="../cv">
      ※西洋様式はこちら⇨
    </router-link>
    <section class="flex flex-col">
      <div class="flex flex-col gap-2 print:flex-row md:flex-row">
        <LoadingSkeleton
          v-if="!dateOfBirthString || !age"
          class="order-1 grow"
        />
        <div v-else class="order-1 flex grow flex-col">
          <div class="flex items-end justify-between p-2">
            <h1 class="text-2xl">履歴書</h1>
            <h2>{{ todayLongDate }}現在</h2>
          </div>

          <div class="flex h-full flex-col border-x-2 border-t-2">
            <div class="flex border-b p-2">
              <h3 class="w-24">フリガナ</h3>
              <span class="grow">
                {{ personalInfo.fullNameRuby }}
              </span>
            </div>

            <div class="flex grow flex-col border-b-2 p-2">
              <h3>氏名</h3>
              <span
                class="my-4 text-center text-3xl print:!my-auto print:ml-24 print:text-left print:text-2xl sm:ml-24 sm:text-left md:!my-auto"
              >
                {{ personalInfo.fullName }}
              </span>
            </div>

            <div class="p-2 text-center sm:ml-24 sm:text-left">
              西暦{{ dateOfBirthString }}生（満{{ age }}歳）　男性
            </div>
          </div>
        </div>

        <div
          class="mb-2 flex items-end print:order-2 print:border-0 md:order-2 md:border"
        >
          <div
            v-if="jpData.privacyMode"
            class="flex aspect-[3/4] h-64 items-center justify-center"
          >
            〈非表示〉
          </div>
          <MediaWithLoadingSkeleton
            v-else
            class="mx-auto aspect-[3/4] h-64 object-contain print:mx-[5mm] print:mb-[5mm] print:h-[40mm] print:w-[30mm] md:border-0"
            :src="jpData.photoUrl"
            skeleton-classes="w-48 h-64 bg-primary-300"
          />
        </div>
      </div>

      <LoadingSkeleton v-if="!jpData.address" class="mt-4 h-44" />
      <div class="flex flex-col border-2" v-else>
        <div class="flex border-b p-2">
          <h3 class="w-24 shrink-0">ふりがな</h3>
          <span class="grow">{{ jpData.address.furigana }}</span>
        </div>

        <div class="flex p-2">
          <h3 class="w-24">現住所</h3>
          <span>{{ jpData.address.postalCode }}</span>
        </div>
        <span
          class="mx-auto p-2 text-lg print:ml-24 print:text-left sm:ml-24 sm:text-left"
        >
          {{ jpData.address.text }}
        </span>

        <div class="flex flex-col border-t-2 print:flex-row md:flex-row">
          <div class="flex grow p-2">
            <h3 class="w-24">メール</h3>
            <a :href="`mailto:${personalInfo.emailAddress}`" class="grow">
              {{ personalInfo.emailAddress }}
            </a>
          </div>
          <div
            class="flex border-t p-2 print:border-l-2 print:border-t-0 md:border-l-2 md:border-t-0"
          >
            <h3 class="w-24">電話</h3>
            <span v-if="jpData.privacyMode">〈非表示〉</span>
            <a
              v-else
              :href="`tel:${personalInfo.phoneNumber.intl}`"
              class="grow"
            >
              {{ personalInfo.phoneNumber.local }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <LoadingSkeleton
      v-if="
        !jpData.educationSummary?.length && !jpData.employmentSummary?.length
      "
      class="h-64"
    />
    <section v-else>
      <table class="w-full border-2 text-left">
        <thead>
          <tr>
            <th class="w-16">年</th>
            <th class="w-10">月</th>
            <th>学歴・職歴</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td>学歴</td>
          </tr>
          <tr v-for="section in jpData.educationSummary" :key="section.text">
            <td class="align-text-top">{{ section.year }}</td>
            <td class="align-text-top">{{ section.month }}</td>
            <td v-html="section.text"></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>職歴</td>
          </tr>
          <tr v-for="section in jpData.employmentSummary" :key="section.text">
            <td class="align-text-top">{{ section.year }}</td>
            <td class="align-text-top">{{ section.month }}</td>
            <td v-html="section.text"></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td class="flex justify-between !border-0">
              <span class="!p-0">現在に至る</span>
              <span class="!p-0">以上</span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <LoadingSkeleton v-if="!jpData.qualificationSummary?.length" class="h-32" />
    <section v-else>
      <table class="w-full border-2 text-left">
        <thead>
          <tr>
            <th class="w-16">年</th>
            <th class="w-10">月</th>
            <th>免許・資格</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="section in jpData.qualificationSummary"
            :key="section.text"
          >
            <td class="align-text-top">{{ section.year }}</td>
            <td class="align-text-top">{{ section.month }}</td>
            <td v-html="section.text"></td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td class="text-right">以上</td>
          </tr>
        </tbody>
      </table>
    </section>

    <LoadingSkeleton v-if="!cvData.abstract" class="h-32" />
    <section v-else>
      <table class="w-full border-2 text-left">
        <tr>
          <th>自己PR</th>
        </tr>
        <tr>
          <td v-html="cvData.abstract"></td>
        </tr>
      </table>
    </section>

    <LoadingSkeleton v-if="!jpData" class="h-32" />
    <section v-else>
      <table class="w-full border-2 text-left">
        <tr>
          <th>志望の動機</th>
        </tr>
        <tr>
          <td v-html="jpData.reasonsForApplying"></td>
        </tr>
      </table>
    </section>

    <LoadingSkeleton v-if="!jpData" class="h-32" />
    <section v-else>
      <table class="w-full border-2 text-left">
        <tr>
          <th>本人希望</th>
        </tr>
        <tr>
          <td v-html="jpData.personalPreferences"></td>
        </tr>
      </table>
    </section>

    <button
      class="mx-auto flex animate-tease justify-center print:!hidden lg:mt-4"
      onclick="document.body.scrollTop = 0; document.documentElement.scrollTop = 0;"
    >
      <img src="/logo.svg" :alt="$t('logo')" class="h-16 w-16 select-none" />
    </button>
  </div>
</template>

<style scoped>
* {
  @apply border-gray-950;
}

th,
td {
  @apply border border-b-2 p-2;
}
</style>

<script setup lang="ts">
import type { CvData } from "shared/dist/data.model";
import { computed, type Ref } from "vue";
import { DateTime } from "luxon";
import DataService from "@/services/data.service";
import CvDataService from "@/services/data.service";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import MediaWithLoadingSkeleton from "@/components/MediaWithLoadingSkeleton.vue";

const cvData: Ref<CvData> = CvDataService.getCvData();
const personalInfo = DataService.getPersonalInfo();

function toJapaneseDateString(date: DateTime | null): string {
  if (!date) return "";
  return date.toLocaleString({ dateStyle: "long" }, { locale: "ja-JP" });
}

const todayLongDate = computed(() => toJapaneseDateString(DateTime.now()));
const dateOfBirth = computed(() => {
  const date = DateTime.fromISO(personalInfo.value.dateOfBirth);
  if (date.isValid) return date;
  return null;
});
const dateOfBirthString = computed(() =>
  toJapaneseDateString(dateOfBirth.value)
);
const age = computed(() => {
  if (!dateOfBirth.value) return null;
  return DateTime.now().diff(dateOfBirth.value, "years").years.toFixed(0);
});
const jpData = DataService.getJapaneseCvData();
</script>
