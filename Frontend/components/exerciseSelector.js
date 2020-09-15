// close exercise selector
import { showModal, closeModal, hideTrainingComponent } from './routineCreator.js';
const exerciseListContainer = document.querySelector('.select-exercise');
const exerciseList = document.querySelector('.exercise-select-list');
const fastTrainContainer = document.querySelector('.fast-train-excercises');
const routineCreaatorContainer = document.querySelector('.modal-excercises');
const cancelExerciseSelector = document.querySelector('#cancel-exercise-selector');

cancelExerciseSelector.addEventListener('click', () => {
    closeModal(exerciseListContainer);
    hideTrainingComponent(exerciseList);
    checkForContainer(fastTrainContainer);
    checkForContainer(routineCreaatorContainer);
});

function checkForContainer(container) {
    if (container.firstChild !== null) {
        container.removeChild(container.lastChild);
    }
}

// Add Filters
import { filterByOption, filterItems } from './displayExercises.js';

const searchExerciseInput = document.querySelector('#search-exercise');
searchExerciseInput.addEventListener('input', () => {
    filterItems(exerciseList, searchExerciseInput.value);
})

const muscles = document.querySelector('#select-exercise');
muscles.addEventListener('change', () => {
    filterByOption(muscles, exerciseList);
});


