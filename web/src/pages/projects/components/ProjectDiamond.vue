<template>
  <div v-if="project">
    <div
      class="pointer-events-none relative select-none"
      :style="{ width: size, height: size }"
    >
      <router-link
        @mouseover="hovering = true"
        @mouseout="hovering = false"
        :to="'/portfolio/projects/' + project.id"
        class="diamond pointer-events-auto z-10 border-transparent duration-1000"
        :class="{
          'border-opacity-80': isActive,
          'bg-black': !project,
          'bg-opacity-10': !project,
          '!border-primary-950': isActive,
        }"
      >
        <img
          v-if="project.thumbnailUrl"
          :src="project.thumbnailUrl"
          :alt="project.title"
          class="fit-to-diamond bg-white transition-opacity"
          :style="{ opacity: isActive ? 0.3 : 1 }"
        />
      </router-link>

      <div
        class="pointer-events-none flex h-full flex-col items-center justify-center gap-2 overflow-hidden"
      >
        <span id="spacer" v-if="project.technologyIds?.length" class="h-9" />
        <h2
          class="z-10 h-6 text-sm text-white shadow-primary-950 duration-500 text-shadow-xs"
          :style="{ opacity: isActive ? 1 : 0 }"
        >
          {{ project.title }}
        </h2>
        <div
          v-if="technologies.length"
          class="z-10 flex w-3/5 flex-wrap justify-center gap-2"
        >
          <img
            v-for="tech in technologies"
            :key="tech.id"
            :src="tech.logoUrl"
            alt=""
            class="h-6 w-6 duration-500"
            :style="{ opacity: isActive ? 1 : 0 }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.diamond {
  --diamond-ratio: 70.71067812%; /* x / (x sqrt 2) */
  --border-width: 0.125rem;

  content: "";
  display: block;
  overflow: hidden;
  width: var(--diamond-ratio);
  height: var(--diamond-ratio);

  position: absolute;
  top: 0;
  left: 0;

  rotate: 0 0 1 45deg;
  transform-origin: 0 0;
  translate: var(--diamond-ratio) 0;

  border-width: var(--border-width);
  border-radius: var(--border-width);
}

.fit-to-diamond {
  --2x-diamond-ratio: calc(2 * var(--diamond-ratio));

  rotate: -45deg;
  scale: var(--2x-diamond-ratio);
  object-fit: cover;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { Project } from "@shared/data.model";
import DataService from "@/services/data.service";

const props = defineProps<{
  size: string;
  project: Project | null;
  active: boolean;
}>();

const technologies = computed(() =>
  DataService.getTechnologiesById(props.project?.technologyIds ?? [])
);

const hovering = ref(false);
const isActive = computed(() => hovering.value || props.active);
</script>
