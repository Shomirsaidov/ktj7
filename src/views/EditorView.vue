<template>
	<div class="mt-8">

		<div class="shadow-xl p-8 rounded-xl grid justify-center">
			<h1 class="font-bold text-black text-2xl mb-2">Редактирование данных товара</h1>
			<h1 class="text-black text-xl mb-8"></h1>

            <div v-if="data == null" class="my-4 space-y-2" :style="{display: 'flex', justifyContent: 'center',flexDirection: 'column', alignItems: 'center'}">
              <div id="loader"></div>
              <h2 class="font-semibold">Shomirsaidov Abubakr & Doleap Corp.</h2>
            </div>

            <form :action="`${apiUrl}/editBook`" v-if="data !== null" method="POST" class="grid">
                <input type="hidden" name="id" v-model="data.id">

                <span class="text-start">Название :</span>
                <input v-model="data.name" type="text" name="name" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Магазин">

                <span class="text-start">Автор :</span>
                <input v-model="data.author" type="text" name="author" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Дата">

                <span class="text-start">Категория :</span>
                <input v-model="data.category" type="text" name="category" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Количество">

                <span class="text-start">Адрес картинки обложки :</span>
                <input v-model="data.cover" type="text" name="cover" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Количество">                

                <span class="text-start">Тип обложки :</span>
                <input type="text" v-model="data.cover_type" name="cover_type" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Осталось выплатить">

                <span class="text-start">Издательство :</span>
                <input type="text" v-model="data.publisher" name="publisher" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Выплачено">

                <span class="text-start">Цена :</span>
                <input type="number" v-model="data.cur_price" name="cur_price" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Выплачено">

                <span class="text-start">Прежняя цена :</span>
                <input type="number" v-model="data.prev_price" name="prev_price" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Выплачено">

                <input type="hidden" v-model="data.sales_per" name="sales_per" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Выплачено">

                <span class="text-start">Описание :</span>
                <textarea name="description" v-model="data.description" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" style="height: 300px;">
                </textarea>

                <span class="text-start">Страниц :</span>
                <input type="text" v-model="data.pages" name="pages" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Выплачено">

                <span class="text-start">Год выпуска :</span>
                <input type="text" v-model="data.release_year" name="release_year" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Выплачено">

                <span class="text-start">ISBN :</span>
                <input type="text" v-model="data.isbn" name="isbn" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Выплачено">

                <span class="text-start">Возрастные ограничения :</span>
                <input type="text" v-model="data.age_restrictions" name="age_restrictions" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Выплачено">

                <span class="text-start">Теги :</span>
                <input type="text" v-model="data.tags" name="tags" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Выплачено">

                <span class="text-start">Размер :</span>
                <input type="text" v-model="data.size" name="size" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Выплачено">

                <span class="text-start">Вес :</span>
                <input type="text" v-model="data.weight" name="weight" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Выплачено">

                <span class="text-start">В наличии :</span>
                <select v-model="data.presented" type="text" name="presented" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Вид">
                    <option default value="yes">ДА</option>
                    <option value="no">НЕТ</option>
                </select>


                <input type="submit" class="bg-green-500 text-white hover:bg-green-600 rounded-xl p-4 px-8 text-xl" value="Изменить"/>

            </form>


		</div>
	</div>


</template>
<script>
	import '@/assets/tailwind.css'
    import axios from 'axios'

	export default {
        props: [
            "id"
        ],
		components: {
    	},
		data: () => ({
			data: null,
            apiUrl: process.env.VUE_APP_API_URL,
            id: null
		}),
        methods: {
            async loadBookForEditing() {
                await axios.get(`${process.env.VUE_APP_API_URL}/getBook/` + this.id)
                .then(resp => {
                    this.data = resp.data
                    console.log(this.data)
                })
            }
        },
        async mounted() {
            if(JSON.parse(localStorage.kitobtj).username !== 'admin') {
                this.$router.back()
            }

            this.id = this.$route.params.id
            console.log(this.id)
            this.loadBookForEditing()
           
        },
        computed: {
            // payed() {
            //     // return this.intialRest - this.data.rest + this.data.payed
            // }
        }
	}
</script>





