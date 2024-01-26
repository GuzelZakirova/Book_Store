<script setup>
import { ref, onMounted, computed, inject } from 'vue';
import axios from 'axios';

import CartItemList from '@/components/CartItemList.vue';
import Info from '@/components/Info.vue';
import TotalSum from '@/components/TotalSum.vue';
import OrderInfo from '@/components/OrderInfo.vue';

const cartItems = ref([])
const len = ref(0)
const orderId = ref(null)
const totalSum = computed(() =>
  cartItems.value.reduce((acc, item) => acc + item.price * item.count, 0)
)
const deliverySum = computed(() => Math.round((totalSum.value * 5) / 100))

const { removeFromCart } = inject('cart')

const removeItem = async (item) => {
  await removeFromCart(item)
  await fetchItemsCart()
}

const fetchItemsCart = async () => {
  try {
    const { data } = await axios.get('https://9ba32d75d25c11ac.mokky.dev/cart?_relations=items')
    cartItems.value = data.map((obj) => {
      return {
        ...obj.item,
        addedId: obj.id,
        count: obj.count
      }
    })
    len.value = cartItems.value.length
    console.log(len.value)
    console.log(cartItems.value)
  } catch (err) {
    console.log(err)
  }
}

const plusToCart = async (item) => {
  try {
    const changeValue = {
      count: item.count + 1
    }
    console.log(item)
    await patchChange(item, changeValue)
    await fetchItemsCart()
  } catch (err) {
    console.log(err)
  }
}

const minusFromCart = async (item) => {
  try {
    const changeValue = {
      count: item.count - 1
    }
    await patchChange(item, changeValue)
    await fetchItemsCart()
  } catch (err) {
    console.log(err)
  }
}

const patchChange = async (item, changeValue) => {
  try {
    const res = await axios.patch(
      `https://9ba32d75d25c11ac.mokky.dev/cart/${item.addedId}`,
      changeValue
    )
    // cartItems.value = data
    console.log(res)
  } catch (err) {
    console.log(err)
  }
}

const createOrder = async () => {
  try {
    const obj = {
      items: cartItems.value,
      total_price: totalSum.value+deliverySum.value,
    }
    const {data} = await axios.post('https://9ba32d75d25c11ac.mokky.dev/orders', obj)

    orderId.value = data.id

    await axios.patch('https://9ba32d75d25c11ac.mokky.dev/cart', [])
  } catch(err) {
    console.log(err)
  }
}

onMounted(fetchItemsCart)
</script>

<template>
  <div>
    <!-- Окно об оформлении заказа -->
    <order-info v-if="orderId" :order-id="orderId" />
    <!-- Если в корзине нет товаров -->
    <div v-if="len === 0" class="h-60 my-32">
      <info title="Корзина пуста :(" />
    </div>
    <!-- Если в корзине есть товары -->
    <div v-else>
      <h2 class="font-bold text-3xl mb-8">Корзина</h2>

      <div class="flex justify-between gap-6">
        <!-- Лист товаров -->
        <cart-item-list
          class="w-full"
          :items="cartItems"
          @remove-from-cart="removeItem"
          @plus-to-cart="plusToCart"
          @minus-from-cart="minusFromCart"
        />

        <!-- Итоговая сумма -->
        <div class="w-1/3">
          <total-sum :total-sum="totalSum" :delivery-sum="deliverySum" @create-order="createOrder" />
        </div>
      </div>
    </div>
  </div>
</template>
