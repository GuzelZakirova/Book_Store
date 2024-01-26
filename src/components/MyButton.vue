<script setup>
defineProps({
    title: String
})
</script>

<template>
    <div class="border rounded-md bg-sky-500 hover:bg-sky-600 active:bg-sky-700 px-6 py-2 text-center">
        <p class="font-bold text-white">{{ title }}</p>
    </div>
</template>