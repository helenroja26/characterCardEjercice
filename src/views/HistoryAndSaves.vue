

<script lang="ts" setup>
import { useCharacterStore } from '@/stores/character'
import { useRouter } from 'vue-router'

const characterStore = useCharacterStore()
const router = useRouter()

function goToDetail(characterId: number) {
  router.push({ name: 'Detail', params: { id: characterId.toString() } })
}

function isFavorite(characterId: number): boolean {
  return characterStore.favorites.some(c => c.id === characterId)
}

function toggleFavorite(character: any) {
  if (isFavorite(character.id)) {
    characterStore.removeFromFavorites(character.id)
  } else {
    const added = characterStore.addToFavorites(character)
    if (!added) {
      alert('Has alcanzado el límite de 10 favoritos.')
    }
  }
}

function removeFromFavorites(characterId: number) {
  characterStore.removeFromFavorites(characterId)
}
</script>
<template>
  <div class="history-and-saves">
    <button class="back-button" @click="$router.back()">← Volver</button>
    <div class="debug-info">
      <p>Historia: {{ characterStore.history.length }} elementos</p>
      <p>Guardados: {{ characterStore.favorites.length }} elementos</p>
    </div>

    <section class="history-section">
      <h2>Historia</h2>
      <div v-if="characterStore.history.length === 0" class="empty-state">
        No hay personajes en el historial
      </div>
      <div v-else class="character-grid">
        <div
          v-for="character in characterStore.history"
          :key="character.id"
          class="character-card"
          @click="goToDetail(character.id)"
        >
          <img :src="character.image" :alt="character.name" />
          <h3>{{ character.name }}</h3>
          <p>{{ character.species }} - {{ character.status }}</p>
          <button
            @click.stop="toggleFavorite(character)"
            class="save-btn"
            :class="{ 'is-saved': isFavorite(character.id) }"
          >
            {{ isFavorite(character.id) ? 'Guardado' : 'Guardar' }}
          </button>
        </div>
      </div>
    </section>

    <section class="saves-section">
      <h2>Guardados</h2>
      <div v-if="characterStore.favorites.length === 0" class="empty-state">
        No hay personajes guardados
      </div>
      <div v-else class="character-grid">
        <div
          v-for="character in characterStore.favorites"
          :key="character.id"
          class="character-card"
          @click="goToDetail(character.id)"
        >
          <img :src="character.image" :alt="character.name" />
          <h3>{{ character.name }}</h3>
          <p>{{ character.species }} - {{ character.status }}</p>
          <button
            @click.stop="removeFromFavorites(character.id)"
            class="remove-btn"
          >
            Eliminar
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="scss" scoped>
.history-and-saves {
  padding: 25px;

  .back-button {
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

  .debug-info {
    background: #c5d9fd;
    padding: 8px;
    border-radius: 4px;
    margin-bottom: 15px;
  }

  section {
    margin-bottom: 40px;

    h2 {
      font-size: 30px;
      margin-bottom: 8px;
      color: #290e8c;
    }
  }

  .empty-state {
    text-align: center;
    color: #666;
    padding: 15px;
    font-style: italic;
    background: #f5f5f5;
    border-radius: 8px;
  }

  .character-grid {
    display: grid;
    grid-template-columns: repeat(5,1fr);
    gap: 15px;
    @media (max-width: 650px) {
      grid-template-columns: 1fr;
      padding: 10px;
      gap: 15px;
    }
    @media (max-width: 950px) {
      grid-template-columns: repeat(2, 1fr);
      padding: 10px;
      gap: 15px;
    }

    @media (min-width: 951px) and (max-width: 1250px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 1251px) and (max-width: 1400px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .character-card {
    width: 300px;
    height: 350px;
    background: #4DCD91;
    border-radius: 45px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 10px;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-2px);
    }

    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 65px;
      margin-bottom: 8px;
    }

    h3 {
      margin: 8px 0;
      color: #290e8c;
    }

    p {
      color: #666;
      margin-bottom: 10px;
    }

    .save-btn, .remove-btn {
      width: 100%;
      padding: 8px;
      border: none;
      border-radius: 45px;
      cursor: pointer;
      font-weight: 500;
    }

    .save-btn {
      background-color: #2a74d7;
      color: white;

      &:hover {
        background-color: #1f54a3;
      }

      &.is-saved {
        background-color: #28a745;
      }
    }

    .remove-btn {
      background-color: #dc3545;
      color: white;

      &:hover {
        background-color: #c82333;
      }
    }
  }
}
</style>
