<!-- bismillah -->
<template>

  <div class="flex justify-center" v-if="info == null">
    <img src="../assets/loader.gif" alt="">
  </div>

  <div class="w-full flex items-stretch space-x-4 lg:space-x-16 my-8 flex-wrap md:px-32 md:flex-row flex-col" v-if="info !== null">

    <div class="flex justify-center">
      <img :src="info.cover" alt="" width="250">
    </div>

    <div class="info space-y-2">
      <div class="flex items-center mt-4 mb-2 space-x-2 mb-4 flex-wrap">
        <h3 class="text-sm font-semibold px-4 text-white rounded-sm" style="background: #785eea; max-width: 200px;" v-for="tag in info.tags">{{ tag }}</h3>
      </div>
      <h1 class="text-start text-xl font-semibold" style="color: #f34a57;">{{ info.name }}</h1>
      <h1 class="text-start text-lg" style="color: #26a9e0;">{{ info.author }}</h1>

      


      <div class="px-8 sm:px-0">
        <div class="flex items-start justify-between sm:justify-between space-x-4">
            <h2 class="text-md text-gray-500 text-start">ID товара</h2>
            <h2 class="text-md text-gray-800 text-start">{{ info.id }}</h2>
        </div>
        <div class="flex items-start justify-between sm:justify-between space-x-4">
            <h2 class="text-md text-gray-500 text-start">Издание</h2>
            <h2 class="text-md text-gray-800 text-start">{{ info.publisher }}</h2>
        </div>
        <div class="flex items-start justify-between sm:justify-between space-x-4">
            <h2 class="text-md text-gray-500 text-start">Категория</h2>
            <h2 class="text-md text-gray-800 text-start">{{ info.category }}</h2>
        </div>
        <div class="flex items-start justify-between sm:justify-between space-x-4">
            <h2 class="text-md text-gray-500 text-start">Год издания</h2>
            <h2 class="text-md text-gray-800 text-start">{{ info.release_year }}</h2>
        </div>
        <div class="flex items-start justify-between sm:justify-between space-x-4">
            <h2 class="text-md text-gray-500 text-start">ISBN</h2>
            <h2 class="text-md text-gray-800 text-start">{{ info.isbn }}</h2>
        </div>
        <div class="flex items-start justify-between sm:justify-between space-x-4">
            <h2 class="text-md text-gray-500 text-start">Количество страниц</h2>
            <h2 class="text-md text-gray-800 text-start">{{ info.pages }}</h2>
        </div>
        <div class="flex items-start justify-between sm:justify-between space-x-4">
            <h2 class="text-md text-gray-500 text-start">Размер</h2>
            <h2 class="text-md text-gray-800 text-start">{{ info.size }}</h2>
        </div>
        <div class="flex items-start justify-between sm:justify-between space-x-4">
            <h2 class="text-md text-gray-500 text-start">Тип обложки</h2>
            <h2 class="text-md text-gray-800 text-start">{{ info.cover_type }}</h2>
        </div>
        <div class="flex items-start justify-between sm:justify-between space-x-4">
            <h2 class="text-md text-gray-500 text-start">Вес</h2>
            <h2 class="text-md text-gray-800 text-start">{{ info.weight }}</h2>
        </div>
        <div class="flex items-start justify-between sm:justify-between space-x-4">
            <h2 class="text-md text-gray-500 text-start">Возрастные ограничения</h2>
            <h2 class="text-md text-gray-800 text-start">{{ info.age_restrictions }}</h2>
        </div>
      </div>






    </div>

    <div> 
      <div class="order border-2 p-8 rounded-md mt-4 lg:mt-0">
        <h3 class="text-start text-lg  mb-2 text-grey-500 line-through" v-if="info.tags.includes('скидки') || info.tags.includes(' скидки')">{{ info.prev_price }} c.</h3>
        <h2 class="text-start text-3xl mb-2 font-semibold text-red-500 mb-4">{{ info.cur_price }} c.</h2>
        <div class="flex items-stretch justify-between space-x-2 flex-wrap">
            <button v-if="!isAdmin" @click="addToCart(info.id)" style="background: #26a9e0;flex: 1;" 
            :class="['px-16 rounded-lg font-bold text-lg text-white']">
              {{ buttonAction }}
            </button>

            <button @click="$router.push(`/edit/${info.id}`)" v-if="isAdmin" style="background: #1abd46;flex: 1;" 
            :class="['p-4 rounded-lg font-bold text-lg text-white']">
              Редактировать
            </button>

            <img v-if="!isAdmin" src="../assets/bookmark-2.svg" alt="" width="45" class="p-2 rounded-xl" 
              style="background: #ecf6fe;">
        </div>  
      </div>

      <p class="text-start text-sm mt-4 break-words text-gray-400" style="max-width: 300px;">
        Цена на сайте может отличаться от цены в магазинах сети. Внешний вид книги может отличаться от изображения на сайте.
      </p>

    </div>

  </div>

  <div style="background: #ecf6fe; color: #000;" class="lg:px-32 lg:max-w-1/4 py-8 px-8 text-start"  v-if="info !== null">
    <h2 style="color:#000;" class="text-lg font-bold mb-2">Описание</h2>
    <p class="lg:w-3/5" v-if="description_collapsed">
      {{ info.description.slice(0,300) }} 
      <span class="text-blue-800 cursor-pointer" @click="() => description_collapsed = false">ещё...</span>
    </p> 
    <p class="lg:w-3/5 cursor-pointer" v-else @click="() => description_collapsed = true">
      {{ info.description }}
    </p>
  </div>

    <Similars v-if="info !== null" :similarTo="[info.category]"/>

    <Feed/>



</template>

<script>

  import axios from 'axios'
  import '../assets/utils.css'
  import Similars from './SimilarView.vue'
  import Feed from './HomeView.vue'

  //here we get data from the rest api situated on vercel.app


  export default {
    props: ['id'],
    components: {
      Similars, Feed
    },  
    data: () => ({
      info: null,
      description_collapsed: true
    }),
    methods: {
      addToCart(id) {
        this.$store.state.cartBooks.push(id)
        // this.$store.state.newInCart += 1

        console.log(this.$store.state.cartBooks)
      },
      async beforeMountStuff() {
        await axios.get(`${process.env.VUE_APP_API_URL}/getBook/` + this.$route.params.id)
        .then(data => {
          console.log(data.data)
          data.data.tags = data.data.tags.split(',')
          this.info = data.data
          document.documentElement.scrollTo(0,0)
        })
        .catch(e => {
          console.warn(e)
        })
      }
    },
    async beforeMount() {
      this.beforeMountStuff()
    },
    watch: {
      routeId() {
        this.beforeMountStuff()
      }
    },
    computed: {
      routeId() {
        return this.$route.params.id
      },
      buttonAction() {
        if(this.info !== null) {
          if(this.$store.state.cartBooks.includes(this.info.id)) {
            return 'В корзине'
          } else {
            return 'Купить'
          }
        }
      },
      isAdmin() {
        if(localStorage.kitobtj !== undefined) {
          if(JSON.parse(localStorage.kitobtj).username == 'admin') {
            console.log('admin welcome !!!')
            return true 
          }
        }
        return false
      }
    }
  }

</script>















