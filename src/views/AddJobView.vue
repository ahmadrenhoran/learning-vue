<script setup>
    import {
        ref
    } from "vue";
    import {
        useToast
    } from "vue-toastification";
    import PulseLoader from "vue-spinner/src/PulseLoader.vue";
    import axios from "axios";
    import router from "@/router/main";
    import {
        useForm,
        useField
    } from "vee-validate";

    // Inisialisasi toast
    const toast = useToast();
    const isLoading = ref(false);


    const {
        handleSubmit
    } = useForm({
        initialValues: {
            type: "",
            salary: "",
        }
    });

    const {
        value: type,
        errorMessage: typeError
    } = useField("type", (value) =>
        value ? true : "Job type is required"
    );
    const {
        value: title,
        errorMessage: titleError
    } = useField("title", (value) =>
        value ? true : "Title is required"
    );
    const {
        value: description
    } = useField("description");
    const {
        value: salary,
        errorMessage: salaryError
    } = useField("salary", (value) =>
        value ? true : "Salary is required"
    );
    const {
        value: location,
        errorMessage: locationError
    } = useField("location", (value) =>
        value ? true : "Location is required"
    );
    const {
        value: companyName
    } = useField("company.name");
    const {
        value: companyDescription
    } = useField("company.description");
    const {
        value: contactEmail,
        errorMessage: emailError
    } = useField("company.contactEmail", (value) =>
        /\S+@\S+\.\S+/.test(value) ? true : "Invalid email"
    );
    const {
        value: contactPhone
    } = useField("company.contactPhone");

    const submitForm = handleSubmit((values) => {
        console.log(values); // Output: { username: "...", email: "..." }
    });
    // Fungsi submit form
    const submit = handleSubmit(async () => {
        const newJob = {
            type: type.value,
            title: title.value,
            description: description.value,
            salary: salary.value,
            location: location.value,
            company: {
                name: companyName.value,
                description: companyDescription.value,
                contactEmail: contactEmail.value,
                contactPhone: contactPhone.value,
            },
        };

        try {
            isLoading.value = true;
            const response = await axios.post(`http://localhost:5100/jobs`, newJob);
            toast.success("Job added successfully");
            router.push(`/jobs/${response.data.id}`);
        } catch (error) {
            console.log(error);
            toast.error(error);
        } finally {
            isLoading.value = false;
        }
    });
</script>

<template>
    <div v-if="isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />
    </div>
    <section v-else class="bg-green-50">
        <div class="container m-auto max-w-2xl py-24">
            <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                <form @submit.prevent="submitForm">
                    <h2 class="text-3xl text-center font-semibold mb-6">Add Job</h2>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Job Type</label>
                        <select v-model="type" class="border rounded w-full py-2 px-3">
                            <option value="">Select Option</option>
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Remote">Remote</option>
                            <option value="Internship">Internship</option>
                        </select>
                        <span class="text-red-500 text-sm">{{ typeError }}</span>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Job Listing Name</label>
                        <input v-model="title" type="text" class="border rounded w-full py-2 px-3"
                            placeholder="eg. Vue Developer" />
                        <span class="text-red-500 text-sm">{{ titleError }}</span>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Description</label>
                        <textarea v-model="description" class="border rounded w-full py-2 px-3" rows="4"></textarea>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Salary</label>
                        <select v-model="salary" class="border rounded w-full py-2 px-3">
                            <option value="">Select Salary</option>
                            <option value="Under $50K">Under $50K</option>
                            <option value="$50K - $60K">$50K - $60K</option>
                            <option value="$60K - $70K">$60K - $70K</option>
                            <option value="$70K - $80K">$70K - $80K</option>
                            <option value="Over $200K">Over $200K</option>
                        </select>
                        <span class="text-red-500 text-sm">{{ salaryError }}</span>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Location</label>
                        <input v-model="location" type="text" class="border rounded w-full py-2 px-3"
                            placeholder="Company Location" />
                        <span class="text-red-500 text-sm">{{ locationError }}</span>
                    </div>

                    <h3 class="text-2xl mb-5">Company Info</h3>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Company Name</label>
                        <input v-model="companyName" type="text" class="border rounded w-full py-2 px-3"
                            placeholder="Company Name" />
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Company Description</label>
                        <textarea v-model="companyDescription" class="border rounded w-full py-2 px-3" rows="4"></textarea>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Contact Email</label>
                        <input v-model="contactEmail" type="email" class="border rounded w-full py-2 px-3"
                            placeholder="Email address for applicants" />
                        <span class="text-red-500 text-sm">{{ emailError }}</span>
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 font-bold mb-2">Contact Phone</label>
                        <input v-model="contactPhone" type="tel" class="border rounded w-full py-2 px-3"
                            placeholder="Phone for applicants" />
                    </div>

                    <div>
                        <button
                            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                            type="submit">
                            Add Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>
