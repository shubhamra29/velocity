import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { frappeRequest } from 'frappe-ui'

export const useVoucherStore = defineStore('voucher', () => {
    // Standpoints (Multiple Truths)
    const clientState = reactive({
        items: [],
        header: {},
        isValid: false,
        validationError: null,
    })

    const serverState = ref(null)
    const auditLog = ref([])
    const masters = reactive({
        accounts: [],
        items: [],
        taxTemplates: []
    })

    function updateFromUI(data) {
        if (data.header) Object.assign(clientState.header, data.header)
        if (data.items) clientState.items = [...data.items]
        validate()
        addToAuditLog('User updated voucher in UI')
    }

    async function fetchMasters() {
        try {
            const data = await frappeRequest({
                method: 'velocity.api.get_master_data'
            })
            if (data) {
                masters.accounts = data.accounts || []
                masters.items = data.items || []
                masters.taxTemplates = data.tax_templates || []
                addToAuditLog('Fetched master data using frappeRequest')
            }
        } catch (error) {
            console.error('Failed to fetch masters', error)
            addToAuditLog('Failed to fetch masters')
        }
    }

    async function syncWithServer() {
        // The System's Truth: Reconciliation
        validate()
        if (!clientState.isValid) {
            throw new Error(clientState.validationError || 'Validation failed')
        }

        try {
            // Mock API call
            // const response = await call('velocity.api.save_voucher', clientState)

            // Simulate network delay
            await new Promise(r => setTimeout(r, 500))

            serverState.value = { status: 'success', name: 'MJO-2023-001' }
            addToAuditLog('Successfully synced with server')
            return serverState.value
        } catch (error) {
            addToAuditLog(`Sync failed: ${error.message}`)
            throw error
        }
    }

    function validate() {
        // The Auditor's Truth: Ensuring integrity
        const totalDebit = clientState.items.reduce((sum, item) => sum + (Number(item.debit) || 0), 0)
        const totalCredit = clientState.items.reduce((sum, item) => sum + (Number(item.credit) || 0), 0)

        // Tolerance for floating point errors
        const diff = Math.abs(totalDebit - totalCredit)
        const isBalanced = diff < 0.05
        const hasRows = clientState.items.length > 0 && clientState.items.some(i => i.account)

        if (!hasRows) {
            clientState.isValid = false
            clientState.validationError = 'Voucher is empty'
        } else if (!isBalanced) {
            clientState.isValid = false
            clientState.validationError = `Debit (${totalDebit}) does not equal Credit (${totalCredit})`
        } else if (totalDebit === 0) {
            clientState.isValid = false
            clientState.validationError = 'Amount cannot be zero'
        } else {
            clientState.isValid = true
            clientState.validationError = null
        }

        return { totalDebit, totalCredit, isValid: clientState.isValid }
    }

    function addToAuditLog(message) {
        auditLog.value.push({
            timestamp: new Date().toISOString(),
            message,
            // Simple hash simulation of state
            clientHash: btoa(JSON.stringify(clientState.items)).substring(0, 10),
        })
    }

    return {
        clientState,
        serverState,
        auditLog,
        masters,
        updateFromUI,
        fetchMasters,
        syncWithServer,
        validate
    }
})
