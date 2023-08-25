// import React from "react"
// 



// function App() {

//   return (
//     <div>
//       hello
//     </div>
//   )
// }

// export default 

import React from 'react'
import { Route, Routes} from "react-router-dom"
import Home from './routes/Home'
import RestrauntDetailsPage from './routes/RestrauntDetailsPage'
import UpdatePage from './routes/UpdatePage'
import { RestrauntsContextProvider } from './context/RestrauntContext';
const App = () => {
  return (
    <RestrauntsContextProvider>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/restraunts/:id/update' element={<UpdatePage/>}/>
        <Route path='/restraunts/:id' element={<RestrauntDetailsPage/>}/>
      </Routes>
    </RestrauntsContextProvider>
  )
}

export default App
