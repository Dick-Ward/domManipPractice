const newDogContainer = document.getElementById('new-dog-container')
const newDogButton = document.getElementById('new-dog-button')
const collectionContainer = document.getElementById('collection-container')
const API = "https://dog.ceo/api/breeds/image/random"
let id = 1

const renderDog = () =>{
  fetch(API)
  .then(res => res.json())
  .then(dog => appendDogImg(dog.message))
}

const appendDogImg = (url) =>{
    newDogContainer.innerHTML = `<img class="dog-image" src=${url} /><br>
                                 <button id="add-button">Add to Collection</button>`
}

const resetImgContainer = () =>{
  newDogContainer.innerHTML = ``
}

const addDogToCollection = () =>{
  let url = newDogContainer.firstElementChild.src
  collectionContainer.innerHTML += `<img data-id=${id} src=${url} class="dog-image collected" />`
  id += 1
}

const shrinkDogs = () =>{
  let dogImages = document.querySelectorAll('.dog-image.collected')
  Array.from(dogImages).forEach(dog =>{
    dog.width = dog.width - 20
    dog.height = dog.height - 20
  })
}

const embiggenDogs = () =>{
  let dogImages = document.querySelectorAll('.dog-image.collected')
  Array.from(dogImages).forEach(dog =>{
    dog.width = dog.width + 20
    dog.height = dog.height + 20
  })
}

newDogButton.addEventListener('click', renderDog)

document.addEventListener('click', (event) =>{
  if(event.target.id === 'add-button'){
    addDogToCollection()
    resetImgContainer()
  } else if (event.target.dataset.id) {
    event.target.remove()
  } else if (event.target.id === "smaller"){
    shrinkDogs()
  } else if (event.target.id === "larger"){
    embiggenDogs()
  }
})
