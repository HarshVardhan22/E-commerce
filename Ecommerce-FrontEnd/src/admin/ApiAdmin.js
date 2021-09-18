import { API } from "../Config";

export const createCategory = (userId, token, category) => {
  //using fetch to send data to backend

  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return console.log(err);
    });
};

export const createProduct = (userId, token, product) => {
  //using fetch to send data to backend

  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return console.log(err);
    });
};

//function to retrive all the categoreis from the BE

export const getCategories = () => {
  return fetch((`${API}/categories`),{
    method :"GET"
  })
  .then(response=>response.json())
  .catch(err=>console.log(err))
}