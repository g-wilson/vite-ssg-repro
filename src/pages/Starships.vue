<script setup>
import { useHead } from '@vueuse/head'
import { useStarshipStore } from '../stores/starships'

const starshipStore = useStarshipStore()

useHead({
  title: 'Starships',
})
</script>

<template>
  <section>
    <h1>This is a list of ships</h1>

    <div v-for="ship in starshipStore.shipsList" :key="ship.url">
      <p>{{ ship.name }}</p>
      <RouterLink :to="`/ship/${ship.id}/`">View</RouterLink>
    </div>

  </section>
</template>
