
document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("btn").onclick = function () {
       const email=document.getElementById("exampleInputEmail1").value
       const name=document.getElementById("name").value
       if(name && email)
       {
            localStorage.setItem("User",name)
            localStorage.setItem("Email",email)
            localStorage.setItem("Score",0)
            document.querySelector('.container').innerHTML='<nav aria-label="breadcrumb">'
              +'  <ol class="breadcrumb">'
                +'  <li class="breadcrumb-item active" aria-current="page"><b>Home</b></li>'
                +'</ol>'
            +'</nav>'
            +'<div align="center"><button onclick="start()" class="btn btn-success btn-lg mt-5">Start Quiz</button></div>'
       }
       else{
           location.reload()
       }

    }
});

function start(){
    console.log("Started")
    var questineNo=1
    var request = new XMLHttpRequest();
    request.onload = function(){
        var data=JSON.parse(request.responseText);
        console.log(data)
        next(data,questineNo)
    }  
    request.open('GET', 'https://raw.githubusercontent.com/ameenmsit/quiz-js/main/questines.json', true);
    request.send();
}

function next(questinare,questineNo) 
{


    htmlEle='<nav aria-label="breadcrumb">'
        +'<ol class="breadcrumb">'
        +'<li class="breadcrumb-item active" aria-current="page"><b>Home</b></li>'
        for(let i=1;i<=questineNo;i++)
        {
        htmlEle+='<li class="breadcrumb-item active" aria-current="page">'+i+'</li>'
        }
    htmlEle+='</ol>'
        +'</nav>'
        +'<center><div id="q" class="card mb-3">'
        +'<img src="images/'+questinare[questineNo-1].questine+'" class="card-img-top" alt="...">'
        +'<div class="card-body">'
        +'<h5 class="card-title">Options</h5>'
        +'<div class="card-text">'
        +'<div class="input-group">'
        +'<div class=" input-group-prepend">'
        +'<div class="input-group-text mx-5">'
        +'<input type="radio"  aria-label="Radio button for following text input" name="Ans" value="A">'
        +'</div>'
        +'</div>'
        +'A '+questinare[questineNo-1].Options.A
        +'</div>'
        +'<div class="input-group">'
        +'<div class=" input-group-prepend">'
        +'<div class="input-group-text mx-5">'
        +'<input type="radio"  aria-label="Radio button for following text input" name="Ans" value="B">'
        +'</div>'
        +'</div>'
        +'B '+questinare[questineNo-1].Options.B
        +'</div>'
        +'<div class="input-group">'
        +'<div class=" input-group-prepend">'
        +'<div class="input-group-text mx-5">'
        +'<input type="radio"  aria-label="Radio button for following text input" name="Ans" value="C">'
        +'</div>'
        +'</div>'
        +'C '+questinare[questineNo-1].Options.C
        +'</div>'
        +'<div class="input-group">'
        +'<div class=" input-group-prepend">'
        +'<div class="input-group-text mx-5">'
        +'<input type="radio"  aria-label="Radio button for following text input" name="Ans" value="D">'
        +'</div>'
        +'</div>'
        +'D '+questinare[questineNo-1].Options.D
        +'</div>'
        +'</div><button id="next" class="btn btn-primary  btn-lg">Next</button>'
        +'</div>'
        +'</div>'
        +'</div></center>'     

    document.querySelector('.container').innerHTML=htmlEle
        document.getElementById("next").onclick = function (){
            var options=document.getElementsByName("Ans")
            for(let e=0;e<options.length;e++)
            {
                if(options[e].checked)
                {
                    var choose=options[e].value
                    break
                }
            }
            var Ans=questinare[questineNo-1].Ans
            var score=parseInt(localStorage.getItem("Score"))
            console.log(choose)
            if(Ans === choose)
            {
                localStorage.setItem("Score",score+1)
            }
            if(questineNo !== 10)
            {
                next(questinare,questineNo+1)
            }
            else
            {
                alert("Quiz Over,"+localStorage.getItem("User")+" Your Score is "+localStorage.getItem("Score"))
                location.reload()
            }
            }

}

function eval(){

}