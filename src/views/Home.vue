<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CharacterCard from '@/components/Character/CharacterCard.vue'

export interface Character {
  id: number
  name: string
  image: string
  status: string
  species: string
  gender: string
  location: { name: string }
  type: string
  origin: { name: string }
  created: string
}

const characters = ref<Character[]>([])
const isLoading = ref(true)
const errorMsg = ref('')

async function fetchCharacters() {
  isLoading.value = true
  errorMsg.value = ''
  try {
    const resp = await fetch('https://rickandmortyapi.com/api/character?page=1')
    if (!resp.ok) throw new Error('Error fetching characters')
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
    <div v-if="isLoading" class="home__loading">Cargando personajes...</div>
    <div v-else-if="errorMsg" class="home__error">{{ errorMsg }}</div>
    <div v-else class="home__list">
      <router-link
        v-for="char in characters"
        :key="char.id"
        :to="{ name: 'Detail', params: { id: char.id } }"
        class="card-link"
      >
        <CharacterCard
          :name="char.name"
          :image="char.image"
          :status="char.status"
          :species="char.species"
          :gender="char.gender"
          :location="char.location.name"
          :type="char.type"
          :origin="char.origin.name"
          :created="char.created.split('T')[0]"
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
