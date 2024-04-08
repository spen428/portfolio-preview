<template>
  <div
    class="relative flex h-full w-full items-center justify-evenly border-2 border-white bg-white"
  >
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1 1"
      preserveAspectRatio="none"
      class="absolute inset-0"
    >
      <polygon points="0,0 0,0.1 1,0.05 1,0" class="fill-primary-950" />
      <polygon points="1,1 1,0.9 0,0.95 0,1" class="fill-primary-700" />
    </svg>

    <MediaWithLoadingSkeleton src="/logo.svg" class="h-[18mm] w-[18mm]" />

    <div class="z-10 flex flex-col items-center justify-center gap-4">
      <div class="flex flex-col items-center gap-2">
        <LoadingSkeleton
          v-if="!personalInfo.fullName"
          class="h-7 w-48 !bg-primary-950"
        />
        <h1 v-else class="flex font-serif text-lg font-bold text-primary-950">
          <TextWithRuby
            :text="personalInfo.fullName"
            :ruby="personalInfo.fullNameRuby"
          />
        </h1>
        <LoadingSkeleton v-if="!personalInfo.tagLine" class="h-4 w-48" />
        <h2 v-else class="font-serif text-xs">
          {{ personalInfo.tagLine }}
        </h2>
      </div>
      <div class="flex flex-col items-center gap-1">
        <span class="flex gap-[inherit] text-xs">
          <MediaWithLoadingSkeleton
            src="/icons/globe.svg"
            alt="Web:"
            class="inline w-4"
          />
          <LoadingSkeleton v-if="!personalInfo.cvUrl" class="h-4 w-32" />
          <span v-else>{{ personalInfo.cvUrl.short }}</span>
        </span>
        <span class="flex gap-[inherit] text-xs">
          <MediaWithLoadingSkeleton
            src="/icons/mail.svg"
            alt="Email:"
            class="inline w-4"
          />
          <LoadingSkeleton v-if="!personalInfo.cvUrl" class="h-4 w-32" />
          <span v-else>{{ personalInfo.emailAddress }}</span>
        </span>
        <span class="flex gap-[inherit] text-xs">
          <MediaWithLoadingSkeleton
            src="/icons/phone.svg"
            alt="Phone:"
            class="inline w-4"
          />
          <LoadingSkeleton v-if="!personalInfo.cvUrl" class="h-4 w-32" />
          <span v-else>{{ personalInfo.phoneNumber.intl }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PersonalInfo } from "@shared/data.model";
import MediaWithLoadingSkeleton from "@/components/MediaWithLoadingSkeleton.vue";
import TextWithRuby from "@/components/TextWithRuby.vue";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";

defineProps<{ personalInfo: PersonalInfo }>();
</script>
