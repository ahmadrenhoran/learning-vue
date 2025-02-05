<script setup>
import { onMounted, reactive, ref } from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";

// VeeValidate & Yup
import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const router = useRouter();
const route = useRoute();
const jobId = route.params.id;
const toast = useToast();

const isLoading = ref(false);

const schema = yup.object({
  type: yup.string().required("Job Type is required"),
  title: yup.string().required("Job Listing Name is required").min(3, "Minimum 3 characters"),
  description: yup.string().required("Description is required").min(10, "Minimum 10 characters"),
  salary: yup.string().required("Salary is required"),
  location: yup.string().required("Location is required"),
  companyName: yup.string().required("Company Name is required"),
  companyDescription: yup.string().required("Company Description is required").min(20, "Minimum 20 characters"),
  contactEmail: yup
    .string()
    .email("Invalid email format")
    .required("Contact Email is required"),
  contactPhone: yup.string().optional(),
});


// Gunakan VeeValidate
const { handleSubmit } = useForm({
  validationSchema: schema,
});

const type = useField("type");
const title = useField("title");
const description = useField("description");
const salary = useField("salary");
const location = useField("location");
const companyName = useField("companyName");
const companyDescription = useField("companyDescription");
const contactEmail = useField("contactEmail");
const contactPhone = useField("contactPhone");

// Submit Form
const submit = handleSubmit(async (values) => {
  try {
    isLoading.value = true;
    const response = await axios.put(`http://localhost:5100/jobs/${jobId}`, {
      type: values.type,
      title: values.title,
      description: values.description,
      salary: values.salary,
      location: values.location,
      company: {
        name: values.companyName,
        description: values.companyDescription,
        contactEmail: values.contactEmail,
        contactPhone: values.contactPhone,
      },
    });

    toast.success("Job updated successfully");
    router.push(`/jobs/${response.data.id}`);
  } catch (error) {
    console.log(error);
    toast.error("Failed to update job");
  } finally {
    isLoading.value = false;
  }
});

// Fetch Data dari API
onMounted(async () => {
  try {
    isLoading.value = true;
    const response = await axios.get(`http://localhost:5100/jobs/${jobId}`);
    const job = response.data;

    type.value.value = job.type;
    title.value.value = job.title;
    description.value.value = job.description;
    salary.value.value = job.salary;
    location.value.value = job.location;
    companyName.value.value = job.company.name;
    companyDescription.value.value = job.company.description;
    contactEmail.value.value = job.company.contactEmail;
    contactPhone.value.value = job.company.contactPhone;
  } catch (error) {
    console.log(error);
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
        <form @submit="submit">
          <h2 class="text-3xl text-center font-semibold mb-6">Edit Job</h2>

          <!-- Job Type -->
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Job Type</label>
            <select v-model="type.value.value" class="border rounded w-full py-2 px-3">
              <option value="">Select Option</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
            </select>
            <p class="text-red-500 text-sm">{{ type.errorMessage.value }}</p>
          </div>

          <!-- Job Listing Name -->
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Job Listing Name</label>
            <input v-model="title.value.value" class="border rounded w-full py-2 px-3" placeholder="e.g., Vue Developer" />
            <p class="text-red-500 text-sm">{{ title.errorMessage.value }}</p>
          </div>

          <!-- Description -->
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Description</label>
            <textarea v-model="description.value.value" class="border rounded w-full py-2 px-3" rows="4"></textarea>
            <p class="text-red-500 text-sm">{{ description.errorMessage.value }}</p>
          </div>

          <!-- Salary -->
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Salary</label>
            <select v-model="salary.value.value" class="border rounded w-full py-2 px-3">
              <option value="">Select Salary</option>
              <option value="Under $50K">Under $50K</option>
              <option value="$50K - $60K">$50K - $60K</option>
              <option value="$60K - $70K">$60K - $70K</option>
            </select>
            <p class="text-red-500 text-sm">{{ salary.errorMessage.value }}</p>
          </div>

          <!-- Location -->
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Location</label>
            <input v-model="location.value.value" class="border rounded w-full py-2 px-3" />
            <p class="text-red-500 text-sm">{{ location.errorMessage.value }}</p>
          </div>

          <h3 class="text-2xl mb-5">Company Info</h3>

          <!-- Company Name -->
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Company Name</label>
            <input v-model="companyName.value.value" class="border rounded w-full py-2 px-3" />
            <p class="text-red-500 text-sm">{{ companyName.errorMessage.value }}</p>
          </div>

          <!-- Contact Email -->
          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Contact Email</label>
            <input v-model="contactEmail.value.value" type="email" class="border rounded w-full py-2 px-3" />
            <p class="text-red-500 text-sm">{{ contactEmail.errorMessage.value }}</p>
          </div>

          <div>
            <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full">
              Edit Job
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
