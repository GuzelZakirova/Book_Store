<script setup>
import CartItem from './CartItem.vue';

defineProps({
    items: Array
})

const emit = defineEmits(['removeFromCart', 'plusToCart', 'minusFromCart'])
</script>

<template>
    <div class="flex flex-col gap-4" v-auto-animate>
        <cart-item 
        v-for="item in items"
        :key="item.id"
        :id="item.id"
        :count="item.count"
        :image-url="item.imageUrl"
        :title="item.title"
        :author="item.author"
        :price="item.price"
        :remove-from-cart="() => emit('removeFromCart', item)"
        :plus-to-cart="() => emit('plusToCart', item)"
        :minus-from-cart="() => emit('minusFromCart', item)"
        />
    </div>
</template>