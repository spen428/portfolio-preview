<template>
  <ruby v-if="ruby">
    {{ text }}
    <rt>{{ ruby }}</rt>
  </ruby>
  <span v-else>{{ text }}</span>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
  ruby?: string;
}>();
</script>
