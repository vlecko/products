<script setup>
import IconButton from '@/components/layouts/ui/IconButton.vue';

const props = defineProps({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  ariaLabel: {
    type: String,
    required: true,
  },
});
</script>

<template>
	<IconButton
		id="al"
		:aria-label="ariaLabel"
		name="close"
		style="cursor: inherit"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			:viewBox="`0 0 ${width} ${height}`"
			:style="`width: ${width}px; height: ${height}px`"
			stroke-width="1.5"
			fill="none"
			stroke="#FFFFFF"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
		</svg>
	</IconButton>
</template>

<style lang="scss" scoped />

