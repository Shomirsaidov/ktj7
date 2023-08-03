<template>

    <div class="p-8 space-y-4" style="background: #ecf6fe;">
        <h1 class="font-bold text-2xl">Книжный магазин KITOB.tj. <br>Доставка по всему Таджикистану</h1>
        <div class="flex items-center justify-center space-x-4 cursor-pointer">
            <a href="https://www.facebook.com/kitob.tajikistan/" target="_blank">
                <img src="../assets/facebook.png" alt="" width="40">
            </a>
            <a href="https://www.instagram.com/kitob.tj_/" target="_blank">
                <img src="../assets/instagram.png" alt="" width="40">
            </a>
            <a href="https://t.me/kitobtj_official" target="_blank">
                <img src="../assets/telegram.png" alt="" width="40">
            </a>

        </div>
        <hr>
        <h2>© {{ new Date().getFullYear() }}, KITOB.tj</h2>
        <h2 style="color: rgb(60, 146, 216);">
            <router-link :to="'/me'">
                Shomirsaidov Abubakr presents
            </router-link>
        </h2>
    </div>


</template>    



<script>

    import '../assets/tailwind.css'
    export default {

    }

</script>