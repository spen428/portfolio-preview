<template>
  <LoadingSkeleton v-if="!personalInfo.fullName" class="h-20 w-full" />
  <div
    v-else
    class="mb-8 flex h-20 w-full min-w-[700px] flex-row flex-wrap items-center justify-between print:!mb-10"
  >
    <div
      class="flex w-1/5 flex-col items-start self-end whitespace-nowrap print:!text-sm"
    >
      <a
        v-if="personalInfo.phoneNumber.intl"
        :href="`tel:${personalInfo.phoneNumber.intl}`"
      >
        <img src="/icons/phone.svg" :alt="$t('telephone')" class="inline w-4" />
        <span class="ml-1">{{ personalInfo.phoneNumber.local }}</span>
      </a>
      <a :href="`mailto:${personalInfo.emailAddress}`">
        <img
          src="/icons/mail.svg"
          :alt="$t('email_address')"
          class="inline w-4"
        />
        <span class="ml-1">{{ personalInfo.emailAddress }}</span>
      </a>
      <a :href="personalInfo.github.url" target="_blank" class="print:!hidden">
        <img src="/icons/github.svg" alt="GitHub" class="inline w-4" />
        <span class="ml-1">github/{{ personalInfo.github.username }}</span>
      </a>
      <a :href="personalInfo.cvUrl.full" class="hidden print:!block">
        <img src="/icons/globe.svg" :alt="$t('website')" class="inline w-4" />
        <span class="ml-1">{{ personalInfo.cvUrl.short }}</span>
      </a>
    </div>
    <div
      class="mb-0 flex h-full w-3/5 flex-col items-center justify-center text-center"
    >
      <h1 class="font-serif text-3xl font-bold text-primary-950 print:!mt-3">
        <TextWithRuby
          :text="personalInfo.fullName"
          :ruby="personalInfo.fullNameRuby"
        />
      </h1>
      <span class="small-caps mt-4 text-base leading-4 print:!text-sm">
        {{ personalInfo.longerTagLine }}
      </span>
    </div>
    <div
      class="flex w-1/5 flex-col items-end self-end whitespace-nowrap text-right print:!text-sm"
    >
      <a
        :href="personalInfo.location.url"
        target="_blank"
        class="flex flex-col"
      >
        <span v-for="line in personalInfo.location.lines" :key="line">
          {{ line }}
        </span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PersonalInfo } from "@shared/data.model";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import TextWithRuby from "@/components/TextWithRuby.vue";

defineProps<{ personalInfo: PersonalInfo }>();
</script>
