<template>
  <div class="max-w-4xl py-12 mx-auto">
    <div class="flex flex-col items-center space-y-6">
      <div class="p-4 bg-emerald-500 text-white rounded-full">
        <FeatherIcon name="zap" class="w-12 h-12" />
      </div>
      <h1 class="text-4xl font-bold tracking-tight text-gray-900">Project Velocity</h1>
      <p class="text-lg text-gray-600">The Anekantavada Accounting Ecosystem</p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-12">
        <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 class="font-semibold text-emerald-600">Operator View</h3>
          <p class="mt-2 text-sm text-gray-500">Keyboard-first, zero-latency voucher entry.</p>
          <div class="mt-4 text-xs font-mono bg-gray-50 p-2 rounded">Status: Ready (Optimistic UI)</div>
        </div>
        
        <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 class="font-semibold text-blue-600">Auditor View</h3>
          <p class="mt-2 text-sm text-gray-500">Real-time validation and immutable integrity.</p>
          <div class="mt-4 text-xs font-mono bg-gray-50 p-2 rounded">Status: Monitoring (Audit Layer)</div>
        </div>
        
        <div class="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 class="font-semibold text-purple-600">System Truth</h3>
          <p class="mt-2 text-sm text-gray-500">Decoupled Frappe backend with robust APIs.</p>
          <div class="mt-4 text-xs font-mono bg-gray-50 p-2 rounded">Status: Active (RPC Connected)</div>
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
import { FeatherIcon, Button } from 'frappe-ui'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToVoucher = () => {
  // Navigation to voucher route (Phase 1)
  console.log('Navigating to Voucher Interface...')
}
</script>
