<script setup>
defineProps({
    toValue: String,
    imageUrl: String,
    title: String,
})
</script>

<template>
    <div>
        <router-link :to="toValue">
            <li class="flex gap-1 cursor-pointer opacity-70 hover:opacity-100">
                <img 
                    class="w-6" 
                    :src="imageUrl" 
                    alt="{{ title }}"
                >
                <p class="text-slate-400 cursor-pointer hover:text-black">
                    {{ title }}
                </p>
            </li>
        </router-link>
    </div>
</template>