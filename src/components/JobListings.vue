<script setup>
    import jobData from '@/jobs.json';
    import JobCard from './JobCard.vue';
    import axios from 'axios';
    import Loader from 'vue-spinner/src/PulseLoader.vue';
    import {
        ref,
        defineProps,
        reactive,
        onMounted,
        computed
    } from 'vue';
    import {
        useJobFilterStore
    } from '@/stores/JobFilterStore';

    defineProps({
        limit: Number,
        showButton: Boolean,
    });

    const state = reactive({
        jobs: [],
        isLoading: false,
    });

    const filters = useJobFilterStore();

    const filteredJobs = computed(() => {
        return state.jobs.filter(job => {
            return (
                (filters.title ? job.title.toLowerCase().includes(filters.title.toLowerCase()) :
                    true) &&
                (filters.salary ? job.salary === filters.salary : true) &&
                (filters.type ? job.type === filters.type : true)
            );
        });
    });

    onMounted(async () => {
        try {
            state.isLoading = true;
            const response = await axios.get('http://localhost:5100/jobs');
            state.jobs = response.data;
        } catch (error) {
            console.error(error);
        } finally {
            state.isLoading = false;
        }
    });
</script>

<template>
    <section class="bg-green-50 px-4 py-10">
        <div class="container-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Browse Jobs
            </h2>

            <!-- Filter Section -->
            <div class="mb-6">
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <!-- Search by Title -->
                    <div class="col-span-2 sm:col-span-3">
                        <input type="text" v-model="filters.title" placeholder="Search by Title"
                            class="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                    </div>

                    <!-- Salary Dropdown -->
                    <div>
                        <select v-model="filters.salary"
                            class="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                            <option value="">Select Salary</option>
                            <option value="Under $50K">Under $50K</option>
                            <option value="$50K - $60K">$50K - $60K</option>
                            <option value="$60K - $70K">$60K - $70K</option>
                            <option value="$70K - $80K">$70K - $80K</option>
                            <option value="Over $200K">Over $200K</option>
                        </select>
                    </div>

                    <!-- Job Type Dropdown -->
                    <div>
                        <select v-model="filters.type"
                            class="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                            <option value="">Select Option</option>
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Remote">Remote</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>
                    <div>
                        <button class="text-red-500 hover:text-red-700 mt-2" @click="filters.clearFilters">
                            Clear Filter
                        </button>
                    </div>
                </div>
            </div>

            <!-- Loader while loading jobs -->
            <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
                <Loader />
            </div>

            <!-- Display Jobs -->
            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <JobCard v-for="job in filteredJobs.slice(0, limit || filteredJobs.length)" :key="job.id"
                    :job="job" />
            </div>
        </div>
    </section>

    <!-- Show Loading Button -->
    <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
        <RouterLink to="/jobs" class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">
            View All Jobs
        </RouterLink>
    </section>
</template>
