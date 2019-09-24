const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const nameInput = document.querySelector('#name-input')
const imageInput = document.querySelector('#image-input')
const toyCollection = document.querySelector('#toy-collection')

let addToy = false


function fetchToys(){
  fetch("http://localhost:3000/toys")
 .then(function(response){
   return response.json();
 })
 .then(function(toys){
   toys.forEach(function(toy){
              const toyCard = document.createElement("div")
              toyCard.setAttribute('class','card')
              toyCollection.append(toyCard)
              
              const toyName = document.createElement('h2')
              toyName.innerText = toy.name
              toyCard.append(toyName)

              const toyImage = document.createElement('img')
              toyImage.src = toy.image
              toyImage.setAttribute('class', 'toy-avatar')
              toyCard.append(toyImage)

              const toyLikes = document.createElement('p')
              toyLikes.innerText = `${toy.likes} likes`
              toyCard.append(toyLikes)

              const likeButton = document.createElement('button')
              likeButton.innerText = '<3 Like'
              likeButton.setAttribute('class', 'like-bth')
              toyCard.append(likeButton)

              likeButton.addEventListener('click', function(){
                toy.likes++
                toyLikes.innerText = `${toy.likes} likes`
                fetch(`http://localhost:3000/toys/${toy.id}`, {
                  method: "PATCH",
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    likes: toy.likes
                  })     
                }) //end fetch
              })
   //for (let i = 0; i < toys.length;i++){
   //  let toy = toy[i]  [same as forEach method]
            })
          })

}//fetchToys

fetchToys()

toyForm.addEventListener('submit', function(e){
    e.preventDefault()

    let toy = {
      name: nameInput.value,
      image: imageInput.value
    }

              const toyCard = document.createElement("div")
              toyCard.setAttribute('class','card')
              toyCollection.append(toyCard)
              
              const toyName = document.createElement('h2')
              toyName.innerText = toy.name
              toyCard.append(toyName)

              const toyImage = document.createElement('img')
              toyImage.src = toy.image
              toyImage.setAttribute('class', 'toy-avatar')
              toyCard.append(toyImage)

              const toyLikes = document.createElement('p')
              toyLikes.innerText = `${toy.likes} likes`
              toyCard.append(toyLikes)

              const likeButton = document.createElement('button')
              likeButton.innerText = '<3 Like'
              likeButton.setAttribute('class', 'like-bth')
              toyCard.append(likeButton)

              likeButton.addEventListener('click', function(){
                toy.likes++
                toyLikes.innerText = `${toy.likes} likes`
                fetch(`http://localhost:3000/toys/${toy.id}`, {
                  method: "PATCH",
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    likes: toy.likes
                  })     
                }) //end fetch
              })  
}) //closes toyForm

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})




// -------This is what you wrote --------
//  fetch("http://localhost:3000/toys")
//  .then(function(data){
//    return data.json();
//  })
//  .then(function(json){
//    console.log("We got toys")
//  })

    //  const toy_div = document.createElement("div")
    //  toy_div.className = 'card'

//      const toy_h2 = document.createElement("h2")
     

//      const toy_img = document.createElement("img")
//      const toy_p = document.createElement("p")
//      const toy_button = document.createElement("button")
// -------------------------------------------------------

   // for each toy you want to make <div class="card">
   /*
      <div class="card">
        <h2></h2>
        <img src=something />
        <p></p>
        <button></button>
      </div>
   */