<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { v4 as uuidv4 } from 'uuid';
import Card from '@/components/elements/Card.vue';
import CellTable from '@/components/elements/CellTable/CellTable.vue';
import Footer from '@/components/elements/Footer.vue';
import Image from '@/components/elements/Image.vue';
import InventoryModal from '@/components/elements/InventoryModal.vue';
import Main from '@/components/layouts/Main.vue';
import Sample from '@/assets/img-blur.png';
import { useInventoryStore } from '@/stores/inventory-store';

const inventoryStore = useInventoryStore();
const { cells, inventory, currentCellId, currentItem, footerInfo } = storeToRefs(inventoryStore);

onMounted(() => {
  if (!cells.value.length) {
    inventoryStore.initCells(5, 5);
  }

  let isEmpty = true;

  for (let value of inventory.value.values()) {
    if (value.item.count) {
      isEmpty = false;
    }
  }

  if (isEmpty) {
    let id;

    id = cells.value[0][0].id;
    inventoryStore.addItem(id, {
      col: 0,
      row: 0,
      item: {
        id: uuidv4(),
        count: 4,
        mainColor: '#7FAA65',
        secondaryColor: '#B8D998',
        description: {},
      },
    });

    id = cells.value[0][1].id;
    inventoryStore.addItem(id, {
      col: 0,
      row: 0,
      item: {
        id: uuidv4(),
        count: 2,
        mainColor: '#AA9765',
        secondaryColor: '#D9BB98',
        description: {},
      },
    });

    id = cells.value[0][2].id;
    inventoryStore.addItem(id, {
      col: 0,
      row: 0,
      item: {
        id: uuidv4(),
        count: 5,
        mainColor: '#656CAA',
        secondaryColor: '#7481ED',
        description: {},
      },
    });
  }
});

const onClickOnItem = (cellId) => {
  inventoryStore.setCurrentCellId(cellId);
  inventoryStore.setCurrentItem();
};

const onCloseModal = (modal) => {
  modal.style.right = '-250px';
  setTimeout(() => inventoryStore.setCurrentCellId(''), 300);
};

const onDeleteItem = (amount, modal) => {
  inventoryStore.setItemAmount(amount);
  onCloseModal(modal);
};

const onModalMounted = (modal) => modal.style.right = 0;

const onModalUnmounted = () => inventoryStore.setCurrentItem();

const onMoveItem = (currentCellId, targetCellId) => {
  inventoryStore.moveItem(currentCellId, targetCellId);
};
</script>

<template>
	<Main>
		<aside>
			<Card :description="{}" :is-loading="true">
				<Image
					:src="Sample"
					alt="sample image"
					width="208px"
					height="240px"
				/>
			</Card>
		</aside>
		<main class="main">
			<CellTable
				:cells="cells"
				:inventory="inventory"
				@click="onClickOnItem"
				@move="onMoveItem"
			/>
			<InventoryModal
				v-if="currentCellId"
				:item="currentItem"
				:is-loading="true"
				@close="onCloseModal"
				@delete="onDeleteItem"
				@mount="onModalMounted"
				@unmount="onModalUnmounted"
			/>
		</main>
		<Footer :info="footerInfo" :is-loading="true" />
	</Main>
</template>

<style lang="scss" scoped>
.main {
	position: relative;
	border-radius: 12px;
	overflow: clip;
}
</style>
