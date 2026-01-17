<template>
  <div class="h-screen flex flex-col bg-gray-50">
    <!-- Header: The "Context" Indicator -->
    <header class="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shadow-sm z-10">
        <div class="flex items-center space-x-4">
            <div class="p-2 rounded-lg" :class="voucherConfig.colorBg">
                <FeatherIcon :name="voucherConfig.icon" class="w-6 h-6" :class="voucherConfig.colorText" />
            </div>
            <div>
                <h1 class="text-xl font-bold text-gray-900 tracking-tight">{{ voucherConfig.label }}</h1>
                <p class="text-xs text-gray-500 font-mono">
                    <span class="bg-gray-100 px-1 rounded">No: {{ voucherStore.clientState.header.name || 'NEW' }}</span>
                    <span class="mx-2">•</span>
                    <span>{{ currentDate }}</span>
                </p>
            </div>
        </div>

        <div class="flex items-center space-x-3">
             <div class="text-right mr-4">
                 <div class="text-xs text-gray-500 uppercase font-semibold">Total</div>
                 <div class="text-xl font-mono font-bold text-gray-900">₹ {{ currentTotal }}</div>
                 <div class="text-xs text-right" :class="validationStatus.color">{{ validationStatus.text }}</div>
             </div>
             <Button icon="printer" @click="handlePrint">Print</Button>
             <Button variant="solid" theme="green" size="lg" icon-left="check" :loading="isSaving" @click="handleSave">
                 Save (Ctrl+S)
             </Button>
        </div>
    </header>

    <!-- Main Grid Area -->
    <main class="flex-grow p-4 overflow-hidden relative">
        <div class="absolute inset-4 rounded-lg overflow-hidden shadow-sm border border-gray-200 bg-white">
             <VoucherGrid :voucherType="currentType" />
        </div>
    </main>

    <!-- Footer Help -->
    <footer class="bg-white border-t border-gray-200 px-4 py-1 text-xs text-gray-500 flex justify-between font-mono">
        <div class="space-x-4">
            <span class="px-2 py-0.5 bg-gray-100 rounded">F4: Contra</span>
            <span class="px-2 py-0.5 bg-gray-100 rounded">F5: Payment</span>
            <span class="px-2 py-0.5 bg-gray-100 rounded">F6: Receipt</span>
            <span class="px-2 py-0.5 bg-gray-100 rounded">F7: Journal</span>
        </div>
        <div>
            Status: <span class="text-emerald-600 font-bold">Online</span>
        </div>
    </footer>
  </div>
</template>

import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { FeatherIcon, Button, Toast } from 'frappe-ui'
import VoucherGrid from '@/components/VoucherGrid.vue'
import { useKeyboard } from '@/composables/useKeyboard'
import { useVoucherStore } from '@/stores/voucher'
import { usePrintService } from '@/utils/printService'
import dayjs from 'dayjs'

// 1. Initialize Global Shortcuts
useKeyboard()

// 2. State & Route
const route = useRoute()
const voucherStore = useVoucherStore()
const isSaving = ref(false)
const toast = ref({ show: false, message: '', icon: '' })

const currentType = computed(() => {
    return route.params.type || 'journal'
})

const currentDate = dayjs().format('DD-MMM-YYYY')

// Total Computed from Store
const currentTotal = computed(() => {
    const total = voucherStore.clientState.items.reduce((sum, item) => sum + (Number(item.debit) || 0), 0)
    return total.toLocaleString('en-IN', { minimumFractionDigits: 2 })
})

// Validation Status
const validationStatus = computed(() => {
    if (!voucherStore.clientState.isValid) {
        return { text: voucherStore.clientState.validationError || 'Unbalanced', color: 'text-red-600 font-bold' }
    }
    return { text: 'Balanced', color: 'text-emerald-600 font-bold' }
})

// 3. Actions
async function handleSave() {
    isSaving.value = true
    try {
        await voucherStore.syncWithServer()
        showToast('Voucher Saved Successfully', 'check', 'success')
    } catch (e) {
        showToast(e.message, 'alert-circle', 'error')
    } finally {
        isSaving.value = false
    }
}

const { generateThermalReceipt, print } = usePrintService()

function handlePrint() {
    const receipt = generateThermalReceipt(voucherStore.clientState)
    print(receipt)
}

function showToast(message, icon, type) {
    // Basic toast implementation or use Frappe UI Toast
    alert(message) // Placeholder for actual toast
}

// 4. Configuration Mapping (Anekantavada: Contexts)
const configs = {
    payment: { label: 'Payment Voucher', icon: 'arrow-up-right', colorBg: 'bg-red-50', colorText: 'text-red-600' },
    receipt: { label: 'Receipt Voucher', icon: 'arrow-down-left', colorBg: 'bg-emerald-50', colorText: 'text-emerald-600' },
    contra: { label: 'Contra Voucher', icon: 'refresh-cw', colorBg: 'bg-blue-50', colorText: 'text-blue-600' },
    journal: { label: 'Journal Voucher', icon: 'book', colorBg: 'bg-orange-50', colorText: 'text-orange-600' },
    sales: { label: 'Sales Invoice', icon: 'shopping-cart', colorBg: 'bg-indigo-50', colorText: 'text-indigo-600' },
    purchase: { label: 'Purchase Invoice', icon: 'shopping-bag', colorBg: 'bg-purple-50', colorText: 'text-purple-600' },
}

const voucherConfig = computed(() => configs[currentType.value] || configs.journal)
