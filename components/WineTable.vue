<template>
  <div class="min-h-screen bg-[#f8f6f5] flex flex-col items-center p-4">
    <div class="w-full max-w-6xl p-4 bg-white rounded-2xl shadow-sm">
      <div class="flex flex-col justify-between gap-3 mb-4 md:flex-row">
        <div class="flex items-center justify-between mb-2 md:hidden">
          <h2 class="text-xl font-semibold text-gray-800">Wine List</h2>
          <button 
            @click="toggleMobileView"
            class="flex items-center gap-1 text-sm font-medium text-red-700"
          >
            {{ showCompactView ? 'Show all details' : 'Show compact view' }}
            <Icon name="heroicons:chevron-down-20-solid" class="w-4 h-4 transition-transform" :class="{'rotate-180': !showCompactView}" />
          </button>
        </div>
        
        <div class="flex gap-3 order-1 md:order-none">
          <button class="px-4 py-2 text-white transition bg-red-800 rounded-md hover:bg-red-700 whitespace-nowrap">
            Aggiungi vino
          </button>
          <button class="px-4 py-2 text-white transition bg-red-800 rounded-md hover:bg-red-700 whitespace-nowrap">
            Crea riordino rapido
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="flex justify-center py-8">
        <div class="w-8 h-8 border-t-2 border-b-2 border-red-800 rounded-full animate-spin"></div>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead class="bg-transparent md:table-header-group hidden">
            <tr class="text-sm text-left text-gray-500">
              <th class="p-3">Wine</th>
              <th class="p-3">Type</th>
              <th class="p-3">Size</th>
              <th class="p-3">Vintage</th>
              <th class="p-3">Stock</th>
              <th class="p-3">Price</th>
              <th class="p-3">Storage</th>
              <th class="p-3">Status</th>
              <th class="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="wine in wines"
              :key="wine.id"
              class="flex flex-col mb-4 transition-all bg-white border rounded-lg shadow md:table-row md:mb-0 md:bg-transparent md:shadow-none md:border-0 hover:md:bg-gray-50"
            >
              <!-- Wine Name -->
              <td class="flex justify-between p-3 border-b md:table-cell md:border-0" data-label="Wine">
                <div class="md:contents">
                  <span class="font-medium text-gray-500 md:hidden min-w-[120px]">Wine</span>
                  <div class="flex-1 text-right md:text-left">
                    <div class="flex items-center gap-2 md:block">
                      <img 
                        :src="`https://flagcdn.com/w20/${wine.data.country.toLowerCase()}.png`" 
                        class="hidden w-5 h-5 rounded-full md:inline-block" 
                        :alt="wine.data.country"
                      />
                      <div>
                        <div class="font-semibold text-red-600">{{ wine.data.name }}</div>
                        <div class="text-sm text-gray-500">{{ wine.data.winery }}</div>
                        <div class="mt-1 text-xs text-gray-400 md:hidden">{{ wine.data.territory }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>

              <!-- Type -->
              <td class="flex justify-between p-3 border-b md:table-cell md:border-0" data-label="Type" v-if="!isMobile || !showCompactView">
                <div class="md:contents">
                  <span class="font-medium text-gray-500 md:hidden min-w-[120px]">Type</span>
                  <div class="flex-1 text-right md:text-left">
                    <span :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      wine.data.type === 'Red' ? 'bg-red-100 text-red-800' :
                      wine.data.type === 'White' ? 'bg-yellow-100 text-yellow-800' :
                      wine.data.type === 'Rosé' ? 'bg-pink-100 text-pink-800' :
                      wine.data.type === 'Sparkling' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    ]">
                      {{ wine.data.type }}
                    </span>
                  </div>
                </div>
              </td>

              <!-- Size -->
              <td class="flex justify-between p-3 border-b md:table-cell md:border-0" data-label="Size" v-if="!isMobile || !showCompactView">
                <div class="md:contents">
                  <span class="font-medium text-gray-500 md:hidden min-w-[120px]">Size</span>
                  <div class="flex-1 text-right md:text-left">
                    {{ formatBottleSize(wine.size) }}
                  </div>
                </div>
              </td>

              <!-- Vintage -->
              <td class="flex justify-between p-3 border-b md:table-cell md:border-0" data-label="Vintage" v-if="!isMobile || !showCompactView">
                <div class="md:contents">
                  <span class="font-medium text-gray-500 md:hidden min-w-[120px]">Vintage</span>
                  <div class="flex-1 text-right md:text-left">
                    {{ wine.vintage }}
                  </div>
                </div>
              </td>

              <!-- Stock -->
              <td class="flex justify-between p-3 border-b md:table-cell md:border-0" data-label="Stock" v-if="!isMobile || !showCompactView">
                <div class="md:contents">
                  <span class="font-medium text-gray-500 md:hidden min-w-[120px]">Stock</span>
                  <div class="flex-1 text-right md:text-left">
                    <div class="flex items-center gap-2 justify-end md:justify-start">
                      <span>{{ wine.currentStock }}/{{ wine.minRequiredStock }}</span>
                      <span :class="[
                        'w-3 h-3 rounded-full',
                        wine.currentStock >= wine.minRequiredStock ? 'bg-green-500' : 
                        wine.currentStock > 0 ? 'bg-yellow-500' : 'bg-red-500'
                      ]"></span>
                    </div>
                  </div>
                </div>
              </td>

              <!-- Price -->
              <td class="flex justify-between p-3 border-b md:table-cell md:border-0" data-label="Price" v-if="!isMobile || !showCompactView">
                <div class="md:contents">
                  <span class="font-medium text-gray-500 md:hidden min-w-[120px]">Price</span>
                  <div class="flex-1 text-right md:text-left">
                    {{ formatPrice(wine.price) }}
                  </div>
                </div>
              </td>

              <!-- Storage -->
              <td class="flex justify-between p-3 border-b md:table-cell md:border-0" data-label="Storage" v-if="!isMobile || !showCompactView">
                <div class="md:contents">
                  <span class="font-medium text-gray-500 md:hidden min-w-[120px]">Storage</span>
                  <div class="flex-1 text-right md:text-left">
                    {{ wine.storageArea }}
                  </div>
                </div>
              </td>

              <!-- Status -->
              <td class="flex justify-between p-3 md:table-cell" data-label="Status">
                <div class="md:contents">
                  <span class="font-medium text-gray-500 md:hidden min-w-[120px]">Status</span>
                  <div class="flex-1 text-right md:text-left">
                    <span :class="[
                      'px-3 py-1 text-sm rounded-full inline-block',
                      wine.visible ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-600'
                    ]">
                      {{ wine.visible ? 'Visible' : 'Hidden' }}
                    </span>
                  </div>
                </div>
              </td>

              <!-- Actions -->
              <td class="flex justify-between p-3 md:table-cell" data-label="Actions">
                <div class="md:contents">
                  <span class="font-medium text-gray-500 md:hidden min-w-[120px]">Actions</span>
                  <div class="flex-1 text-right md:text-left">
                    <button class="font-medium text-red-600 hover:underline">
                      Details
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Show More Button -->
      <div class="flex justify-center mt-6">
        <button 
          @click="loadMore"
          class="px-6 py-2 text-white transition bg-black rounded-full hover:bg-gray-800"
          :disabled="loading || pending"
        >
          <span v-if="loading">Loading...</span>
          <span v-else>Mostra altro</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserWine } from '@/types/schema';
