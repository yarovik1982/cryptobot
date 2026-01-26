import { defineStore, acceptHMRUpdate } from 'pinia'

export const useOverlay = defineStore('useOverlay', {
 state: () => ({
   isOpen: false,
 }),
 getters: {},
 actions: {
   open(){
      this.isOpen = true
   },
   close(){
      this.isOpen = false
   }
 },
})

if (import.meta.hot) {
   import.meta.hot.accept(acceptHMRUpdate(useOverlay, import.meta.hot))
}
