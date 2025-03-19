<template>
  <div class="hero__inventory-wrapper wrapper">
    <div class="hero__inventory-field field">
      <div
        v-for="(cell, index) in inventoryStore.cells"
        :key="index"
        class="field__cell"
        @dragover.prevent
        @drop="handleDrop(index)"
        @dragstart="handleDragStart(index)"
        draggable="true"
        @click="openMenu(index)"
      >
        <div v-if="cell" class="field__item">
          <img :src="cell.imgSrc" alt="" class="field__item-image" />
          <span class="field__item-count">{{ cell.itemCount }}</span>
        </div>
      </div>
    </div>
    <InventoryMenu
      v-if="inventoryStore.selectedCell"
      :cell="inventoryStore.selectedCell"
      :cellIndex="inventoryStore.selectedCellIndex"
      @closeMenu="closeMenu"
      @removeItems="removeItems"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useInventoryStore } from "@/stores/inventory";
import InventoryMenu from "@/components/InventoryMenu.vue";
import itemImage1 from "@/assets/item-image-1.svg";
import itemImage2 from "@/assets/item-image-2.svg";
import itemImage3 from "@/assets/item-image-3.svg";

const inventoryStore = useInventoryStore();

const items = [
  { id: "1", imgSrc: itemImage1, itemCount: 4 },
  { id: "2", imgSrc: itemImage2, itemCount: 2 },
  { id: "3", imgSrc: itemImage3, itemCount: 5 },
];

onMounted(() => {
  inventoryStore.initializeCells(items, 25);
  inventoryStore.loadCells();
});

const openMenu = (index: number) => {
  inventoryStore.openMenu(index);
};

const closeMenu = () => {
  inventoryStore.closeMenu();
};

const handleDragStart = (index: number) => {
  draggedIndex = index;
  const cellElement = document.querySelector(
    `.field__cell:nth-child(${index + 1})`
  );
  if (cellElement) {
    cellElement.classList.add("dragging");
  }
};

let draggedIndex: number | null = null;

const handleDrop = (targetIndex: number) => {
  if (draggedIndex !== null) {
    inventoryStore.handleDrop(draggedIndex, targetIndex);
    draggedIndex = null;

    const cellElement = document.querySelector(".field__cell.dragging");
    if (cellElement) {
      cellElement.classList.remove("dragging");
    }
  }
};

const removeItems = (amount: number) => {
  inventoryStore.removeItems(amount);
};
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
}

.field {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  padding: 20px;

  &__cell {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-dark-alt);
    border: 1px solid var(--border-color);
    width: 105px;
    height: 100px;
    cursor: pointer;
    transition: transform 0.3s ease, opacity 0.3s ease;

    &.dragging {
      transform: scale(1.1);
      opacity: 0.8;
    }

    &:hover {
      background-color: var(--color-gray);
    }

    &:nth-child(5) {
      border-top-right-radius: var(--border-radius-large);
    }

    &:nth-child(21) {
      border-bottom-left-radius: var(--border-radius-large);
    }

    &:nth-child(1) {
      border-top-left-radius: var(--border-radius-large);
    }

    &:nth-child(25) {
      border-bottom-right-radius: var(--border-radius-large);
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.3s ease;

    &-image {
      width: 50px;
      height: 50px;
      margin-bottom: 5px;
    }

    &-count {
      position: absolute;
      bottom: -1%;
      right: -1%;
      font-size: 14px;
      color: var(--color-gray);
      background-color: var(--color-dark-alt);
      border: 1px solid var(--border-color);
      border-top-left-radius: var(--border-radius-small);
      padding: 2px 4px;
    }
  }
}
</style>
