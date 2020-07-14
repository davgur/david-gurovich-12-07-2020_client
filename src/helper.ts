export const validateToken = (m: any, go: any) => {
    const msg = m?.message;
    if (!msg)
        return m;

    if (
        msg === 'No token provided!'
        || msg === 'Unauthorized!'
    ) {
        window.localStorage.removeItem('token');
        go('/');
    } else
        return m;
}