import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { bookingApi } from '../../api/bookingApi'

export const checkAvailability = createAsyncThunk(
  'booking/checkAvailability',
  async (params, { rejectWithValue }) => {
    try {
      const res = await bookingApi.checkAvailability(params)
      return res.data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

export const createBooking = createAsyncThunk(
  'booking/create',
  async (data, { rejectWithValue }) => {
    try {
      const res = await bookingApi.createBooking(data)
      return res.data
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    form: {
      checkIn:  '',
      checkOut: '',
      guests:   1,
      roomSlug: '',
      name:     '',
      email:    '',
      phone:    '',
    },
    availability:      null,
    confirmationId:    null,
    availabilityStatus: 'idle',
    submitStatus:       'idle',
    error:              null,
    successMessage:     null,
  },
  reducers: {
    updateForm: (state, { payload }) => {
      state.form = { ...state.form, ...payload }
    },
    resetBooking: (state) => {
      state.availability   = null
      state.confirmationId = null
      state.submitStatus   = 'idle'
      state.error          = null
      state.successMessage = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAvailability.pending,   (state) => { state.availabilityStatus = 'loading'; state.error = null })
      .addCase(checkAvailability.fulfilled, (state, { payload }) => { state.availabilityStatus = 'succeeded'; state.availability = payload })
      .addCase(checkAvailability.rejected,  (state, { payload }) => { state.availabilityStatus = 'failed';    state.error = payload })
      .addCase(createBooking.pending,       (state) => { state.submitStatus = 'loading'; state.error = null })
      .addCase(createBooking.fulfilled,     (state, { payload }) => {
        state.submitStatus    = 'succeeded'
        state.confirmationId  = payload?.id
        state.successMessage  = 'Your booking request has been submitted! We will confirm via email.'
      })
      .addCase(createBooking.rejected,      (state, { payload }) => { state.submitStatus = 'failed'; state.error = payload })
  },
})

export const { updateForm, resetBooking } = bookingSlice.actions
export default bookingSlice.reducer
