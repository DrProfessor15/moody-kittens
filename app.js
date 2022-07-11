let kittens = []
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target
  
    let kitten = {
      id: generateId(),
      name: form.name.value,
      mood: "",
      affection: generateAffection(),
    }

    kitten = setKittenMood(kitten)
      let index = kittens.findIndex(kitten => kitten.name.toUpperCase() == form.name.value.toUpperCase())
      if (index > -1) {
        window.alert("You already have a cat with that name!")
        form.reset()
        return
      }
    kittens.push(kitten)
    saveKittens()
    form.reset()
    drawKittens()
}
/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let loadedKittens = JSON.parse(window.localStorage.getItem("kittens"))
  if(loadedKittens){
    kittens = loadedKittens
  }
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  let kittensElement = document.getElementById("kittens")
  let template = ""
  
  kittens.forEach(kitten => {
    template += `<div id="${kitten.id}" class="card">
    <span class="p-2 permanent-marker">${kitten.name}</span>
    <span>${kitten.mood}</span>
    <div class="kitten ${kitten.mood}">
     <img src="https://robohash.org/${kitten.id}.png/?set=set4">
     </div>
    <button class="btn-dark" onclick="pet('${kitten.id}')">Pet</button>
    <button class="btn-cancel" onclick="catnip('${kitten.id}')">Catnip</button>
    <button class="btn-delete" onclick="deleteKitten('${kitten.id}')">FORGET</button>
  </div>
    `
  })
  kittensElement.innerHTML = template
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id) {
  console.log(id)
  let kitten = kittens.find(kitten => kitten.id == id)
  console.log(kitten)
  return kitten
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let kitten = findKittenById(id)
  if(generateAffection() > 5){
    kitten.affection++
  }
  else{
    kitten.affection--
  }
  setKittenMood(kitten)
  saveKittens()
  drawKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let kitten = findKittenById(id)
  kitten.affection = 5
  setKittenMood(kitten)
  saveKittens()
  drawKittens()
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(kitten) {
  let mood = ""
  if(kitten.affection > 5){
    mood = "happy"
  }
  else if(kitten.affection == 5){
    mood = "tolerant"
  }
  else if(kitten.affection == 0){
    mood = "gone"
  }
  else{
    mood = "angry"
  }
  kitten.mood = mood
  return kitten
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(){
  kittens.splice(0,kittens.length)
  saveKittens()
  drawKittens()
}

function deleteKitten(id){
  if(window.confirm("Move on?")){
  let index = kittens.findIndex(kitten => kitten.id == id)
  kittens.splice(index, 1)
  saveKittens()
  drawKittens()
  }
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  drawKittens()
  console.log('Good Luck, Take it away')
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}
function generateAffection() {
  return Math.floor(Math.random() * 10)
}

loadKittens()

console.log(kittens)