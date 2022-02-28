let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Articuno',
            height: 1.7,
            weight: 55.4,
            type: ['ice ', 'flying']
        },
        {
            name: 'Zaptos',
            height: 1.6,
            weight: 52.6,
            type: ['electric ', 'flying']
        },
        {
            name: 'Moltres',
            height: 2,
            weight: 60,
            type: ['fire ', 'flying']
        },
        {
            name: 'Lugia',
            height: 5.2,
            weight: 216,
            type: ['pyschic ', 'flying']
        },
        {
            name: 'Ho-oh',
            height: 3.8,
            weight: 199,
            type: ['fire ', 'flying']
        }
    ];
    
    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'name' in pokemon &&
            'height' in pokemon &&
            'types' in pokemon
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
        button.addEventListener('click', function(event){
            showDetails(pokemon);
        })
    }

    function showDetails (pokemon){
        console.log(pokemon)
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    }
})();
// for (let i = 0; i < pokemonList.length; i++) {
//     if (pokemonList[i].height > 5) {
//         document.write(pokemonList[i].name + '(height : ' + pokemonList[i].height + ')' + 'Wow that\'s big!!!')
//     } else {
//         document.write(pokemonList[i].name + '( height : ' + pokemonList[i].height + ')')
//     }
// }
console.log(pokemonRepository.getAll());
pokemonRepository.add({ name: 'Pikachu', height: 0.3, types: ['electric'] });

console.log(pokemonRepository.getAll ());

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});