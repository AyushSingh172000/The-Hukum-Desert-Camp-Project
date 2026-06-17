import axiosClient from './axiosClient'

export const galleryApi = {
  getAll:      ()         => axiosClient.get('/api/gallery/get_gallery.php'),
  getCategory: (category) => axiosClient.get(`/api/gallery/get_gallery.php?category=${category}`),
}
