<template>
    <div class="px-8 py-8 lg:px-32">

        <div class="flex items-center justify-between">
            <div class="">
                <h1 class="text-start text-2xl font-bold">Корзина</h1>
                <h3 class="text-start text-md">{{ $store.state.cartBooks.length }} книг</h3>

            </div>
            <div>
                <button class="flex items-center p-2 rounded-md space-x-2" style="background: #ecf6fe;">
                    <img src="../assets/trash.svg" alt="" width="30">
                    <span style="color: #26a9e0;" @click="clearCart">Очистить корзину</span>
                </button>
            </div>    
        </div>

        <div class="flex items-start my-8 flex-wrap justify-between">
            <img v-if="this.$store.state.cartBooks.length == 0" src="../assets/nothing.png" alt="nothing found" width="300">
            <div v-if="info !== null">
                <div v-for="book in info" class="my-8 flex items-stretch border-b-2 space-x-4 pb-8">
                    <img :src="book.cover" @click="$router.push('/book/' + book.id)" alt="" width="100">
                    <div>
                        <h1 class="text-start text-md font-bold">{{ book.name }}</h1>
                        <h1 class="text-start text-sm">{{ book.author }}</h1>
                        <h1 class="text-start text-lg text-red-600 font-bold mt-8">{{ book.cur_price }} c.</h1>
                        <span class="mt-4">Количество </span>
                        <input type="number" v-model="book.quantity" class="p-2 border-2 outline-none rounded-md">

                    </div>

                </div>
            </div>
            <div class="flex justify-center" v-if="info == null">
                <img src="../assets/loader.gif" alt="">
            </div>
            <div class="border-2 rounded-md p-8">
                <div class="space-y-4">
                    <h2 class="text-xl text-blue-600 text-start">Итого к оплате :</h2>
                    <h2 class="text-xl text-blue-600 text-start font-bold">{{ totalPrice }} c.</h2>
                </div>

                
                

                
                <div class="flex flex-col items-start mt-4">    
                    <select class="border-2 rounded-lg p-2 outline-none" v-model="city">
                        <option value="" selected disabled>Выберите город</option>
                        <option value="Душанбе">Душанбе</option>
                        <option value="Худжанд">Худжанд</option>
                        <option value="Исфара">Исфара</option>
                        <option value="Бохтар">Бохтар</option>
                        <option value="Кулоб">Кулоб</option>
                        <option value="Истаравшан">Истаравшан</option>
                        <option value="Турсунзода">Турсунзода</option>
                        <option value="Хоруг">Хоруг</option>
                        <option value="Рашт">Рашт</option>
                    </select>
                    <br>
                    <input type="text" placeholder="Введите адрес доставки" class="p-2 outline-none rounded-lg border-2" v-model="address">
                    
                    <div class="flex items-center space-x-4">
                        <div class="checkbox-wrapper-7 my-8">
                            <input class="tgl tgl-ios" id="cb2-8" type="checkbox" v-model="onlinePay">
                            <label class="tgl-btn" for="cb2-8"></label>
                        </div>
                        <span>Оплатить онлайн</span>
                    </div>

                    <input v-if="onlinePay" type="text" placeholder="Номер вашего кошелька или карты" 
                    class="p-2 outline-none rounded-lg border-2" v-model="cardNumber">

                </div>
                
                
                <button :class="['my-8 bg-blue-600 text-white font-bold p-4 rounded-md text-xl', {'bg-gray-400': falseForm}]" 
                @click="shop">Оформить покупку</button>
                
            </div>
        </div>


    </div>
</template>

<script>
  import axios from 'axios'
import '../assets/utils.css'


    export default {
        data: () => ({
            deliver: false,
            onlinePay: false,
            cardNumber: '',
            city: '',
            address: '',
            info: null,
            payment_intented: false,
        }),
        methods: {
            async shop() {

                var d = new Date()
                var order_date = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear()

                if(!this.falseForm) {
                    if(localStorage.kitobtj == undefined) {
                        this.$router.push('/login')
                    } else {
                        this.$router.push('/pay/' + this.totalPrice + '/' + this.cardNumber)
                        this.info.forEach(async (book) => {
                            await axios.post(`${process.env.VUE_APP_API_URL}/makeOrder`, {
                                client_name: JSON.parse(localStorage.kitobtj).username,
                                tel: JSON.parse(localStorage.kitobtj).tel,
                                email: JSON.parse(localStorage.kitobtj).email,
                                date: order_date,
                                status: 'На рассмотрении',
                                book: book.name,
                                quantity: book.quantity,
                                address: `${this.city}, ${this.address}`,
                                pay_type: this.computePayType,
                                card: this.cardNumber,
                                total_price: book.cur_price * book.quantity
                            })


                        })

                        this.payment_intented = true
                        this.clearCart()

                    // оплата
                    //  а также отправка запроса на сервер о заказе для дальнейшего подтверждения администратора
                    }
                }
            },
            clearCart() {
                this.info = null
                this.$store.state.cartBooks = []
            }


        },
        computed: {
            falseForm() {
                if(!this.deliver) {
                    return false
                } else if(!this.onlinePay) {
                    if(this.address !== '' && this.city.length !== 0) {
                        return false
                    } else {
                        return true
                    }
                } else if(this.cardNumber.length > 0) {
                    return false
                }
                
            },
            computePayType() {
                if(this.onlinePay) {
                    return 'Оплата онлайн'
                } else {
                    return 'Оплата курьеру'
                }
            },  
            BooksInCart() {
                return this.$store.state.cartBooks
            },
            totalPrice() {
                let price = 0;
                if(this.info !== null && this.info.length !== 0) {
                    this.info.forEach(element => {
                        price += element.cur_price * element.quantity
                    });
                }
                return price
            }
        },
        mounted() {
            document.documentElement.scrollTo(0,0)
        },
        async beforeMount() {
            await axios.post(`${process.env.VUE_APP_API_URL}/getBooksForCart/`, {
                IDs: this.$store.state.cartBooks
            })
                .then(data => {
                    this.info = data.data
                    if(this.info.length > 0) {
                        this.info.forEach((book, index) => {
                            this.info[index].quantity = 1
                        })
                        console.log(this.info)
                    } 
                })
        },
        watch: {
                async BooksInCart(newList,oldList) {
                    if(!this.payment_intented) {
                        await axios.post(`${process.env.VUE_APP_API_URL}/getBooksForCart/`, {
                        IDs: this.$store.state.cartBooks
                        }).then(data => {
                            console.log(data.data)
                            this.info = data.data
                        })
                    }
                }


        }
    }
</script>





