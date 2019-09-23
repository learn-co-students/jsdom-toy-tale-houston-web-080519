const toyURL = "http://localhost:3000/toys";
const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
let addToy = false;
const toyDiv = document.getElementById("toy-collection");

// YOUR CODE HERE

async function moreToys() {
  const response = await fetch(toyURL);
  const toySon = await response.json();
  addToys(toySon);
}

function addToys(toySon) {
  for (let i = 0; i < toySon.length; i++) {
    toyCard = document.createElement("div");
    toyCard.setAttribute("class", "card");
    header = document.createElement("h2");
    header.innerText = toySon[i].name;
    image = document.createElement("img");
    image.setAttribute("src", `${toySon[i].image}`);
    image.setAttribute("class", "toy-avatar");
    para = document.createElement("p");
    para.innerText = `${toySon[i].likes} likes!`;
    btn = document.createElement("button");
    btn.setAttribute("class", "like-btn");
    btn.setAttribute("id", `${i}`);
    btn.innerText = "Like <3";
    toyCard.appendChild(header);
    toyCard.appendChild(image);
    toyCard.appendChild(para);
    toyCard.appendChild(btn);
    toyDiv.appendChild(toyCard);
    // LIKE BUTTON
    btn.addEventListener("click", async function(e) {
      // e.preventDefault();
      let pText = this.parentNode.querySelector("p");
      toySon[i].likes++;
      pText.innerText = `${toySon[i].likes} likes!`;
      const response = await fetch(`${toyURL + "/" + toySon[i].id}`, {
        method: "PATCH",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          likes: toySon[i].likes
        })
      });
      return await response.json();
    });
  }
}

document.addEventListener("DOMContentLoaded", moreToys);
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
});

createBtn = document.getElementById("submit");
createBtn.addEventListener("click", async function(e) {
  e.preventDefault();
  const name = document.getElementById("nameBox").value;
  const img = document.getElementById("imageBox").value;
  const response = await fetch(toyURL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: name,
      image: img,
      likes: 0
    })
  });
  alert("Toy Added!");
  document.location.reload(true);
  return await response.json();
});

// OR HERE!
