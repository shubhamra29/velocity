<template>
  <div class="max-w-4xl py-12 mx-auto px-4">
    <div class="flex flex-col items-center space-y-6">
      <div class="p-4 bg-emerald-500 text-white rounded-full">
        <FeatherIcon name="zap" class="w-12 h-12" />
      </div>
      <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Project Velocity</h1>
      <p class="text-lg text-gray-600 dark:text-gray-400">The Anekantavada Accounting Ecosystem</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12">
        <div class="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          <h3 class="font-semibold text-emerald-600 dark:text-emerald-400">Operator View</h3>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Keyboard-first, zero-latency voucher entry.</p>
          <div class="mt-4 text-xs font-mono bg-gray-50 dark:bg-gray-900 p-2 rounded">
            Today's Vouchers: {{ summary.vouchers_today || 0 }}
          </div>
        </div>
        
        <div class="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          <h3 class="font-semibold text-blue-600 dark:text-blue-400">Auditor View</h3>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Real-time validation and immutable integrity.</p>
          <div class="mt-4 text-xs font-mono bg-gray-50 dark:bg-gray-900 p-2 rounded">
            Pending Sync: {{ summary.pending_sync || 0 }}
          </div>
        </div>
        
        <div class="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
          <h3 class="font-semibold text-purple-600 dark:text-purple-400">System Truth</h3>
          <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Decoupled Frappe backend with robust APIs.</p>
          <div class="mt-4 text-xs font-mono bg-gray-50 dark:bg-gray-900 p-2 rounded">Status: RPC Connected</div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="w-full mt-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-between items-center">
            <h3 class="font-bold text-gray-900 dark:text-white">Recent Activity</h3>
            <span class="text-xs text-gray-500 uppercase tracking-widest font-mono">Live Sync</span>
        </div>
        <div class="divide-y divide-gray-100 dark:divide-gray-700">
            <div v-for="item in summary.recent_activity" :key="item.id" class="px-6 py-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700">
                <div class="flex items-center space-x-4">
                    <div class="text-sm font-bold text-gray-900 dark:text-white">{{ item.id }}</div>
                    <div class="text-xs text-gray-500 bg-gray-100 dark:bg-gray-900 px-2 py-0.5 rounded">{{ item.type }}</div>
                </div>
                <div class="flex items-center space-x-6">
                    <div class="font-mono text-sm text-gray-800 dark:text-gray-200">₹ {{ item.amount }}</div>
                    <div class="text-[10px] font-bold uppercase" :class="item.status === 'Synced' ? 'text-emerald-500' : 'text-orange-500'">{{ item.status }}</div>
                </div>
            </div>
            <div v-if="!summary.recent_activity?.length" class="px-6 py-8 text-center text-gray-500 italic">
                No recent activity found.
            </div>
        </div>
      </div>

      <div class="mt-8">
        <Button variant="solid" size="lg" @click="goToVoucher">
          Open Voucher Interface (F-Keys Ready)
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { FeatherIcon, Button, call } from 'frappe-ui'
import { useRouter } from 'vue-router'

const router = useRouter()
const summary = reactive({
    vouchers_today: 0,
    pending_sync: 0,
    recent_activity: []
})

const goToVoucher = () => {
  router.push('/voucher/journal')
}

onMounted(async () => {
    try {
        const data = await call('velocity.api.get_home_summary')
        if (data) {
            Object.assign(summary, data)
        }
    } catch (e) {
        console.error('Failed to fetch home summary', e)
    }
})
</script>
