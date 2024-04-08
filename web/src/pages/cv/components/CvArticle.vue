<template>
  <article
    class="align-start mx-4 mt-8 flex flex-col justify-between print:!mx-4 print:!mt-5 lg:mx-0 lg:flex-row"
  >
    <div
      class="flex shrink-0 items-center justify-between print:!mt-0.5 lg:mr-8 lg:w-28 lg:items-start lg:justify-end"
    >
      <span class="h-1 w-full bg-primary-950 lg:!hidden"></span>
      <h1
        class="mx-4 text-center text-2xl font-bold text-primary-950 print:!text-[14pt] lg:m-0 lg:text-lg"
      >
        {{ title }}
      </h1>
      <span class="h-1 w-full bg-primary-950 lg:!hidden"></span>
    </div>
    <div class="mt-2 lg:mt-1">
      <slot></slot>
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{ title: string }>();
</script>
