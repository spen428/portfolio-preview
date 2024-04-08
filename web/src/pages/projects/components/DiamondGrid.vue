<template>
  <div
    class="relative w-full overflow-scroll lg:overflow-x-hidden"
    ref="container"
    :style="{ height: containerHeightPx + 'px' }"
    @scroll="updateScrollPosition()"
  >
    <LoadingSkeleton v-if="!projects?.length" class="mx-8 my-8 h-4/5" />
    <ProjectDiamond
      v-else
      v-for="(project, index) in projects"
      :id="`project-diamond-` + index"
      :key="project.id"
      :project="project"
      :size="placements[index].sizeRem + `rem`"
      class="absolute"
      :style="{
        top: placements[index].topRem + `rem`,
        left: placements[index].leftRem + `rem`,
      }"
      :active="isActive(`project-diamond-` + index)"
    />
  </div>
</template>

<script setup lang="ts">
import ProjectDiamond from "@/pages/projects/components/ProjectDiamond.vue";
import type { Ref } from "vue";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import type { Project } from "@shared/data.model";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";

defineProps<{ projects: Project[] | undefined }>();

const leftOffsetRem = 6;
const topOffsetRem = 1;

type Placement = { sizeRem: number; topRem: number; leftRem: number };
const placements: Placement[] = [
  { size: 32, left: 0, top: 8 },
  { size: 32, left: 32, top: 8 },
  { size: 16, left: 48, top: 0 },
  { size: 16, left: 24, top: 8 },
  { size: 16, left: 32, top: 32 },
  { size: 16, left: 48, top: 32 },
  { size: 32, left: 56, top: 16 },
  { size: 32, left: 72, top: 0 },
].map((placement) => ({
  sizeRem: placement.size,
  leftRem: leftOffsetRem + placement.left,
  topRem: topOffsetRem + placement.top,
}));

const container: Ref<HTMLDivElement | undefined> = ref();
const containerWidthPx = ref(0);
const containerHeightPx = ref(0);
const isDesktopSize = computed(() => {
  const breakpointWidthPx = 960; // TODO: Extract from tailwind config
  return containerWidthPx.value >= breakpointWidthPx;
});

const scrollLeft = ref(0);

const baseFontSize = parseFloat(
  getComputedStyle(document.documentElement).fontSize
);

function remToPx(rem: number): number {
  return rem * baseFontSize;
}

function updateContainerSize() {
  containerWidthPx.value = container.value?.offsetWidth ?? 0;
  containerHeightPx.value = container.value?.parentElement?.offsetHeight ?? 0;
}

function updateScrollPosition() {
  if (!container.value) return;
  scrollLeft.value = container.value.scrollLeft;
}

const activeBounds = computed(() => [
  containerWidthPx.value * 0.35,
  containerWidthPx.value * 0.85,
]);

function isActive(elementId: string): boolean {
  if (isDesktopSize.value) return false;

  const element = document.getElementById(elementId);
  if (!element) return false;

  const elementCenter = element.offsetLeft + element.offsetWidth / 2;
  const actualCenter = elementCenter - scrollLeft.value;

  return (
    actualCenter >= activeBounds.value[0] &&
    actualCenter <= activeBounds.value[1]
  );
}

onMounted(() => {
  window.addEventListener("resize", updateContainerSize);
  updateContainerSize();
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", updateContainerSize);
});
</script>
