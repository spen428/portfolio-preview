<template>
  <input
    :name="name"
    :checked="checked"
    v-on:click="$emit('click')"
    type="radio"
    class="ml-2 cursor-pointer first-of-type:ml-0"
  />
</template>

<style scoped>
input[type="radio"] {
  @apply m-2 box-border h-3 w-3 rotate-45 appearance-none border-2 border-solid border-white bg-white outline outline-2 outline-gray-700;
}

input[type="radio"]:checked {
  @apply bg-primary-950 outline outline-2 outline-primary-700;
}
</style>

<script setup lang="ts">
defineProps<{
  name?: string;
  checked?: boolean;
}>();

defineEmits<{
  (e: "click", value: number): void;
}>();
</script>
