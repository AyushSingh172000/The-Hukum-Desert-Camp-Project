import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { roomsApi } from '../../api/roomsApi'

export const fetchRooms = createAsyncThunk('rooms/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await roomsApi.getAll()
    return res.data
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

export const fetchRoom = createAsyncThunk('rooms/fetchOne', async (slug, { rejectWithValue }) => {
  try {
    const res = await roomsApi.getOne(slug)
    return res.data
  } catch (err) {
    return rejectWithValue(err.message)
  }
})

const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    items:   [],
    current: null,
    status:  'idle',
    error:   null,
  },
  reducers: {
    clearCurrentRoom: (state) => { state.current = null },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending,   (state) => { state.status = 'loading'; state.error = null })
      .addCase(fetchRooms.fulfilled, (state, { payload }) => { state.status = 'succeeded'; state.items = payload })
      .addCase(fetchRooms.rejected,  (state, { payload }) => { state.status = 'failed';    state.error = payload })
      .addCase(fetchRoom.pending,    (state) => { state.status = 'loading'; state.error = null })
      .addCase(fetchRoom.fulfilled,  (state, { payload }) => { state.status = 'succeeded'; state.current = payload })
      .addCase(fetchRoom.rejected,   (state, { payload }) => { state.status = 'failed';    state.error = payload })
  },
})

export const { clearCurrentRoom } = roomsSlice.actions
export default roomsSlice.reducer
