import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios'
import { toast } from 'react-toastify'
import { authRoutes } from 'src/routes'
import { clearLocalStorage, setProfileToLocalStorage, getAccessTokenFromLocalStorage } from './auth'

let baseURL = ''
if (import.meta.env.DEV) {
  baseURL = import.meta.env.VITE_API_DEV_BASE_URL
} else {
  baseURL = import.meta.env.VITE_API_PROD_BASE_URL
}

class Http {
  readonly instance: AxiosInstance
  private access_token: string | null
  constructor() {
    this.access_token = getAccessTokenFromLocalStorage()
    this.instance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        config.headers.authorization = this.access_token
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        const { url } = res.config
        if (url === authRoutes.signup || url === authRoutes.login) {
          const data = { ...res.data }
          this.access_token = data.access_token
          localStorage.setItem('access_token', data.access_token)
          setProfileToLocalStorage(data)
        } else if (url === authRoutes.logout) {
          this.access_token = null
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
        // Error status code: 500
        if (response?.status === HttpStatusCode.InternalServerError) {
          toast.error('Something went wrong, please try again later')
          clearLocalStorage()
        }
        if (error.message === 'Network Error') {
          toast.error('Internal server error, please try again later')
          clearLocalStorage()
          return Promise.reject(new Error('Internal server error'))
        }

        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance
export default http
