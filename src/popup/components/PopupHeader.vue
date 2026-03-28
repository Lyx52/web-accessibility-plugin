<script setup lang="ts">
  import {useAccessibilityStore} from "../stores/accessibilityStore.ts";

  const accessibilityStore = useAccessibilityStore();
  const closePopup = () => {
    const popup = window?.self;
    if (popup) {
      popup.close();
    }
  }
</script>

<template>
  <header class="bg-[#594685] text-white p-4 flex items-center justify-between sticky top-0 z-10 shadow-md">
    <h1 class="text-xl font-bold tracking-tight select-none">Pieejamības izvēlne</h1>
    <div class="flex items-center gap-2">
      <button
          @click="accessibilityStore.reset"
          class="p-1.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
          title="Atiestatīt uz noklusējumu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      </button>
      <button class="p-1.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer" @click="closePopup">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </header>
</template>