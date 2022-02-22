let storedArray = []

// ЗАБИРАЕМ ДАННЫЕ ИЗ ФОРМЫ

document.getElementById('button').onclick = (e) =>{

    e.preventDefault()
    //собираем введенные в форму значения
    const author = document.getElementById("author").value;
    const comment = document.getElementById("comment").value;
    const photo = document.getElementById('photo').src;

    let date = new Date();

    //Форматироание даты
    date = `${new Intl.DateTimeFormat('ru-RU', {day:'2-digit', month:'2-digit'}).format(date)} в ${new Intl.DateTimeFormat('ru-RU', {hour:'2-digit', minute:'2-digit'}).format(date)}`;

    if(author && photo && comment){
        // Генерируем карточку и добавляем ее на страницу
        const newCard = generateCard(author, date, photo, comment)
        document.querySelector('#chat').appendChild(newCard)

        //Добавляем в хранилище
        addElementToLocalStorage(author, date, photo, comment)

        //Очищаем коммент
        document.getElementById("comment").value = '';
        }
    };

//Вставка аватарки, слушаем изменение в поле <input type="file">
document.getElementById('photo').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    // при успешном завершении операции чтения
    reader.onload = (function (file) {
        return function (e) {
            const r = e.target;
            // получаем содержимое файла, состояние чтения, ошибки(или null)
            const photo = r.result

            document.getElementById('photo').src = photo
        };
    })(file);

    reader.readAsDataURL(file);
})

//ГЕНЕРИРУЕМ КАРТОЧКУ = СООБЩЕНИЕ НА ФОРУМЕ
const generateCard = (author, date, photo, comment) =>{

    //Рисуем карточку
    let card = document.createElement('div')
    card.classList.add("card");

    let card__image = document.createElement('img')
    card__image.classList.add("card__image");
    card__image.src = photo

    let card__main = document.createElement('div')
    card__main.classList.add("card__main")

    let card__info = document.createElement('div')
    card__info.classList.add("card__info")

    let card__title = document.createElement('h3')
    card__title.classList.add("card__title")
    card__title.innerText = author

    let card__date = document.createElement('div')
    card__date.classList.add("card__date")
    card__date.innerText = date

    let card__text = document.createElement('p')
    card__text.classList.add("card__text")
    card__text.innerText = comment

    let card__del = document.createElement('button')
    card__del.classList.add("card__del");
    card__del.innerHTML="Удалить"

    card.appendChild(card__image)
    card.appendChild(card__main)

    card__main.appendChild(card__info)
    card__main.appendChild(card__text)
    card__main.appendChild(card__del)

    card__info.appendChild(card__title)
    card__info.appendChild(card__date)

    return card
}

//РАБОТА С LOCALSTORAGE

getArrFromLocalStorage = () =>{

let collection = JSON.parse(localStorage.getItem("chatMsgsCollection"));

    if(collection){
    storedArray = collection;

    const lastItem = collection[collection.length - 1];
    const lastAuthor = lastItem[0];
    const lastPhoto = lastItem[2];

    document.getElementById("author").value = lastAuthor;
    document.getElementById('photo').src = lastPhoto;

    //document.getElementById("photoPreview").innerHTML = `<span><img src="${lastPhoto}" alt="avatar" id="avatar" width="60"></span>`;
    }
}

setArrToLocalStorage = () =>{
    localStorage.setItem("chatMsgsCollection", JSON.stringify(storedArray));
}

addElementToLocalStorage = (author, date, photo, comment) => {
    storedArray.push([author, date, photo, comment])
    setArrToLocalStorage()
}

//Шаг 4: Нужно получать коллекцию из хранилица при загрузке страницы
document.addEventListener("DOMContentLoaded",function(){
    getComments()
})

function getComments() {
    //Находим список всех комментариев
    getArrFromLocalStorage()

    for( let i = 0; i < storedArray.length; i++){
        //Храним комментарии в таком виде:
        // [
        //     [author, date, photo, comment],
        //     [author, date, photo, comment],
        //     ....
        // ]

        const newCard = generateCard(storedArray[i][0],storedArray[i][1], storedArray[i][2], storedArray[i][3] )
        document.querySelector('#chat').appendChild(newCard)
    }
}

document.addEventListener("DOMContentLoaded", function (){//Что мы видим при загрузке
    getArrFromLocalStorage();
})

//Удаление карточки/не работает
document.addEventListener("click", function (ev){
    if (ev.target.tagName === "BUTTON") {
        let div = ev.target.parentNode;
        div.remove();
        //localStorage.removeItem('chatMsgsCollection'); //удаляет все :(
        console.log('hihihi');
    }
});



/*
СТАРЫЙ КОД
const comments = ["Привет!","Как дела?"];

document.getElementById('addComment').onclick = function(event){

    event.preventDefault();

    let newComment = document.getElementById("newComment").value;
    let noViagra = newComment.replace(/viagra/ig,'***');
    let validComment = noViagra.replace(/xxx/ig,'***');

    comments.push(validComment);

    document.getElementById("newComment").value="";

    generateComments();
}


function generateComments(){

    let optionsString = "";

    for (let comment of comments) {
        optionsString += `<div id="validComment">${comment}</div>`;
    }

    document.getElementById('validComments').innerHTML = optionsString;
}


document.addEventListener('DOMContentLoaded', function() {
generateComments();
});*/




