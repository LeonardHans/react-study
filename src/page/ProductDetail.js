import React from 'react'
import { useSearchParams } from 'react-router-dom'

const ProductDetail = () => {
    const [query, setQuery] = useSearchParams()
    return (
        <div>{ query.get('test') }</div>
    )
}

export default ProductDetail