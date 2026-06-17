import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { galleryApi } from '../../api/galleryApi'

export const fetchGallery = createAsyncThunk('gallery/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await galleryApi.getAll()
    return res.data
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

const gallerySlice = createSlice({
  name: 'gallery',
  initialState: {
    items:           [],
    activeCategory:  'All',
    lightboxIndex:   null,
    status:          'idle',
    error:           null,
  },
  reducers: {
    setCategory:    (state, { payload }) => { state.activeCategory = payload },
    openLightbox:   (state, { payload }) => { state.lightboxIndex = payload },
    closeLightbox:  (state) =>              { state.lightboxIndex = null },
    nextLightbox:   (state) => {
      if (state.lightboxIndex !== null) {
        const filtered = state.items.filter(i => state.activeCategory === 'All' || i.category === state.activeCategory)
        state.lightboxIndex = (state.lightboxIndex + 1) % filtered.length
      }
    },
    prevLightbox:   (state) => {
      if (state.lightboxIndex !== null) {
        const filtered = state.items.filter(i => state.activeCategory === 'All' || i.category === state.activeCategory)
        state.lightboxIndex = (state.lightboxIndex - 1 + filtered.length) % filtered.length
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGallery.pending,   (state) => { state.status = 'loading'; state.error = null })
      .addCase(fetchGallery.fulfilled, (state, { payload }) => { state.status = 'succeeded'; state.items = payload })
      .addCase(fetchGallery.rejected,  (state, { payload }) => { state.status = 'failed';    state.error = payload })
  },
})

export const { setCategory, openLightbox, closeLightbox, nextLightbox, prevLightbox } = gallerySlice.actions
export default gallerySlice.reducer
