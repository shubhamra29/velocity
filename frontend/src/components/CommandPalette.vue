<template>
  <TransitionRoot :show="isOpen" as="template" @after-leave="query = ''">
    <Dialog as="div" class="relative z-50" @close="close">
      <TransitionChild
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-500/25 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
        <TransitionChild
          enter="ease-out duration-300"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <Combobox as="div" class="mx-auto max-w-2xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all" @update:modelValue="onSelect">
            <div class="relative">
              <FeatherIcon name="search" class="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400" />
              <ComboboxInput class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm" placeholder="Search..." @change="query = $event.target.value" />
            </div>

            <ComboboxOptions v-if="filteredItems.length > 0" static class="max-h-80 scroll-py-2 divide-y divide-gray-100 overflow-y-auto">
              <ComboboxOption v-for="item in filteredItems" :key="item.id" :value="item" as="template" v-slot="{ active }">
                <li :class="['cursor-default select-none px-4 py-2', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
                  <div class="flex items-center">
                      <FeatherIcon :name="item.icon" class="h-5 w-5 flex-none" :class="active ? 'text-white' : 'text-gray-400'" />
                      <span class="ml-3 flex-auto truncate">{{ item.name }}</span>
                      <span v-if="item.shortcut" class="ml-3 flex-none text-xs font-semibold text-gray-500" :class="active ? 'text-indigo-100' : 'text-gray-400'">
                          {{ item.shortcut }}
                      </span>
                  </div>
                </li>
              </ComboboxOption>
            </ComboboxOptions>
          </Combobox>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Dialog,
  TransitionRoot,
  TransitionChild,
} from '@headlessui/vue'
import { FeatherIcon } from 'frappe-ui'
import { useTheme } from '@/composables/useTheme'

const router = useRouter()
const { toggleTheme } = useTheme()
const isOpen = ref(false)
const query = ref('')

const items = [
    { id: 1, name: 'Go to Daybook', icon: 'book', route: '/daybook' },
    { id: 2, name: 'New Payment Voucher', icon: 'arrow-up-right', route: '/voucher/payment', shortcut: 'F5' },
    { id: 3, name: 'New Sales Invoice', icon: 'shopping-cart', route: '/voucher/sales' },
    { id: 4, name: 'Import Tally Data', icon: 'upload-cloud', route: '/import' },
    { id: 5, name: 'Employee Master', icon: 'users', route: '/employees' },
    { id: 6, name: 'Toggle Dark Mode', icon: 'moon', action: toggleTheme },
]

const filteredItems = computed(() =>
  query.value === ''
    ? items
    : items.filter((item) => {
        return item.name.toLowerCase().includes(query.value.toLowerCase())
      })
)

function onSelect(item) {
    if (item.route) {
        router.push(item.route)
    } else if (item.action) {
        item.action()
    }
    close()
}

function open() { isOpen.value = true }
function close() { isOpen.value = false }

function onKeydown(event) {
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        isOpen.value = !isOpen.value
    }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))

defineExpose({ open, close })
</script>
