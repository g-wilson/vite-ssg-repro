import { defineStore } from 'pinia'

export const useStarshipStore = defineStore('starships', {
  state: () => ({
    hasLoaded: false,
    ships: [],
  }),
  actions: {
    async initialise() {
      if (this.hasLoaded)
        return

      const res =  await getShipsMock()

      this.ships = res
      this.hasLoaded= true
    },
  },
})

async function getShipsMock() {
  return [
    {
      id: 1,
      name: 'Death Star'
    },
    {
      id: 2,
      name: 'Star Destroyer'
    },
    {
      id: 3,
      name: 'Slave I'
    },
  ]
}
