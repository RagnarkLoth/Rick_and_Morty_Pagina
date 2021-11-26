const URL = "https://rickandmortyapi.com/api/character/"

const MAIN = document.querySelector(".main")
const TEMPLATE_CARD = document.querySelector(".template-card").content
const SELECT = document.querySelector(".select")
const FRAGMENT = document.createDocumentFragment()
const PART_ONE_HEADER = document.querySelector(".partOne")

function CreateCard(ide,characters){
    MAIN.innerHTML = ''
    let cloneTemplate = document.importNode(TEMPLATE_CARD, true)
    cloneTemplate.querySelector(".name").textContent = characters.results[ide].name
    cloneTemplate.querySelector(".image").setAttribute("src", characters.results[ide].image)
    cloneTemplate.querySelector(".image").setAttribute("alt", characters.results[ide].name)
    cloneTemplate.querySelector(".species").textContent = characters.results[ide].species
    cloneTemplate.querySelector(".gender").textContent = characters.results[ide].gender
    FRAGMENT.appendChild(cloneTemplate)
    MAIN.appendChild(FRAGMENT)
}

function CreateCardToll(characters){
    MAIN.innerHTML = ''
    for(i=0;i<characters.results.length;i++){
        let cloneTemplate = document.importNode(TEMPLATE_CARD, true)
        cloneTemplate.querySelector(".name").textContent = characters.results[i].name
        cloneTemplate.querySelector(".image").setAttribute("src", characters.results[i].image)
        cloneTemplate.querySelector(".image").setAttribute("alt", characters.results[i].name)
        cloneTemplate.querySelector(".species").textContent = characters.results[i].species
        cloneTemplate.querySelector(".gender").textContent = characters.results[i].gender
        FRAGMENT.appendChild(cloneTemplate)
        MAIN.appendChild(FRAGMENT)
    }
}

function CreateSelect(characters){
    for(var i=0;i<characters.results.length;i++) {
        const OPTION = document.createElement("option")
        OPTION.setAttribute('value', characters.results[i].name)
        OPTION.textContent = characters.results[i].name
        SELECT.appendChild(OPTION)
    }
    PART_ONE_HEADER.appendChild(SELECT)
}

function FetchApi() {
    fetch(URL).then(response => response.json()).then(element => {
        MAIN.innerHTML = ''
        CreateSelect(element)
        soloUno(element)
    })
}

function soloUno(characters){
    SELECT.addEventListener('change',function(){
        let selectedOption = this.options[SELECT.selectedIndex]
        if(selectedOption.text == "Seleccionar Todo"){
            CreateCardToll(characters)
        }else if(selectedOption.text == "Selecciona un valor"){
            MAIN.innerHTML=''
        }else{
            selectedOption = this.options[SELECT.selectedIndex]
            characters.results.forEach(element => {
                if(selectedOption.value==element.name){
                    CreateCard(element.id-1,characters)
                } 
            });
        }
    })
}

FetchApi()
