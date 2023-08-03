import { createApp } from 'vue'
import { createStore } from "vuex";

import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import axios from 'axios'

const store = createStore({
    state: {
      // newInCart: this.cartBooks.length,
      cartBooks: [],
      searchInput: '',
    },
    
  });

createApp(App).use(router).use(store).mount('#app')
