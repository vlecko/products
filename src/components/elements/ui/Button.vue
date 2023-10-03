<script setup>
const props = defineProps({});
</script>

<template>
	<button class="button" style="cursor: inherit">
		<slot />
	</button>
</template>

<style lang="scss" scoped>
.button {
	width: 100%;
	max-height: 2.5rem;
	padding: 11px 0;
	border: 1px solid transparent;
	border-radius: 8px;
	text-align: center;
	font-size: 14px;
	font-family: SF Pro Display, sans-serif;
	color: var(--primary-white, #FFFFFF);
	background: var(--primary-red, #FA7272);
	outline-offset: 2px;
	user-select: none;
	touch-action: manipulation;
	transition: all .2s;

	&:hover {
		background: var(--red-hover, #F88);
	}
}
</style>
