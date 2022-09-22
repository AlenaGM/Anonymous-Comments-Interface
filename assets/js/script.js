let storedArray = [];

//COLLECTING DATA FROM COMMENT FORM
document.getElementById("button").onclick = (e) => {
  e.preventDefault();

  //collect input values
  const author = document.getElementById("author").value;
  const comment = document.getElementById("comment").value;
  const photo = document.getElementById("photo").src;

  let date = new Date();

  //format date
  date = `${new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
  }).format(date)} at ${new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)}`;

  if (author && photo && comment) {
    //generate a chat-message
    const newCard = generateCard(author, date, photo, comment);
    document.querySelector("#chat").appendChild(newCard);

    //add to local storage
    addElementToLocalStorage(author, date, photo, comment);

    //clear comment form
    document.getElementById("comment").value = "";
  }
};

//add photo, listen to changes in <input type="file">
document.getElementById("photo").addEventListener("change", (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (function (file) {
    return function (e) {
      const r = e.target;
      const photo = r.result;
      document.getElementById("photo").src = photo;

      document.getElementById(
        "photoPreview"
      ).innerHTML = `<span><img src="${photo}" alt="avatar" id="avatar"></span>`;
    };
  })(file);

  reader.readAsDataURL(file);
});

//GENERATING CARD
const generateCard = (author, date, photo, comment) => {
  let card = document.createElement("li");
  card.classList.add("card");

  let card__image = document.createElement("img");
  card__image.classList.add("card__image");
  card__image.src = photo;

  let card__main = document.createElement("div");
  card__main.classList.add("card__main");

  let card__info = document.createElement("div");
  card__info.classList.add("card__info");

  let card__title = document.createElement("h3");
  card__title.classList.add("card__title");
  card__title.innerText = author;

  let card__date = document.createElement("div");
  card__date.classList.add("card__date");
  card__date.innerText = date;

  let card__text = document.createElement("p");
  card__text.classList.add("card__text");
  card__text.innerText = comment;

  let card__del = document.createElement("button");
  card__del.classList.add("card__del");
  card__del.innerHTML = "Delete";

  card.appendChild(card__image);
  card.appendChild(card__main);
  card.appendChild(card__del);

  card__main.appendChild(card__info);
  card__main.appendChild(card__text);
  card__main.appendChild(card__del);

  card__info.appendChild(card__title);
  card__info.appendChild(card__date);

  return card;
};

//WORKING WITH LOCALSTORAGE
const getArrFromLocalStorage = () => {
  let collection = JSON.parse(localStorage.getItem("chatMsgsCollection"));

  if (collection) {
    storedArray = collection;

    const lastItem = collection[collection.length - 1];
    const lastAuthor = lastItem[0];
    const lastPhoto = lastItem[2];

    document.getElementById("author").value = lastAuthor;
    document.getElementById("photo").src = lastPhoto;

    document.getElementById(
      "photoPreview"
    ).innerHTML = `<span><img src="${lastPhoto}" alt="avatar" id="avatar" width="60"></span>`;
  }
};

const setArrToLocalStorage = () => {
  localStorage.setItem("chatMsgsCollection", JSON.stringify(storedArray));
};

const addElementToLocalStorage = (author, date, photo, comment) => {
  storedArray.push([author, date, photo, comment]);
  setArrToLocalStorage();
};

//GETTING ALL COMMENTS FROM LOCALSTORAGE ON PAGE LOADING
document.addEventListener("DOMContentLoaded", function () {
  getComments();
});

function getComments() {
  getArrFromLocalStorage();

  for (let i = 0; i < storedArray.length; i++) {
    const newCard = generateCard(
      storedArray[i][0],
      storedArray[i][1],
      storedArray[i][2],
      storedArray[i][3]
    );
    document.querySelector("#chat").appendChild(newCard);
  }

  document.getElementById("author").value = ``;
  document.getElementById(
    "photoPreview"
  ).innerHTML = `<span><img src="assets/img/user.png" alt="avatar" id="avatar" width="60"></span>`;
}

//DELETE ONE COMMENT
document.addEventListener("click", function (ev) {
  if (ev.target.tagName === "BUTTON") {
    let li = ev.target.closest("li");
    let nodes = Array.from(li.closest("ul").children);
    let delIndex = nodes.indexOf(li);

    var messages = JSON.parse(localStorage.getItem("chatMsgsCollection"));
    let updMessages = messages.filter((value, index) => index !== delIndex);
    localStorage.setItem("chatMsgsCollection", JSON.stringify(updMessages));

    let div = ev.target.parentNode;
    let pic = div.parentNode;
    pic.remove();
  }
});
