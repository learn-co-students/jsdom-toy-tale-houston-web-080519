const addBtn = document.querySelector('#new-toy-btn')
const toyURL = "http://localhost:3000/toys"
const toyFormDiv = document.querySelector('.container')
const toyForm = document.querySelector('.add-toy-form')
const toyCollection = document.querySelector('#toy-collection')

const newToyButton = document.getElementById('newToyButton')
const createNewToyButton = document.getElementById('createNewToy')

let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyFormDiv.style.display = 'block'
    addBtn.innerText = "Hide this form!"
  } else {
    toyFormDiv.style.display = 'none'
    addBtn.innerText = "Add a new toy!"
  }
  createNewToyButton.addEventListener('click', () => {
    // So we want to take the input data from name and url and output it to the json...
    let nameInput = document.getElementsByClassName('input-text')[0].value
    let imageInput = document.getElementsByClassName('input-text')[1].Value
    fetch(toyURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameInput,
        image: imageInput,
        likes: 0
      })
    })
  })
})


// OR HERE!


document.addEventListener('DOMContentLoaded', function(){
fetch(toyURL)
.then(response => response.json())
.then(toys => {
  for (const toy of toys) {
    const card = createCard(toy); // helper method to make card for each toy
    toyCollection.appendChild(card) // add each card to the div
  }
})
.catch(error => {
  toyCollection.innerText = 'Aw beans the server is down';
  console.log(error.message);
})
})

// Populate and return card for a given toy
function createCard(toy) {
  // set up basic element
  const card = document.createElement("div");
  card.className = "card";
  card.id = toy.id
  // helper methods to populate card w/ desired elements
  card.appendChild(setName(toy));
  card.appendChild(setImage(toy));
  card.appendChild(setLikeCount(toy));
  card.appendChild(setLikeButton(toy));
  return card;
}

// Return a populated h2 element with name
function setName(toy) {
  const name = document.createElement("h2");
  name.innerText = toy.name;
  return name;
}

// Return a populated img element
function setImage(toy) {
  const toyImage = document.createElement("img");
  toyImage.src = toy.image;
  toyImage.className = "toy-avatar";
  return toyImage;
}

// Return a populated like count
function setLikeCount(toy) {
  const likeCount = document.createElement("p");
  likeCount.className = "like-count"
  likeCount.innerText = `${toy.likes} likes`;
  return likeCount;
}

// Return populated & responsive button
function setLikeButton(toy) {
  const likeButton = document.createElement("button");
  likeButton.className = "like-btn";
  likeButton.innerText = "Like ♥"
  likeButton.addEventListener('click', incrementLikes); // helper method
  return likeButton;
}

// Increase a toy's like count by 1
function incrementLikes(e) {
  // get target toy for capturing ID & current like count
  const toy = e.target.parentElement
  const toyId = toy.id
  const currentLikes = toy.querySelector('.like-count').innerText.slice(0, -6)
  // configure params for patch request
  const newLikes = Number(currentLikes) + 1
  const likeConfigs = {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({"likes": newLikes})
  }

  // send patch request to server
  fetch(`http://localhost:3000/toys/${toyId}`, likeConfigs)
  .then(response => response.json())
  .then(result => {
    toy.querySelector('.like-count').innerText = `${newLikes} likes`
  })
  .catch(error => {
    alert('Aw beans the server is down');
    console.log(error.message);
  })
}