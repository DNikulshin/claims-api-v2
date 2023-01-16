import React from 'react'

export const Loader = () => {
    return (
        <div className="d-flex justify-content-center  align-items-center my-5 gap-3">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p>Загрузка данных...</p>
        </div>
    )
}