import { BottleSize } from '@/types/schema';

const props = defineProps<{
  formatPrice: (price: number) => string;
  formatBottleSize: (size: BottleSize) => string;
}>();

const emits = defineEmits(['load-more']);

const wines = ref<UserWine[]>([]);
const pending = ref(true);
const showCompactView = ref(false);
const windowWidth = ref(0);
const loading = ref(false);
const isMobile = computed(() => windowWidth.value < 768);


const { data: initialWines, refresh } = await useAsyncData(
  'wines',
  async () => {
    const { getWines } = useWines();
    return await getWines(1, 10);
  }
);

watch(initialWines, (newWines) => {
  if (newWines) {
    wines.value = newWines;
    pending.value = false;
  }
}, { immediate: true });

const toggleMobileView = () => {
  showCompactView.value = !showCompactView.value;
};


const loadMore = async () => {
  loading.value = true;
  try {
    emits('load-more');
  } finally {
    loading.value = false;
  }
};


const handleResize = () => {
  windowWidth.value = window.innerWidth;
  if (!isMobile.value) {
    showCompactView.value = false;
  }
};

onMounted(() => {
  windowWidth.value = window.innerWidth;
  window.addEventListener('resize', handleResize);
  
  if (wines.value.length === 0) {
    refresh();
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style>
/* Spin animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}

/* Mobile responsive styles */
@media (max-width: 768px) {
  .responsive-table thead {
    display: none;
  }
  .responsive-table tr {
    display: block;
  }
  .responsive-table td {
    display: flex;
    justify-content: space-between;
    padding: 0.75rem;
  }
  .responsive-table td::before {
    content: attr(data-label);
    font-weight: 600;
    color: #6b7280;
  }
}
</style>