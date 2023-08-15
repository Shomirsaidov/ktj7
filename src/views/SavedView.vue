<template>
    
    <div class="lg:px-64 py-4 lg:py-16 px-4 space-y-8">
        
        <h1 class="text-start text-xl font-bold">Сохранённые книги</h1>
        <div class="p-4 shadow-xl">
            
            <div v-for="book in info" class="cursor-pointer my-8 flex items-stretch border-b-2 space-x-4 pb-8" @click="$router.push('/book/' + book.id)">
                    <img :src="book.cover" alt="" width="100">
                    <div>
                        <h1 class="text-start text-md font-bold">{{ book.name }}</h1>
                        <h1 class="text-start text-sm">{{ book.author }}</h1>
                        <h1 class="text-start text-lg text-blue-700 font-bold mt-8">{{ book.cur_price }} c.</h1>

                    </div>

            </div>

        </div>

    </div>


</template>

<script>
    export default {
        data: () => ({
            info: [
                {
                id: 3,
                name: 'Думай и богатей',
                author: "Наполеон Хилл",
                cover: 'https://bookhouse.kg/media/galleryphoto/2022/5/bd0e464c-39cb-4fad-b49f-80f65fe2f14d.webp.360x460_q94.jpg',
                cur_price: '140',
                }
        ]
        })
    }
</script>










