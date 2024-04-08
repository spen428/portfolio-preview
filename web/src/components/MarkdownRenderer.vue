<template>
  <div>
    <template v-for="item in tokenGroups" :key="item">
      <div v-if="item.type === 'html'" v-html="item.content" />
      <MediaWithLoadingSkeleton
        v-if="item.type === 'media'"
        :src="item.attrs![0][1]"
        class="min-h-[10rem]"
        autoplay
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, type ComputedRef } from "vue";
import MarkdownIt, { type Token } from "markdown-it";
import MediaWithLoadingSkeleton from "@/components/MediaWithLoadingSkeleton.vue";
import type StateCore from "markdown-it/lib/rules_core/state_core";

const props = defineProps<{ source: string }>();

const markdownInstance = new MarkdownIt({
  html: true,
  xhtmlOut: false,
  breaks: false,
  linkify: false,
});

markdownInstance.core.ruler.push("custom_media", (state: StateCore) => {
  state.tokens.forEach((token, index) => {
    if (token.content.startsWith("#! ")) {
      const mediaToken = new state.Token("media", "", 0);
      const src = token.content.split("#! ")[1];
      mediaToken.attrSet("src", src);
      state.tokens[index] = mediaToken;
    }
  });
});

type PartialToken = Pick<Token, "type" | "content" | "attrs">;

function isMediaBlock(tokenStream: Token[]) {
  return (
    tokenStream.length === 3 &&
    tokenStream[0].type === "paragraph_open" &&
    tokenStream[1].type === "media" &&
    tokenStream[2].type === "paragraph_close"
  );
}

function readNextGroup(tokens: Token[]) {
  const tokensInGroup = [tokens.shift()!];

  const tokenType = tokensInGroup[0].type;
  if (!tokenType.endsWith("_open")) {
    return tokensInGroup;
  }

  const closingBlockType = tokenType.replace(/_open$/, "_close");
  while (tokens.length > 0) {
    const childToken = tokens.shift()!;
    tokensInGroup.push(childToken);
    if (childToken.type === closingBlockType) break;
  }

  return tokensInGroup;
}

const tokenGroups: ComputedRef<PartialToken[]> = computed(() => {
  const tokens = markdownInstance.parse(props.source, {});
  const items = [];

  while (tokens.length > 0) {
    const tokensToRender = readNextGroup(tokens);

    if (isMediaBlock(tokensToRender)) {
      const mediaToken = tokensToRender[1];
      items.push(mediaToken);
      continue;
    }

    items.push({
      type: "html",
      content: markdownInstance.renderer.render(
        tokensToRender,
        markdownInstance.options,
        {}
      ),
      attrs: tokensToRender[0].attrs,
    });
  }

  return items;
});
</script>
