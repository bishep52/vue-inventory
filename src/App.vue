<template>
  <main>
    <section class="hero">
      <h1 class="visually-hidden">Инвентарь</h1>
      <div class="hero__top">
        <InventorySidebar class="hero__sidebar" />
        <InventoryGrid class="hero__inventory" />
      </div>
      <div class="hero__body">
        <SearchBar class="hero__search" />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import InventorySidebar from "./components/InventorySidebar.vue";
import InventoryGrid from "./components/InventoryGrid.vue";
import SearchBar from "./components/SearchBar.vue";
</script>

<style lang="scss" scoped>
.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 24px;
  padding: 32px;

  &__top {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 24px;
  }
}
</style>
