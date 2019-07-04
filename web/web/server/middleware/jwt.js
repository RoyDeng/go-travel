export default request => {
    if (request.headers.authorization && request.headers.authorization.split(' ')[0] === 'Bearer') {
        return request.headers.authorization.split(' ')[1];
    }
    return null;
};