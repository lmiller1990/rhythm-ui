<template>
  <div class="grid grid-cols-2 gap-2 my-4">
    <div class="text-6xl">98.98%</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "./store";

export default defineComponent({
  setup() {
    const store = useStore();

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
