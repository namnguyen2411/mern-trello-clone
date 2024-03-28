import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { authRoutes } from 'src/routes'
import { clearLocalStorage, setProfileToLocalStorage } from './auth'

class Http {
  readonly instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.response.use(
      (res) => {
        const { url } = res.config
        if (url === authRoutes.signup || url === authRoutes.login) {
          const clonedProfile = { ...res.data }
          setProfileToLocalStorage(clonedProfile)
        } else if (url === authRoutes.logout) {
          clearLocalStorage()
        }
        return res
      },
      (error: AxiosError) => {
        const { response } = error

        // Error from login or sign up api
        // Error status code: 422, 409
        if (response?.status === HttpStatusCode.UnprocessableEntity || response?.status === HttpStatusCode.Conflict) {
          return Promise.reject(response?.data)
        }

        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
