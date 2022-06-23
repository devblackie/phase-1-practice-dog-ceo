console.log('%c HI', 'color: firebrick')


document.addEventListener('DOMContentLoaded' ,function () {
    fetchDogsImg(),
    fetchBreedOptions();
})
function fetchDogsImg (){
    fetch("https://dog.ceo/api/breeds/image/random/4")
    .then(response => response.json())
    .then(data=>{
        let images = data.message
        images.forEach(image=>{
            loadImagestoDom(image)
        })
    })
}

function loadImagestoDom(image){
    let dogCont = document.getElementById('dog-image-container')
    let ourImage = document.createElement('img')
    ourImage.src = image
    dogCont.appendChild(ourImage)
}

function fetchBreedOptions() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
      .then(res => res.json())
      .then(results => {
  
        breeds = Object.keys(results.message);
        updateBreedLists(breeds);
        addBreedSelectors();
    });
}
  
function updateBreedLists(breeds) {
    let ul = document.querySelector('#dog-breeds');
    removeChildren(ul);
    breeds.forEach(breed => addBreed(breed));
}
  
function removeChildren(element) {
    let child = element.lastElementChild;
    while (child) {
      element.removeChild(child);
      child = element.lastElementChild;
    }
}
  
function selectBreedsStartingWith(letter) {
    updateBreedLists(breeds.filter(breed => breed.startsWith(letter)));
}
  
function addBreedSelectors() {
    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', function (event) {
      selectBreedsStartingWith(event.target.value);
    });
}

function addBreed(breed) {
    let ul = document.querySelector('#dog-breeds');
    let li = document.createElement('li');
    li.innerText = breed;
    li.style.cursor = 'pointer';
    ul.appendChild(li);
    li.addEventListener('click', updateColor);
}
  
function updateColor(event) {
    event.target.style.color = 'palevioletred';
}
