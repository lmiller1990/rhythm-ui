<template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "./store";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

    const summary = store.getState().gameplaySummary;

    if (!summary) {
      throw Error(
        "Somehow arrived at summary screen without a summary in the store. This should never happen."
      );
    }
  },
});
</script>

<style></style>
