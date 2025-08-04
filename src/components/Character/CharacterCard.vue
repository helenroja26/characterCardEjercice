<script setup lang="ts">
interface CharacterCardProps {
  name: string
  image: string
  status: string
  species: string
  gender: string
  location: string
  type: string | null
  origin: string
  created: string
}
defineProps<CharacterCardProps>()

function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  }
  return new Date(dateString).toLocaleDateString('en-EN', options)
}
</script>

<template>
  <article class="card" @click="$emit('click')" role="button" tabindex="0">
    <header class="card__title">
      <h2 class="title__name">{{ name }}</h2>
    </header>
    <section class="card__image">
      <img class="card__image--img" :src="image" :alt="name" />
    </section>
    <section class="card__description">
      <p class="card__description__container card__description__container--red">
        <span class="row1a">Status: {{ status }} </span>
        <span class="row1b">Species: {{ species }}</span>
      </p>
      <p class="card__description__container card__description__container--blue">
        <span class="row2a">Gender: {{ gender }}</span>
        <span class="row2b">Location: {{ location }}</span>
      </p>
      <p class="card__description__container card__description__container--green">
        <span class="row3a">Type: {{ type || 'N/A' }}</span>
        <span class="row3b">Origin: {{ origin }}</span>
      </p>
    </section>
    <footer class="card__end">
      <span>Created: {{ formatDate(created) }}</span>
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
    font-size: 12px;
  }
}
</style>
