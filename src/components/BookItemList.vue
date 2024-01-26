<script setup>
import BookItem from './BookItem.vue';

defineProps({
    items: Array,
    isFavorite: Boolean,
})

const emit = defineEmits(['addToFavorite', 'cartAction'])
</script>

<template>
    <div class="grid grid-cols-6 gap-4" v-auto-animate>
        <book-item
            v-for="item in items"
            :key="item.id"
            :image-url="item.imageUrl"
            :title="item.title"
            :author="item.author"
            :price="item.price"
            :is-favorite="item.isFavorite"
            :add-to-favorite="isFavorite ? null : () => emit('addToFavorite', item)"
            :is-added="item.isAdded"
            :cart-action="isFavorite ? null : () => emit('cartAction', item)"
        />
    </div>
</template>