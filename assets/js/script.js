let photoFile = document.getElementById('photoFile');//инпут, куда грузим фото
let photoPreview = document.getElementById('photoPreview');//внутренность превьюшки
let avatar;//результат прочтения ридером
let storedimg;


document.addEventListener("DOMContentLoaded", function (){//Что мы видим при загрузке

    storedimg = localStorage.getItem('avatar');//внутренность стореджа photoFile -> avatar
    let name = localStorage.getItem('name');

    if(name!=null){
        document.getElementById("author").value = name;
    }

    if(storedimg!=null){
        photoPreview.innerHTML = `<img id="img" src="${storedimg}">`;
    }
})

function sendMessage(storedimg, author, comment) {//Отправка в общий чат
    storedimg = localStorage.getItem('avatar');
    document.getElementById("chat").innerHTML += `<span class='file'><img id="img" src="${storedimg}"></span><span class='author'>${author} : </span><span>${comment}</span><br>`;
}

function checkMessage (){
    let author = document.getElementById("author").value;
    //собираем введенные значения
    let comment = document.getElementById("comment").value;

    if(localStorage.getItem('name')==null){//проверяем есть ли что-нибудь уже в ключе, назначаем значение из инаута
        localStorage.setItem('name', author);
    }

    if(storedimg==null){
        localStorage.setItem('avatar', avatar);//здесь надо назначить из ф-ии
    }

    sendMessage(avatar, author, comment);
}

photoFile.addEventListener('change', () => {
        uploadFile(photoFile.files[0]);
    });

function uploadFile(file) {

        let reader = new FileReader();

        reader.onloadend = function(e){

            photoPreview.innerHTML = `<img src='${e.target.result}' alt="photo" width="100">`

            avatar = reader.result;

            localStorage.setItem('avatar', avatar);
        };

    reader.readAsDataURL(file);
};




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




