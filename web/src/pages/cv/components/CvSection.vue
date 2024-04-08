<template>
  <section class="mt-0 break-inside-avoid-page xs:text-xl lg:text-base">
    <div class="text-center lg:text-left">
      <div
        class="justify-content-between mb-1 mt-6 flex w-full items-center font-bold text-primary-toned-700 print:!m-0 print:!text-sm lg:mb-2 lg:mt-0 lg:block"
      >
        <span class="h-[1pt] w-full bg-primary-toned-700 lg:!hidden"></span>
        <h2 class="mx-2 w-fit shrink-0 lg:mx-0" v-html="title" />
        <span class="h-[1pt] w-full bg-primary-toned-700 lg:!hidden"></span>
      </div>
      <div
        v-if="dateDisplayValue || subtitle"
        class="mb-6 mt-1 flex w-full flex-wrap items-center justify-center print:!text-sm lg:mb-2 lg:justify-start"
      >
        <h3 v-if="dateDisplayValue" class="mx-2 shrink-0 font-bold lg:ml-0">
          {{ dateDisplayValue }}
        </h3>
        <h4 v-if="subtitle" class="mx-2 shrink-0 lg:mx-0">
          {{ subtitle }}
        </h4>
      </div>
    </div>
    <p
      class="mb-4 text-justify last:mb-0 print:!text-[9pt] print:!leading-[18px] xs:text-lg lg:text-sm lg:leading-6"
    >
      <slot></slot>
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { DateTime, Duration } from "luxon";
import localeService from "@/services/locale.service";
import type { DateDisplayType } from "shared/dist/data.model";

const props = defineProps<{
  title: string;
  subtitle?: string;
  dateRange?: { from: string; to: string };
  dateDisplayType: DateDisplayType;
}>();

const locale = localeService.getCurrentLocale();

function formatDate(date: DateTime): string {
  if (locale.value === "ja-JP") {
    return `${date.year}年${date.month}月`;
  }
  const month = date.month < 10 ? "0" + date.month : date.month;
  return `${date.year}-${month}`;
}

function formatDuration(duration: Duration) {
  const months = Math.ceil(duration.months);
  const years = duration.years + (months === 12 ? 1 : 0);
  const durationString = Duration.fromDurationLike({
    years: years === 0 ? undefined : years,
    months: months === 12 ? undefined : months,
  }).toHuman();

  if (locale.value === "ja-JP") {
    return (
      durationString
        .replaceAll("s", "")
        .replaceAll(" ", "")
        .replace("year", "年")
        .replace("month", "月")
        .replace(",", "") + "間"
    );
  }
  return durationString;
}

const dateDisplayValue = computed(() => {
  const dateRange = props.dateRange;
  if (!dateRange) return "";

  const dateFrom = DateTime.fromISO(dateRange.from);
  const dateToIsPresent = dateRange.to.toLowerCase() === "present";
  const dateTo = dateToIsPresent
    ? DateTime.now()
    : DateTime.fromISO(dateRange.to);

  const dateDisplayType = props.dateDisplayType;
  if (dateDisplayType === "startDate") {
    return formatDate(dateFrom);
  }

  const toString = locale.value === "ja-JP" ? "〜" : " to ";
  const presentString = locale.value === "ja-JP" ? "" : "Present";
  const dateRangeString =
    formatDate(dateFrom) +
    toString +
    (dateToIsPresent ? presentString : formatDate(dateTo));

  if (!dateDisplayType || dateDisplayType === "dateRange") {
    return dateRangeString;
  }

  const duration = dateTo.diff(dateFrom, ["years", "months"]);
  const durationString = formatDuration(duration);

  if (dateDisplayType === "duration") {
    return durationString;
  }
  if (dateDisplayType === "dateRangeAndDuration") {
    return dateRangeString + " (" + durationString + ")";
  }
  if (dateDisplayType === "startDateAndDuration") {
    return formatDate(dateFrom) + " (" + durationString + ")";
  }

  throw new Error("Invalid date display type " + dateDisplayType);
});
</script>
