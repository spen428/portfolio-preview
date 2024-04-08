<template>
  <div
    v-if="projects?.length"
    class="mx-auto mb-16 mt-8 flex w-full max-w-5xl flex-col gap-8 text-white md:gap-16 2xl:max-w-6xl"
  >
    <!--    <FilterBar />-->
    <template v-for="(project, index) in projects" :key="project.id">
      <MediaCard
        :media-position="index % 2 === 0 ? 'left' : 'right'"
        :media-url="project.thumbnailUrl"
        class="!items-start justify-center"
      >
        <div class="mx-4 flex flex-col gap-4 md:gap-2">
          <RouterLink :to="`projects/${project.id}`" class="w-fit text-white">
            <h1 class="text-2xl font-bold">
              {{ project.title }}
            </h1>
          </RouterLink>
          <h2 class="text-xs italic">{{ project.type }}</h2>
          <div class="flex flex-wrap gap-2">
            <MediaWithLoadingSkeleton
              v-for="techId in project.technologyIds"
              :key="techId"
              :src="technologyLogos[techId]"
              class="h-[min(1.5rem,7vw)] w-[min(1.5rem,7vw)]"
            />
          </div>
          <p v-html="project.abstract" class="overflow-hidden" />
          <RouterLink
            :to="`projects/${project.id}`"
            class="self-end text-sm font-bold text-white"
          >
            {{ $t("read_more") }} &longrightarrow;
          </RouterLink>
        </div>
      </MediaCard>
      <img
        src="/logo-hollow.svg"
        alt=""
        class="mx-auto w-8 brightness-0 invert"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import DataService from "@/services/data.service";
import MediaCard from "@/pages/home/components/MediaCard.vue";
import MediaWithLoadingSkeleton from "@/components/MediaWithLoadingSkeleton.vue";
import { computed } from "vue";
import FilterBar from "@/pages/projects/FilterBar.vue";

const projects = DataService.getProjects();
const technologyLogos = computed(() => {
  const map: { [key: string]: string } = {};
  DataService.getTechnologies().forEach((technology) => {
    map[technology.id] = technology.logoUrl;
  });
  return map;
});
</script>
