// const urlApi = 'http://cepegra-fran.go.yj.fr/api_php/' //url online
const urlApi = 'http://localhost/api_php_pierre/' // url locale
const connectForm = document.querySelector('.form--form')
const deconnectLink = document.querySelector('.form--disconnect')
const loginField = document.querySelector('.form--input__login')
const pwField = document.querySelector('.form--input__password')

deconnectLink.addEventListener('click', (e) => {
    e.preventDefault()
    fetch(urlApi + 'deconnect')
    .then(response => response.json())
    .then(response => {
        console.log(response)
    })
    .catch(error => console.error(error))
})


connectForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let ident = {
        login: document.querySelector('.form--input__login').value ,
        password: document.querySelector('.form--input__password').value
    }
    loginField.value = ""
    pwField.value = ""
    fetch(urlApi + 'auth', {
        headers: {
            "content-type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify(
            ident
        )
    })
    .then(response => response.json())
    .then(
        response => {console.log(response)
        /*if(response.code == 200) { // si le code de connection est sur 200,
            sessionStorage.setItem('token', response.token) // on va chercher le token dans la réponse et on le met dans le session storage
        }*/
        switch(response.code) {
            case 403:
                connectForm.innerHTML = '<span class="connect--failure">Connection failure</span>'
                setTimeout(resetForm => {window.location.href = 'connexion.html'}, 2500)
                break
            case 200:
                connectForm.innerHTML = '<span class="connect--success">Connection successeful</span>'
                sessionStorage.setItem('token', response.token)
        }
    })
    .catch(error => console.log(error))
})