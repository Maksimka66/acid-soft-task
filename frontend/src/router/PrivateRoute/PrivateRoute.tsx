import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { selectAccessToken } from '../../store/auth/authSlice'

export default function PrivateRoute() {
    const auth = useSelector(selectAccessToken)

    return auth ? <Outlet /> : <Navigate to='signin' />
}

