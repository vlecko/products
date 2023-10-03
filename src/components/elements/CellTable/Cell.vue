<script setup>
import { ref } from 'vue';
import Cursor from '@/assets/clarity_cursor-hand-line.svg';

const props = defineProps({
  count: {
    type: Number,
    required: false,
  },
});
const emit = defineEmits(['mousedown']);

const refCell = ref(null);

const onMouseDown = (event) => {
  if (props.count > 0) {
    emit('mousedown', event, refCell.value);
  }
};
</script>

<template>
	<div
		class="table-cell"
		:style="`cursor: url(${Cursor}), pointer;`"
		ref="refCell"
		@mousedown="onMouseDown"
	>
		<slot />
		<div class="table-cell__counter-cell" v-if="count !== undefined">
			<span class="table-cell__counter">
				{{ count }}
			</span>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.table-cell {
	position: relative;
	width: 105px;
	height: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
	background: var(--seondary-bg, #262626);

	&:hover {
		background: var(--hover-bg, #2F2F2F);
	}

	&:not(:last-child) {
		border-right: 1px solid var(--primary-border, #4D4D4D);
	}

	.table-cell__counter-cell {
		position: absolute;
		right: 0;
		bottom: 0;
		width: 16px;
		height: 16px;
		border-top: 1px solid var(--primary-border, #4D4D4D);
		border-left: 1px solid var(--primary-border, #4D4D4D);
		border-top-left-radius: 6px;
		display: flex;
		justify-content: center;
		align-items: center;
		background: var(--seondary-bg, #262626);
		user-select: none;

		.table-cell__counter {
			font-size: 10px;
			font-family: Inter, sans-serif;
			font-weight: 500;
			line-height: 16px;
			color: var(--primary-white, #FFFFFF);
			opacity: 0.4000000059604645;
		}
	}
}
</style>
