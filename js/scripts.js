let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    function getAll() {
        return pokemonList;
    }

    function add(pokemon) {
        // input must be an object
        if (typeof pokemon === "object" &&
            "detailsUrl" in pokemon
        ) {
            pokemonList.push(pokemon)
        } else {
            return document.write(" (" + pokemon.name + " Needs more information!) ")
        }
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
        showLoadingSpinner();
        return fetch(url).then(function (response) {
            hideLoadingSpinner();
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_shiny;
            item.height = details.height;
            item.weight = details.weight;
        }).catch(function (e) {
            hideLoadingSpinner();
            console.error(e);
        });
    }

    function showLoadingSpinner() {
        let loadingContainer = document.querySelector('#loading-container');

        // Clear preexisting content
        loadingContainer.innerHTML = '';

        // Add spinner element
        let spinner = document.createElement('div');
        spinner.classList.add('spinner');
        loadingContainer.appendChild(spinner);

        // make container and spinner visible
        loadingContainer.classList.add('is-visible');
    }

    // function to hide loading animation when loading pokemon details
    function hideLoadingSpinner() {
        let loadingContainer = document.querySelector('#loading-container');
        loadingContainer.classList.remove('is-visible');
    }

    function showDetails(pokemon) {
        pokemonRepository.loadDetails(pokemon).then(function () {
            showModal(pokemon.name, pokemon.height, pokemon.weight, pokemon.imageUrl);
        });
    }

    function addListItem(pokemon) {
        let pokemonItem = document.querySelector(".pokemon-list");
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerHTML = pokemon.name;
        button.classList.add("button");
        listItem.appendChild(button);
        pokemonItem.appendChild(listItem);
        button.addEventListener("click", function (event) {
            showDetails(pokemon)
        })
    }

    function showModal(name, height, weight, type, image) {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = name;

        let heightElement = document.createElement('p');
        heightElement.innerText = "Height: " + height;


        let weightElement = document.createElement('p');
        weightElement.innerText = "Weight: " + weight;

        let typeElement = document.createElement('p');
        typeElement.innerText = "Type: " + type;


        //rendering an image of pokemon
        let imageElement = document.createElement('img');
        imageElement.classList.add('pokemon-image-class');
        imageElement.src = image;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(heightElement);
        modal.appendChild(weightElement);
        modal.appendChild(typeElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);


        modalContainer.classList.add('is-visible');
    }

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

    let modalContainer = document.querySelector('#modal-container');
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });


    return {
        // refers to getAll function
        getAll: getAll,
        // refers to add function
        add: add,
        // refers to addListItems
        addListItem: addListItem,
        // refers to loadList
        loadList: loadList,
        // refers to loadDetails
        loadDetails: loadDetails
    };
})();
// foreach loop accesses the key name of each objects and prints their value.
pokemonRepository.loadList().then(function () {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});