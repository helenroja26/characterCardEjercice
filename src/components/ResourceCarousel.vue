<template>
  <div class="carousel">
    <button
      class="carousel__arrow"
      @click="prev"
      :disabled="startIdx === 0"
      type="button"
    >
      ‹
    </button>

    <div class="carousel__list">
      <div
        class="carousel__item"
        v-for="resource in visibleResources"
        :key="resource.id"
      >
        <img
          class="carousel__img"
          :src="resource.image"
          :alt="resource.title"
          @error="handleImageError"
        />
        <h3 class="carousel__title">{{ resource.title }}</h3>
        <span class="carousel__type">{{ resource.type }}</span>

        <button
          class="carousel__save-btn"
          @click="handleToggleSave(resource)"
          type="button"
        >
          {{ section === 'saved' ? '❤️ Guardado' : '🤍 Guardar' }}
        </button>

        <slot name="actions" :resource="resource"></slot>
      </div>
    </div>

    <button
      class="carousel__arrow"
      @click="next"
      :disabled="endIdx >= resources.length"
      type="button"
    >
      ›
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Resource {
  id: string | number
  title: string
  type: string
  image?: string
  [key: string]: any
}

const props = defineProps<{
  resources: Resource[]
  itemsToShow?: number
  section?: string
}>()

const emit = defineEmits<{
  'toggle-save': [resource: Resource]
}>()

const itemsToShow = props.itemsToShow || 3
const startIdx = ref(0)

const endIdx = computed(() => startIdx.value + itemsToShow)
const visibleResources = computed(() =>
  props.resources.slice(startIdx.value, endIdx.value)
)

function next() {
  if (endIdx.value < props.resources.length) {
    startIdx.value += itemsToShow
  }
}

function prev() {
  if (startIdx.value > 0) {
    startIdx.value -= itemsToShow
  }
}

function handleToggleSave(resource: Resource) {
  console.log('Toggle save clicked for:', resource.title)
  emit('toggle-save', resource)
}

function handleImageError(event: Event) {
  const target = event.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/300x200?text=No+Image'
}

watch(() => props.resources, () => {
  startIdx.value = 0
})
</script>

<style scoped lang="scss">
.carousel {
  display: flex;
  align-items: center;
  gap: 1rem;

  &__arrow {
    font-size: 2rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #290e8c;
    padding: 0.5rem;
    border-radius: 50%;

    &:hover:not(:disabled) {
      background: rgba(41, 14, 140, 0.1);
    }

    &:disabled {
      color: #bcbcbc;
      cursor: not-allowed;
    }
  }

  &__list {
    display: flex;
    gap: 16px;
    overflow-x: auto;
    scroll-behavior: smooth;
    padding: 0.5rem 0;
  }

  &__item {
    background: #f2f2ff;
    border-radius: 8px;
    padding: 1rem;
    min-width: 220px;
    max-width: 220px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }
  }

  &__img {
    width: 100%;
    height: 140px;
    object-fit: cover;
    margin-bottom: 0.6rem;
    border-radius: 7px;
    background: #e0e0e0;
  }

  &__title {
    font-size: 1.1rem;
    margin: 0.3rem 0;
    font-weight: 600;
  }

  &__type {
    font-size: 0.95rem;
    color: #0e3a7b;
    background: #e7e5fb;
    border-radius: 4px;
    padding: 0.1rem 0.7rem;
    margin-bottom: 0.7rem;
    display: inline-block;
  }

  &__save-btn {
    margin-top: auto;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background: #290e8c;
    color: white;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.2s ease;

    &:hover {
      background: #1e0a6b;
    }
  }
}
</style>
