const urlApi = 'http://cepegra-fran.go.yj.fr/api_php/';
const catListe = document.querySelector('.categories-list')
const prodListe = document.querySelector('.products-list')
const catTitle = document.querySelector('.titre-categorie')

//listing des catégories
fetch(urlApi + 'categories')
    .then(response => response.json())
    .then(response => {
        console.log(response)
        let template = ''
        response.data.forEach(category => {
            template += `
            <li class="cat-item" data-id="${category.id}">${category.label}</li>
            `
        });
        catListe.innerHTML = template
    })
    .catch(error => console.error(error))

//recup d'une catégorie
const fetchCategory = (id = 1)=> {
//une cat + listing des produits
    fetch(urlApi + 'categories/' + id)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        let template = ''
        if(response.produits.data) {
            response.produits.data.forEach(produit => {
                template += `
                <li data-id="${produit.id}">${produit.label}</li>
                `
            });
            
        }
        prodListe.innerHTML = template
        catTitle.innerText = `"${response.data[0].label}"`
    })
    .catch(error => console.error(error))
}
fetchCategory()

catListe.addEventListener('click', (e) => {
    if (e.target.classList.contains('cat-item')) {
        fetchCategory(e.target.dataset.id)
    }
})