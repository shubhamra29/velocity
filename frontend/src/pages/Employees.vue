<template>
  <div class="h-screen flex flex-col bg-gray-50">
    <header class="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm z-10">
      <div>
        <h1 class="text-xl font-bold text-gray-900 tracking-tight">Employees</h1>
        <p class="text-xs text-gray-500 font-mono mt-1">Payroll Lite</p>
      </div>
      <Button variant="solid" icon-left="plus" @click="isDialogOpen = true">Add Employee</Button>
    </header>

    <main class="flex-grow p-4">
       <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table class="w-full text-sm text-left">
              <thead class="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase tracking-wider text-xs font-semibold">
                  <tr>
                      <th class="px-6 py-3">Employee Name</th>
                      <th class="px-6 py-3">Department</th>
                      <th class="px-6 py-3 text-right">Basic Salary</th>
                      <th class="px-6 py-3 text-center">Status</th>
                  </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                  <tr v-for="emp in employees" :key="emp.id" class="hover:bg-gray-50 cursor-pointer">
                      <td class="px-6 py-4 font-medium text-gray-900">
                          <div class="flex items-center">
                              <div class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mr-3">
                                  {{ emp.name.charAt(0) }}
                              </div>
                              {{ emp.name }}
                          </div>
                      </td>
                      <td class="px-6 py-4 text-gray-500">{{ emp.department }}</td>
                      <td class="px-6 py-4 text-right font-mono">₹ {{ emp.salary.toLocaleString() }}</td>
                      <td class="px-6 py-4 text-center">
                          <span class="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">Active</span>
                      </td>
                  </tr>
              </tbody>
          </table>
       </div>

       <Dialog v-model="isDialogOpen">
         <template #body-title>
           <h3 class="text-lg font-bold">Add New Employee</h3>
         </template>
         <template #body-content>
           <div class="space-y-4">
             <Input label="Full Name" v-model="newEmployee.name" />
             <Input label="Department" v-model="newEmployee.department" />
             <Input label="Basic Salary" type="number" v-model="newEmployee.salary" />
           </div>
         </template>
         <template #actions>
           <Button variant="solid" :loading="isSaving" @click="addEmployee">Save Employee</Button>
           <Button variant="subtle" @click="isDialogOpen = false">Cancel</Button>
         </template>
       </Dialog>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Button, Dialog, Input, call } from 'frappe-ui'

const employees = ref([
    { id: 1, name: 'Aditya Kumar', department: 'Accounts', salary: 45000 },
    { id: 2, name: 'Sneha Gupta', department: 'Sales', salary: 38000 },
    { id: 3, name: 'Rahul Sharma', department: 'Operations', salary: 32000 },
])

const isDialogOpen = ref(false)
const isSaving = ref(false)
const newEmployee = ref({ name: '', department: '', salary: 0 })

async function addEmployee() {
    if (!newEmployee.value.name) return
    
    isSaving.value = true
    try {
        const response = await call('velocity.api.save_employee', { doc: newEmployee.value })
        
        if (response && response.status === 'success') {
            employees.value.push({
                id: Date.now(),
                ...newEmployee.value
            })
            isDialogOpen.value = false
            newEmployee.value = { name: '', department: '', salary: 0 }
        }
    } catch (e) {
        console.error(e)
        alert('Failed to save employee')
    } finally {
        isSaving.value = false
    }
}
</script>
