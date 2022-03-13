// let pokemonRepository = (function () {
//     let pokemonList = [
//         {
//             name: 'Articuno',
//             height: 1.7,
//             weight: 55.4,
//             type: ['ice ', 'flying']
//         },
//         {
//             name: 'Zaptos',
//             height: 1.6,
//             weight: 52.6,
//             type: ['electric ', 'flying']
//         },
//         {
//             name: 'Moltres',
//             height: 2,
//             weight: 60,
//             type: ['fire ', 'flying']
//         },
//         {
//             name: 'Lugia',
//             height: 5.2,
//             weight: 216,
//             type: ['pyschic ', 'flying']
//         },
//         {
//             name: 'Ho-oh',
//             height: 3.8,
//             weight: 199,
//             type: ['fire ', 'flying']
//         } 
//     ];
    
//     function add(pokemon) {
//         if (
//             typeof pokemon === 'object' &&
//             'name' in pokemon &&
//             'height' in pokemon &&
//             'types' in pokemon
//         ) {
//             pokemonList.push(pokemon);
//         } else {
//             console.log('pokemon is not correct');
//         }
//     }
//     function getAll() {
//         return pokemonList;
//     }
   
//     function addListItem (pokemon){
//         let pokeList = document.querySelector('.pokemon-list');
//         let listpokemon = document.createElement('li');
//         let button = document.createElement('button');
//         button.innerText = pokemon.name;
//         button.classList.add('button-class');
//         listpokemon.appendChild(button);
//         pokeList.appendChild(listpokemon);
//         button.addEventListener('click', invokeShowDetails)
//     }
//     function invokeShowDetails (event){
//         showDetails(pokemon);
//     }

//     function showDetails (pokemon){
//         console.log(pokemon)
//     }

//     return {
//         add: add,
//         getAll: getAll,
//         addListItem: addListItem
//     }
// })();
// // for (let i = 0; i < pokemonList.length; i++) {
// //     if (pokemonList[i].height > 5) {
// //         document.write(pokemonList[i].name + '(height : ' + pokemonList[i].height + ')' + 'Wow that\'s big!!!')
// //     } else {
// //         document.write(pokemonList[i].name + '( height : ' + pokemonList[i].height + ')')
// //     }
// // }
// console.log(pokemonRepository.getAll());
// pokemonRepository.add({ name: 'Pikachu', height: 0.3, types: ['electric'] });

// console.log(pokemonRepository.getAll ());

// pokemonRepository.getAll().forEach(function (pokemon) {
//     pokemonRepository.addListItem(pokemon);
// });

let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
    
    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log('pokemon is not correct');
        }
    }

    function getAll() {
        return pokemonList;
    }
   
    function addListItem (pokemon){
        let pokeList = document.querySelector('.pokemon-list');
        let listpokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        listpokemon.appendChild(button);
        pokeList.appendChild(listpokemon);
        button.addEventListener('click', () => {
            showDetails(pokemon);
        });
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                item.imageUrl = details.sprites.front_shiny;
                item.height = details.height;
                item.types = details.types;
            })
            .catch(function (e) {
                console.error;
            });
    }

    function invokeShowDetails (event){
        showDetails(pokemon);
    }

    function showDetails (pokemon){
        console.log(pokemon)
    }


    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();
// for (let i = 0; i < pokemonList.length; i++) {
//     if (pokemonList[i].height > 5) {
//         document.write(pokemonList[i].name + '(height : ' + pokemonList[i].height + ')' + 'Wow that\'s big!!!')
//     } else {
//         document.write(pokemonList[i].name + '( height : ' + pokemonList[i].height + ')')
//     }
// }
// console.log(pokemonRepository.getAll());
// pokemonRepository.add({ name: 'Pikachu', height: 0.3, types: ['electric'] });

console.log(pokemonRepository.getAll ());

pokemonRepository.loadList().then (function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});