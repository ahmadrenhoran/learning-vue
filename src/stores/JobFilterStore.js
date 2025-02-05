import { defineStore } from "pinia";


export const useJobFilterStore = defineStore('job-filter', {
    state: () => ({
        title: "",
        salary: "",
        type: "",
    }),

    actions: {
        setTitle(title) {
            this.title = title
        },

        setSalary(salary) {
            this.salary = salary
        },

        setType(type) {
            this.type = type
        },

        clearFilters() {
            this.title = ""
            this.salary = ""
            this.type = ""
        },
    }
})