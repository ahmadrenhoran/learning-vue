<script setup>
  // Ini cara terbaru di Vue.js 3 dengan compositions API, menggunakan setup
    import {
      onMounted,
        ref
    } from 'vue'; // to make it reactive
    // Agar component ini bisa diakses

    const name = ref("John Doe"); // ref agar bisa reactive
    const status = ref("active");
    const tasks = ref(['Task One', 'Task Two', 'Task Three']);
    const link = ref("https://www.google.com");
    const newTask = ref("");

    const toggleStatus = () => {
        if (status.value === "active") status.value = "pending";
        else if (status.value === "pending") status.value = "inactive";
        else status.value = "active"
    }

    const addTask = () => {
      if (newTask.value.trim !== "") {
        tasks.value.push(newTask.value);
        newTask.value = "";
      }
    }
    
    const deleteTask = (index) => {
      tasks.value.splice(index, 1);
    }

    onMounted( async () => { // OnMounted adalah bagian dari livecycle.
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos");
        const data = await response.json();
        tasks.value = data.map((task) => task.title);
      } catch (error) {
        console.log('Error fetching tasks.');
      }
    })
</script>

<template>
    <h1>
        {{ name }}
    </h1>
    <p v-if="status === 'active'">User is active</p>
    <p v-else-if="status === 'pending'">User is pending</p>
    <p v-else>User is inactive</p>
    <!-- Prevent biar tidak terefresh halamannya -->
    <form @submit.prevent="addTask"> 
      <label for="newTask">Add Task</label>
      <!--
      v-model seperti v-bind tetapi mengikat dua arah, cocok untuk yang bersifat inputan
      -->
      <input type="text" id="newTask" v-model="newTask" name="newTask"> 
      <button type="submit">Submit</button>
    </form>
    <ul>
        <li v-for="(task, index) in tasks" :key="task">
          <span>
            {{ task }}
          </span>
          <button @click="deleteTask(index)">x</button>
        </li>
    </ul>
    <a :href="link">Go to Google</a>
    <button @click="toggleStatus">Change Status</button>
</template>
