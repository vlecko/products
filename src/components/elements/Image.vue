<script setup>
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: false,
  },
  width: {
    type: String,
    required: false,
    default: '100%',
  },
  height: {
    type: String,
    required: false,
    default: '100%',
  },
});
</script>

<template>
	<div class="image" :style="`width: ${width}; height: ${height};`">
		<img
			:src="`${src}`"
			:alt="`${alt || 'image'}`"
		/>
	</div>
</template>

<style lang="scss" scoped>
.image {
	display: flex;
	align-items: center;
	justify-content: center;

	img {
		max-width: 100%;
		max-height: 100%;
		border-radius: 8px;
		display: block;
	}
}
</style>
