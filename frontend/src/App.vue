<template>
  <div class="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 antialiased dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200">
    <CommandPalette />
    <main class="flex-grow">
      <router-view />
    </main>
    
    <!-- Anekantavada Status Bar -->
    <footer class="bg-gray-900 border-t border-gray-800 text-gray-400 text-[10px] uppercase tracking-widest py-1 px-4 flex justify-between items-center font-mono">
      <div class="flex space-x-4">
        <span class="flex items-center">
          <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></span>
          Operator: Optimal Flow
        </span>
        <span class="flex items-center opacity-60">
          <span class="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
          Auditor: Verifying...
        </span>
      </div>
      <div class="flex space-x-4">
        <span class="hidden sm:inline">Cmd+K for Commands</span>
        <span>Mode: {{ isDark ? 'Dark' : 'Light' }}</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import CommandPalette from '@/components/CommandPalette.vue'
import { useTheme } from '@/composables/useTheme'

const { isDark } = useTheme()
</script>

<style>
/* Global styles */
body {
  @apply bg-gray-50 dark:bg-gray-900;
}
</style>
