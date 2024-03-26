import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import Board from './pages/Board'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import User from './pages/User'
import { publicRoutes } from './routes'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<AuthLayout />}>
          <Route path='/' element={<LogIn />} />
          <Route path={publicRoutes.login} element={<LogIn />} />
          <Route path={publicRoutes.signup} element={<SignUp />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path='/u/:userId/boards' element={<User />} />
          <Route path='/b/:boardId/:slug' element={<Board />} />
        </Route>
      </>
    )
  )

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
