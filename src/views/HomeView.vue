<script setup>
    import Hero from '@/components/Hero.vue';
    import HomeCards from '@/components/HomeCards.vue';
    import JobListings from '@/components/JobListings.vue';
</script>

<template>
    <Hero title="Become a Vue Dev" subtitle="Find the vue job that fits your skills and needs" />
    <HomeCards />
    <JobListings :limit="6" :show-button="true" />
</template>
