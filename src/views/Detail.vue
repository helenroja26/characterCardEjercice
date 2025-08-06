<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCharacterStore } from '@/stores/character.ts'

interface Character {
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
  episode: [string]
}

const characterStore = useCharacterStore()
const route = useRoute()
const router = useRouter()

function goToHistory() {
  router.push({ name: 'HistoryAndSaves' })
}

const id = ref(route.params.id as string)
const character = ref<Character | null>(null)
const isLoading = ref(true)
const errorMsg = ref('')

async function fetchCharacterData(characterId: string) {
  isLoading.value = true
  errorMsg.value = ''
  try {
    const resp = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
    if (!resp.ok) throw new Error('Personaje no encontrado')
    const data = await resp.json()
    character.value = data
    characterStore.addToHistory(data)
  } catch (e: any) {
    errorMsg.value = e.message || 'Error desconocido'
  } finally {
    isLoading.value = false
  }
}

const isFavorite = computed(() =>
  character.value ? characterStore.favorites.some((c) => c.id === character.value!.id) : false,
)

function toggleFavorite() {
  if (!character.value) return

  if (isFavorite.value) {
    characterStore.removeFromFavorites(character.value.id)
  } else {
    const added = characterStore.addToFavorites(character.value)
    if (!added) {
      alert('Has alcanzado el límite de 10 favoritos.')
    }
  }
}

onMounted(() => {
  if (id.value) fetchCharacterData(id.value)
})

watch(
  () => route.params.id,
  (newId) => {
    if (typeof newId === 'string') {
      id.value = newId
      fetchCharacterData(newId)
    }
  },
)
</script>
<template>
  <section class="detail">
    <button class="detail__button" @click="router.back()">← Volver</button>

    <div v-if="isLoading" class="detail__loading">Cargando detalles...</div>

    <div v-else-if="errorMsg" class="detail__error">{{ errorMsg }}</div>

    <article v-else-if="character" class="detail__character">
      <div class="detail__block">
        <h1 class="detail__title">{{ character.name }}</h1>

        <img class="detail__image" :src="character.image" :alt="character.name" />
        <button class="detail__button-favorite" @click="toggleFavorite">
          {{ isFavorite ? 'Quitar de favoritos' : 'Guardar en favoritos' }}
        </button>
      </div>
      <ul class="detail__ul">
        <li class="detail__li"><strong>Status:</strong> {{ character.status }}</li>
        <li class="detail__li"><strong>Species:</strong> {{ character.species }}</li>
        <li class="detail__li"><strong>Gender:</strong> {{ character.gender }}</li>
        <li class="detail__li"><strong>Origin:</strong> {{ character.origin.name }}</li>
        <li class="detail__li"><strong>Location:</strong> {{ character.location.name }}</li>
        <li class="detail__li"><strong>Type:</strong> {{ character.type || 'N/A' }}</li>
        <li class="detail__li"><strong>Created:</strong> {{ character.created.split('T')[0] }}</li>
        <li class="detail__li"><strong>Episode:</strong> {{ character.episode }}</li>
      </ul>
    </article>
  </section>
</template>

<style scoped lang="scss">
.detail {
  width: 100%;
  padding: 25px;
  min-height: 100vh;

  &__button {
    margin-bottom: 12px;
    padding: 8px 12px;
    background-color: #290e8c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  &__character {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(550px, 1fr));
    gap: 3rem;
    padding: 80px 50px;
    align-items: center;
    text-align: center;
  }
  &__block {
    align-items: center;
  }
  &__button-favorite {
    padding: 20px;
    display: flex;
  }
  &__image {
    width: 400px;
    height: 400px;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  &__title {
    font-size: 30px;
  }

  &__ul {
    list-style: none;
    padding: 0;
  }

  &__li {
    margin-bottom: 0.5rem;
    border: 3px solid #290e8c;
    background-color: #d7e5f4;

    strong {
      font-weight: 600;
    }
  }

  .detail__button-favorite {
    margin-bottom: 12px;
    padding: 8px 12px;
    background-color: #290e8c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #190760;
    }
  }

  &__button-history {
    margin: 1rem 0 2rem;
    padding: 0.5rem 1.2rem;
    background-color: #2a74d7;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #1f54a3;
    }
  }

  &__error {
    color: red;
    font-weight: bold;
  }
}
</style>
