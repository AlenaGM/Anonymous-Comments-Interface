const comments = ["Привет!","Как дела?"];

function addComment(){
    let name = document.getElementById("newComment").value;
    comments.push(name);
    console.log(comments);

    document.getElementById("newComment").value="";
    generateComments();
}

function generateComments(){
    let optionsString = "";

    for (let comment of comments) {
        optionsString += `<div id="message"><span>${comment}</span></div>`;
    }

    document.getElementById('container').innerHTML = optionsString;
}

document.addEventListener('DOMContentLoaded', function() {
generateComments();
});


/*const checkSpam = document.querySelector(`#btn`);

checkSpam.addEventListener("click", () => {
    let message = document.getElementById("comments").value;
    let newmessage = message.toLowerCase();

    if (newmessage.includes(`xxx`)||newmessage.includes(`viagra`)){
        let n = newmessage.replace("viagra", "xxx");
        let m = n.replace("xxx","***");
        comments.push(m);
    }else{
        comments.push(newmessage);
    }
    console.log(comments);
    generateComments();

})*/