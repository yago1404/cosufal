const findUserById = async function(id) {
    return {
        'name': 'Yago Taveiros Ferreira',
        'email': 'ytaveiros@gmail.com',
        'age': 22,
        'academicUnit': 'IC',
        'registerNumber': 123123123,
    };
}

const doLogin = async function(email, password) {
    if (email === 'ytaveiros@gmail.com' && password === '1234') return {
        'name': 'Yago Taveiros Ferreira',
        'email': email,
        'age': 22,
        'academicUnit': 'IC',
        'registerNumber': 123123123,
    };
}

module.exports = { doLogin, findUserById };