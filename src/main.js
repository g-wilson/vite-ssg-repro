import devalue from '@nuxt/devalue'
import { ViteSSG } from 'vite-ssg'

import { createPinia } from 'pinia'
import { useStarshipStore } from './stores/starships'

import App from './App.vue'
import Starships from './pages/Starships.vue'
import Home from './pages/Home.vue'
import Account from './pages/Account.vue'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/starships',
    component: Starships,
    beforeEnter: async (to, from) => {
      const starshipStore = useStarshipStore()

      await starshipStore.initialise()
    },
  },
  {
    path: '/account',
    component: Account,
  },
]

async function bootstrap({ app, initialState, isClient, onSSRAppRendered }) {
  const pinia = createPinia()
  app.use(pinia)

  if (isClient) {
    // on the client side, we restore the state
    pinia.state.value = initialState?.pinia || {}
  } else {
    // at build time set the hydration data to whatever is in the store
    // this will be stringified and set to window.__INITIAL_STATE__
    onSSRAppRendered(() => {
      initialState.pinia = pinia.state.value
    })
  }
}

function transformState(state) {
  return import.meta.env.SSR ? devalue(state) : state
}

export const createApp = ViteSSG(App, { routes }, bootstrap, { transformState })
