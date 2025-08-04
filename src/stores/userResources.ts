import { defineStore } from 'pinia'

export interface Resource {
  id: string | number
  title: string
  type: string
  image?: string
  [key: string]: any
}

interface State {
  history: Resource[]
  saved: Resource[]
  SAVE_LIMIT: number
  HISTORY_LIMIT: number
}

export const useUserResourcesStore = defineStore('userResources', {
  state: (): State => ({
    history: [], // Vacío para empezar
    saved: [],   // Vacío para empezar
    SAVE_LIMIT: 10,
    HISTORY_LIMIT: 50,
  }),

  getters: {
    // Agregar getters para facilitar el acceso
    getHistoryCount: (state) => state.history.length,
    getSavedCount: (state) => state.saved.length,
    isResourceSaved: (state) => {
      return (resourceId: string | number) =>
        state.saved.some(r => r.id === resourceId)
    }
  },

  actions: {
    addToHistory(resource: Resource) {
      if (
        !this.saved.some(r => r.id === resource.id) &&
        !this.history.some(r => r.id === resource.id)
      ) {
        this.history.unshift(resource)
        if (this.history.length > this.HISTORY_LIMIT) {
          this.history.pop()
        }
      }
    },

    addToSaved(resource: Resource): boolean {
      if (this.saved.length >= this.SAVE_LIMIT) {
        return false
      }
      if (!this.saved.some(r => r.id === resource.id)) {
        this.saved.unshift(resource)
        // Si está en historial, lo elimina
        this.history = this.history.filter(r => r.id !== resource.id)
        return true
      }
      return false
    },

    removeFromSaved(resourceId: string | number) {
      this.saved = this.saved.filter(r => r.id !== resourceId)
    },

    // Método para debuggear
    addTestData() {
      this.history.push({
        id: 'test-1',
        title: 'Rick Sanchez',
        type: 'Character',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg'
      })
    }
  },
})

