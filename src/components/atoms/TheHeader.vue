<template>
	<div class="heading-title">{{ title }}</div>
	<p class="heading-subtitle text-muted">{{ subtitle }}</p>
</template>

<script setup lang="ts">
defineProps<{
	title: string;
	subtitle: string;
}>();
</script>

<style></style>
