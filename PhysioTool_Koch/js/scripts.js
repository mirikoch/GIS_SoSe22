const title = document.getElementById("shop-item-title").textContent;
const image = document.getElementById('shop-item-image').src;
const series = document.getElementById('series').value;
const repetition = document.getElementById('repetition').value;
const dauer = document.getElementById('dauer').value;
const comment = document.getElementById('comment').value;

let exercises = [];


const addExercise = (e) => {
    console.log("run");
    e.preventDefault();

    let exercise = {
        title: title,
        image: image,
        series: series,
        repetition: repetition,
        dauer: dauer,
        comment: comment
    };
    console.log(exercise);

    sendJSONStringWithPOST(
        'http://localhost:3000/',
        JSON.stringify(exercise)
    );

    exercises.push(exercise);
    document.querySelector('input').reset;

    let cart = document.querySelector('#cart');
    cart.textContent = '\n' + JSON.stringify(exercises, '\t',2);


    // send json data to localstorage
    localStorage.setItem('ExerciseArray', JSON.stringify(exercises));

    console.log(JSON.parse(localStorage.getItem('ExerciseArray')));
    displayExercise();
};


function displayExercise() {
    let exerciseArray = JSON.parse(localStorage.getItem('ExerciseArray'));
    console.log(exerciseArray);

    for (let i = 0; i < exerciseArray.length; i++) {
        let plan = `
          <div class="cart-item cart-column">
          <img class="cart-item-image" src="${document.getElementById('shop-item-image').src}
            " width="100" height="100">
          <span class="dropdown-cart-item-title"> 
            ${document.getElementById('shop-item-title').textContent} </span>
          </div>
                  
          <div class="cart-quantity cart-column">
              <button class="btn btn-danger" type="button">ENTFERNEN</button>
          </div> 
      `;
        plan.innerHTML += plan;
    }
}


const btns = document.getElementsByClassName('shop-item-button');

for (btn of btns) {
    btn.addEventListener('click', addExercise);
}


// Server-Funktionen
async function sendJSONStringWithPOST(url, jsonString) {
    const response = await fetch(url, {
        method: 'post',
        body: jsonString,
    });
    const text = await response.text();
    console.log(JSON.parse(text));
}