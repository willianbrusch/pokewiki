let search = document.getElementById('search')

search.addEventListener('click', () => {
   header.innerHTML = ""
   aside.innerHTML = ""
   footer.innerHTML = ""

   let pokemon = document.getElementById('pokemon').value
   let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`

   fetch(url)
      .then(response => { return response.json() })
      .then(data => {

         JSON.stringify(data)

         let name = data.forms[0].name
         let number = data.id
         let height = data.height
         let weight = data.weight
         let hp = data.stats[0].base_stat
         let attack = data.stats[1].base_stat
         let defense = data.stats[2].base_stat
         let attackSpecial = data.stats[3].base_stat
         let defenseSpecial = data.stats[4].base_stat
         let speed = data.stats[5].base_stat
         let picture = data.sprites.front_default

         let type1 = ''
         let type2 = ''

         if (data.types.length === 1) {
            type1 = data.types[0].type.name
         } else if (data.types.length === 2) {
            type1 = data.types[0].type.name
            type2 = data.types[1].type.name
         }

         let ability1 = ''
         let ability2 = ''
         let ability3 = ''

         if (data.abilities.length === 1) {
            ability1 = data.abilities[0].ability.name
         } else if (data.abilities.length === 2) {
            ability1 = data.abilities[0].ability.name
            ability2 = data.abilities[1].ability.name
         } else if (data.abilities.length === 3) {
            ability1 = data.abilities[0].ability.name
            ability2 = data.abilities[1].ability.name
            ability3 = data.abilities[2].ability.name
         }

         let pic = document.getElementById('picture')
         pic.src = picture

         let pok = new Pokemon(name, number, height, weight, hp, attack, defense, attackSpecial, defenseSpecial, speed, picture, type1, type2, ability1, ability2, ability3)
         renderPokemon(pok)
      })
})


class Pokemon {
   constructor(name, number, height, weight, hp, attack, defense, attackSpecial, defenseSpecial, speed, picture, type1, type2 = '', ability1, ability2 = '', ability3 = '') {
      this._name = name
      this._number = number
      this._height = height
      this._weight = weight
      this._hp = hp
      this._attack = attack
      this._defense = defense
      this._attackSpecial = attackSpecial
      this._defenseSpecial = defenseSpecial
      this._speed = speed
      this._picture = picture
      this._type1 = type1
      this._type2 = type2
      this._ability1 = ability1
      this._ability2 = ability2
      this._ability3 = ability3
      this.weightConvert(this._weight)
      this.heightConvert(this._height)
   }

   weightConvert(weight) {
      weight = weight.toString()

      if (weight.length === 1) {
         return this._weight = `0.${weight}`
      } else if (weight.length === 2) {
         return this._weight = `${weight[0]}.${weight[1]}`
      } else if (weight.length === 3) {
         return this._weight = `${weight[0]}${weight[1]}.${weight[2]}`
      } else if (weight.length === 4) {
         return this._weight = `${weight[0]}${weight[1]}${weight[2]}.${weight[3]}`
      } else if (weight.length === 5) {
         return this._weight = `${weight[0]}${weight[1]}${weight[2]}${weight[3]}.${weight[4]}`
      }
   }

   heightConvert(height) {
      height = height.toString()

      if (height.length === 1) {
         return this._height = `0.${height}`
      } else if (height.length === 2) {
         return this._height = `${height[0]}.${height[1]}`
      }

   }
}

function renderPokemon(pokemon) {

   renderName(pokemon)
   renderType(pokemon)
   renderWeightHeight(pokemon)
   renderAbilities(pokemon)
   renderStats(pokemon)
   renderColorsAndType1(pokemon)
   renderType2(pokemon)
}

function capitalizeFirstLetter(string) {
   return string.charAt(0).toUpperCase() + string.slice(1)
}

function renderName(pokemon) {

   let header = document.getElementById('header')
   pokemon._name = capitalizeFirstLetter(pokemon._name)
   header.append(`${pokemon._name}  #${pokemon._number}`)
}

function renderType(pokemon) {

   let aside = document.getElementById('aside')

   let div1 = document.createElement('div')
   div1.innerText = "Type"
   div1.className = 'div1'
   aside.appendChild(div1)

   let div2 = document.createElement('div')
   div2.className = 'div2'
   aside.appendChild(div2)

   type1 = pokemon._type1
   type2 = pokemon._type2

   if (pokemon._type2 == "") {

      let p1 = document.createElement('p')
      p1.className = 'type1'
      type1 = capitalizeFirstLetter(type1)
      p1.innerHTML = `${type1}`
      div2.appendChild(p1)

   } else {

      let p1 = document.createElement('p')
      let p2 = document.createElement('p')
      p1.className = 'type1'
      p2.className = 'type2'
      type1 = capitalizeFirstLetter(type1)
      type2 = capitalizeFirstLetter(type2)
      p1.innerHTML = `${type1}`
      p2.innerHTML = `${type2}`
      div2.appendChild(p1)
      div2.appendChild(p2)
   }
}

function renderWeightHeight(pokemon) {

   let aside = document.getElementById('aside')

   let div3 = document.createElement('div')
   div3.className = 'div3'
   aside.appendChild(div3)

   let height = document.createElement('p')
   let weight = document.createElement('p')
   height.className = 'height'
   weight.className = 'weight'
   height.innerHTML = `Height ${pokemon._height} m`
   weight.innerHTML = `Weight ${pokemon._weight} Kg`
   div3.appendChild(height)
   div3.appendChild(weight)
}

function renderAbilities(pokemon) {

   let aside = document.getElementById('aside')

   let div4 = document.createElement('div')
   div4.className = 'div4'
   div4.innerHTML = `Abilities`
   aside.appendChild(div4)

   let div5 = document.createElement('div')
   div5.className = 'div5'
   aside.appendChild(div5)

   // Ability1
   let ability1 = document.createElement('p')
   ability1.className = 'ability1'
   ab1 = pokemon._ability1
   ab1 = capitalizeFirstLetter(ab1)
   ability1.innerHTML = `${ab1}`
   div5.appendChild(ability1)

   // Ability2
   let ability2 = document.createElement('p')
   ability2.className = 'ability2'
   ab2 = pokemon._ability2
   ab2 = capitalizeFirstLetter(ab2)
   ability2.innerHTML = `${ab2}`
   div5.appendChild(ability2)

   // Ability3
   let ability3 = document.createElement('p')
   ability3.className = 'ability3'
   ab3 = pokemon._ability3
   ab3 = capitalizeFirstLetter(ab3)
   ability3.innerHTML = `${ab3}`
   div5.appendChild(ability3)
}

function renderStats(pokemon) {

   let footer = document.getElementById('footer')

   let div6 = document.createElement('div')
   div6.className = 'div6'
   div6.innerHTML = 'Stats'
   footer.appendChild(div6)

   let stats = document.createElement('div')
   stats.className = 'stats'
   footer.appendChild(stats)

   // Stats column 1
   let stats1 = document.createElement('div')
   stats1.className = 'stats1'

   // Hp
   let hp = document.createElement('p')
   hp.className = 'hp'
   hp.innerHTML = `Hp / ${pokemon._hp}`
   stats1.appendChild(hp)

   // Attack
   let attack = document.createElement('p')
   attack.className = 'attack'
   attack.innerHTML = `Attack / ${pokemon._attack}`
   stats1.appendChild(attack)

   // Defense
   let defense = document.createElement('p')
   defense.className = 'defense'
   defense.innerHTML = `Defense / ${pokemon._defense}`
   stats1.appendChild(defense)

   stats.appendChild(stats1)

   // Stats column 2
   let stats2 = document.createElement('div')
   stats2.className = 'stats2'

   // Special Attack
   let specialAttack = document.createElement('p')
   specialAttack.className = 'specialAttack'
   specialAttack.innerHTML = `Special Attack / ${pokemon._attackSpecial}`
   stats2.appendChild(specialAttack)

   // Special Defense
   let specialDefense = document.createElement('p')
   specialDefense.className = 'specialDefense'
   specialDefense.innerHTML = `Special Defense / ${pokemon._defenseSpecial}`
   stats2.appendChild(specialDefense)

   // Speed
   let speed = document.createElement('p')
   speed.className = 'speed'
   speed.innerHTML = `Speed / ${pokemon._speed}`
   stats2.appendChild(speed)

   stats.appendChild(stats2)
}

function renderColorsAndType1(pokemon) {

   // Grass
   if (pokemon._type1 == "grass") {

      let header = document.getElementById('header')
      header.style.background = 'rgb(76, 140, 44)'

      let footer = document.getElementById('footer')
      footer.style.background = 'rgb(76, 140, 44)'

      let type1 = document.querySelector('.type1')
      type1.style.background = 'rgb(76, 140, 44)'

      let body = document.querySelector('body')
      body.style.background = 'rgb(120, 200, 80)'
   }

   // Poison
   if (pokemon._type1 == "poison") {

      let header = document.getElementById('header')
      header.style.background = 'rgb(106, 42, 106)'

      let footer = document.getElementById('footer')
      footer.style.background = 'rgb(106, 42, 106)'

      let type1 = document.querySelector('.type1')
      type1.style.background = 'rgb(106, 42, 106)'

      let body = document.querySelector('body')
      body.style.background = 'rgb(160, 64, 160)'
   }

   // Fire
   if (pokemon._type1 == "fire") {

      let header = document.getElementById('header')
      header.style.background = 'rgb(171, 79, 13)'

      let footer = document.getElementById('footer')
      footer.style.background = 'rgb(171, 79, 13)'

      let type1 = document.querySelector('.type1')
      type1.style.background = 'rgb(171, 79, 13)'

      let body = document.querySelector('body')
      body.style.background = 'rgb(240, 128, 48)'
   }

   // Flying
   if (pokemon._type1 == "flying") {

      let header = document.getElementById('header')
      header.style.background = 'rgb(77, 30, 220)'

      let footer = document.getElementById('footer')
      footer.style.background = 'rgb(77, 30, 220)'

      let type1 = document.querySelector('.type1')
      type1.style.background = 'rgb(77, 30, 220)'

      let body = document.querySelector('body')
      body.style.background = 'rgb(168, 144, 240)'
   }

   // Water
   if (pokemon._type1 == "water") {

      let header = document.getElementById('header')
      header.style.background = 'rgb(20, 75, 204)'

      let footer = document.getElementById('footer')
      footer.style.background = 'rgb(20, 75, 204)'

      let type1 = document.querySelector('.type1')
      type1.style.background = 'rgb(20, 75, 204)'

      let body = document.querySelector('body')
      body.style.background = 'rgb(104, 144, 240)'
   }

   // Bug
   if (pokemon._type1 == "bug") {

      let header = document.getElementById('header')
      header.style.background = 'rgb(107, 117, 21)'

      let footer = document.getElementById('footer')
      footer.style.background = 'rgb(107, 117, 21)'

      let type1 = document.querySelector('.type1')
      type1.style.background = 'rgb(107, 117, 21)'

      let body = document.querySelector('body')
      body.style.background = 'rgb(168, 184, 32)'
   }

   // Normal
   if (pokemon._type1 == "normal") {

      let header = document.getElementById('header')
      header.style.background = 'rgb(112, 112, 72)'

      let footer = document.getElementById('footer')
      footer.style.background = 'rgb(112, 112, 72)'

      let type1 = document.querySelector('.type1')
      type1.style.background = 'rgb(112, 112, 72)'

      let body = document.querySelector('body')
      body.style.background = 'rgb(168, 168, 120)'
   }

   // Electric
   if (pokemon._type1 == "electric") {

      let header = document.getElementById('header')
      header.style.background = 'rgb(187, 151, 7)'

      let footer = document.getElementById('footer')
      footer.style.background = 'rgb(187, 151, 7)'

      let type1 = document.querySelector('.type1')
      type1.style.background = 'rgb(187, 151, 7)'

      let body = document.querySelector('body')
      body.style.background = 'rgb(248, 208, 48)'
   }

   // Ground
   if (pokemon._type1 == "ground") {

      let header = document.getElementById('header')
      header.style.background = 'rgb(178, 140, 36)'

      let footer = document.getElementById('footer')
      footer.style.background = 'rgb(178, 140, 36)'

      let type1 = document.querySelector('.type1')
      type1.style.background = 'rgb(178, 140, 36)'

      let body = document.querySelector('body')
      body.style.background = 'rgb(224, 192, 104)'
   }

   // Fairy
   if (pokemon._type1 == "fairy") {

      let header = document.getElementById('header')
      header.style.background = 'rgb(218, 37, 76)'

      let footer = document.getElementById('footer')
      footer.style.background = 'rgb(218, 37, 76)'

      let type1 = document.querySelector('.type1')
      type1.style.background = 'rgb(218, 37, 76)'

      let body = document.querySelector('body')
      body.style.background = 'rgb(238, 153, 172)'
   }

   // Fighter
   if (pokemon._type1 == "fighting") {

      let header = document.getElementById('header')
      header.style.background = 'rgb(123, 30, 25)'

      let footer = document.getElementById('footer')
      footer.style.background = 'rgb(123, 30, 25)'

      let type1 = document.querySelector('.type1')
      type1.style.background = 'rgb(123, 30, 25)'

      let body = document.querySelector('body')
      body.style.background = 'rgb(192, 48, 40)'
   }

   // Psychic
   if (pokemon._type1 == "psychic") {

      let header = document.getElementById('header')
      header.style.background = 'rgb(211, 9, 69)'

      let footer = document.getElementById('footer')
      footer.style.background = 'rgb(211, 9, 69)'

      let type1 = document.querySelector('.type1')
      type1.style.background = 'rgb(211, 9, 69)'

      let body = document.querySelector('body')
      body.style.background = 'rgb(248, 88, 136)'
   }

   // Steel
   if (pokemon._type1 == "steel") {

      let header = document.getElementById('header')
      header.style.background = 'rgb(102, 102, 153)'

      let footer = document.getElementById('footer')
      footer.style.background = 'rgb(102, 102, 153)'

      let type1 = document.querySelector('.type1')
      type1.style.background = 'rgb(102, 102, 153)'

      let body = document.querySelector('body')
      body.style.background = 'rgb(184, 184, 208)'
   }

   // Ice
   if (pokemon._type1 == "ice") {

      let header = document.getElementById('header')
      header.style.background = 'rgb(66, 174, 174)'

      let footer = document.getElementById('footer')
      footer.style.background = 'rgb(66, 174, 174)'

      let type1 = document.querySelector('.type1')
      type1.style.background = 'rgb(66, 174, 174)'

      let body = document.querySelector('body')
      body.style.background = 'rgb(152, 216, 216)'
   }

   // Dragon
   if (pokemon._type1 == "dragon") {

      let header = document.getElementById('header')
      header.style.background = 'rgb(62, 7, 192)'

      let footer = document.getElementById('footer')
      footer.style.background = 'rgb(62, 7, 192)'

      let type1 = document.querySelector('.type1')
      type1.style.background = 'rgb(62, 7, 192)'

      let body = document.querySelector('body')
      body.style.background = 'rgb(112, 56, 248)'
   }

   // Ghost
   if (pokemon._type1 == "ghost") {

      let header = document.getElementById('header')
      header.style.background = 'rgb(74, 58, 100)'

      let footer = document.getElementById('footer')
      footer.style.background = 'rgb(74, 58, 100)'

      let type1 = document.querySelector('.type1')
      type1.style.background = 'rgb(74, 58, 100)'

      let body = document.querySelector('body')
      body.style.background = 'rgb(112, 88, 152)'
   }

   // Dark
   if (pokemon._type1 == "dark") {

      let header = document.getElementById('header')
      header.style.background = 'rgb(72, 56, 46)'

      let footer = document.getElementById('footer')
      footer.style.background = 'rgb(72, 56, 46)'

      let type1 = document.querySelector('.type1')
      type1.style.background = 'rgb(72, 56, 46)'

      let body = document.querySelector('body')
      body.style.background = 'rgb(112, 88, 72)'
   }


   // Rock
   if (pokemon._type1 == "rock") {

      let header = document.getElementById('header')
      header.style.background = 'rgb(121, 106, 37)'

      let footer = document.getElementById('footer')
      footer.style.background = 'rgb(121, 106, 37)'

      let type1 = document.querySelector('.type1')
      type1.style.background = 'rgb(121, 106, 37)'

      let body = document.querySelector('body')
      body.style.background = 'rgb(184, 160, 56)'
   }
}

function renderType2(pokemon) {

   // Grass
   if (pokemon._type2 == "grass") {

      let type2 = document.querySelector('.type2')
      type2.style.background = 'rgb(120, 200, 80)'
   }

   // Poison
   if (pokemon._type2 == "poison") {

      let type2 = document.querySelector('.type2')
      type2.style.background = 'rgb(160, 64, 160)'
   }

   // Fire
   if (pokemon._type2 == "fire") {

      let type2 = document.querySelector('.type2')
      type2.style.background = 'rgb(240, 128, 48)'
   }

   // Flying
   if (pokemon._type2 == "flying") {

      let type2 = document.querySelector('.type2')
      type2.style.background = 'rgb(168, 144, 240)'
   }

   // Water
   if (pokemon._type2 == "water") {

      let type2 = document.querySelector('.type2')
      type2.style.background = 'rgb(104, 144, 240)'
   }

   // Bug
   if (pokemon._type2 == "bug") {

      let type2 = document.querySelector('.type2')
      type2.style.background = 'rgb(168, 184, 32)'
   }

   // Normal
   if (pokemon._type2 == "normal") {

      let type2 = document.querySelector('.type2')
      type2.style.background = 'rgb(168, 168, 120)'
   }

   // Electric
   if (pokemon._type2 == "electric") {

      let type2 = document.querySelector('.type2')
      type2.style.background = 'rgb(248, 208, 48)'
   }

   // Ground
   if (pokemon._type2 == "ground") {

      let type2 = document.querySelector('.type2')
      type2.style.background = 'rgb(224, 192, 104)'
   }

   // Fairy
   if (pokemon._type2 == "fairy") {

      let type2 = document.querySelector('.type2')
      type2.style.background = 'rgb(238, 153, 172)'
   }

   // Fighter
   if (pokemon._type2 == "fighting") {

      let type2 = document.querySelector('.type2')
      type2.style.background = 'rgb(192, 48, 40)'
   }

   // Psychic
   if (pokemon._type2 == "psychic") {

      let type2 = document.querySelector('.type2')
      type2.style.background = 'rgb(248, 88, 136)'
   }

   // Steel
   if (pokemon._type2 == "steel") {

      let type2 = document.querySelector('.type2')
      type2.style.background = 'rgb(184, 184, 208)'
   }

   // Ice
   if (pokemon._type2 == "ice") {

      let type2 = document.querySelector('.type2')
      type2.style.background = 'rgb(152, 216, 216)'
   }

   // Dragon
   if (pokemon._type2 == "dragon") {

      let type2 = document.querySelector('.type2')
      type2.style.background = 'rgb(112, 56, 248)'
   }

   // Ghost
   if (pokemon._type2 == "ghost") {

      let type2 = document.querySelector('.type2')
      type2.style.background = 'rgb(112, 88, 152)'
   }

   // Dark
   if (pokemon._type2 == "dark") {

      let type2 = document.querySelector('.type2')
      type2.style.background = 'rgb(112, 88, 72)'
   }

   // Rock
   if (pokemon._type2 == "rock") {

      let type2 = document.querySelector('.type2')
      type2.style.background = 'rgb(184, 160, 56)'
   }
}
