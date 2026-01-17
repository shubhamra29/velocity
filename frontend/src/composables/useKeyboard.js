import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export function useKeyboard() {
    const router = useRouter()

    const shortcuts = {
        'F4': { route: '/voucher/contra', name: 'Contra Check' },
        'F5': { route: '/voucher/payment', name: 'Payment' },
        'F6': { route: '/voucher/receipt', name: 'Receipt' },
        'F7': { route: '/voucher/journal', name: 'Journal' },
        'F8': { route: '/voucher/sales', name: 'Sales' },
        'F9': { route: '/voucher/purchase', name: 'Purchase' },
    }

    const handleKeydown = (e) => {
        // 1. Check for Function Keys (Context Switching)
        if (shortcuts[e.key]) {
            e.preventDefault() // Stop browser refresh (F5), etc.
            console.log(`[Keyboard] Switch to ${shortcuts[e.key].name}`)
            router.push(shortcuts[e.key].route)
            return
        }

        // 2. Additional Global Shortcuts (Command Palette, Save, etc.)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault()
            console.log('[Keyboard] Open Command Palette')
            // TODO: Emit event or toggle state
        }
    }

    onMounted(() => {
        window.addEventListener('keydown', handleKeydown)
    })

    onUnmounted(() => {
        window.removeEventListener('keydown', handleKeydown)
    })

    return {
        shortcuts
    }
}
