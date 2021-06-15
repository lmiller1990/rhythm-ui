<template>
  <div class="grid grid-cols-2 gap-2 my-4">
    <div>
      <div class="text-8xl">98.98%</div>

      <div class="text-6xl my-8">
        <ul>
          <timing-count :count="summary.timing.perfect.count" label="Perfect" />

          <timing-count :count="summary.timing.great.count" label="Great" />

          <timing-count :count="summary.timing.miss.count" label="Miss" />
        </ul>
      </div>

      <div class="text-6xl">Max combo: TODO</div>
    </div>

    <div>
      <div class="flex bg-blue-200 justify-center">
        <div class="h-30 text-5xl flex items-center">TODO: Song banner</div>
      </div>

      <div class="bg-blue-300 mt-4">
        <h1 class="text-4xl">Top Rankers</h1>
        <ul>
          <top-ranker
            v-for="num of [10, 20, 30, 40, 50]"
            name="ABC DEF"
            :score="100 - num"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, FunctionalComponent, h } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "./store";

const TimingCount: FunctionalComponent<{ label: string; count: number }> = ({
  label,
  count,
}) => {
  return h("li", { class: "flex justify-between" }, [
    h("p", label),
    h("p", count),
  ]);
};

const TopRanker: FunctionalComponent<{ name: string; score: number }> = ({
  name,
  score,
}) => {
  return h("li", { class: "flex justify-between text-3xl" }, [
    h("p", name),
    h("p", `${score}%`),
  ]);
};

export default defineComponent({
  components: {
    TimingCount,
    TopRanker,
  },

  setup() {
    const store = useStore();

    const summary = store.getState().gameplaySummary;

    if (!summary) {
      throw Error(
        "Somehow arrived at summary screen without a summary in the store. This should never happen."
      );
    }

    return {
      summary,
    };
  },
});
</script>

<style></style>
