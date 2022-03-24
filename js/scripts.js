let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    function getAll() {
        return pokemonList;
    }
    
    function add(pokemon) {
        // input must be an object
        if (typeof pokemon === 'object' &&
            'detailsUrl' in pokemon
        ) {
            pokemonList.push(pokemon)
        } else {
            return document.write(' (' + pokemon.name + 'pokemon is not correct) ')
        }
    }

    function pokemonSearch(searchName) {
        $('.list-group').empty();

        pokemonList.forEach((pokemon) => {
            if (pokemon.name.toLowerCase().includes(searchName.toLowerCase())) {
                addListItem(pokemon);
            }
        })
    }
   
   
    function addListItem (pokemon){
        let pokemonItem = document.querySelector('.list-group');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerHTML = pokemon.name;
        button.classList.add('group-list-item')
        button.classList.add('btn');
        listItem.appendChild(button);
        pokemonItem.appendChild(listItem);
        button.addEventListener('click', function () {
            showDetails(pokemon)
        })
    }

    function loadList() {
        showLoadingSpinner();
        return fetch(apiUrl).then(function (response) {
            hideLoadingSpinner();
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
            hideLoadingSpinner();
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
    
    function showLoadingSpinner() {
        let loadingContainer = document.querySelector('#loading-container');
        loadingContainer.innerHTML = '';
        let spinner = document.createElement('div');
        spinner.classList.add('spinner');
        loadingContainer.appendChild(spinner);
        loadingContainer.classList.add('is-visible');
    }
    function hideLoadingSpinner() {
        let loadingContainer = document.querySelector('#loading-container');
        loadingContainer.classList.remove('is-visible');
    }


    function showDetails(pokemon) {
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

        let pokemonImage = $('<img class="modal-img" style="width:50%">');
        pokemonImage.attr('src', pokemon.imageUrl);
        
        modalTitle.append(pokemonName);
        modalBody.append(pokemonHeight);
        modalBody.append(pokemonWeight);
        modalBody.append(pokemonImage);
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        pokemonSearch: pokemonSearch,
        showModal: showModal
    };
})();


pokemonRepository.loadList().then (function() {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});