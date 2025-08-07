<script setup lang="ts">
import type { CharacterModel } from '@/models/CharacterModel.ts'
import type { PropType } from 'vue'
import { computed } from 'vue'
const props = defineProps ({
  character: {
    type: Object as PropType <CharacterModel>,
    required: true,
  },
})

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }
  return new Date(dateString).toLocaleDateString('en-EN', options)
}
const dateFormat = computed(() => formatDate(props.character.created))
</script>

<template>
  <article class="card" @click="$emit('click')" role="button" tabindex="0">
    <header class="card__title">
      <h2 class="title__name">{{ character.name }}</h2>
    </header>
    <section class="card__image">
      <img class="card__image--img" :src="character.image" :alt="character.name" />
    </section>
    <section class="card__description">
      <p class="card__description__container card__description__container--red">
        <span class="row1a">Status: {{ character.name }} </span>
        <span class="row1b">Species: {{ character.species }}</span>
      </p>
      <p class="card__description__container card__description__container--blue">
        <span class="row2a">Gender: {{ character.gender }}</span>
        <span class="card__description__container--span">Location: {{ character.location.name }}</span>
      </p>
      <p class="card__description__container card__description__container--green">
        <span class="row3a">Type: {{ character.type || 'N/A' }}</span>
        <span class="row3b">Origin: {{ character.origin.name }}</span>
      </p>
    </section>
    <footer class="card__end">
      <span>Created: {{ dateFormat }}</span>
    </footer>
  </article>
</template>

<style lang="scss" scoped>
$green: #4dcd91;
$white: white;
.card {
  width: 360px;
  height: 520px;
  background-color: $green;
  border-radius: 65px;
  padding: 0 20px;
  border: 5px solid #290e8c;
  overflow: hidden;

  &__title {
    height: 10%;
    font-size: 14px;
    color: $white;
    text-align: center;
  }

  &__image {
    width: 100%;
    height: 50%;
    overflow: hidden;
    border-radius: 65px;
  }

  &__image--img {
    width: 100%;
    height: 100%;
    box-shadow: 0 2px 8px #0003;
    display: block;
    object-fit: cover;
  }

  &__description {
    width: 100%;
    height: 30%;
    color: $white;
    font-size: 12px;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 5px;

    &__container {
      border: 4px solid black;
      border-radius: 65px;
      padding: 2px 6px;
      display: flex;
      justify-content: space-between;

      &--span {
        text-align: end;
      }

      &--red {
        background-color: #c96363;
      }

      &--blue {
        background-color: #317382;
      }

      &--green {
        background-color: #738231;
      }
    }
  }
  .card__end {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    padding-bottom: 5px;
    font-size: 16px;
  }
}
</style>
