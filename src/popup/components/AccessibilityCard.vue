<script setup lang="ts">
  import {IAccessibilityCard} from "../stores/interfaces/IAccessibilityCard";
  const props = defineProps<IAccessibilityCard>()
</script>

<template>
  <div
       class="bg-white p-4 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer transition-all border-2 relative"
       :class="[props.active ? 'border-[#594685] bg-[#F7F6F3]' : 'border-white hover:border-[#DCDAD2]']"
       @click="props.click"
  >
    <span v-if="props.active" class="absolute top-0 right-0">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    </span>


    <div class="flex items-center justify-center h-14 mb-2 text-[#594685] scale-110">
      <component :is="props.icon"/>
    </div>
    <p class="text-[13px] leading-tight font-medium text-[#2C2145] select-none">{{ props.label }}</p>
  </div>
</template>

<style scoped>

</style>