<template>
  <LoadingSkeleton
    v-if="mediaLoading"
    v-bind="$attrs"
    :style="skeletonStyles ?? {}"
    :class="skeletonClasses ?? ''"
  />
  <video
    v-if="['webm', 'mp4'].includes(fileExt)"
    v-show="!mediaLoading"
    v-bind="$attrs"
    @canplaythrough="mediaLoading = false"
    @error="mediaLoading = false"
    loop
    muted
    playsinline
    :autoplay="shouldAutoplay"
    :src="shouldAutoplay ? src : `${src}#t=0.01`"
  />
  <img
    v-else
    v-show="!mediaLoading"
    v-bind="$attrs"
    @load="mediaLoading = false"
    @error="mediaLoading = false"
    :src="src"
    :alt="alt ?? ''"
  />
</template>

<script setup lang="ts">
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import { computed, ref } from "vue";
import ConfigurationService from "@/services/configuration.service";

const isAnimationEnabled = ConfigurationService.isAnimationEnabled();
const mediaLoading = ref(true);
const shouldAutoplay = computed(() =>
  isAnimationEnabled ? props.autoplay : false
);

const fileExt = computed(() => {
  const split = (props.src ?? "").split(".");
  if (split.length < 2) return "";
  return split.pop()!;
});

const props = defineProps<{
  src: string;
  alt?: string;
  autoplay?: boolean;
  skeletonStyles?: Partial<CSSStyleDeclaration>;
  skeletonClasses?: string;
}>();
</script>
