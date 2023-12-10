function checkResponse(response) {
    if(response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
}

export const BaseUrl = " https://auth.nomoreparties.co";

export function registerUser(email, password) {
    return fetch(`${BaseUrl}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
    })
    .then(checkResponse);
}

export function loginUser(email, password) {
    return fetch(`${BaseUrl}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
    })
    .then(checkResponse);
}

export function getToken(jwt) {
    return fetch(`${BaseUrl}/users/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
    })
    .then(checkResponse)
}
