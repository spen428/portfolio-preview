<template>
  <div class="mx-auto w-full max-w-5xl bg-white pt-4 sm:pt-8 lg:pt-16">
    <article
      class="project-content mx-4 flex flex-col gap-4 lg:mx-auto lg:max-w-4xl"
    >
      <div class="flex flex-col justify-between gap-2 xs:flex-row">
        <LoadingSkeleton v-if="!project" class="h-8 w-96 !bg-primary-950" />
        <h1 v-else class="text-2xl text-primary-950">{{ project.title }}</h1>
        <LoadingSkeleton v-if="!project" class="h-6 w-48" />
        <div
          v-else
          class="flex flex-col gap-[inherit] xs:flex-row-reverse xs:items-center"
        >
          <span class="text-sm xs:rounded xs:border xs:p-2">
            {{ project.type }}
          </span>
          <AOrRouterLink external :href="project.url" class="h-5 text-sm">
            <template v-if="project.url.startsWith('https://github.com/')">
              <MediaWithLoadingSkeleton
                class="h-5 w-5"
                src="/icons/github.svg"
              />
              GitHub Repo
            </template>
            <template v-else>
              <MediaWithLoadingSkeleton
                class="h-5 w-5"
                src="/icons/globe.svg"
              />
              Official Website
            </template>
          </AOrRouterLink>
        </div>
      </div>

      <LoadingSkeleton v-if="!technologies.length" class="h-24 w-full" />
      <div
        v-else
        class="flex flex-wrap justify-evenly gap-2 sm:my-4 sm:justify-start sm:gap-4"
      >
        <MediaWithLoadingSkeleton
          v-for="tech in technologies"
          :key="tech.id"
          :src="tech.logoUrl"
          :alt="tech.name"
          class="h-[min(2.5rem,10vw)] w-[min(2.5rem,10vw)] basis-[12%] object-contain xs:basis-[unset]"
        />
      </div>

      <LoadingSkeleton v-if="!project" class="h-16 w-full" />
      <p
        v-if="project?.abstract"
        class="text-justify text-sm italic"
        v-html="
          '<span class=\'font-bold\'>Abstract: </span>' + project.abstract
        "
      />

      <LoadingSkeleton v-if="!project" class="h-48 w-full !bg-primary-200" />
      <section v-else class="flex justify-between gap-2 md:gap-4">
        <div class="w-0.5 shrink-0 bg-primary-200 sm:w-1" />
        <div class="flex grow flex-col gap-[inherit] md:flex-row">
          <div
            v-if="project.learningObjectives"
            class="flex basis-1/2 flex-col pt-2 md:py-2"
          >
            <h2 class="mb-2 !text-base font-semibold">Learning objectives</h2>
            <ul class="m-0 list-disc text-sm">
              <li
                v-for="lo in project.learningObjectives"
                :key="lo"
                v-html="lo"
                class="my-2"
              />
            </ul>
          </div>
          <div
            v-if="project.learningOutcomes"
            class="flex basis-1/2 flex-col pb-2 md:py-2"
          >
            <h2 class="mb-2 !text-base font-semibold">Learning outcomes</h2>
            <ul class="m-0 list-disc text-sm">
              <li
                v-for="lo in project.learningOutcomes"
                :key="lo"
                v-html="lo"
                class="my-2"
              />
            </ul>
          </div>
        </div>
        <div class="w-0.5 shrink-0 bg-primary-200 sm:w-1" />
      </section>

      <LoadingSkeleton v-if="!project" class="h-96 w-full" />
      <MarkdownRenderer
        v-else
        class="flex flex-col gap-[inherit]"
        :source="
          project.articleBody ?? 'Sorry, I haven\'t written this up just yet!'
        "
      />

      <div class="mt-4 flex justify-center text-xs lg:justify-end">
        <LoadingSkeleton v-if="!project" class="h-4 w-36" />
        <i18n-t v-else keypath="lastModified">
          {{ project.articleLastModified ?? "Unknown" }}
        </i18n-t>
      </div>
    </article>

    <button
      class="mx-auto flex animate-tease justify-center py-4 print:!hidden sm:py-6 lg:py-8"
      onclick="document.body.scrollTop = 0; document.documentElement.scrollTop = 0;"
    >
      <img src="/logo.svg" :alt="$t('logo')" class="h-16 w-16 select-none" />
    </button>
  </div>
</template>

<style>
.project-content {
  & h2 {
    @apply text-lg text-primary-700;
  }

  & p {
    @apply text-justify;
  }

  & pre {
    @apply overflow-x-auto rounded-md border-primary-950 bg-primary-toned-200 p-2 text-primary-toned-900;
  }

  & h3 {
    @apply inline font-bold;
  }

  & ul {
    @apply m-0 text-justify;

    & li {
      @apply my-2;
    }
  }
}
</style>

<script setup lang="ts">
import DataService from "@/services/data.service";
import { computed } from "vue";
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import MediaWithLoadingSkeleton from "@/components/MediaWithLoadingSkeleton.vue";
import MarkdownRenderer from "@/components/MarkdownRenderer.vue";
import AOrRouterLink from "@/components/AOrRouterLink.vue";

const props = defineProps<{ projectId: string }>();

const project = DataService.getProject(props.projectId);
const technologies = computed(() =>
  DataService.getTechnologiesById(project.value?.technologyIds ?? [])
);
</script>
