// Hamburger menu
import { showMenu, addHamburgerListener } from './hamburgerMenu.js';
addHamburgerListener();

// Fast train

// Show fast train
import { showModal, closeModal, hideTrainingComponent } from './routineCreator.js';

const addNewTraining = document.querySelector('#fast-train-button');
const newTrainingComponent = document.querySelector('.fast-train-component');
const fastTrain = document.querySelector('.fast-train');
const excerciseContainer = document.querySelector('.fast-train-excercises');

addNewTraining.addEventListener('click', (showTrainingComponent => {
    showModal(newTrainingComponent);
}));

// cancel fast train
const deleteNewTraining = document.querySelector('#fast-train-cancel');

deleteNewTraining.addEventListener('click', () => {
    closeModal(newTrainingComponent);
    hideTrainingComponent(excerciseContainer);
});

// add excercise to fast train
const addFastTrainExcerciseBtn = document.querySelector('#add-fast-train-excercise');

addFastTrainExcerciseBtn.addEventListener('click', () => {
    addFastTrainExcercise(excerciseContainer);
});

function addFastTrainExcercise(container) {
    const div = document.createElement('div');
    div.className = 'fast-train-excercises-grid';

    createHeadersForFastTrain(div, container);
}

// create the row headers for an excercise
function createHeadersForFastTrain(elt, item) {
    const sets = document.createElement('h4');
    const anterior = document.createElement('h4');
    const kg = document.createElement('h4');
    const reps = document.createElement('h4');
    const addSet = document.createElement('button');
    const dltExcercise = document.createElement('button');
    const titles = [sets, anterior, kg, reps, dltExcercise];

    const div = document.createElement('div');
    const div2 = document.createElement('div');
    div.className = 'set-container-header';
    div2.className = 'set-container-header';

    dltExcercise.innerHTML = 'X';
    dltExcercise.className = 'dlt-excercise-btn';
    sets.innerHTML = 'Set';
    anterior.innerHTML = 'Anterior';
    kg.innerHTML = 'Kg';
    reps.innerHTML = 'Reps';
    addSet.innerHTML = 'Añadir Set';
    addSet.className = 'add-set-btn';

    deleteExcerciseListener(dltExcercise);
    addSetFunction(addSet);

    titles.forEach(title => appendChildOfArray(title, div));
    elt.appendChild(div);

    item.appendChild(elt);

    div2.appendChild(addSet);
    elt.appendChild(div2);
    createInputsFastTrain(elt, div2);
}

// create the inputs for a set
function createInputsFastTrain(elt, refEl) {
    const dltSet = document.createElement('button');
    const setNumber = document.createElement('span');
    const anteriorNumber = document.createElement('span');
    const kgNumber = document.createElement('input');
    const repNumber = document.createElement('input');
    const inputs = [setNumber, anteriorNumber, kgNumber, repNumber, dltSet];
    const div = document.createElement('div');

    div.className = 'set-container';

    dltSet.innerHTML = 'X';
    dltSet.className = 'delete-set';
    dltSet.addEventListener('click', function () {
        deleteSet(dltSet);
    });

    kgNumber.setAttribute('type', 'number');
    repNumber.setAttribute('type', 'number');

    inputs.forEach(input => appendChildOfArray(input, div));
    elt.insertBefore(div, refEl);

    anteriorNumber.innerHTML = '10';

    findSetNumber(setNumber);

}

function findSetNumber(elt) {
    const counters = Array.from(elt.parentElement.parentElement.childNodes);
    const index = counters.indexOf(elt.parentElement);
    elt.innerHTML = index;

}

function appendChildOfArray(item, elt) {
    elt.appendChild(item);
}

function addSetFunction(btn) {
    btn.addEventListener('click', () => {
        createInputsFastTrain(btn.parentElement.parentElement, btn.parentElement);
    });
}

// delete set function
function deleteSet(item) {
    if (item.parentElement.previousSibling.className !== 'set-container-header') {
        item.parentElement.parentElement.removeChild(item.parentElement);
    }
}

// delete excercise
function deleteExcerciseListener(btn) {
    btn.addEventListener('click', () => {
        deleteExcercise(btn);
    });
}

function deleteExcercise(btn) {
    const elements = Array.from(btn.parentElement.parentElement.childNodes);
    elements.forEach(elt => elt.parentElement.removeChild(elt));
}

export {
    addFastTrainExcercise,
    createHeadersForFastTrain,
    createInputsFastTrain,
    addSetFunction,
    appendChildOfArray,
    deleteSet,
    deleteExcerciseListener,
    deleteExcercise
};



