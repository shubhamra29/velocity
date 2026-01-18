<template>
  <div class="h-screen flex flex-col bg-gray-50">
    <header class="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm z-10">
      <div>
        <h1 class="text-xl font-bold text-gray-900 tracking-tight">Daybook</h1>
        <p class="text-xs text-gray-500 font-mono mt-1">
            <span>{{ dayjs().format('dddd, DD MMMM YYYY') }}</span>
        </p>
      </div>
      <div>
         <Button icon-left="refresh-cw" @click="refreshData">Refresh</Button>
      </div>
    </header>

    <main class="flex-grow p-4 overflow-hidden relative">
      <div class="absolute inset-4 rounded-lg overflow-hidden shadow-sm border border-gray-200 bg-white ag-theme-quartz">
        <ag-grid-vue
          class="w-full h-full"
          :columnDefs="columnDefs"
          :rowData="rowData"
          :defaultColDef="defaultColDef"
          :gridOptions="gridOptions"
          @grid-ready="onGridReady"
        >
        </ag-grid-vue>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import { Button } from 'frappe-ui'
import dayjs from 'dayjs'

const gridApi = ref(null)
const rowData = ref([])

const columnDefs = [
  { field: "date", headerName: "Date", width: 120 },
  { field: "voucher_type", headerName: "Type", width: 150, cellRenderer: typeRenderer },
  { field: "voucher_no", headerName: "Voucher No", width: 150, cellClass: "font-mono font-bold" },
  { field: "party", headerName: "Party / Ledger", flex: 2 },
  { field: "amount", headerName: "Amount", width: 120, cellClass: "text-right font-bold", valueFormatter: currencyFormatter },
  { field: "status", headerName: "Status", width: 100, cellRenderer: statusRenderer }
]

const defaultColDef = {
  sortable: true,
  filter: true,
  resizable: true,
}

const gridOptions = {
    rowHeight: 40,
    headerHeight: 40,
}

// Mock Data Generator
function generateMockData() {
    const types = ['Payment', 'Receipt', 'Sales Invoice', 'Journal']
    const statuses = ['Draft', 'Submitted', 'Cancelled']
    const data = []
    
    for(let i=0; i<50; i++) {
        data.push({
            date: dayjs().subtract(i % 5, 'day').format('YYYY-MM-DD'),
            voucher_type: types[i % 4],
            voucher_no: `VCH-${2025000 + i}`,
            party: i % 2 === 0 ? 'HDFC Bank' : 'Cash Account',
            amount: (Math.random() * 10000).toFixed(2),
            status: statuses[i % 3]
        })
    }
    return data
}

function refreshData() {
    rowData.value = generateMockData()
}

// Renderers
function typeRenderer(params) {
    const colors = {
        'Payment': 'text-red-600 bg-red-50',
        'Receipt': 'text-emerald-600 bg-emerald-50',
        'Journal': 'text-orange-600 bg-orange-50',
        'Sales Invoice': 'text-indigo-600 bg-indigo-50'
    }
    const cls = colors[params.value] || 'text-gray-600 bg-gray-50'
    return `<span class="px-2 py-1 rounded text-xs font-semibold ${cls}">${params.value}</span>`
}

function statusRenderer(params) {
    const dot = params.value === 'Submitted' ? 'bg-emerald-500' : 'bg-gray-400'
    return `<span class="flex items-center h-full"><span class="w-1.5 h-1.5 rounded-full mr-2 ${dot}"></span>${params.value}</span>`
}

function currencyFormatter(params) {
    return '₹ ' + Number(params.value).toLocaleString('en-IN')
}

const onGridReady = (params) => {
    gridApi.value = params.api
    refreshData()
}
</script>
