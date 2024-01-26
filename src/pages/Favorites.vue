<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import BookItemList from '@/components/BookItemList.vue';
import Info from '@/components/Info.vue';

const isFavoriteEmpty = ref(false)
const favorites = ref([])

onMounted(async () => {
    try {
        const { data } = await axios.get('https://9ba32d75d25c11ac.mokky.dev/favorites?_relations=items')
        favorites.value = data.map((obj) => obj.item)
        if(favorites.value.length === 0) {
            isFavoriteEmpty.value = true
        }
        console.log(favorites.value)
    } catch (err) {
        console.log(err)
    }
})
</script>

<template>
    <div>
        <!-- Если в закладках ничего нет -->
        <div v-if="isFavoriteEmpty" class="h-60 my-32">
            <info
                title="Закладок нет :("
            />
        </div>
        <!-- Если в закладках есть избранные товары -->
        <div v-else>
            <h2 class="font-bold text-2xl">Мои закладки</h2>

            <book-item-list :items="favorites" is-favorite/>
        </div>
    </div>
</template>