import { configureStore } from '@reduxjs/toolkit'
import roomsReducer   from '../features/rooms/roomsSlice'
import bookingReducer from '../features/booking/bookingSlice'
import galleryReducer from '../features/gallery/gallerySlice'
import uiReducer      from '../features/ui/uiSlice'

export const store = configureStore({
  reducer: {
    rooms:   roomsReducer,
    booking: bookingReducer,
    gallery: galleryReducer,
    ui:      uiReducer,
  },
})
