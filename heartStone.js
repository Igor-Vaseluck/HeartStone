const buttonOne = document.querySelector('#oneCard')
const buttonFive = document.querySelector('.buttonFive')
const buttonDelete = document.querySelector('.buttonDelete')
const cardHolder = document.querySelector('.card-holder')
const select = document.querySelector('.selectClass')

const urlDruid = 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/Druid'
const optionsDruid = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '7ff02b07f5msh788f0e2ef4bc4d4p1ffa23jsn1d233f1abe44',
        'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
    }
}
const urlHunter = 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/Hunter'
const optionsHunter = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '7ff02b07f5msh788f0e2ef4bc4d4p1ffa23jsn1d233f1abe44',
        'X-RapidAPI-Host': 'omgvamp-hearthstone-v1.p.rapidapi.com'
    }
}

const arrD = []
const arrH = []
let arrFull = []
let items = cardHolder.childNodes
const arrDruid = async function () {
    try {
        const response = await fetch(urlDruid, optionsDruid)
        const result = await response.json()
        for (let i = 0; i < result.length - 1; i++) {
            if (result[i].img) {
                arrD.push(result[i].img)
                
            }
        }
    } catch (error) {
        console.error(error)
    }
}
const arrHunter = async function () {
    try {
        const response = await fetch(urlHunter, optionsHunter)
        const result = await response.json()
        for (let i = 0; i < result.length - 1; i++) {
            if (result[i].img) {
                arrH.push(result[i].img)
            }
        }
    } catch (error) {
        console.error(error)
    }
}
arrDruid()
arrHunter()
arrFull = arrD.concat(arrH)

function getArrFull() {
    return Promise.all([arrDruid(), arrHunter()]).then(() => {
        arrFull = arrD.concat(arrH)
        return arrFull
    })
}
let dragCard = null
let dropCard = null

const functionOne = function () {
    getArrFull().then((arrFull) => {
        let randomValue = Math.floor(arrFull.length * Math.random())
        return cardHolder.insertAdjacentHTML('afterbegin', `<img class="imgCard" draggable="true" data-id = "${randomValue}" src="${arrFull[randomValue]}">`)
    })
    items = cardHolder.childNodes
}

buttonFive.addEventListener('click', function () {
    
    functionOne()
    functionOne()
    functionOne()
    functionOne()
    functionOne()
    items.forEach(item=>{
        item.addEventListener('dragstart', handlerDragStart)
        item.addEventListener('dragend', handlerDragEnd)
        item.addEventListener('drag', handlerDrag)
        item.addEventListener('dragenter', ()=>{
            if(dragCard !== dropCard){
                dropCard = item
            }
        })
        item.addEventListener('dragleave', ()=>{
            dropCard = null
        })
        /* cardHolder.addEventListener('dragenter', handleDragEnter)
        cardHolder.addEventListener('dragleave', handleDragLeave)
        cardHolder.addEventListener('dragend', handleDragEnd)
        cardHolder.addEventListener('drop', handleDrop) */
        
    }) 
})
const functionOneCard = function () {
    if(select.value == 2){
        let randomValue = Math.floor(arrD.length * Math.random())
        cardHolder.insertAdjacentHTML('afterbegin', `<img class="imgCard" draggable="true" data-id = "1" src="${arrD[randomValue]}">`)
        items = cardHolder.childNodes
    }
    if(select.value == 3){
        let randomValue = Math.floor(arrH.length * Math.random())
        cardHolder.insertAdjacentHTML('afterbegin', `<img class="imgCard" draggable="true" data-id = "1" src="${arrH[randomValue]}">`)
        items = cardHolder.childNodes
    } 
}

buttonOne.addEventListener('click', function(){
    functionOneCard()
    items.forEach(item=>{
        item.addEventListener('dragstart', handlerDragStart)
        item.addEventListener('dragend', handlerDragEnd)
        item.addEventListener('drag', handlerDrag)
        item.addEventListener('dragenter', ()=>{
            if(dragCard !== dropCard){
                dropCard = item
            }
        })
        item.addEventListener('dragleave', ()=>{
            dropCard = null
        })
        /* cardHolder.addEventListener('dragenter', handleDragEnter)
        cardHolder.addEventListener('dragleave', handleDragLeave)
        cardHolder.addEventListener('dragend', handleDragEnd)
        cardHolder.addEventListener('drop', handleDrop) */
        
    }) 
})
cardHolder.addEventListener('click', function(event){
    if(event.target.dataset.id == 1){
        console.log(event.target.dataset.id)
        event.target.style.background = 'gray'
        event.target.dataset.id = 2
        event.stopPropagation()
    } else{
        console.log(event.target.dataset.id)
        event.target.dataset.id = 1
        event.target.style.background = '#fff'
        event.stopPropagation()
    }
    cardHolder.style.background = '#fff'
})

buttonDelete.addEventListener('click', function(){
    //без break косяк, удаляет, но выдает ошибку
    for(let index = 0; index < cardHolder.childNodes.length; index++){
        if(cardHolder.childNodes[index].dataset.id == 2){
            cardHolder.childNodes[index].remove()
            break
        }
    }
})


    cardHolder.addEventListener('dragenter', handlerDragenter)
    cardHolder.addEventListener('dragleave', handlerDragleave)
    cardHolder.addEventListener('dragover', handlerDragover)
    cardHolder.addEventListener('drop', handlerDrop)



function handlerDragStart(event) {
    /* dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML); */
    //event.dataTransfer.setData("imgCard", this.dataset.id)
    dragCard = this
    this.classList.add('imgCard--active')
    //console.log('dragStart')
  }

  function handlerDragEnd(event) {
    this.classList.remove('imgCard--active')
    //console.log('dragEnd')
    dragCard = null
}
function handlerDrag(event){
    //console.log('drag')
}
function handlerDragenter(event){
    this.classList.add('card-holder--active')
    //console.log('dragenter', this)
    event.preventDefault()
}
function handlerDragleave(event){
    this.classList.remove('card-holder--active')
    //console.log('dragleave', this)
}
function handlerDragover(event){
    //console.log('dragover')
    event.preventDefault();
}
function handlerDrop(event){
    //const dragFlag = event.dataTransfer.getData("imgCard")
    if(dropCard){
        if(dropCard.parentElement === dragCard.parentElement){
            const children = Array.from(dropCard.parentElement.children)
            const draggedIndex = children.indexOf(dragCard)
            const droppedIndex = children.indexOf(dropCard)
            if(draggedIndex>droppedIndex){
                dragCard.parentElement.insertBefore(dragCard, dropCard)
                console.log('Общий родитель')
            } else{
                dropCard.parentElement.insertBefore(dragCard, dropCard.nextElementSibling)
                console.log('Общий родитель')
            }
        }
    } else{
        this.append(dragCard)
    }
    //const imgCard = document.querySelector(`[data-id="${dragFlag}"]`)
    cardHolder.classList.remove('card-holder--active')
    
    
}
/* function handleDragOver(e) {
    if (e.preventDefault) {
      e.preventDefault();
    }
    return false;
  }
function handleDragEnter(e){
    this.classList.add('over')
}
function handleDragLeave(e){
    this.classList.remove('over')
}
function handleDrop(e) {
    e.stopPropagation(); // препятствует перенаправлению в браузере.
    if (dragSrcEl !== this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
      }
    return false;
  } */


