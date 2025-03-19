<template>
  <div class="hero__search-field field">
    <div class="field__body skeleton"></div>
    <button class="field__close-button">
      <span class="visually-hidden">Закрыть меню</span>
    </button>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.field {
  position: relative;
  background-color: var(--color-dark-alt);
  border: 1px solid var(--color-gray);
  border-radius: var(--border-radius-large);
  padding: 18px 68px 18px 18px;

  .skeleton {
    width: 699px;
    height: 36px;
    background-color: #3c3c3c;
    border-radius: 4px;
    animation: shimmer 1.5s infinite;
  }

  &__close-button {
    position: absolute;
    top: 5%;
    right: 0;
    border: none;
    background-color: transparent;
    width: 36px;
    aspect-ratio: 1;

    &::before,
    &::after {
      position: absolute;
      content: "";
      top: 50%;
      left: 50%;
      translate: -50% -50%;
      width: 50%;
      height: 2px;
      background-color: var(--color-light);
    }

    &::before {
      rotate: -45deg;
    }

    &::after {
      rotate: 45deg;
    }
  }
}
</style>
