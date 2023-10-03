<script setup>
import Cell from '@/components/elements/CellTable/Cell.vue';
import Item from '@/components/elements/Item.vue';
import { drag } from '@/helpers/drag.js';

const props = defineProps({
  cells: {
    type: Array,
    required: true,
  },
  inventory: {
    type: Map,
    required: true,
  },
});
const emit = defineEmits(['click', 'move']);

const onMouseDown = (event, element) => {
  drag(
    event,
    element,
    (targetCellId) => emit('move', element.dataset.id, targetCellId),
  );
};
</script>

<template>
	<div class="cell-table">
		<div class="cell-table__row" v-for="(cellRow, rowIndex) in cells" :key="rowIndex">
			<Cell
				v-for="cell in cellRow"
				:key="cell.id"
				:count="inventory.get(cell.id).item.count"
				:data-id="cell.id"
				:data-count="inventory.get(cell.id).item.count || 0"
				@click="emit('click', cell.id)"
				@mousedown="onMouseDown"
				@dragstart.prevent
			>
				<Item
					v-if="inventory.get(cell.id).item.id"
					:main-color="inventory.get(cell.id).item.mainColor"
					:secondary-color="inventory.get(cell.id).item.secondaryColor"
					:width="54"
					:height="54"
					:data-id="inventory.get(cell.id).item.id"
				/>
			</Cell>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.cell-table {
	border-radius: 12px;
	border: 1px solid var(--primary-border, #4D4D4D);
	display: flex;
	flex-direction: column;
	overflow: clip;

	.cell-table__row {
		display: flex;

		&:not(:last-child) {
			border-bottom: 1px solid var(--primary-border, #4D4D4D);
		}
	}
}
</style>
