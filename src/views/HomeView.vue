<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CharacterCard from '@/components/character/CharacterCard.vue'
import type { CharacterModel } from '@/models/CharacterModel.ts'

const characters = ref<CharacterModel[]>([])
const isLoading = ref(true)
const errorMsg = ref('')

async function fetchCharacters() {
  isLoading.value = true
  errorMsg.value = ''
  try {
    const resp = await fetch('https://rickandmortyapi.com/api/character?page=1')
    //if (!resp.ok) throw new Error('Error fetching characters'
    if (!resp.ok) {
      console.log('Error fetching characters')
      return
    }
    const data = await resp.json()
    characters.value = data.results
  } catch (e: any) {
    errorMsg.value = e.message || 'Unknown error'
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchCharacters)
</script>

<template>
  <section class="home">
    <div v-if="isLoading" class="home__loading">Loading characters...</div>
    <div v-else-if="errorMsg" class="home__error">{{ errorMsg }}</div>
    <div v-else class="home__list">
      <router-link
        v-for="char in characters"
        :key="char.id"
        :to="{ name: 'Detail', params: { id: char.id } }"
        class="card-link"
      >
        <CharacterCard
          :character="char"
        />
      </router-link>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;

  &__list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, auto);
    padding: 20px;
    gap: 20px;
    justify-items: center;
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      padding: 10px;
      gap: 15px;
    }

    @media (min-width: 769px) and (max-width: 1150px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1151px) and (max-width: 1550px) {
      grid-template-columns: repeat(3, 1fr);
    }

  }
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}


</style>
