// Routine creator

// display modal
const routineModal = document.querySelector('.routines-modal');
const createRoutineBtn = document.querySelector('#create-routine-btn');
const overlay = document.querySelector('.overlay');

createRoutineBtn.addEventListener('click', () => {
    showModal(routineModal);
});

function showModal(modal) {
    modal.style.transform = 'scale(1) translate(-50%, -50%)';
    overlay.style.display = 'block';
}

// Close modal
const cancelModal = document.querySelector('#cancel-routine-creator');
cancelModal.addEventListener('click', () => {
    closeModal(routineModal);
});

function closeModal(modal) {
    modal.style.transform = 'scale(0) translate(-50%, -50%)';
    overlay.style.display = 'none';
}

// Add modal excercise
const excerciseContainer = document.querySelector('.modal-excercises');
const addModalExcerciseBtn = document.querySelector('#add-excercise-routine-creator');

addModalExcerciseBtn.addEventListener('click', () => {
    addModalExcercise(excerciseContainer);
});

// Delete modal routine creator
const deleteModalRoutine = document.querySelector('#cancel-routine-creator');
deleteModalRoutine.addEventListener('click', () => {
    hideTrainingComponent(excerciseContainer);
});

function hideTrainingComponent(elt) {
    const containers = Array.from(elt.childNodes);
    containers.forEach(container => container.parentElement.removeChild(container));
}

import {
    addFastTrainExcercise as addModalExcercise,
    createHeadersForFastTrain,
    createInputsFastTrain,
    addSetFunction,
    appendChildOfArray,
    deleteSet,
    deleteExcercise,
    deleteExcerciseListener
} from './fastTrain.js';

export { showModal, closeModal, hideTrainingComponent };