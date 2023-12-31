function checkResponse(response) {
    if(response.ok) {
        return response.json();
    }
    return Promise.reject(`Ошибка: ${response.status}`);
}

export const BaseUrl = " https://api.mesto-raynalle.nomoredomainsmonster.ru";

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
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
    })
    .then(checkResponse)
}