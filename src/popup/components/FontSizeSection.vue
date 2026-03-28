<script setup lang="ts">
  import {useAccessibilityStore} from "../stores/accessibilityStore.ts";

  const accessibilityStore = useAccessibilityStore();
  const MIN_VALUE = 80;
  const MAX_VALUE = 300;
  const INCREMENT_BY = 10;
</script>

<template>
  <section class="bg-white p-6 rounded-md shadow-sm">
    <div class="flex items-center gap-4 mb-5">
          <span class="text-[#594685] font-black select-none">
            <span class="text-3xl">T</span>
            <span class="text-2xl">T</span>
          </span>
      <h2 class="text-lg font-semibold text-[#594685] select-none">Pielāgot fonta izmēru</h2>
    </div>

    <div class="flex items-center justify-between gap-6 px-4">
      <button
          @click="accessibilityStore.fontScale = Math.max(MIN_VALUE, accessibilityStore.fontScale - INCREMENT_BY)"
          class="flex items-center justify-center w-12 h-12 rounded-full bg-[#EBE9E2] text-3xl font-light hover:bg-[#DCDAD2] select-none cursor-pointer active:scale-95 transition-all"
          :disabled="accessibilityStore.fontScale <= MIN_VALUE"
      >
        –
      </button>

      <span class="text-3xl font-medium tabular-nums select-none">{{ accessibilityStore.fontScale }}%</span>

      <button
          @click="accessibilityStore.fontScale = Math.min(MAX_VALUE, accessibilityStore.fontScale + INCREMENT_BY)"
          class="flex items-center justify-center w-12 h-12 rounded-full bg-[#EBE9E2] text-3xl font-light hover:bg-[#DCDAD2] select-none cursor-pointer active:scale-95 transition-all"
          :disabled="accessibilityStore.fontScale >= MAX_VALUE"
      >
        +
      </button>
    </div>
  </section>
</template>

<style scoped>

</style>