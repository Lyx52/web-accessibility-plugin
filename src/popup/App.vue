<script setup lang="ts">
import PopupHeader from "./components/PopupHeader.vue";
import FontSizeSection from "./components/FontSizeSection.vue";
import {updateDocumentClasses, useAccessibilityStore} from "./stores/accessibilityStore.ts";
import AccessibilityCard from "./components/AccessibilityCard.vue";
import IconFontBolded from "./components/icons/IconFontBolded.vue";
import IconFontDyslexic from "./components/icons/IconFontDyslexic.vue";
import {onMounted} from "vue";
import {useAccessibilityHandler} from "../browser/accessibilityHandler.ts";
import IconLineHeight from "./components/icons/IconLineHeight.vue";
import IconLetterSpacing from "./components/icons/IconLetterSpacing.vue";
import IconBigCursor from "./components/icons/IconBigCursor.vue";
import IconSpeech from "./components/icons/IconSpeech.vue";

const accessibilityStore = useAccessibilityStore();
const accessibilityHandler = useAccessibilityHandler();

accessibilityStore.$subscribe(async (_, state) => {
  updateDocumentClasses(state, 150);

  await accessibilityHandler.persist(state);
  await accessibilityHandler.updateAccessibilityOnPage(state);
});

onMounted(async () => {
  await accessibilityStore.loadAccessibilityState();
});

</script>

<template>
  <div class="min-w-120 min-h-[600px] bg-[#EBE9E2] text-[#2C2145] font-sans shadow-lg overflow-hidden flex flex-col">
    <PopupHeader />

    <main class="flex-grow p-4 space-y-4 overflow-y-auto">
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

        <AccessibilityCard
            label="Rindu augstums"
            :click="() => accessibilityStore.lineHeight = !accessibilityStore.lineHeight"
            :active="accessibilityStore.lineHeight"
            :icon="IconLineHeight"
        />

        <AccessibilityCard
            label="Burtu atstarpe"
            :click="() => accessibilityStore.letterSpacing = !accessibilityStore.letterSpacing"
            :active="accessibilityStore.letterSpacing"
            :icon="IconLetterSpacing"
        />

        <AccessibilityCard
            label="Liels kursors"
            :click="() => accessibilityStore.bigCursor = !accessibilityStore.bigCursor"
            :active="accessibilityStore.bigCursor"
            :icon="IconBigCursor"
        />

        <AccessibilityCard
            label="Balss lasītājs"
            :click="() => accessibilityStore.speech = !accessibilityStore.speech"
            :active="accessibilityStore.speech"
            :icon="IconSpeech"
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