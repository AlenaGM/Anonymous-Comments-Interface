let avatar;


let storedimg = localStorage.getItem('avatar');

document.addEventListener("DOMContentLoaded", function(){

    let name = localStorage.getItem('name');


    if(name!=null){
        document.getElementById("author").value = name;
    }

    if(storedimg!=null){
      photoPreview.innerHTML = `<img id="img" src="${storedimg}">`;
  }

})

function sendMessage(avatar, author, comment) {
    document.getElementById("chat").innerHTML += `<span class='file'><img id="img" src="${storedimg}"></span><span class='author'>${author} : </span><span>${comment}</span><br>`;
}



function checkMessage (){

    let author = document.getElementById("author").value;//собираем введенные значения
    let comment = document.getElementById("comment").value;


    if(localStorage.getItem('name')==null){//проверяем есть ли что-нибудь уже в ключе, назначаем значение из инаута
        localStorage.setItem('name', author)
    }

    if(localStorage.getItem('avatar')==null){
      localStorage.setItem('avatar', avatar)//здесь надо назначить из ф-ии
    }

    sendMessage(avatar, author, comment);
}



const photoFile = document.getElementById('photoFile');
const photoPreview = document.getElementById('photoPreview');

photoFile.addEventListener('change', () => {
        uploadFile(photoFile .files[0]);
    });

function uploadFile(file) {
        let reader = new FileReader();

        reader.onload = function(e){
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




