import './App.css'
import { Flex } from 'antd'
import LoginPage from './pages/auth/login-page'
import routes from './routes'
import { RouterProvider } from 'react-router-dom'
function App() {

  return (
    <>

        <RouterProvider router={routes} />

    </>
  )
}

export default App
