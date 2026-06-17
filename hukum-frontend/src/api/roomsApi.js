import axiosClient from './axiosClient'

export const roomsApi = {
  getAll: ()     => axiosClient.get('/api/rooms/get_rooms.php'),
  getOne: (slug) => axiosClient.get(`/api/rooms/get_room.php?slug=${slug}`),
}
