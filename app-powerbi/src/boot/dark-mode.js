import { Dark, LocalStorage } from 'quasar'

export default () => {
  // Check if user has a saved preference
  const savedDarkMode = LocalStorage.getItem('darkMode')

  if (savedDarkMode !== null) {
    // Use saved preference
    Dark.set(savedDarkMode)
  } else {
    // Default to system preference
    Dark.set('auto')
  }
}

