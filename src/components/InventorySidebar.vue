<template>
    <aside class="hero__sidebar-menu sidebar-menu">
      <img
        src="../assets/aside-image.webp"
        alt=""
        width="208"
        height="240"
        class="sidebar-menu__image"
      />
      <h2 class="sidebar-menu__title skeleton-title"></h2>
      <ul class="sidebar-menu__list">
        <li class="sidebar-menu__item skeleton-menu skeleton-menu-1"></li>
        <li class="sidebar-menu__item skeleton-menu skeleton-menu-2"></li>
        <li class="sidebar-menu__item skeleton-menu skeleton-menu-3"></li>
        <li class="sidebar-menu__item skeleton-menu skeleton-menu-4"></li>
        <li class="sidebar-menu__item skeleton-menu skeleton-menu-5"></li>
      </ul>
      <p class="sidebar-menu__description skeleton-description"></p>
    </aside>
  </template>
  
  <script setup lang="ts"></script>
  
  <style lang="scss" scoped>
  .sidebar-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--color-dark-alt);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-large);
    row-gap: 24px;
    padding: 18px 14px 24px 14px;
  
    &__image {
      border-radius: var(--border-radius);
    }
  
    &__list {
      display: flex;
      flex-direction: column;
      row-gap: 16px;
    }
  }
  
  .skeleton {
    &-title,
    &-menu,
    &-description {
      background-color: #3c3c3c;
      border-radius: 4px;
      animation: shimmer 1.5s infinite;
    }
  
    &-title {
      width: 190px;
      height: 26px;
    }
  
    &-menu,
    &-description {
      height: 10px;
    }
  
    &-menu {
      margin: 0 auto;
  
      &-1 {
        width: 155px;
      }
  
      &-2 {
        width: 190px;
      }
  
      &-3 {
        width: 170px;
      }
  
      &-4 {
        width: 160px;
      }
  
      &-5 {
        width: 140px;
      }
    }
  
    &-description {
      width: 80px;
    }
  }
  </style>
  