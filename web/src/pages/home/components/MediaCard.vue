<template>
  <div
    class="flex w-full flex-col items-center gap-10 overflow-hidden md:min-h-[18rem] md:flex-row md:gap-8 lg:mx-8 lg:w-[calc(100%-2rem)] lg:gap-16"
    :class="{ 'md:flex-row-reverse': mediaPosition === 'right' }"
  >
    <div
      class="flex max-h-[274px] w-full max-w-[484px] px-4 xs:mx-4 xs:px-0"
      :class="{
        'md:mr-0': mediaPosition === 'left',
        'justify-start': mediaPosition === 'left',
        'md:ml-0': mediaPosition === 'right',
        'justify-end': mediaPosition === 'right',
      }"
    >
      <MediaWithLoadingSkeleton
        :src="mediaUrl"
        autoplay
        class="w-full rounded-lg border-2 border-white object-cover"
        :skeleton-styles="{ width: '480px', height: '270px' }"
      />
    </div>

    <div
      class="flex h-full max-w-[480px] flex-shrink-[1.5] grow sm:m-0"
      :class="{
        'md:pr-8': mediaPosition === 'left',
        'md:pl-8': mediaPosition === 'right',
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import MediaWithLoadingSkeleton from "@/components/MediaWithLoadingSkeleton.vue";

defineProps<{
  mediaPosition: "left" | "right";
  mediaUrl: string;
}>();
</script>
