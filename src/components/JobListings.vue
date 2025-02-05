<script setup>
    import jobData from '@/jobs.json';
    import JobCard from './JobCard.vue';
    import axios from 'axios';
    import Loader from 'vue-spinner/src/PulseLoader.vue'
    import {
        ref, defineProps, reactive, onMounted
    } from 'vue';

    defineProps({
        limit: Number,
        showButton: Boolean,
    })
    const state = reactive({
        jobs: [],
        isLoading: false,
    })

    onMounted(async() => {
        try {
            state.isLoading = true
            const response = await axios.get('http://localhost:5100/jobs');
            state.jobs = response.data;
        } catch (error) {
            console.log(error);
        } finally {
            state.isLoading = false;
        }
    })
</script>

<template>
    <section class="bg-green-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Browse Jobs
            </h2>
            <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                <Loader/>
            </div>
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <JobCard v-for="job in state.jobs.slice(0, limit || state.jobs.length)" :key="job" :job = "job"/>
            </div>
        </div>
    </section>
    <!-- Show Loading -->
    <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
      <RouterLink
        to="/jobs"
        class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >View All Jobs</RouterLink
      >
    </section>

</template>
