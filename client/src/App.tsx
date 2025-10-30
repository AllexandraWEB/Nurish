import LoginSection from './components/auth/Login';
import RegisterSection from './components/auth/Register';
import './styles/App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginSection />} />
            <Route path="/register" element={<RegisterSection />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
