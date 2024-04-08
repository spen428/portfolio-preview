<template>
  <div class="flex w-full max-w-5xl flex-col items-center gap-12 text-white">
    <div class="flex w-full max-w-4xl flex-col gap-4">
      <h1 class="mx-4 text-[min(1.85rem,5vw)]" v-html="titleHtml" />
      <h2 class="text-balance mx-4 self-end text-right" v-html="subtitleHtml" />
    </div>

    <MediaCard media-position="left" :media-url="mediaUrls[0]">
      <div
        class="grid h-full w-full max-w-sm grid-cols-2 justify-between gap-4 gap-x-8 sm:static sm:py-2 md:flex md:flex-col md:flex-nowrap"
      >
        <div
          v-for="(tech, index) in technologies.slice(0, 4)"
          :key="tech.name"
          class="inline-flex items-center gap-4"
          :class="{ 'md:self-end': index % 2 == 1 }"
        >
          <MediaWithLoadingSkeleton
            :src="tech.logoUrl"
            class="h-[clamp(2rem,5vw,3rem)] w-[clamp(2rem,5vw,3rem)]"
          />
          <span
            class="text-[min(1rem,4vw)] font-bold xs:text-base"
            :style="{ color: tech.color ?? '#fff' }"
            v-text="tech.name"
          />
        </div>
      </div>
    </MediaCard>

    <MediaCard media-position="right" :media-url="mediaUrls[1]">
      <div
        class="grid h-full w-full grid-cols-2 justify-between gap-4 gap-x-8 sm:static sm:py-2 md:flex md:flex-col md:flex-nowrap"
      >
        <div
          v-for="(tech, index) in technologies.slice(4, 8)"
          :key="tech.name"
          class="inline-flex items-center gap-4"
          :class="{ 'md:self-end': index % 2 == 1 }"
        >
          <MediaWithLoadingSkeleton
            :src="tech.logoUrl"
            class="h-[clamp(2rem,5vw,3rem)] w-[clamp(2rem,5vw,3rem)]"
          />
          <span
            class="text-[min(1rem,4vw)] font-bold xs:text-base"
            :style="{ color: tech.color ?? '#fff' }"
            v-text="tech.name"
          />
        </div>
      </div>
    </MediaCard>
  </div>
</template>

<script setup lang="ts">
import MediaCard from "@/pages/home/components/MediaCard.vue";
import { computed } from "vue";
import DataService from "@/services/data.service";
import MediaWithLoadingSkeleton from "@/components/MediaWithLoadingSkeleton.vue";

const technologies = computed(() =>
  DataService.getTechnologiesById(props.technologyIds)
);

const props = defineProps<{
  titleHtml: string;
  subtitleHtml: string;
  technologyIds: string[];
  mediaUrls: string[];
}>();
</script>
