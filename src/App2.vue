<script>
export default { // Agar component ini bisa diakses
  // Dibawah ini adalah cara lama  Vue.js dengan options API
  data() {
    return {
      name: "John Doe",
      status: "active",
      tasks: ['Belajar Vue.js', 'Mengerjakan PR', 'Berolahraga'],
      link: "https://www.google.com"
    }
  },
  methods: {
    toggleStatus() {
      if (this.status === "active") this.status = "pending";
      else if (this.status === "pending") this.status = "inactive";
      else this.status = "active"
    }
  },
}
</script>

<template>
  <h1>
    {{ name }}
  </h1>
  <p v-if="status === 'active'">User is active</p>
  <p v-else-if="status === 'pending'">User is pending</p>
  <p v-else>User is inactive</p>
  <ul>
    <!--
      :key akan memberikan identifier yang unique pada setiap index, 
      jadi jika suatu saat ada perubahan maka akan langsung terdeteksi.
      Tanpa key; vue akan mengecek semua index apakah ada perubahan atau tidak,
      yang menyebabkan performa aplikasi menjadi lemot
    -->
    <li v-for="task in tasks" :key="task">{{ task }}</li>
  </ul>
  <!-- <a v-bind:href="link">Go to Google</a> -->
   <!-- Or you can do it like this -->
    <a :href="link">Go to Google</a>
    <!-- <button v-on:click="toggleStatus">Change Status</button> -->
     <!-- Or you can do it like this -->
    <button @click="toggleStatus">Change Status</button>
</template>

