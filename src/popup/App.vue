<script setup lang="ts">
import PopupHeader from "./components/PopupHeader.vue";
import FontSizeSection from "./components/FontSizeSection.vue";
import {updateDocumentClasses, useAccessibilityStore} from "./stores/accessibilityStore.ts";
import AccessibilityCard from "./components/AccessibilityCard.vue";
import IconFontBolded from "./components/icons/IconFontBolded.vue";
import IconFontDyslexic from "./components/icons/IconFontDyslexic.vue";
import {onMounted} from "vue";
import {useAccessibilityHandler} from "../browser/accessibilityHandler.ts";

const accessibilityStore = useAccessibilityStore();
const accessibilityHandler = useAccessibilityHandler();
onMounted(async () => {
  const accessibilityStore = useAccessibilityStore();
  await accessibilityStore.loadAccessibilityState();
});

accessibilityStore.$subscribe(async (mutation, state) => {
  updateDocumentClasses(state);
  await accessibilityHandler.updateAccessibilityOnPage(state);
  await accessibilityHandler.persist(state);
});

</script>

<template>
  <div class="min-w-120 min-h-[600px] bg-[#EBE9E2] text-[#2C2145] font-sans shadow-lg overflow-hidden flex flex-col">
    <PopupHeader />

    <div v-if="isLoading" class="flex-grow flex items-center justify-center p-8">
      <div class="text-lg opacity-60">Ielādē iestatījumus...</div>
    </div>

    <main v-else class="flex-grow p-4 space-y-4 overflow-y-auto">
      <FontSizeSection />
      <div class="grid grid-cols-3 gap-3">
        <AccessibilityCard
            label="Fonta biezums"
            :click="() => accessibilityStore.fontBolded = !accessibilityStore.fontBolded"
            :active="accessibilityStore.fontBolded"
            :icon="IconFontBolded"
        />

        <AccessibilityCard
            label="Disleksijas fonts"
            :click="() => accessibilityStore.fontDyslexic = !accessibilityStore.fontDyslexic"
            :active="accessibilityStore.fontDyslexic"
            :icon="IconFontDyslexic"
        />

      </div>
    </main>
  </div>
</template>
<style scoped>
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #EBE9E2;
  border-left: 1px solid #DCDAD2;
}

::-webkit-scrollbar-thumb {
  background: #B4AE9C;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #9A9584;
}
</style>