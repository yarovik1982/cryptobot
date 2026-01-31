import { defineStore, acceptHMRUpdate } from 'pinia'
import { list } from '@/data'  // Предполагается, что данные находятся здесь

export const useBalanceListStore = defineStore('balanceList', {  // Изменил имя на 'balanceList'
  state: () => ({
    searchResult: [],
    allCoins: list  // Добавил все монеты в стейт
  }),
  getters: {
    getResult: (state) => state.searchResult,
    getAllCoins: (state) => state.allCoins
  },
  actions: {
    renderDataById(id) {
      // Логика для отображения данных по ID
      return this.allCoins.find(coin => coin.id === id)
    },

    getDataCoin(text) {  // Исправленная логика поиска
      if (!text || text.trim() === '') {
        this.searchResult = []
        return
      }

      const searchText = text.toLowerCase().trim()

      // Исправленная логика фильтрации
      const result = this.allCoins.filter(item =>
        item.name.toLowerCase().includes(searchText) ||
        item.symbol.toLowerCase().includes(searchText)
      )

      this.searchResult = result
    },

    resetSearch() {
      this.searchResult = []
    }
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBalanceListStore, import.meta.hot))
}