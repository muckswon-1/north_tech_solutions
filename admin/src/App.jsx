import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path='/admin'
              element={
                <RequireAdmin>
                    <p>Admin dashboard</p>
                </RequireAdmin>
              } />
            <Route path='admin/users'
             element= {
              <RequireAdmin>
                <AdminUsersPage />
              </RequireAdmin>
             } />

<Route path='admin/users/create'
             element= {
              <RequireAdmin>
                <AddUserForm />
              </RequireAdmin>
             } />

             <Route path='admin/users/:id'
             element= {
              <RequireAdmin>
                <UserDetailsPage />
              </RequireAdmin>
             } />
      </Routes>
    </Router>
  )
    
     
  
}

export default App
