import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Navigate } from 'react-router-dom'
import Loading from '../components/Loading'

const ProtectedRoute = ({children}) => {
    const { user, userLoading } = useContext(AppContext)
    if(userLoading) {
        return <Loading />
    }
    if(user) {
        return children
    }
    return <Navigate to='/landing' />
}

export default ProtectedRoute