import { useState, useEffect } from 'react';

function useFetchProducts(categoryId) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const url = categoryId 
            ? `https://ram.freelogomaker.in/public/api/products/category?categoryId=${categoryId}`
            : 'https://ram.freelogomaker.in/api/products';

        fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.products);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, [categoryId]);

    return { products, loading, error };
}

export default useFetchProducts;
