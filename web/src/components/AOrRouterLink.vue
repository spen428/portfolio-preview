<template>
  <div>
    <router-link v-if="!external" :to="href">
      <slot></slot>
    </router-link>
    <a
      v-if="external"
      :href="href"
      target="_blank"
      class="group inline-flex items-center gap-1"
      :class="{ 'text-white': color === 'white' }"
    >
      <slot></slot>
      <img
        src="/icons/external-link.svg"
        :alt="$t('opens_an_external_site')"
        class="h-4 w-0 duration-200 group-hover:w-4"
        :class="{
          'brightness-0': color === 'white',
          invert: color === 'white',
        }"
      />
    </a>
  </div>
</template>

<script setup lang="ts">
defineProps<{ external: boolean; href: string; color?: "white" }>();
</script>
