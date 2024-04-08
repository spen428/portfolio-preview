<template>
  <footer class="w-full bg-gray-800 bg-opacity-20 opacity-70">
    <div class="mx-auto max-w-7xl px-2 lg:px-8">
      <p class="all-caps p-4 text-justify text-[0.6rem] text-white">
        <i18n-t keypath="copyright_notice">
          <LoadingSkeleton v-if="!fullName" class="inline-block !h-2 !w-32" />
          <span v-else>{{ fullName }}</span>
          <a
            href="https://www.npmjs.com/package/license-checker"
            class="text-white underline"
            >NPM License Checker</a
          >
          <a
            href="https://github.com/akveo/eva-icons"
            class="text-white underline"
            >Eva Icons</a
          >
        </i18n-t>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";

defineProps<{ fullName: string | undefined }>();
</script>
