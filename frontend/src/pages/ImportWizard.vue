<template>
  <div class="h-screen flex flex-col bg-gray-50">
    <header class="bg-white border-b border-gray-200 px-6 py-4">
      <h1 class="text-xl font-bold text-gray-900">Import Wizard</h1>
      <p class="text-xs text-gray-500">Migrate Tally Masters & Vouchers</p>
    </header>

    <main class="flex-grow p-8 flex flex-col items-center justify-center">
      
      <div v-if="!parsedData" class="w-full max-w-xl p-8 bg-white border-2 border-dashed border-gray-300 rounded-lg text-center hover:bg-gray-50 transition-colors">
        <FeatherIcon name="upload-cloud" class="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h3 class="text-lg font-medium text-gray-900">Upload Tally XML</h3>
        <p class="text-sm text-gray-500 mb-6">Drag and drop 'Master.xml' or 'Daybook.xml' here</p>
        <input type="file" @change="handleFileUpload" accept=".xml" class="block w-full text-sm text-slate-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-emerald-50 file:text-emerald-700
          hover:file:bg-emerald-100
        "/>
      </div>

      <div v-else class="w-full max-w-4xl bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
         <div class="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <div>
                <h3 class="font-bold text-gray-900">Preview: {{ parsedData.type }} Import</h3>
                <p class="text-xs text-gray-500">Found {{ parsedData.count }} records</p>
            </div>
            <div class="space-x-2">
                <Button @click="parsedData = null">Cancel</Button>
                <Button variant="solid" theme="green" :loading="isImporting" @click="confirmImport">
                    Confirm & Import
                </Button>
            </div>
         </div>
         
         <div class="max-h-96 overflow-y-auto p-0">
             <table class="w-full text-sm text-left">
                 <thead class="bg-gray-100 text-gray-600 font-medium">
                     <tr>
                         <th class="px-4 py-2">Name</th>
                         <th class="px-4 py-2">Parent / Group</th>
                         <th class="px-4 py-2 text-right">Opening Balance</th>
                     </tr>
                 </thead>
                 <tbody class="divide-y divide-gray-100">
                     <tr v-for="(row, idx) in parsedData.data.slice(0, 50)" :key="idx" class="hover:bg-gray-50">
                         <td class="px-4 py-2 font-medium text-gray-900">{{ row.name }}</td>
                         <td class="px-4 py-2 text-gray-500">{{ row.parent }}</td>
                         <td class="px-4 py-2 text-right font-mono">{{ row.openingBalance || '-' }}</td>
                     </tr>
                 </tbody>
             </table>
             <div v-if="parsedData.count > 50" class="p-2 text-center text-xs text-gray-500 bg-gray-50 border-t border-gray-200">
                 And {{ parsedData.count - 50 }} more...
             </div>
         </div>
      </div>

    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { FeatherIcon, Button } from 'frappe-ui'
import { parseTallyMasters } from '@/utils/tallyParser'
import { cacheMasters } from '@/services/offline'

const parsedData = ref(null)
const isImporting = ref(false)

const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
        try {
            const xml = e.target.result
            parsedData.value = parseTallyMasters(xml)
        } catch (err) {
            alert("Failed to parse file: " + err.message)
        }
    }
    reader.readAsText(file)
}

const confirmImport = async () => {
    isImporting.value = true
    try {
        // In reality, this would POST to backend
        // For now, we simulate by caching to Offline DB
        const mappedData = {
            accounts: parsedData.value.data.map(d => ({ name: d.name, account_type: 'Ledger', balance: d.openingBalance }))
        }
        await cacheMasters(mappedData)
        
        alert("Import Successful! Data cached locally.")
        parsedData.value = null
    } catch (e) {
        alert("Import Failed: " + e.message)
    } finally {
        isImporting.value = false
    }
}
</script>
