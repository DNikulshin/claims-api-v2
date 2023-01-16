import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { Loader } from '../components/Loader'
import { ClaimsList } from '../components/ClaimsList'
import { Link } from 'react-router-dom'

export const AllClaimsPage = () => {
    const [claims, setClaims] = useState([])

    const { loading, request } = useHttp()
    const fetchClaims = useCallback(async () => {
        try {
            const fetched = await request('/api/claim/all', 'GET', null)
            setClaims(fetched)
        } catch (e) {
        }
    }, [request])

    const handleClick = () => {
        const countClaim = document.querySelector('.container')
        countClaim.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        fetchClaims()
    }, [fetchClaims])

    if (loading) {
        return <Loader/>
    }

    return (
        <>
            <div className="text-center bg-secondary bg-opacity-50">
                <Link to="/all" className="btn btn-primary fs-6 my-3 mx-3 btn-hover" onClick={fetchClaims}>Обновить инфу!</Link>
                <Link to="/" className="btn btn-sm btn-outline-success my-3 btn-hover">Мои заявки</Link>
            </div>
            {claims.length > 0 &&
                <div className="bg-light p-2 text-center count-claim">Всего:&nbsp;<strong
                    className="text-success">{claims.length}</strong>
                </div>
            }

            { !loading && <ClaimsList claims={claims.sort((a, b) => a.setDate.localeCompare(b.setDate))}/> }

            { !loading && claims.length >= 3 &&
                <div className="text-center">
                    <button type="button" className="btn btn-primary my-3 btn-hover" onClick={handleClick}><i
    className="bi bi-arrow-up"/></button>
                </div>
            }
        </>
    )
}


