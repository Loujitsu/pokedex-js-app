let pokemonList = [
  {
  name: 'Articuno',
  height: 1.7,
  weight: 55.4,
  type: ['fire', 'flying']
},
{
  name: 'Zaptos',
  height: 1.6,
  weight: 52.6,
  type: ['electric', 'flying']
},
{
  name: 'Moltres',
  height: 2,
  weight: 60,
  type: ['fire', 'flying']
},
{
  name: 'Lugia',
  height: 5.2,
  weight: 216,
  type: ['pyschic', 'flying']
},
{
  name: 'Ho-oh',
  height: 3.8,
  weight: 199,
  type: ['fire', 'flying']
}
]


for (let i=0; i < pokemonList.length; i++){
  if(pokemonList[i].height > 5){
    document.write(pokemonList[i].name + '(height : '+ pokemonList[i].height +')' + 'Wow that\'s big!!!')
  } else{
    document.write(pokemonList[i].name + '( height : ' + pokemonList[i].height + ')')
  }
}