import { defineStore } from "pinia";
import { ref, computed } from "vue";

interface ICell {
  id: string;
  imgSrc: string;
  itemCount: number;
}

export const useInventoryStore = defineStore("inventory", () => {
  const cells = ref<(ICell | null)[]>([]);
  const selectedCellIndex = ref<number | null>(null);

  const selectedCell = computed(() => {
    return selectedCellIndex.value !== null
      ? cells.value[selectedCellIndex.value]
      : null;
  });

  const initializeCells = (items: ICell[], gridSize: number) => {
    const initializedCells = Array(gridSize).fill(null);
    items.forEach((item, index) => {
      if (index < gridSize) {
        initializedCells[index] = item;
      }
    });
    cells.value = initializedCells;
  };

  const loadCells = () => {
    const savedCells = localStorage.getItem("cells");
    if (savedCells) {
      cells.value = JSON.parse(savedCells);
    }
  };

  const saveCells = () => {
    localStorage.setItem("cells", JSON.stringify(cells.value));
  };

  const openMenu = (index: number) => {
    selectedCellIndex.value = index;
  };

  const closeMenu = () => {
    selectedCellIndex.value = null;
  };

  const removeItems = (amount: number) => {
    if (selectedCellIndex.value !== null) {
      const cell = cells.value[selectedCellIndex.value];
      if (cell) {
        cell.itemCount -= amount;
        if (cell.itemCount <= 0) {
          cells.value[selectedCellIndex.value] = null;
        }
        saveCells();
      }
    }
  };

  const handleDrop = (draggedIndex: number, targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const updatedCells = [...cells.value];
    const [movedCell] = updatedCells.splice(draggedIndex, 1);
    updatedCells.splice(targetIndex, 0, movedCell);
    cells.value = updatedCells;

    saveCells();
  };

  return {
    cells,
    selectedCellIndex,
    selectedCell,
    initializeCells,
    loadCells,
    saveCells,
    openMenu,
    closeMenu,
    removeItems,
    handleDrop,
  };
});
