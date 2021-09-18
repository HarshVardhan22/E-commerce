//this file will contain routes and logic to all authorization based requests to the DB
import { API } from "../Config";

export const signUp = (user) => {
  //using fetch to send data to backend

  return fetch(`${API}signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return console.log(err);
    });
};

export const signIn = (user) => {
  //using fetch to send data to backend

  return fetch(`${API}signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      return console.log(err);
    });
};

// *fact: the next() function is used whwere we are calling ,multiple middlewares and after
export const authenticate = (data, next) => {
  //first we check window which is a browser funtion is defined or not
  if (typeof window !== undefined) {
    //the  we set the data gathered to the function by the name or key of "jwt" after converting it into a json by using JSON.stringify() mtd
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

//the signput func has 3 agendas: to clear the local storage, make a request to the backend and redirect the user to
//the homepage
export const signOut = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
    next();
    return fetch(`${API}signin`, {
      method: "GET",
    })
      .then((res) => {
        console.log("Sign Out successful", res);
      })
      .catch((err) => {
        return console.log(err);
      });
  }
};

//the purpose of isAuthenticated funct is to check whether the user is lloggged in or not
//and on that basis either signUp + signIn or signOut option will be shown to the user

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else return false;
};
