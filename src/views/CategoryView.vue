<template>
    <div class="category p-4 my-2 lg:px-16">

        <div class="flex space-x-16 mb-4 items-center">
        <h1 class="text-2xl font-bold">Книги по тегу: "{{ this.$route.params.category }}"</h1>
        <img src="../assets/arrow-right.svg" alt="" width="40">
        </div>

        <div class="flex justify-center" v-if="data == null">
            <img src="../assets/loader.gif" alt="">
        </div>

        <div class="flex items-stretch space-x-4 overflow-x-auto slider" style="scroll-snap-type: x mandatory;">

        <div class="card border-2 p-4 rounded-lg hover:shadow-xl flex flex-col justify-between" v-for="(book,index) in data"
        :key="index" style="max-width: 170px;" @click="navigate('/book/' + book.id)">
            <div>
            <div class="book_images">
                <img :src="book.cover" alt="" height="280" width="150">
            </div>
            <div class="flex items-center justify-between mt-4">
                <h2 class="text-start text-2xl mb-2 text-red-500">{{ book.cur_price }} c.</h2>
                
            </div>

            <h1 class="text-start text-sm font-semibold break-words" style="max-width: 120px;">{{ book.name }}</h1>
            <h2 class="text-start text-sm font-light mb-4" style="max-width: 120px;">{{ book.author }}</h2>

            
            </div>

            <div>
        
            <div class="flex items-stretch justify-between space-x-2">
                <button style="background: #26a9e0;flex: 1;" class="px-4 rounded-lg font-bold text-lg text-white" >Подробнее</button>
                <img src="../assets/bookmark-2.svg" alt="" width="45" class="p-2 rounded-xl" 
                style="background: #ecf6fe;">
            </div>
            </div>
        </div>
        </div>

    </div>

</template>

<script>
import axios from 'axios'

export default {
    props: [
        'category'
    ],  
    data: () => ({
        data: null,
    }),
    methods: {
        navigate(To) {
        this.$router.push(To)
        },
    },
    computed: {
            categoryChange() {
                return this.$route.params.category
            }
        },
    watch: {
            async categoryChange() {
                this.data = null
                await axios.get(`${process.env.VUE_APP_API_URL}/find/${this.$route.params.category}`)
                    .then(data => {
                        this.data = data.data
                    })
                    .catch(e => {
                        console.log(e)
                    })
            }
    }, 
    async mounted() {
            // getting data from the server for start and then see to change results when page does not loads but just changes queries
            await axios.get(`${process.env.VUE_APP_API_URL}/find/${this.$route.params.category}`)
                .then(data => {
                    this.data = data.data
                })
                .catch(e => {
                    console.log(e)
                })
    }
   
}
</script>










