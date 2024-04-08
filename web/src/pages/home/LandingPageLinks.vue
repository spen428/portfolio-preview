<template>
  <div class="flex flex-col items-center gap-6">
    <router-link to="/portfolio/cv" class="text-white">
      <button
        class="rounded-lg border px-4 py-2 duration-500 hover:bg-white hover:bg-opacity-30"
      >
        {{ $t("view_my_cv") }}
      </button>
    </router-link>
    <router-link to="/portfolio/projects" class="text-white">
      <button
        class="rounded-lg border px-4 py-2 duration-500 hover:bg-white hover:bg-opacity-30"
      >
        {{ $t("browse_my_portfolio") }}
      </button>
    </router-link>
    <a class="text-white" href="https://github.com/spen428" target="_blank">
      <button
        class="inline-flex items-center gap-2 rounded-lg border px-4 py-2 duration-500 hover:bg-white hover:bg-opacity-30"
      >
        {{ $t("open_my_github") }}
        <img
          src="/icons/external-link.svg"
          :alt="$t('opens_an_external_site')"
          class="h-4 brightness-0 invert"
        />
      </button>
    </a>
  </div>
</template>

<script setup lang="ts"></script>
