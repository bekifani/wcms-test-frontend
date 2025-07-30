<template>
  <WineTable
    :initial-wines="wines"
    :format-price="formatPrice"
    :format-bottle-size="formatBottleSize"
    @load-more="loadMoreWines"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import WineTable from '@/components/WineTable.vue';
import { useWines } from '@/composables/useWines';
import type { UserWine } from '@/types/schema';

const { getWines, formatPrice, formatBottleSize } = useWines();

const wines = ref<UserWine[]>([]);

const loadInitialData = async () => {
  wines.value = await getWines(1, 10);
};

const loadMoreWines = async () => {
  const newWines = await getWines(2, 10);
  wines.value = [...wines.value, ...newWines];
};

loadInitialData();
</script>