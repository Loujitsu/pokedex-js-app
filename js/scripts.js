let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    function getAll() {
        return pokemonList;
    }
    
    function add(pokemon) {
        if (
            typeof pokemon === 'object' &&
            'deatilsUrl' in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            return document.write('pokemon is not correct');
        }
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
                console.error (e);
            });
    }


    function addListItem (pokemon){
        let pokeList = document.querySelector('.list-group');
        let listpokemon = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');
        pokeList.classList.add('group-list-item')
        button.classList.add('button');
        listpokemon.appendChild(button);
        pokeList.appendChild(listpokemon);
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });
    }

    

    function invokeShowDetails (event){
        showDetails(pokemon);
    }

    function showDetails (pokemon){
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    function showModal(pokemon) {
        let modalTitle = $('.modal-title');
        let modalBody = $('.modal-body');

        modalTitle.empty();
        modalBody.empty();


        let pokemonName = $('<h2 class="text-capitalize">' + pokemon.name + '</h2>');

        let pokemonHeight = $('<p>' + 'Height: ' + pokemon.height + '</p>');

        let pokemonWeight = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');

        let pokemonType = $('<p class="text-capitalize">' + 'Type: ' + pokemon.type.join(', ') + '</p>');

        let pokemonImage = $('<img class="modal-img" style="width:50%">');
        pokemonImage.attr('src', pokemon.imageUrl);

        modalTitle.append(pokemonName);
        modalBody.append(pokemonHeight);
        modalBody.append(pokemonWeight);
        modalBody.append(pokemonType);
        modalBody.append(pokemonImage);
    }



    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();


// console.log(pokemonRepository.getAll ());

pokemonRepository.loadList().then (function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});