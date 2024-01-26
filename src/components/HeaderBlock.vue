<script setup>
import HeaderItem from './HeaderItem.vue';
</script>

<template>
    <div class="flex justify-between p-8 border-b border-slate-400">
        <router-link to="/">
            <div class="flex gap-4 items-center">
                <img  src="/logo.svg" alt="Logo">
                <div>
                    <h2 class="font-bold uppercase text-2xl">Book Store</h2>
                    <p class="text-slate-400">Интернет-магазин книг</p>
                </div>
            </div>
        </router-link>
        <ul class="flex gap-6 items-center">
            <header-item
                to-value="/cart"
                image-url="/shopping-cart.svg"
                title="Корзина"
            />
            <header-item
                to-value="/favorites"
                image-url="/heart.svg"
                title="Закладки"
            />
            <header-item
                to-value="/profile"
                image-url="/profile.svg"
                title="Профиль"
            />
        </ul>
    </div>
</template>