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
    HISTORY_LIMIT: 50,
    currentPage: 0,
    hasMore: true,
  }),

  getters: {
    favoritesCount: (state) => state.favorites.length,
    historyCount: (state) => state.history.length,
    isFavorite: (state) => {
      return (id: number) => state.favorites.some(fav => fav.id === id)
    },
  },

  actions: {
    async fetchCharacters(page = 1) {
      if (this.isLoading) return
      if (!this.hasMore && page !== 1) return

      this.isLoading = true
      this.errorMsg = ''
      try {
        const resp = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
        if (!resp.ok) throw new Error('Error fetching characters')
        const data = await resp.json()

        const newCharacters = data.results.filter((newChar: Character) =>
          !this.characters.some(existing => existing.id === newChar.id)
        )

        if (page === 1) {
          this.characters = newCharacters
        } else {
          this.characters.push(...newCharacters)
        }

        this.currentPage = page
        this.hasMore = Boolean(data.info?.next)
      } catch (e: any) {
        this.errorMsg = e.message || 'Unknow error'
      } finally {
        this.isLoading = false
      }
    },

    addToFavorites(character: Character): boolean {
      const alreadyFavorite = this.favorites.some(c => c.id === character.id)

      if (this.favorites.length >= this.SAVE_LIMIT) {
        return false
      }

      if (!alreadyFavorite) {
        this.favorites.push(character)
        this.history = this.history.filter(c => c.id !== character.id)
        return true
      }

      return false
    },

    removeFromFavorites(id: number) {
      this.favorites = this.favorites.filter(c => c.id !== id)
    },

    addToHistory(character: Character) {
      const alreadyInHistory = this.history.some(c => c.id === character.id)
      const alreadyFavorite = this.favorites.some(c => c.id === character.id)

      if (!alreadyInHistory && !alreadyFavorite) {
        this.history.unshift(character)
        if (this.history.length > this.HISTORY_LIMIT) {
          this.history.pop()
        }
      }
    }
  }
})

