<script setup>
import MyButton from './MyButton.vue';

defineProps({
    title: String
})
</script>

<template>
    <div class="flex flex-col gap-6 items-center">
        <h2 class="font-bold text-2xl">{{ title }}</h2>
        <router-link to="/">
            <my-button
                title="Вернуться назад"
            />
        </router-link>
    </div>
</template>