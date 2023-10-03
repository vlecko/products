<script setup>
import Cursor from '@/assets/akar-icons_cursor.svg';
</script>

<template>
	<div class="main-layout" :style="`cursor: url(${Cursor}), auto;`">
		<slot />
	</div>
</template>

<style lang="scss">
.main-layout {
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: auto 1fr;
	gap: 24px;

	footer {
		grid-column-start: 1;
		grid-column-end: 3;
	}
}
</style>
