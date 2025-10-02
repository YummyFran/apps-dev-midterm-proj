const API_BASE_URL = 'https://dummyjson.com'

const fetchData = async (endpoint = '/') => {
    try {
        const res = await fetch(`${API_BASE_URL}${endpoint}`)
        const data = await res.json()

        return [data, null]
        
    } catch (err) {
        console.log(er)
        return [null, err]
    }
}

export const getCategories = async () => {
    const [data] = await fetchData('/products/categories')
    
    return data
}

export const getRandomProducts = async (n = 4) => {
    const rnd = Math.ceil(Math.random() * 194)
    const [data] = await fetchData(`/products?limit=${n}&skip=${rnd}`)

    return data
}