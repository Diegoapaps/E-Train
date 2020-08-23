// Hamburger menu
const hamburgerMenu = document.querySelector('.hamburger-menu');
const sideMenu = document.querySelector('.hamburger');
const overlay = document.querySelector('.overlay');
let displayed = false;

hamburgerMenu.addEventListener('click', showMenu);

function showMenu() {
    if (displayed === false) {
        sideMenu.style.left = '65%';
        sideMenu.style.width = '35%';
        overlay.style.display = 'block';
        displayed = true;
    } else {
        sideMenu.style.left = '100%';
        sideMenu.style.width = '0%';
        overlay.style.display = 'none';
        displayed = false;
    }
}

// Fast train

// Show fast train
const addNewTraining = document.querySelector('#fast-train-button');
const newTrainingComponent = document.querySelector('.fast-train-component');
const fastTrain = document.querySelector('.fast-train');

addNewTraining.addEventListener('click', showTrainingComponent);

function showTrainingComponent() {
    newTrainingComponent.style.display = 'block';
    fastTrain.style.display = 'none';
}

// cancel fast train
const deleteNewTraining = document.querySelector('#fast-train-cancel');

deleteNewTraining.addEventListener('click', hideTrainingComponent);

function hideTrainingComponent() {
    newTrainingComponent.style.display = 'none';
    fastTrain.style.display = 'block';

    const containers = Array.from(excerciseContainer.childNodes);
    containers.forEach(container => container.parentElement.removeChild(container));
}

// add excercise to fast train
const excerciseContainer = document.querySelector('.fast-train-excercises');
const addFastTrainExcerciseBtn = document.querySelector('#add-fast-train-excercise');

addFastTrainExcerciseBtn.addEventListener('click', addFastTrainExcercise);

function addFastTrainExcercise() {
    const div = document.createElement('div');
    div.className = 'fast-train-excercises-grid';

    createHeadersForFastTrain(div);
}

// create the row headers for an excercise
function createHeadersForFastTrain(elt) {
    const dltSetHeader = document.createElement('h4');
    const sets = document.createElement('h4');
    const anterior = document.createElement('h4');
    const kg = document.createElement('h4');
    const reps = document.createElement('h4');
    const addSet = document.createElement('button');
    const titles = [addSet, sets, anterior, kg, reps, dltSetHeader];

    dltSetHeader.innerHTML = '';
    sets.innerHTML = 'Set';
    anterior.innerHTML = 'Anterior';
    kg.innerHTML = 'Kg';
    reps.innerHTML = 'Reps';
    addSet.innerHTML = 'Añadir Set';
    addSet.className = 'grid-btn-span';

    addSetFunction(addSet);

    titles.forEach(title => appendChildOfArray(title, elt));
    excerciseContainer.appendChild(elt);

    let setInnerHtml = 1;

    createInputsFastTrain(elt);
}

// create the inputs for a set
function createInputsFastTrain(elt) {
    const dltSet = document.createElement('button');
    const setNumber = document.createElement('span');
    const anteriorNumber = document.createElement('span');
    const kgNumber = document.createElement('input');
    const repNumber = document.createElement('input');
    const inputs = [setNumber, anteriorNumber, kgNumber, repNumber, dltSet];

    dltSet.innerHTML = 'X';
    dltSet.className = 'delete-set';
    dltSet.addEventListener('click', function () {
        deleteSet(dltSet);
    });

    kgNumber.setAttribute('type', 'number');
    repNumber.setAttribute('type', 'number');

    inputs.forEach(input => appendChildOfArray(input, elt));

    if (setNumber.previousSibling.innerHTML === '') {
        setNumber.innerHTML = 1;
    } else {
        const arr = Array.from(setNumber.parentElement.childNodes);
        const index = arr.indexOf(setNumber) - 5;
        setNumber.innerHTML = Number(arr[index].innerHTML) + 1;
    }
    anteriorNumber.innerHTML = '10';
}

function appendChildOfArray(item, elt) {
    elt.appendChild(item);
}

function addSetFunction(btn) {
    btn.addEventListener('click', () => {
        createInputsFastTrain(btn.parentElement);
    });
}

// delete set function
function deleteSet(item) {
    const elements = Array.from(item.parentElement.childNodes);
    const index = elements.indexOf(item);
    const filtered = elements.filter(elt => elements.indexOf(elt) > index - 5 && elements.indexOf(elt) <= index);

    for (let i = 0; i < elements.length; i++) {
        const elt = elements[i];
        const num = Number(elt.innerHTML);
        if (elt.innerHTML !== 'Añadir Set') {
            if (elt.previousSibling.innerHTML === 'X' && elements.indexOf(elt) > index) {
                elt.innerHTML = num - 1;
            }
        }
    }

    if (elements.length !== 11) {
        filtered.forEach(input => input.parentElement.removeChild(input));
    }
}




