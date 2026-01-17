import { ref, onMounted } from 'vue'

const isDark = ref(false)

export function useTheme() {

    function toggleTheme() {
        isDark.value = !isDark.value
        updateDOM()
        localStorage.setItem('velocity_theme', isDark.value ? 'dark' : 'light')
    }

    function updateDOM() {
        if (isDark.value) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }

    onMounted(() => {
        const saved = localStorage.getItem('velocity_theme')
        if (saved) {
            isDark.value = saved === 'dark'
        } else {
            // System preference
            isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        updateDOM()
    })

    return {
        isDark,
        toggleTheme
    }
}
