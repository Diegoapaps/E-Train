import { getAllExercises } from '../server connections/exercises.js';
import { displayAllExcercises, displayExercise, filterByOption, filterItems } from './displayExercises.js';

// Display excercises
const url = `http://localhost:3000/tracker/excercises`;
const exerciseContainer = document.querySelector('.exercise-list');
const isBtn = false;

displayAllExcercises(exerciseContainer, url, isBtn);

// filter excercises
const searchExerciseInput = document.querySelector('#search-exercise');
searchExerciseInput.addEventListener('input', () => {
    filterItems(exerciseContainer, searchExerciseInput.value);
})

// filter exercises by muscle
const muscles = document.querySelector('#select-exercise');
muscles.addEventListener('change', () => {
    filterByOption(muscles, exerciseContainer);
});
