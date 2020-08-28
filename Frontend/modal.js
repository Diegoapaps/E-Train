// Modal

// display modal
const routineModal = document.querySelector('.routines-modal');
const createRoutineBtn = document.querySelector('#create-routine-btn');
const overlay = document.querySelector('.overlay');

createRoutineBtn.addEventListener('click', showModal);

function showModal() {
    routineModal.style.transform = 'scale(1) translate(-50%, -50%)';
    overlay.style.display = 'block';
}

// Close modal
const cancelModal = document.querySelector('#cancel-routine-creator');
cancelModal.addEventListener('click', closeModal);

function closeModal() {
    routineModal.style.transform = 'scale(0) translate(-50%, -50%)';
    overlay.style.display = 'none';
}

// Add modal excercise
const excerciseContainer = document.querySelector('.modal-excercises');
const addModalExcercise = document.querySelector('#add-excercise-routine-creator');
addModalExcercise.addEventListener('click', () => {
    addFastTrainExcercise(excerciseContainer);
});

// Delete modal routine creator
const deleteModalRoutine = document.querySelector('#cancel-routine-creator');
deleteModalRoutine.addEventListener('click', hideTrainingComponent);

function hideTrainingComponent() {
    const containers = Array.from(excerciseContainer.childNodes);
    containers.forEach(container => container.parentElement.removeChild(container));
}

import {
    addFastTrainExcercise,
    createHeadersForFastTrain,
    createInputsFastTrain,
    appendChildOfArray,
    addSetFunction,
    deleteSet,
    deleteExcerciseListener,
    deleteExcercise
} from './fastTrain.js';