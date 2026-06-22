import { Navigate, Route, Routes } from 'react-router-dom'
import PrivateRoute from './router/PrivateRoute/PrivateRoute'
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import WorkoutDetails from './pages/WorkoutDetails/WorkoutDetails'
import WorkoutList from './pages/WorkoutList/WorkoutList'
import NotFound from './pages/NotFound/NotFound'
import WorkoutHistory from './pages/WorkoutHistory/WorkoutHistory'

function App() {
    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route path='/' element={<Navigate to='/workout-list' />} />
                <Route path='/workout-list' element={<WorkoutList />} />
                <Route path='/workout-details/:id' element={<WorkoutDetails />} />
                <Route path='/workout-history' element={<WorkoutHistory />} />
            </Route>
            <Route path='/signin' element={<SignIn />}></Route>
            <Route path='/signup' element={<SignUp />}></Route>
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default App

