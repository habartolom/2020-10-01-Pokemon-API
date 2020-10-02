//Obtenemos la API por medio de promesas
/**
 * fetch() esto es nuevo en JS
 * permite controlar errores mas fácilmente
 * trabaja por medio de http o https y se basa en promesas
 */

//URL de la API
const API = 'https://pokeapi.co/api/v2/pokemon?limit=30&offset=0';
let html = '';

//Obtener el retorno de la API
const getData = (api) => {
    return fetch(api)
        .then((response) => response.json())
        .then((json) => {
            obtenerPokemons(json), paginacion(json);
        })
        .catch((error) => {
            console.log('Error', error);
        })
}


const obtenerPokemons = (api) => {
    html = '';
    document.getElementById('datosPersonajes').innerHTML = html;
    api.results.forEach(pokemon => {
        getInfo(pokemon.url);
    })
}

const getInfo = (api) => {
    return fetch(api)
        .then((response) => response.json())
        .then((json) => {
            llenarDatos(json);
        })
        .catch((error) => {
            console.log('Error', error);
        })
}

const llenarDatos = (pokemon) => {
    html += '<div class="col">';
    html += '<div class="card" style="width: 10rem;">';
    html += `<img src="${pokemon.sprites.other.dream_world.front_default}" class="card-img-top" alt="...">`
    html += '<div class="card-body">'
    html += `<h5 class="card-title text-center">${pokemon.name}</h5>`
    html += `<p class="card-text text-center my-1">Number : ${pokemon.order}</p>`
    html += `<p class="card-text text-center my-1">height : ${pokemon.height}</p>`
    html += `<p class="card-text text-center my-1">weight : ${pokemon.weight}</p>`
    html += '</div>'
    html += '</div>'
    html += '</div>'
    // Imprimir datos en html
    document.getElementById('datosPersonajes').innerHTML = html;
}

// Paginacion
const paginacion = (data) => {

    let html = '';
    html += `<li class="page-item ${data.previous?'':'disabled'}"><a class="page-link" onclick="getData('${data.previous}')">Previous</a></li>`;
    html += `<li class="page-item ${data.next?'':'disabled'}"><a class="page-link" onclick="getData('${data.next}')">Next</a></li>`;
    document.getElementById('paginacion').innerHTML = html;

}

//Ejecutar getData
getData(API);