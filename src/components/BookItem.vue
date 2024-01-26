<script setup>
defineProps({
    imageUrl: String,
    title: String,
    author: String,
    price: Number,
    addToFavorite: Function,
    isFavorite: Boolean,
    cartAction: Function,
    isAdded: Boolean,
})
</script>

<template>
    <div class="mt-6 border rounded-md relative p-4 flex flex-col hover:-translate-x-1 hover:-translate-y-1 hover:shadow-md transition">
        <img class="w-5 opacity-90 absolute cursor-pointer" v-if="addToFavorite" @click="addToFavorite" :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'" alt="Like">
        <img class="w-32 m-auto pt-4" :src="imageUrl" :alt="`${title}`">
        <p class="font-bold mt-4 mb-3">{{ title }}</p>
        <p class="underline decoration-solid text-slate-500 cursor-pointer mb-4 hover:text-slate-900">{{ author }}</p>
        <div class="flex justify-between">
            <div>
                <p class="text-slate-400 uppercase">Цена:</p>
                <b>{{ price }} руб.</b>
            </div>
            <img class="w-6 opacity-70 cursor-pointer" @click="cartAction" v-if="cartAction" :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="Plus">
        </div>
    </div>
</template>