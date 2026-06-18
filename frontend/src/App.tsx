import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './router/PrivateRoute/PrivateRoute'
import Home from './pages/Home/Home'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import WorkoutDetails from './pages/WorkoutDetails/WorkoutDetails'
import WorkoutList from './pages/WorkoutList/WorkoutList'
import WorkoutHistory from './pages/WorkoutHistory/WorkoutHistory'

function App() {
    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route path='/' element={<Home />} />
                <Route path='/workout-list' element={<WorkoutList />} />
                <Route path='/workout-details/:id' element={<WorkoutDetails />} />
                <Route path='/workout-history' element={<WorkoutHistory />} />
            </Route>
            <Route path='/signin' element={<SignIn />}></Route>
            <Route path='/signup' element={<SignUp />}></Route>
        </Routes>
    )
}

export default App

