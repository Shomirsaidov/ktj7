<template>
        <div class="category p-4 my-2 lg:px-16" v-if="data !== null">

            <div class="flex space-x-16 mb-4 items-center">
            <h1 class="text-2xl font-bold">Похожие</h1>
            <img src="../assets/arrow-right.svg" alt="" width="40">
            </div>

            <img v-if="data.length == 0" src="../assets/nothing.png" alt="nothing found" width="300">

            <div class="flex items-stretch space-x-4 overflow-x-auto slider" style="scroll-snap-type: x mandatory;">

            <div class="card border-2 p-4 rounded-lg hover:shadow-xl flex flex-col justify-between" v-for="(book,index) in data"
            :key="index" style="max-width: 170px;" @click="navigate('/book/' + book.id)">
                <div>
                <img :src="book.cover" alt="" height="280" width="150">

                <div class="flex items-center justify-between mt-4">
                    <h2 class="text-start text-2xl mb-2 text-red-500">{{ book.cur_price }} c.</h2>
                    
                </div>

                <h1 class="text-start text-sm font-semibold break-words" style="max-width: 120px;">{{ book.name }}</h1>
                <h2 class="text-start text-sm font-light mb-4" style="max-width: 120px;">{{ book.author }}</h2>

                
                </div>

                <div>
                <div class="flex items-center mb-4" style="margin-top: auto">
                    <img src="../assets/star_active.png" alt="" width="25" v-for="star in book.stars"> 
                </div>
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
            "similarTo"
        ],
        data: () => ({
            data: null,
        }),
        methods: {
            navigate(To) {
                this.$router.push(To)
            },
        },
        async mounted() {
                // getting data from the server
                console.log('search !')
                this.data = 'some loaded data !'
                await axios.get(`${process.env.VUE_APP_API_URL}/find/${this.similarTo[0]}`)
                    .then(data => {
                        this.data = data.data
                    })
                    .catch(e => {
                        console.log(e)
                    })
        }
    }
</script>










