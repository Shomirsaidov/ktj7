<template>

        <div class="card p-4 px-8 md:px-32 md:mt-16 border-2 rounded-md shadow-xl space-y-4 w-full lg:max-w-2xl">
            <h1 class="text-xl font-bold">Добавление книг</h1>
            <input type="text" placeholder="название" class="p-2 border-2 rounded-lg text-lg outline-none w-full"><br/>
            <input type="text" placeholder="автор" class="p-2 border-2 rounded-lg text-lg outline-none w-full"><br/>
            <input type="text" placeholder="цена" class="p-2 border-2 rounded-lg text-lg outline-none w-full"><br/>
            <input type="password" placeholder="прежняя цена" class="p-2 border-2 rounded-lg text-lg outline-none w-full">
            <div class="flex justify-end">
                <button class="bg-blue-600 text-white p-2 rounded-lg mt-2 text-lg w-full">Далее</button>
            </div>
            <h1 class="text-gray-600">Уже есть аккаунт ?<br><span class="text-blue-900 cursor-pointer" @click="switchScreen"> Войдите !</span></h1>
            <div class="flex justify-center">
                <img src="../assets/logotype.png" alt="" width="170">
            </div>
        </div>



</template>

<script>
    import axios from 'axios'
    export default {
        methods: {
            submit() {
                axios.post('http://localhost:4545/add/', {
                    name: this.name,
                    author: this.author,
                    cur_price: this.cur_price,
                    prev_price: this.prev_price,
                    sales_per: this.sales_per,
                    description: this.description,
                    cover: this.cover,
                    tags: this.tags,
                    category: this.category,
                    publisher: this.publisher,
                    release_year: this.release_year,
                    isbn: this.isbn,
                    pages: this.pages,
                    size: this.size,
                    cover_type: this.cover_type,
                    weight: this.weight,
                    age_restrictions: this.age_restrictions,
                    presented: this.presented,
                })
            }
        }
    }

</script>