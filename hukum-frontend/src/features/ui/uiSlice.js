import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    mobileMenuOpen: false,
    toastMessage:   null,
    toastType:      'info',
  },
  reducers: {
    toggleMobileMenu: (state) => { state.mobileMenuOpen = !state.mobileMenuOpen },
    closeMobileMenu:  (state) => { state.mobileMenuOpen = false },
    showToast: (state, { payload }) => {
      state.toastMessage = payload.message
      state.toastType    = payload.type || 'info'
    },
    clearToast: (state) => {
      state.toastMessage = null
    },
  },
})

export const { toggleMobileMenu, closeMobileMenu, showToast, clearToast } = uiSlice.actions
export default uiSlice.reducer
