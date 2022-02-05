const comments = ["Привет!","Как дела?"];

document.getElementById('addComment').onclick = function(){
    event.preventDefault();

    let newComment = document.getElementById("newComment").value.toLowerCase();

    if(newComment.includes('viagra')||newComment.includes('xxx')) {
        let noViagra = newComment.replace(/viagra/g,'***');
        let validComment = noViagra.replace(/xxx/g,'***');
        comments.push(validComment);
    } else {
        comments.push(newComment);
    }

    document.getElementById("newComment").value="";

    generateComments();
}


function generateComments(){

    let optionsString = "";

    for (let comment of comments) {
        optionsString += `<div id="message">${comment}</div>`;
    }

    document.getElementById('oldComments').innerHTML = optionsString;
}


document.addEventListener('DOMContentLoaded', function() {
generateComments();
});




