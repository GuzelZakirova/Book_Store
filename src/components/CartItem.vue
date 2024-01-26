<script setup>
defineProps({
    imageUrl: String,
    title: String,
    author: String,
    count: Number,
    price: Number,
    removeFromCart: Function,
    plusToCart: Function,
   minusFromCart: Function,
})  
</script>

<template>
    <div class="border rounded-md flex justify-between p-6">
        <div class="flex gap-6">
            <img class="w-32" :src="imageUrl" alt="Book">
            <div>
                <h3 class="font-bold text-xl">{{ title }}</h3>
                <p class="text-slate-400">{{ author }}</p>
            </div>
        </div>
        <div class="flex gap-14 items-center">
            <b class="text-lg">{{ price*count }} руб.</b>
            <div class="flex items-center gap-4">
                <button 
                    @click="minusFromCart" 
                    :disabled="count <= 1" 
                    class="opacity-50 disabled:opacity-20 hover:opacity-100 cursor-pointer hover:shadow-xl"
                >
                    <img class="w-6" src="/minus-square.svg" alt="Minus"/>
                </button>
                <b>{{ count }}</b>
                <img @click="plusToCart" class="w-6 opacity-50 hover:opacity-100 cursor-pointer hover:shadow-xl" src="/plus.svg" alt="Plus">
            </div>
            <img @click="removeFromCart" class="w-10 opacity-40 hover:opacity-100 cursor-pointer" src="/trash.svg" alt="Trash">
        </div>
    </div>
</template>