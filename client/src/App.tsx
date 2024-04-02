import { lazy, Suspense, useContext } from 'react'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
const Board = lazy(() => import('./pages/Board'))
const SignUp = lazy(() => import('./pages/SignUp'))
const LogIn = lazy(() => import('./pages/LogIn'))
const User = lazy(() => import('./pages/User'))
const Profile = lazy(() => import('./pages/Profile'))
import { publicRoutes } from './routes'
import AuthContext from './contexts/authContext'

function App() {
  const { isAuthenticated, profile } = useContext(AuthContext)

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<AuthLayout />}>
          <Route
            path='/'
            element={
              isAuthenticated ? (
                <Navigate to={`/u/${profile?._id}/boards`} />
              ) : (
                <Suspense>
                  <LogIn />
                </Suspense>
              )
            }
          />
          <Route
            path={publicRoutes.login}
            element={
              isAuthenticated ? (
                <Navigate to={`/u/${profile?._id}/boards`} />
              ) : (
                <Suspense>
                  <LogIn />
                </Suspense>
              )
            }
          />
          <Route
            path={publicRoutes.signup}
            element={
              isAuthenticated ? (
                <Navigate to={`/u/${profile?._id}/boards`} />
              ) : (
                <Suspense>
                  <SignUp />
                </Suspense>
              )
            }
          />
        </Route>

        <Route element={<MainLayout />}>
          <Route
            path='/u/:userId/boards'
            element={
              isAuthenticated ? (
                <Suspense>
                  <User />
                </Suspense>
              ) : (
                <Navigate to={publicRoutes.login} />
              )
            }
          />
          <Route
            path='/b/:boardId/:slug'
            element={
              isAuthenticated ? (
                <Suspense>
                  <Board />
                </Suspense>
              ) : (
                <Navigate to={publicRoutes.login} />
              )
            }
          />
        </Route>

        <Route
          path='/u/:userId/profile'
          element={
            isAuthenticated ? (
              <Suspense>
                <Profile />
              </Suspense>
            ) : (
              <Navigate to={publicRoutes.login} />
            )
          }
        />
      </>
    )
  )

  return (
    <div className='App'>
      <ToastContainer
        newestOnTop
        closeOnClick
        pauseOnHover={false}
        closeButton={false}
        hideProgressBar={true}
        style={{ marginTop: '40px' }}
        toastStyle={{ backgroundColor: '#1976d2', color: 'white' }}
      />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
