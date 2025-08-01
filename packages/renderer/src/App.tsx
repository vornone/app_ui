import './App.css'
import { Flex } from 'antd'
import LoginPage from './pages/auth/login-page'
function App() {

  return (
    <>

      <Flex
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100dvh',
          width: '100%',
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
        }}
      >
        <LoginPage />
      </Flex>
    </>
  )
}

export default App
