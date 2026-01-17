<template>
  <div class="h-full w-full ag-theme-alpine font-mono text-sm">
    <ag-grid-vue
      class="w-full h-full"
      :columnDefs="columnDefs"
      :rowData="rowData"
      :defaultColDef="defaultColDef"
      :gridOptions="gridOptions"
      @grid-ready="onGridReady"
      @cell-value-changed="onCellValueChanged"
    >
    </ag-grid-vue>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import { evaluate } from 'mathjs'
import { useVoucherStore } from '@/stores/voucher'

const props = defineProps({
  voucherType: {
    type: String,
    required: true,
  }
})

const emit = defineEmits(['update:modelValue'])
const gridApi = ref(null)
const voucherStore = useVoucherStore()

// --- Anekantavada: Contextual Columns ---
const columnDefs = computed(() => {
  const accountOptions = voucherStore.masters.accounts.map(a => a.name)

  const common = [
    { headerName: "#", valueGetter: "node.rowIndex + 1", width: 50, suppressMenu: true },
    { 
        field: "account", 
        headerName: "Account / Ledger", 
        editable: true, 
        flex: 2,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
            values: accountOptions
        }
    },
  ]

  const moneyCols = [
     { 
       field: "debit", 
       editable: true, 
       valueParser: numberParser, 
       cellClass: 'text-right font-bold text-gray-700',
       flex: 1
     },
     { 
       field: "credit", 
       editable: true, 
       valueParser: numberParser,
       cellClass: 'text-right font-bold text-gray-700',
       flex: 1
     }
  ]

  const narration = [{ field: "narration", editable: true, flex: 2 }]

  if (['sales', 'purchase'].includes(props.voucherType)) {
      return [
          { headerName: "#", valueGetter: "node.rowIndex + 1", width: 50 },
          { 
              field: "item", 
              headerName: "Item / Service", 
              editable: true, 
              flex: 2,
              cellEditor: 'agSelectCellEditor',
              cellEditorParams: {
                  values: voucherStore.masters.items.map(i => i.name)
              }
          },
          { field: "qty", editable: true, width: 80, valueParser: numberParser },
          { field: "rate", editable: true, width: 100, valueParser: numberParser },
          { 
              headerName: "Amount", 
              valueGetter: "data.qty * data.rate",
              flex: 1,
              cellClass: 'text-right font-bold'
          },
          ...narration
      ]
  }

  return [...common, ...moneyCols, ...narration]
})

const defaultColDef = {
  resizable: true,
  sortable: false,
  filter: false,
}

const rowData = computed(() => voucherStore.clientState.items)

const gridOptions = {
    rowHeight: 32,
    headerHeight: 32,
    suppressCellFocus: false,
    enableRangeSelection: true,
    singleClickEdit: false,
    stopEditingWhenCellsLoseFocus: true,
    enterMovesDown: true,
}

function numberParser(params) {
    const newVal = params.newValue
    if (!newVal) return 0
    if (typeof newVal === 'number') return newVal

    if (newVal.toString().match(/[+\-*/]/)) {
        try {
            const cleanExp = newVal.toString().replace('=', '')
            const result = evaluate(cleanExp)
            return result
        } catch (e) {
            return 0
        }
    }
    return Number(newVal)
}

function onCellValueChanged(event) {
    voucherStore.updateFromUI({ items: voucherStore.clientState.items })
}

const onGridReady = (params) => {
    gridApi.value = params.api;
    params.api.sizeColumnsToFit()
}

// Initialize empty rows if none
onMounted(() => {
    if (voucherStore.clientState.items.length === 0) {
        const initialRows = []
        for(let i=0; i<10; i++) {
            initialRows.push({ account: '', debit: 0, credit: 0, narration: '' })
        }
        voucherStore.clientState.items = initialRows
    }
})
</script>

<style>
/* Custom Aesthetic: The "Velocity" Look */
.ag-theme-alpine {
    --ag-foreground-color: #1f2937;
    --ag-background-color: #ffffff;
    --ag-header-foreground-color: #6b7280;
    --ag-header-background-color: #f9fafb;
    --ag-row-hover-color: #f3f4f6;
    --ag-selected-row-background-color: #eff6ff;
    --ag-row-border-color: #e5e7eb;
    --ag-cell-horizontal-border: solid 1px #e5e7eb;
    --ag-borders: none;
    font-family: 'Inter', monospace; /* Tabular nums */
}

/* Hide Focus Ring for cleaner UI */
.ag-theme-alpine .ag-cell-focus {
    border: 2px solid #10b981 !important; /* Emerald-500 */
}
</style>
