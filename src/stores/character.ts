import { defineStore } from 'pinia'

export interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  location: { name: string };
  type: string;
  origin: { name: string };
  created: string;
}

export const useCharacterStore = defineStore('character', {
  state: () => ({
    characters: [] as Character[],
    favorites: [] as Character[],
    history: [] as Character[],
    isLoading: false,
    errorMsg: '',
    SAVE_LIMIT: 10,
    HISTORY_LIMIT: 50
  }),

  actions: {
    // Lógica para paginación acumulativa y evitar duplicados en scroll infinito
    async fetchCharacters(page = 1) {
      this.isLoading = true
      this.errorMsg = ''
      try {
        const resp = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
        if (!resp.ok) throw new Error('Error fetching characters')
        const data = await resp.json()
        // Añadir personajes sin duplicar
        const newCharacters = data.results.filter((newChar: Character) =>
          !this.characters.some(existing => existing.id === newChar.id)
        )
        this.characters.push(...newCharacters)
      } catch (e: any) {
        this.errorMsg = e.message || 'Error desconocido'
      } finally {
        this.isLoading = false
      }
    },

    // Agrega a favoritos con control de límite y retorno booleano
    addToFavorites(character: Character): boolean {
      if (this.favorites.length >= this.SAVE_LIMIT) {
        return false
      }
      if (!this.favorites.find(c => c.id === character.id)) {
        this.favorites.push(character)
        // Elimina de historial si estaba allí
        this.history = this.history.filter(c => c.id !== character.id)
        return true
      }
      return false
    },

    removeFromFavorites(id: number) {
      this.favorites = this.favorites.filter(c => c.id !== id)
    },

    // Histórico sin duplicados y con límite
    addToHistory(character: Character) {
      if (!this.history.find(c => c.id === character.id) && !this.favorites.find(c => c.id === character.id)) {
        this.history.unshift(character)
        if (this.history.length > this.HISTORY_LIMIT) {
          this.history.pop()
        }
      }
    }
  }
})

