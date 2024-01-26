<script setup>
import { provide } from 'vue';
import axios from 'axios'

import HeaderBlock from './components/HeaderBlock.vue';

const addToCart = async (item) => {
    try {
        const obj = {
            item_id: item.id,
            count: 1
        }
        item.isAdded = true
        const { data } = await axios.post('https://9ba32d75d25c11ac.mokky.dev/cart', obj)
        item.addedId = data.id
    } catch(err) {
        console.log(err)
    }
}

const removeFromCart = async (item) => {
    try {
        item.isAdded = false
        console.log(item)
        await axios.delete(`https://9ba32d75d25c11ac.mokky.dev/cart/${item.addedId}`)
        item.addedId = null
        console.log(item)
    } catch(err) {
        console.log(err)
    }
}

const cartAction = (item) => {
    try{
        if(!item.isAdded) {
            addToCart(item)
        } else {
            removeFromCart(item)
        }
    } catch (err) {
        console.log(err)
    }
}

provide('cart', {
    addToCart,
    removeFromCart,
    cartAction,
})
</script>

<template>
  <div>
    <!-- Основной блок -->
    <div class="w-4/5 bg-white shadow-xl m-auto rounded-md my-16">
      <HeaderBlock/>
      <div class="p-8">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
