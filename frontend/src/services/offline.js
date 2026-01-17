import { get, set, del, update } from 'idb-keyval'

const MASTERS_KEY = 'velocity_masters'
const OUTBOX_KEY = 'velocity_outbox'

// --- Cache Masters ---
export async function cacheMasters(data) {
    if (!data) return
    await set(MASTERS_KEY, {
        timestamp: Date.now(),
        accounts: data.accounts || [],
        items: data.items || []
    })
    console.log('[Offline] Masters Cached')
}

export async function getCachedMasters() {
    return await get(MASTERS_KEY)
}

// --- Transaction Outbox ---
export async function queueTransaction(voucher) {
    await update(OUTBOX_KEY, (val) => {
        const outbox = val || []
        outbox.push({
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            data: voucher,
            status: 'pending'
        })
        return outbox
    })
    console.log('[Offline] Voucher Queued in Outbox')
}

export async function syncOutbox(apiCall) {
    const outbox = await get(OUTBOX_KEY)
    if (!outbox || outbox.length === 0) return

    const newOutbox = []

    for (const tx of outbox) {
        try {
            console.log(`[Offline] Replaying tx ${tx.id}`)
            await apiCall(tx.data)
        } catch (e) {
            console.error(`[Offline] Sync failed for ${tx.id}`, e)
            newOutbox.push(tx) // Keep in outbox if failed
        }
    }

    await set(OUTBOX_KEY, newOutbox)
    return newOutbox.length === 0 // True if fully synced
}
