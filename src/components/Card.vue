<script setup>
import { defineProps } from 'vue';

defineProps({
    bg: {
        type: String,
        default: 'bg-gray-100',
    }
})

</script>

<template>
    <div :class="`${bg} p-6 rounded-lg shadow-md`">
        <!-- Slot disini sama seperti di laravel, untuk isinya -->
        <slot>
        </slot>
    </div>
</template>