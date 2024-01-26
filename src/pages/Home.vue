<script setup>
import { ref, onMounted, reactive, watch, inject } from 'vue';
import axios from 'axios';

import BookItemList from '@/components/BookItemList.vue';

const items = ref([])

const filters = reactive({
    sortBy: 'title',
    querySearch: ''
})

const onChangeQuery = (event) => {
    filters.querySearch = event.target.value
}

const onChangeSort = (event) => {
    filters.sortBy = event.target.value
}

const fetchItems = async () => {
    try {
        const params = {
            sortBy: filters.sortBy
        }

        if(filters.querySearch) {
            params.title = `*${filters.querySearch}*`
            // params.author = `*${filters.querySearch}*`
        }
        console.log(params)
        const { data } = await axios.get('https://9ba32d75d25c11ac.mokky.dev/items', {
            params
        })
        items.value = data.map((obj) => {
            return {
                ...obj,
                isFavorite: false,
                isAdded: false
            }
        })
    } catch (err) {
        console.log(err)
    }
}

const addToFavorite = async (item) => {
    try {
        if(!item.isFavorite) {
            const obj = {
                item_id: item.id
            }
            item.isFavorite = true
            const { data } = await axios.post('https://9ba32d75d25c11ac.mokky.dev/favorites', obj)
            item.favoriteId = data.id
            console.log(data)
        } else {
            item.isFavorite = false
            await axios.delete(`https://9ba32d75d25c11ac.mokky.dev/favorites/${item.favoriteId}`)
            item.favoriteId = null
        }
    } catch(err) {
        console.log(err)
    }
}

const fetchFavorite = async () => {
    try {
        const { data: favorites } = await axios.get('https://9ba32d75d25c11ac.mokky.dev/favorites')
        items.value = items.value.map((item) => {
            const favorite = favorites.find((favorite) => favorite.item_id === item.id)

            if(!favorite) {
                return item
            }

            return {
                ...item,
                isFavorite: true,
                favoriteId: favorite.id,
            }
        })
    } catch(err) {
        console.log(err)
    }
}

const fetchCart = async () => {
    try {
        const { data: cartItems } = await axios.get('https://9ba32d75d25c11ac.mokky.dev/cart')
        items.value = items.value.map((item) => {
            const cartItem = cartItems.find((cartItem) => cartItem.item_id === item.id)

            if(!cartItem) {
                return item
            }

            return {
                ...item,
                isAdded: true,
                addedId: cartItem.id,
            }
        })
        console.log(items.value)
    } catch (err) {
        console.log(err)
    }
}

const { cartAction } = inject('cart')

onMounted(async () => {
    await fetchItems(),
    await fetchFavorite(),
    await fetchCart()
})
watch(filters, fetchItems)
</script>

<template>
    <div>
        <div class="flex justify-between items-center">
            <h2 class="font-bold text-2xl">Все книги</h2>
            <div class="flex gap-8">
                <select @change="onChangeSort" class="border rounded-md outline-none">
                    <option value="title">По названию</option>
                    <option value="author">По автору</option>
                    <option value="price">По цене (дешевые)</option>
                    <option value="-price">По цене (дорогие)</option>
                </select>
                <div class="relative">
                    <img class="w-6 absolute top-1 left-2" src="/search.svg" alt="Search">
                    <input 
                        @input="onChangeQuery" 
                        class="border rounded-md pr-2 pl-10 py-1 outline-none" 
                        type="text" 
                        placeholder="Поиск..."
                    >
                </div>
            </div>
        </div>

        <book-item-list 
            :items="items" 
            @add-to-favorite="addToFavorite" 
            @cart-action="cartAction"
        />
    </div>
</template>