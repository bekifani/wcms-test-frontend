<template>
    <Icon :name="`circle-flags:${country.toLowerCase()}`" class="text-xl flex-none rounded-full"
    aria-hidden="true" />
</template>

<script setup lang="ts">
import { CountryCode } from '~/types/schema';

defineProps<{
    country: CountryCode;
}>();
</script>