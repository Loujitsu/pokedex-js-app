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
  ]
  function getAll() {
      return pokemonList;
  }
  function add(pokemon) {
      pokemonList.push(pokemon);
  }
  return {
      getAll: getAll,
      add: add
  }
})();
// for (let i = 0; i < pokemonList.length; i++) {
//     if (pokemonList[i].height > 5) {
//         document.write(pokemonList[i].name + '(height : ' + pokemonList[i].height + ')' + 'Wow that\'s big!!!')
//     } else {
//         document.write(pokemonList[i].name + '( height : ' + pokemonList[i].height + ')')
//     }
// }
console.log(pokemonRepository.getAll())
pokemonRepository.add({
  name: 'Pikachu', height: 2,
  weight: 15,
  type: ['electric']
});
pokemonRepository.getAll().forEach(function (pokemon) {
  console.log(pokemon.name + ', ' + pokemon.height + ', ' + pokemon.weight + ', ' + pokemon.type);
  document.write(pokemon.name + ', ' + pokemon.height + ', ' + pokemon.weight + ', ' + pokemon.type)
});