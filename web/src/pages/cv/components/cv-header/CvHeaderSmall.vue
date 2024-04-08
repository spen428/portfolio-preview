<template>
  <div>
    <div class="m-0 flex w-full min-w-0 flex-row flex-wrap justify-between">
      <div
        class="mb-4 flex w-full flex-col items-center justify-between text-center"
      >
        <LoadingSkeleton
          v-if="!personalInfo.fullName"
          class="mt-3 h-10 w-full"
        />
        <h1
          v-else
          class="mx-0 mt-3 font-serif text-3xl font-bold text-primary-950 xs:text-4xl"
        >
          <TextWithRuby
            :text="personalInfo.fullName"
            :ruby="personalInfo.fullNameRuby"
          />
        </h1>

        <LoadingSkeleton
          v-if="!personalInfo.longerTagLine"
          class="mb-4 mt-8 h-8 w-full"
        />
        <span v-else class="text-balance mb-4 mt-8">
          {{ personalInfo.longerTagLine }}
        </span>
      </div>

      <LoadingSkeleton
        v-if="!personalInfo.emailAddress"
        class="h-12 w-full !bg-primary-950"
      />
      <div v-else class="my-2 flex w-full items-center justify-evenly md:my-4">
        <a
          v-if="personalInfo.phoneNumber.intl"
          :href="`tel:${personalInfo.phoneNumber.intl}`"
        >
          <img src="/icons/phone.svg" :alt="$t('telephone')" />
        </a>
        <a :href="`mailto:${personalInfo.emailAddress}`">
          <img src="/icons/mail.svg" :alt="$t('email_address')" />
        </a>
        <a :href="personalInfo.location.url" target="_blank">
          <img src="/icons/map-pin.svg" :alt="$t('location')" />
        </a>
        <a :href="personalInfo.linkedIn.url" target="_blank">
          <img src="/icons/linkedin.svg" alt="LinkedIn" />
        </a>
        <a :href="personalInfo.github.url" target="_blank">
          <img src="/icons/github.svg" alt="GitHub" />
        </a>
        <router-link to="/portfolio/projects">
          <img src="/icons/briefcase.svg" :alt="$t('portfolio')" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PersonalInfo } from "@shared/data.model";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import TextWithRuby from "@/components/TextWithRuby.vue";

defineProps<{ personalInfo: PersonalInfo }>();
</script>
