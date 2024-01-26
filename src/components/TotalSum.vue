<script setup>
import MyButton from './MyButton.vue';

defineProps({
    totalSum: Number,
    deliverySum: Number,
})

const emit = defineEmits(['createOrder'])
</script>

<template>
    <div>
        <div class="border rounded-md p-6">
            <h2 class="font-bold text-lg mb-6">Заказ:</h2>
            <div class="flex">
                <p>Сумма:</p>
                <div class="border-b flex-1"></div>
                <p>{{ totalSum }} руб.</p>
            </div>
            <div class="flex">
                <p>Доставка:</p>
                <div class="border-b flex-1"></div>
                <p>{{ deliverySum }} руб.</p>
            </div>
            <div class="flex my-8">
                <b>Итого:</b>
                <div class="border-b flex-1"></div>
                <b>{{ totalSum + deliverySum }} руб.</b>
            </div>

            <div class="mt-8">
                <my-button
                    @click="() => emit('createOrder')"
                    title="Оформить заказ"
                />
            </div>
        </div>
    </div>
</template>