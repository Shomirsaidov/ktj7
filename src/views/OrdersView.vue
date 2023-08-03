<template>
    <BottomNav/>
    <div id="modal" v-if="editMode">
        <div class="cover" style="position: absolute; width: 100%; height: 100%; background: rgb(154, 221, 167);opacity: 0.8;filter: blur(10px);"></div>
        <div class="cover space-y-2 bg-white shadow-xl p-8 rounded-lg lg:w-1/4" style="position: absolute; top: 20%; left: 30%;">
            <div class="flex justify-end">
                <img src="../assets/tag-cross.svg" class="cursor-pointer" @click="() => this.editMode = false" width="30" alt="">
            </div>
            <div class="flex item-center space-x-4">
                <textarea v-model="denyCause" class="border-2 outline-none p-4" cols="20" rows="5" placeholder="Причина отказа"></textarea>
                <div>
                    <span>Примерная дата доставки</span>
                    <input v-model="deliveryDate" type="date" placeholder="Причина отказа" class="border-2 outline-none p-4"/>
                </div>
            </div>
            <div class="grid space-y-2">
                <button :class="[acceptValidation()]" :disabled="acceptButtonEnabled" @click="editOrder(orderToEdit, 'Принят')">Принять</button>
                <button :class="[denyValidation()]" :disabled="denyButtonEnabled" @click="editOrder(orderToEdit, 'Отклонен')">Отказать</button>
            </div>
        </div>
    </div>
    
    <div class="flex flex-col">
        <div class="p-4 rounded-xl bg-gray-200 flex items-center rounded-b-none">
            <span class="font-lg font-semibold">Недавние заказы</span>
        </div>

        <div v-if="data == null" class="my-4 space-y-2" :style="{display: 'flex', justifyContent: 'center',flexDirection: 'column', alignItems: 'center'}">
              <div id="loader"></div>
              <h2 class="font-semibold">Shomirsaidov Abubakr & Doleap Corp.</h2>
        </div>

        <img v-if="data == 'empty'" src="../assets/nothing.png" alt="nothing found" width="300">

        <table class="border-2 w-100" v-if="data !== null">
            <tr class="border-2  p-2">
                <td class="border-2 md:p-2 font-semibold">Дата заказа</td>            
                <td class="border-2 md:p-2 font-semibold">Имя</td>
                <td class="border-2 md:p-2 font-semibold">Почта</td>
                <td class="border-2 md:p-2 font-semibold">Телефон</td>
                <td class="border-2 md:p-2 font-semibold">Адрес</td>
                <td class="border-2 md:p-2 font-semibold">Книга</td>
                <td class="border-2 md:p-2 font-semibold">Кол-во</td>
                <td class="border-2 md:p-2 font-semibold">Сумма</td>
                <td class="border-2 md:p-2 font-semibold">Тип оплаты</td>
                <td class="border-2 md:p-2 font-semibold">Номер кошелька</td>
                <td class="border-2 md:p-2 font-semibold">Состояние</td>
            </tr>
            <tr class="border-2  p-2 shadow-md hover:bg-gray-200 cursor-pointer" @click="() => {
                this.editMode = true
                this.orderToEdit = delivery.id
                console.log(this.orderToEdit)
        }" 
            v-for="(delivery, index) in data" :key="index">
                <td class="border-2 md:p-2">{{ delivery.date }}</td>            
                <td class="border-2 md:p-2">{{ delivery.client_name }}</td>
                <td class="border-2 md:p-2">{{ delivery.email }}</td>
                <td class="border-2 md:p-2">{{ delivery.tel }} </td>
                <td class="border-2 md:p-2">{{ delivery.address }} </td>
                <td class="border-2 md:p-2">{{ delivery.book }}</td>
                <td class="border-2 md:p-2">{{ delivery.quantity }}</td>
                <td class="border-2 md:p-2">{{ delivery.total_price }}</td>
                <td class="border-2 md:p-2">{{ delivery.pay_type }}</td>
                <td class="border-2 md:p-2">{{ delivery.card }}</td>
                <td :class="statusStyle(delivery.status)">{{ delivery.status }}</td>

                <td>
                    <button class="hover:bg-green-200 rounded-lg text-white">
                        <!-- <img src="../assets/edit.svg" style="min-width: 40px;" alt="" @click="$router.push('/editor/' + delivery.id)"> -->
                        <h1 style="min-width: 40px;" alt="" @click="$router.push('/editor/' + delivery.id)">Edit</h1>
                    </button>
                </td>
            </tr>
        </table>
	</div>
    <div style="height: 450px;"></div>

</template>
<script>
    import axios from 'axios' 

    export default {
        components: {
        },
        data: () => ({
            data: null,
            deliveryDate: '',
            denyCause: '',
            orderToEdit: null,
            editMode: false
        }),
        async mounted() {
            await axios.get(`${process.env.VUE_APP_API_URL}/orders?limit=none`)
                .then(resp => {
                this.data = resp.data;
            });
        },
        methods: {
            statusStyle(status) {
                if(status == 'Принят') {
                    return 'bg-green-500 text-white font-bold rounded-full'
                } else if(status == 'На рассмотрении') {
                    return 'bg-gray-300 rounded-full'                    
                } else {
                    return 'bg-red-500 text-white font-bold rounded-full'
                }
            },
            acceptValidation() {
                if(this.deliveryDate !== '') {
                    return 'bg-green-500 text-white p-2 rounded-xl'
                } else {
                    return 'bg-gray-200 p-2 rounded-xl'
                }
            },
            denyValidation() {
                if(this.denyCause !== '') {
                    return 'bg-red-500 text-white p-2 rounded-xl'
                } else {
                    return 'bg-gray-200 p-2 rounded-xl'
                }
            },
            async editOrder(orderId, status) {
                await axios.post(`${process.env.VUE_APP_API_URL}/editOrderStatus`, {
                    orderId: orderId,
                    status: status,
                    denyCause: this.denyCause,
                    deliveryDate: this.computeDeliveryDate
                })
                this.editMode = false
                location.reload()
            }
        },
        computed: {
            acceptButtonEnabled() {
                if(this.deliveryDate !== '') {
                    return false
                } else {
                    return true
                }
            },
            denyButtonEnabled() {
                if(this.denyCause !== '') {
                    return false
                } else {
                    return true
                }
            },
            computeDeliveryDate() {
                if(this.deliveryDate.length > 0) {
                    return this.deliveryDate
                }
                return 'Неизвестно'
            }
        }
}
</script>












