import { API } from "../Config";

export const getProducts =(sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`,{
        method: "GET"
    })
    .then(resp=>resp.json())
    .catch(err=>console.log(err))
} 
//function to retrive all the categoreis from the BE

export const getCategories = () => {
    return fetch((`${API}/categories`),{
      method :"GET"
    })
    .then(response=>response.json())
    .catch(err=>console.log(err))
  }
  export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    };
    return fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};

export const read = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
