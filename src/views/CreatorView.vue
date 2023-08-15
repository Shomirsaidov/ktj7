<template>
	<div class="mt-8">

		<div class="shadow-xl p-8 rounded-xl grid justify-center">
			<h1 class="font-bold text-black text-2xl mb-2">Добавление нового товара</h1>
			<h1 class="text-black text-xl mb-8"></h1>

            <div v-if="data == null" class="my-4 space-y-2" :style="{display: 'flex', justifyContent: 'center',flexDirection: 'column', alignItems: 'center'}">
              <div id="loader"></div>
              <h2 class="font-semibold">Shomirsaidov Abubakr & Doleap Corp.</h2>
            </div>

            <form :action="`${apiUrl}/add`" v-if="data !== null" method="POST" class="grid">
                <input type="hidden" name="id" value="null">

                <input v-model="data.name" type="text" name="name" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Название">

                <input v-model="data.author" type="text" name="author" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Автор">

                <input v-model="data.category" type="text" name="category" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Категория">

                <input v-model="data.cover" type="text" name="cover" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Адрес картинки обложки">                

                <input type="text" v-model="data.cover_type" name="cover_type" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Тип обложки">

                <input type="text" v-model="data.publisher" name="publisher" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Издательство">

                <input type="number" v-model="data.cur_price" name="cur_price" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Цена">

                <input type="number" v-model="data.prev_price" name="prev_price" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Прежняя цена">

                <input type="hidden" value="77" name="sales_per" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Выплачено">

                <textarea placeholder="Описание..." name="description" v-model="data.description" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" style="height: 300px;">
                </textarea>

                <input type="text" v-model="data.pages" name="pages" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Страниц">

                <input type="text" v-model="data.release_year" name="release_year" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Год выпуска">

                <input type="text" v-model="data.isbn" name="isbn" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="ISBN">

                <input type="text" v-model="data.age_restrictions" name="age_restrictions" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Возрастные ограничения">

                <span class="text-start">Теги :</span>
                <input type="text" v-model="data.tags" name="tags" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="Эко, Рекомендовано, Amazon Тор">

                <span class="text-start">Размер :</span>
                <input type="text" v-model="data.size" name="size" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="16 см 25 см">

                <span class="text-start">Вес (кг):</span>
                <input type="text" v-model="data.weight" name="weight" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="0.4">

                <span class="text-start">В наличии :</span>
                <select v-model="data.presented" type="text" name="presented" 
                class="p-2 border-2 mb-4 rounded-xl text-lg outline-none" placeholder="В наличии">
                    <option default selected value="yes">ДА</option>
                    <option value="no">НЕТ</option>
                </select>


                <input type="submit" class="bg-green-500 text-white hover:bg-green-600 rounded-xl p-4 px-8 text-xl" value="Создать"/>

            </form>


		</div>
	</div>


</template>
<script>
	import '@/assets/tailwind.css'
    import axios from 'axios'

	export default {
		components: {
    	},
		data: () => ({
			data: {
                name: '',
                author: '',
                description: '',
                category: '',
                cur_price: '',
                prev_price: '',
                sales_per: '',
                tags: '',
                cover: '',
                cover_type: '',
                pages: '',
                release_year: '',
                publisher: '',
                isbn: '',
                size: '',
                weight: '',
                age_restrictions: '',
                presented: ''
            },
            apiUrl: process.env.VUE_APP_API_URL,
            id: null
		}),
        methods: {
 
        },
        async mounted() {
            if(JSON.parse(localStorage.kitobtj).username !== 'admin') {
                this.$router.back()
            }           
        },
        computed: {
        }
	}
</script>





