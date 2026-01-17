import { ref } from 'vue'

export function useTaxEngine() {

    // Mock Tax Template Logic
    const templates = {
        'GST 18%': { type: 'on_net_total', rate: 18, account_head: 'GST Payable - 18%' },
        'GST 12%': { type: 'on_net_total', rate: 12, account_head: 'GST Payable - 12%' },
        'VAT 5%': { type: 'on_net_total', rate: 5, account_head: 'VAT Output' }
    }

    function calculateTax(netTotal, templateName) {
        if (!templateName || !templates[templateName]) return []

        const template = templates[templateName]
        const taxAmount = (netTotal * template.rate) / 100

        return [{
            account: template.account_head,
            rate: template.rate,
            amount: taxAmount,
            description: `${templateName} on ${netTotal}`
        }]
    }

    function getTaxTemplates() {
        return Object.keys(templates)
    }

    return {
        calculateTax,
        getTaxTemplates
    }
}
