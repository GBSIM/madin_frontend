export const setCookie = (key, value, expiredDays) => {
    let today = new Date();
    today.setDate(today.getDate() + expiredDays);
    document.cookie =
    key +
    '=' +
    JSON.stringify(value) +
    '; path=/; expires=' +
    today.toGMTString() +
    ';';
};

export const getCookie = (key) => {
    const cookies = document.cookie.split(`; `).map((el) => el.split('='));
    let getItem = [];

    for (let i = 0; i < cookies.length; i++) {
    if (cookies[i][0] === key) {
        getItem.push(cookies[i][1]);
        break;
        }
    }

    if (getItem.length > 0) {
    return JSON.parse(getItem[0]);
    }
};

export const deleteCookie = (key) => {
    document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
