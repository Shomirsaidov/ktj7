<template>
    
    <div class="lg:px-64 py-4 lg:py-8 px-4 space-y-8">
        <div class="flex justify-between items-center my-2">
            <div class="space-y-2">
                <h1 class="text-start text-xl font-bold">Салом, {{ username }} !</h1>
                <h1 class="text-start text-md text-gray-600">{{ tel }}</h1>  
                <h1 class="text-start text-md text-gray-600">{{ email }}</h1>                
            </div>

            <img src="../assets/user-octagon.svg" alt="" width="60">
        </div>

        <h1 class="text-start text-xl font-bold">Заказы</h1>

        <div class="flex justify-center" v-if="info == null">
            <img src="../assets/loader.gif" alt="">
        </div>

        <img v-if="empty" src="../assets/nothing.png" alt="nothing found" width="300">

        <div class="p-4 shadow-xl" v-if="info !== null">            
            <div v-for="book in info" class="cursor-pointer my-8 flex items-start border-b-2 space-x-4 pb-8">

                    <div class="book_images_3"  @click="$router.push('/book/' + book.id)">
                        <img :src="book.cover" alt="" width="100">
                    </div> 

                    <div>
                        <div class="flex items-center space-x-2">
                            <h1 class="text-start text-md font-bold">{{ book.name }}</h1>
                            <span class="p-2 px-4 rounded-full bg-green-300">{{ book.quantity }} штук</span>
                        </div>
                            
                        <h1 class="text-start text-sm">{{ book.author }}</h1>
                        <h1 :class="['text-start text-lg font-bold mt-8',getStatusColor(book.status)]">{{ book.status }}</h1>

                        <div class="mt-2 bg-gray-100 p-4 rounded-lg text-start flex items-start justify-between" v-if="book.status == 'Отклонен'">
                            <details>
                                <summary class="outline-none">Причина отказа</summary>
                                <p class="mt-4">
                                    {{ book.notes }}
                                </p>
                            </details>
                            <img src="../assets/info-circle.svg" width="30" alt="">
                        </div>

                        <div class="flex items-center space-x-2 mt-4">
                            <span class="text-gray-500">Дата заказа    </span>
                            <h1 class="text-start text-md text-blue-600">{{ book.date }}</h1>
                        </div>
                        <div class="flex items-center space-x-2 mt-2">
                            <span class="text-gray-500">Дата доставки    </span>
                            <h1 class="text-start text-md text-blue-600">{{ book.delivery_date }}</h1>
                        </div>

                    </div>

            </div>
        </div>

        <h1 class="text-start text-2xl font-bold">Настройки</h1>

        <div class="p-8 shadow-xl mv-8 space-y-8">
            <router-link :to="'/me'">
                <h1 class="text-start text-lg font-bold text-blue-500" style="margin-bottom: 15px;">О разработчике</h1>
            </router-link>
            <router-link :to="'/login'">
                <h1 class="text-start text-lg font-bold text-blue-500">Сменить аккаунт</h1>
            </router-link>
            <!-- <button class="border-2 border-blue-500 text-blue-500 p-4 rounded-xl font-bold">Сменить аккаунт</button> -->
        </div>

    </div>

    <div style="height: 100px;"></div>


</template>

<script>
import axios from 'axios'

    export default {
        data: () => ({
            username: JSON.parse(localStorage.kitobtj).username,
            tel: JSON.parse(localStorage.kitobtj).tel,
            email: JSON.parse(localStorage.kitobtj).email,
            info: null
        }),
        methods: {
            getStatusColor(status) {
                if(status == 'Принят') {
                    return 'text-green-700'
                } else if(status == 'На рассмотрении') {
                    return 'text-blue-600'
                } else {
                    return 'text-red-800'
                }

            }
        },
        computed: {
            
        },
        async beforeMount() {
            await axios.post(`${process.env.VUE_APP_API_URL}/getOrders`, {
                username: JSON.parse(localStorage.kitobtj).username
            }).then(data => {
                this.info = data.data
                this.info.length == 0 ? this.empty = true : this.empty = false
                console.log(this.info)
            }).catch(e => {
                console.log(e)
            })
        },
        mounted() {
            document.documentElement.scrollTo(0,0)
        }
    }
</script>










