document.addEventListener("DOMContentLoaded", function(event){

    let name = localStorage.getItem('name');
    let avatar = localStorage.getItem('avatar');

    if(name!=null){
        document.getElementById("author").value = name;
    }

    if(avatar!=null){
      document.getElementById("file").value = avatar;
  }
})

function sendMessage(file, author, comment) {
    document.getElementById("chat").innerHTML += `<span class='file'><img id="img" src="${avatar}"></span><span class='author'>${author} : </span><span>${comment}</span><br>`;
}

let avatar;

function checkMessage (){

    let author = document.getElementById("author").value;//собираем введенные значения
    let comment = document.getElementById("comment").value;
    let file = document.getElementById("file").value;


    if(localStorage.getItem('name')==null){//проверяем есть ли что-нибудь уже в ключе, назначаем значение из инаута
        localStorage.setItem('name', author)
    }

    if(localStorage.getItem('avatar')==null){
      localStorage.setItem('avatar', file)//здесь надо назначить из ф-ии
    }



    sendMessage(file, author, comment);
}



document.getElementById('file').addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = () => {
    // convert file to base64 String
    avatar = reader.result;
    // store file
    localStorage.setItem('avatar', avatar);
    // display image
    document.querySelector('#img').src = `${avatar}`;
  };

  reader.readAsDataURL(file);
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




