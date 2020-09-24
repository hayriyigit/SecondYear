const form = document.querySelector("#dugum-form");
const dugumInput = document.querySelector("#dugum-deger");


// const dugumList = document.querySelector(".list-group");

const firstBody = document.querySelectorAll(".card-body")[0];
const secondBody = document.querySelectorAll(".card-body2")[0];


const linkedList = new LinkedList();

eventListeners();

function eventListeners(){
    form.addEventListener("submit",dugumEkle);
    secondBody.addEventListener("click", dugumSil);
}


function dugumEkle(e){
    const yeniDugum = dugumInput.value.trim();
    if(yeniDugum == ""){
        showAlert("danger", "Alan boş olmamalı!");
    }
    else{
        linkedList.ekle(yeniDugum);
        addNodeUI();
        showAlert("success", "Başarı ile eklendi!");
    }

    e.preventDefault();
}

function dugumSil(e){

    if(e.target.className == "fa fa-remove"){
        linkedList.sil(e.target.id);
        addNodeUI();
        showAlert("warning","Başarı ile silindi...")
    }

}


function addNodeUI(){
    
    secondBody.innerHTML = "";

    var liste = linkedList.listele();
    liste.forEach(item => {
        var deger = item.element;
        if(item.sonraki !== null){
            var sonraki = item.sonraki.element;
        }
        else{
            var sonraki = "null";
        }
        secondBody.innerHTML += `<div class="node">
                                <div class="sub">${deger}</div>
                                <div class="sub">→${sonraki}</div>
                                <div class="remove">
                                    <a href="#!"style="text-decoration: none; text-align: center !important;">
                                    <i class="fa fa-remove" id="${deger}"></i>
                                    </a>
                                </div>
                                </div>`
    });

    dugumInput.value = "";
}

function showAlert(type, message){

    const alert = document.createElement("div");
    alert.className = `alert alert-${type} elementToFadeInAndOut`;
    alert.role = "alert";
    alert.appendChild(document.createTextNode(message));

    firstBody.appendChild(alert);
    
    setTimeout(function(){
        alert.remove();
    },2000);
}

