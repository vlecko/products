import { ref, watch } from 'vue';
import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';

const INVENTORY_STORE_KEY = 'RLT-inventory';

const getFromLocalStorage = key => {
  const jsonData = localStorage.getItem(key);

  if (jsonData) {
    return JSON.parse(jsonData);
  }

  return null;
};

const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const useInventoryStore = defineStore('inventoryStore', () => {
    const cells = ref(getFromLocalStorage(INVENTORY_STORE_KEY)?.cells || []);
    const inventory = ref(new Map(getFromLocalStorage(INVENTORY_STORE_KEY)?.inventory || []));
    const currentCellId = ref('');
    const currentItem = ref({});
    const footerInfo = ref('');

    const initCells = (colCount, rowCount) => {
      for (let i = 0; i < rowCount; i++) {
        const row = Array.from({ length: colCount }, (_, index) => {
          const id = uuidv4();
          inventory.value.set(id, { col: index, row: i, item: {} });

          return { id };
        });

        cells.value.push(row);
      }
    };

    const setCurrentCellId = (cellId) => currentCellId.value = cellId;

    const setCurrentItem = () => {
      if (currentCellId.value) {
        currentItem.value = inventory.value.get(currentCellId.value).item;
      } else {
        currentItem.value = {};
      }
    };

    const addItem = (id, cell) => inventory.value.set(id, { ...cell });

    const setItemAmount = (amount) => {
      const currentCell = inventory.value.get(currentCellId.value);

      if (amount >= currentCell.item.count) {
        inventory.value.set(currentCellId.value, { ...currentCell, item: {} });
      } else {
        inventory.value.set(currentCellId.value, {
          ...currentCell,
          item: {
            ...currentCell.item,
            count: currentCell.item.count - amount,
          },
        });
      }
    };

    const moveItem = (currentCellId, targetCellId) => {
      let currentCell = inventory.value.get(currentCellId);

      if (currentCell.item.count) {
        inventory.value.set(currentCellId, {
          ...currentCell,
          item: {
            ...currentCell.item,
            count: currentCell.item.count - 1,
          },
        });

        const targetCell = inventory.value.get(targetCellId);
        inventory.value.set(targetCellId, {
          ...targetCell,
          item: {
            ...inventory.value.get(currentCellId).item,
            count: targetCell.item.count ? (targetCell.item.count + 1) : 1,
          },
        });
      }

      currentCell = inventory.value.get(currentCellId);

      if (!currentCell.item.count) {
        inventory.value.set(currentCellId, { ...currentCell, item: {} });
      }
    };

    watch([cells, inventory], ([cells, inventory]) => {
      setToLocalStorage(INVENTORY_STORE_KEY, {
        cells: cells,
        inventory: Array.from(inventory.entries()),
      });
    }, { deep: true });

    return {
      cells,
      inventory,
      currentCellId,
      currentItem,
      footerInfo,
      initCells,
      setCurrentCellId,
      setCurrentItem,
      addItem,
      setItemAmount,
      moveItem,
    };
  },
);
