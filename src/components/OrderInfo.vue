<script setup>
import MyButton from './MyButton.vue';

defineProps({
    orderId: Number,
})
</script>

<template>
    <div class="fixed top-0 left-0 z-10 flex justify-center items-center dark w-full h-full">
        <div class="z-20 w-full max-w-md bg-white p-10 flex flex-col items-center border rounded-md">
            <h1 class="font-bold text-3xl mb-4">Заказ оформлен</h1>
            <p>Заказ #{{ orderId }} скоро будет передан службе доставки</p>
            <router-link to="/">
                <my-button
                class="mt-8"
                    title="Вернуться назад"
                />
            </router-link>
        </div>
    </div>
</template>