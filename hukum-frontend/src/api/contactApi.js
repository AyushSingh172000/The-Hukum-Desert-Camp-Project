import axiosClient from './axiosClient'

export const contactApi = {
  submit:    (data) => axiosClient.post('/api/contact/submit_contact.php', data),
  subscribe: (data) => axiosClient.post('/api/contact/subscribe.php', data),
}
