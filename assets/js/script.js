let storedArray = []

// 1-й шаг - собираем данные из формы
document.getElementById('button').onclick = (e) =>{
    //По умолчанию, отправка формы означает запрос на сервер. Чтобы это остановить, выполняем команду:
    e.preventDefault()
    //собираем введенные в форму значения
    let author = document.getElementById("author").value;
    let comment = document.getElementById("comment").value;
    const photo = document.getElementById('photo').src;

    if(author && photo && comment){
        // Генерируем карточку и добавляем ее на страницу
        const newCard = generateCard(author, photo, comment)
        document.querySelector('#chat').appendChild(newCard)

        //Добавляем в хранилище
        addElementToLocalStorage(author, photo, comment)
        }
    };

//Вставка аватарки, слушаем изменение в поле <input type="file" id="file" value="">
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

//Шаг 2: Генерация карточки
const generateCard = (author, photo, comment) =>{

    //Рисуем карточку
    let card = document.createElement('div')
    card.classList.add("card");

    let card__image = document.createElement('img')
    card__image.classList.add("card__image");
    card__image.src = photo

    let card__main = document.createElement('div')
    card.classList.add("card__main")

    let h3 = document.createElement('h3')
    h3.innerText = author

    let chatMsg = document.createElement('p')
    chatMsg.innerText = comment

    card__main.appendChild(h3)
    card__main.appendChild(chatMsg)

    card.appendChild(card__image)
    card.appendChild(card__main)

    return card
}


//Шаг 3: Работа с localStorage
//Важно помнить, что в веб-хранилище все данные-это строки




getArrFromLocalStorage = () =>{

let collection = JSON.parse(localStorage.getItem("chatMsgsCollection"));

    if(collection){
        storedArray = collection;
    }

const lastItem = collection[collection.length - 1];
const lastAuthor = lastItem[0];
const lastPhoto = lastItem[1];

document.getElementById("author").value = lastAuthor;
document.getElementById('photo').src = lastPhoto;
//document.getElementById("photoPreview").innerHTML = `<span><img src="${lastPhoto}" alt="avatar" id="avatar" width="60"></span>`;
}




setArrToLocalStorage = () =>{
    localStorage.setItem("chatMsgsCollection", JSON.stringify(storedArray));
}

addElementToLocalStorage = (author, photo, comment) => {
    storedArray.push([author, photo, comment])
    setArrToLocalStorage()
}

//Шаг 4: Нужно получать коллекцию из хранилица при загрузке страницы
document.addEventListener("DOMContentLoaded",function(){
    getComments()
})

function getComments() {
    //Находим список всех контактов
    getArrFromLocalStorage()


    for( let i = 0; i < storedArray.length; i++){
        //Храним контакты в таком виде:
        // [
        //     [author, photo, comment],
        //     [author, photo, comment],
        //     ....
        // ]

        const newCard = generateCard(storedArray[i][0],storedArray[i][1], storedArray[i][2] )
        document.querySelector('#chat').appendChild(newCard)
    }
}




document.addEventListener("DOMContentLoaded", function (){//Что мы видим при загрузке
    getArrFromLocalStorage();
})






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




