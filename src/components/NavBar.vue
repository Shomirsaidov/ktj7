<template>


  <div v-if="$route.path !== '/login'" class="p-4 space-y-4 md:px-32" id="nav_cont" style="top: 0; left: 0; position: sticky; background: #26a9e0;">

    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <img @click="toggleMenu" class="bars lg:hidden" src="../assets/menu.svg" alt="" width="35">
        <img @click="toggleMenu" class="arrow-left hidden lg:hidden" src="../assets/arrow-left.svg" alt="" width="35">

        <img @click="navigateTo('/')" src="../assets/logotype.png" class="rounded-md" alt="KITOB.tj" width="50">
      </div>

      <div class="hidden lg:flex justify-center items-stretch space-x-2 mx-8" style="flex: 1">
        <button @click="toggleMenuInDesktop" class="flex items-center space-x-2 bg-blue-800 rounded-xl p-2 text-white font-semibold">
          <img src="../assets/category.svg" alt="" width="30">          
          <span>Каталог</span>
        </button>
        <div class="flex items-center items-stretch" style="flex: 1">
          <input v-model="searchInput" v-on:keyup.enter="search" style="min-width: 500px; flex: 1;" class="bg-white outline-none rounded-lg rounded-r-none p-2 text-lg w-full" type="text" placeholder="Название, автор, категория">
          <img @click="search" src="../assets/search.svg" alt="" width="35" class="bg-blue-800 rounded-lg px-2 rounded-l-none">
        </div>
      </div>

      <div v-if="username !== 'admin'" class="flex items-center space-x-4">
        <img src="../assets/user.svg" alt="" width="30" @click="goToProfile">
        <!-- <img src="../assets/bookmark.svg" alt="" width="30" @click="navigateTo('/saved')"> -->
        <div class="flex items-stretch">
          <img src="../assets/shopping-bag.svg" alt="" width="30" @click="navigateTo('/shopping')">
          <div class="rounded-full bg-red-800 px-2" style="position: relative; top: -17px; left: -13px">
            <span class="text-white text-xs font-bold">{{ $store.state.cartBooks.length }}</span>
          </div>
        </div>

      </div>

      <div v-else class="flex items-center space-x-4">
        <img src="../assets/box.svg" alt="" width="30" @click="navigateTo('/orders')">        
        <img src="../assets/add-circle.svg" alt="" width="30" @click="navigateTo('/create')">        
      </div>


    </div>
     
    <div class="lg:hidden flex justify-center items-stretch space-x-2">

      <button class="hidden sm:flex items-center space-x-2 bg-blue-800 rounded-xl p-2 text-white font-semibold">
          <img class="hidden sm:block" src="../assets/category.svg" alt="" width="30">          
          <span>Каталог</span>
      </button>

      <div class="flex items-center items-stretch" style="flex: 1">
        <img src="../assets/search_black.svg" alt="" width="35" class="bg-white rounded-lg px-2 rounded-r-none">
        <input v-model="searchInput" v-on:keyup.enter="search" style="flex: 1" class="bg-white outline-none rounded-lg rounded-l-none p-2 text-lg" type="text" placeholder="Название, автор, категория">
      </div>
    </div>

    <div class="menu_preview cats flex items-center text-white space-x-4 overflow-x-scroll scrollCont">
      <h1  @click="() => {
        navigateTo('/category/' + category.category)
    }" class="text-lg cursor-pointer" v-for="category in $store.state.categories"><nobr>{{ category.category }}</nobr></h1>
    </div>

    <div class="hidden menu cats font-bold flex flex-col justify-stretch items-stretch text-white space-y-2">
      <h1 @click="() => {
        toggleMenuInDesktop()
        navigateTo('/category/' + category.category)
        }"
      class="text-lg cursor-pointer rounded-xl hover:bg-blue-300" 
      v-for="category in $store.state.categories">{{ category.category }}</h1>
    </div>

  </div>


</template>

<script>

import axios from 'axios'
import * as jquery from 'jquery'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: () => ({
    searchInput: '',
    prevScrollState: 0,
    username: localStorage.kitobtj !== undefined ? JSON.parse(localStorage.kitobtj).username : ''
  }),
  methods: {
    handleScroll() {
      
     

      if(this.prevScrollState > document.documentElement.scrollTop) {
        if(document.querySelector('.cats') !== null) {
          document.querySelector('.cats').style.display = 'flex'
        }
      } else if(this.prevScrollState < document.documentElement.scrollTop) {
        if(document.querySelector('.cats') !== null) {
          document.querySelector('.cats').style.display = 'none'
        }
      }
      this.prevScrollState = document.documentElement.scrollTop


    },
    navigateTo(path) {
      this.$router.push(path)
    },
    goToProfile() {
      if(localStorage.kitobtj == undefined) {
        this.navigateTo('/login')
      } else {
        this.navigateTo('/profile')
      }
    },
    toggleMenu() {
      jquery('.menu').slideToggle()
      jquery('.menu_preview').slideToggle()
      jquery('.arrow-left').fadeToggle(100)
      jquery('.bars').fadeToggle(100)

    },
    toggleMenuInDesktop() {
      jquery('.menu').slideToggle()
      jquery('.menu_preview').slideToggle()
      jquery('.arrow-left').fadeToggle(100)
      jquery('.bars').fadeToggle(100)
    },
    search() {
      this.$router.push(`/category/${this.searchInput}`)
    }
  },
  async created () {

    window.addEventListener('scroll', (event) => this.handleScroll(event))
    if(this.$store.state.categories === undefined) {
      await axios.get(`${process.env.VUE_APP_API_URL}/categories`).then(resp => this.$store.state.categories = resp.data)
    }
    console.log(this.$store.state.categories)
  },
  mounted() {
    if(localStorage.kitobtj !== undefined) {
      if(JSON.parse(localStorage.kitobtj).username == 'admin') {
        console.log('change nav back')
        document.getElementById('nav_cont').style.background = 'royalblue'
      }
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.scrollCont::-webkit-scrollbar {
  display: none;
}
</style>
