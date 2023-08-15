<template class="flex space-x-4 items-center">
    
    <div class="flex justify-center">
        <div class="card p-4 px-8 md:px-32 md:mt-16 border-2 rounded-md shadow-xl space-y-4 w-full lg:max-w-2xl" v-if="!loginScreen">
            <h1 class="text-xl font-bold">Регистрация</h1>
            <input v-model="usernameSignup" type="text" placeholder="ФИО" class="p-2 border-2 rounded-lg text-lg outline-none w-full"><br/>
            <input v-model="telSignup" type="text" placeholder="Номер телефона" class="p-2 border-2 rounded-lg text-lg outline-none w-full"><br/>
            <input v-model="emailSignup" type="text" placeholder="Электронная почта" class="p-2 border-2 rounded-lg text-lg outline-none w-full"><br/>
            <input v-model="passwordSignup" type="password" placeholder="Придумайте пароль" class="p-2 border-2 rounded-lg text-lg outline-none w-full">
            <div class="flex justify-center">
                <div class="flex justify-center" v-if="loading">
                    <div id="loader"></div>
                </div>
                <button @click="signup" v-else class="bg-blue-600 text-white p-2 rounded-lg mt-2 text-lg w-full">Далее</button>
            </div>
            <h1 class="text-gray-600">Уже есть аккаунт ?<br><span class="text-blue-900 cursor-pointer" @click="switchScreen"> Войдите !</span></h1>
            <div class="flex justify-center">
                <img src="../assets/logotype.png" alt="" width="170">
            </div>
        </div>

        <div class="card p-4 px-8 md:px-32 md:mt-16 border-2 rounded-md shadow-xl space-y-4 w-full lg:max-w-2xl" v-if="loginScreen">
            <h1 class="text-xl font-bold">Вход</h1>
            <input v-model="telLogin" type="text" placeholder="Почта или номер телефона" class="p-2 border-2 rounded-lg text-lg outline-none w-full"><br/>
            <input v-model="passwordLogin" type="password" @keyup.enter="login" placeholder="Пароль" class="p-2 border-2 rounded-lg text-lg outline-none w-full">
            <div class="flex justify-center flex-col">
                <div class="flex justify-center" v-if="loading">
                    <div id="loader"></div>
                </div>
                <div class="text-red-600" v-if="errors.length > 0">
                    {{ errors }}
                </div>
                <button @click="login" v-if="!loading" class="bg-blue-600 text-white p-2 rounded-lg mt-2 text-lg w-full">Войти</button>
            </div>
            <h1 class="text-gray-600">Нет аккаунта ?<br><span class="text-blue-900 cursor-pointer" @click="switchScreen"> Зарегистрируйтесь !</span></h1>
            <div class="flex justify-center">
                <img src="../assets/logotype.png" alt="" width="170">
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { getTransitionRawChildren } from 'vue';
import '../assets/utils.css'
    export default {
        data: () => ({
            loginScreen: false,
            usernameSignup: '',
            emailSignup: '',
            telSignup: '',
            passwordSignup: '',
            telLogin: '',
            passwordLogin: '',
            loading: false,
            errors: '',
        }),
        methods: {
            switchScreen() {
                this.loginScreen = !this.loginScreen
            },
            async signup() {
                this.loading = true
                await axios.post(`${process.env.VUE_APP_API_URL}/signup`, {
                    username: this.usernameSignup,
                    email: this.emailSignup,
                    tel: this.telSignup,
                    password: this.passwordSignup
                }).then(data => {
                    if(data.data['status'] == 200) {
                        
                        localStorage.kitobtj = JSON.stringify(data.data)
                        this.$router.push('/profile')
                    } else {
                        this.loading = false
                        this.errors = data.data['error']
                    }
                }).catch(e => {
                    console.log(e)
                })
            },
            async login() {
                this.loading = true
                await axios.post(`${process.env.VUE_APP_API_URL}/login`, {
                    tel: this.telLogin,
                    password: this.passwordLogin
                }).then(data => {
                    console.log(data.data)
                    if(data.data['status'] == 200) {
                        
                        localStorage.kitobtj = JSON.stringify(data.data)
                        this.$router.push('/profile')
                    } else {
                        this.loading = false
                        this.errors = data.data['error']
                    }
                }).catch(e => {
                    console.log(e)
                })
            }



        }
    }
</script>







