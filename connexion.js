const urlApi = 'http://cepegra-fran.go.yj.fr/api_php/'
        const connectForm = document.querySelector('.form--submit')
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
                login: document.querySelector('.login').value ,
                password: document.querySelector('.password').value
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
                if(response.code == 200) { // si le code de connection est sur 200,
                    sessionStorage.setItem('token', response.token) // on va chercher le token dans la réponse et on le met dans le session storage
                }
            })
            .catch(error => console.log(error))
        })