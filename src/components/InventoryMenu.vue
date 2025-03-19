<template>
  <div class="field__menu">
    <div class="field__menu-content">
      <button class="field__menu-close-button" @click="$emit('closeMenu')">
        <span class="visually-hidden">Закрыть меню</span>
      </button>
      <img
        :src="cell.imgSrc"
        width="130"
        height="130"
        class="field__menu-image"
      />

      <ul class="field__menu-list">
        <li class="field__menu-item skeleton-menu skeleton-menu-1"></li>
        <li class="field__menu-item skeleton-menu skeleton-menu-2"></li>
        <li class="field__menu-item skeleton-menu skeleton-menu-3"></li>
        <li class="field__menu-item skeleton-menu skeleton-menu-4"></li>
        <li class="field__menu-item skeleton-menu skeleton-menu-5"></li>
      </ul>
      <button
        v-if="!isRemoving"
        class="field__menu-remove-button"
        @click="startRemove"
      >
        Удалить предмет
      </button>

      <form class="field__menu-form form" @submit.prevent v-else>
        <input
          class="form__input"
          type="text"
          v-model="removeAmount"
          placeholder="Введите количество"
        />
        <div class="form__controls">
          <button class="form__button-cancel-button" @click="cancelRemove">
            Отмена
          </button>
          <button class="form__button-remove-button" @click="confirmRemove">
            Подтвердить
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";

interface ICell {
  id: string;
  imgSrc: string;
  itemCount: number;
}

const props = defineProps<{
  cell: ICell;
  cellIndex: number;
}>();

const emit = defineEmits<{
  (e: "closeMenu"): void;
  (e: "removeItems", removeAmount: number): void;
}>();

const isRemoving = ref(false);
const removeAmount = ref(0);

const startRemove = () => {
  isRemoving.value = true;
};

const cancelRemove = () => {
  isRemoving.value = false;
  removeAmount.value = 0;
};

const confirmRemove = () => {
  const amount = Math.floor(removeAmount.value);
  if (amount > 0 && amount <= props.cell.itemCount) {
    emit("removeItems", amount);
    cancelRemove();
    emit("closeMenu");
  } else {
    console.log("Введите корректное количество для удаления.");
  }
};
</script>

<style lang="scss" scoped>
.field {
  &__menu {
    position: absolute;
    top: 3.5%;
    right: 3.5%;
    background-color: var(--color-menu);
    backdrop-filter: blur(16px);
    border: 1px solid var(--border-color);
    border-top-right-radius: var(--border-radius-large);
    border-bottom-right-radius: var(--border-radius-large);
    padding: 47px 15px 18px 15px;

    animation: fadeIn 0.3s ease-in-out;

    &-content {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    &-image {
      margin-bottom: 30px;
    }

    &-close-button {
      position: absolute;
      top: 0;
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

    &-title {
      border-top: 1px solid var(--border-color);
      padding-top: 16px;
    }

    &-list {
      display: flex;
      flex-direction: column;
      row-gap: 16px;
      margin-top: 24px;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--border-color);
    }

    &-remove-button {
      color: var(--color-light);
      background-color: var(--color-red);
      border: none;
      border-radius: var(--border-radius);
      padding: 11px 55px;
      margin-top: 18px;

      &:hover {
        color: var(--color-red);
        background-color: var(--color-light);
        transition-duration: 0.2s;
      }
    }
  }
}

.form {
  display: flex;
  flex-direction: column;
  margin-top: -69px;
  background-color: var(--color-dark-alt);
  border-top: 1px solid var(--border-color);
  padding-top: 20px;
  &__input {
    color: var(--color-light);
    background-color: var(--color-dark-alt);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-small);
    padding: 11px 12px;
    outline: none;
  }

  &__controls {
    display: flex;
    align-items: center;
    column-gap: 10px;
    margin-top: 20px;
  }

  &__button {
    &-remove-button,
    &-cancel-button {
      border: none;
      border-radius: var(--border-radius);
    }

    &-remove-button {
      color: var(--color-light);
      background-color: var(--color-red);
      padding: 8px 15px;

      &:hover {
        color: var(--color-red);
        background-color: var(--color-light);
        transition-duration: 0.2s;
      }
    }

    &-cancel-button {
      color: var(--color-dark-alt);
      background-color: var(--color-light);
      padding: 8px 19px;

      &:hover {
        color: var(--color-light);
        background-color: var(--color-dark-alt);
        transition-duration: 0.2s;
      }
    }
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
    width: 211px;
    height: 30px;
  }

  &-menu,
  &-description {
    height: 10px;
  }

  &-menu {
    margin: 0 auto;

    &-1,
    &-2,
    &-3 {
      width: 211px;
    }

    &-4 {
      width: 180px;
    }

    &-5 {
      width: 80px;
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
