<template>
  <span 
    :class="[
      'px-2 py-1 rounded-full text-xs font-medium',
      typeClasses[type] || 'bg-gray-100 text-gray-800'
    ]"
  >
    {{ type }}
  </span>
</template>

<script setup lang="ts">
import { WineType } from '../types/schema';

defineProps<{
  type: WineType;
}>();

const typeClasses = {
  [WineType.Red]: 'bg-red-100 text-red-800',
  [WineType.White]: 'bg-yellow-100 text-yellow-800',
  [WineType.Rose]: 'bg-pink-100 text-pink-800',
  [WineType.Sparkling]: 'bg-blue-100 text-blue-800',
  [WineType.Dessert]: 'bg-purple-100 text-purple-800',
  [WineType.Fortified]: 'bg-amber-100 text-amber-800',
};
</script>