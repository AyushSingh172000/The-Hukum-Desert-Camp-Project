import axiosClient from './axiosClient'

export const bookingApi = {
  checkAvailability: (params) => axiosClient.get('/api/booking/check_availability.php', { params }),
  createBooking:     (data)   => axiosClient.post('/api/booking/create_booking.php', data),
}
