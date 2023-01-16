import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ClaimsPage } from './pages/ClaimsPage'
import { AllClaimsPage } from './pages/AllClaimsPage'
import { DetailPage } from './pages/DetailPage'
import { MapPage } from './pages/MapPage'

export const useRoutes = () => {
    return (
        <Routes>
            <Route path="/"
                   element={<ClaimsPage/>}
            >
            </Route>
            <Route path="/all"
                   element={<AllClaimsPage/>}
            >
            </Route>
            <Route path="/coordinates/:id"
                   element={<MapPage/>}
            >
            </Route>
            <Route path="/detail/:id"
                   element={<DetailPage/>}
            >
            </Route>
            <Route path="*"
                   element={<Navigate to="/" replace/>}
            >
            </Route>
        </Routes>
    )
}
