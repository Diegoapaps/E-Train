// Routines
import { closeModal, hideTrainingComponent, showModal } from './routineCreator.js';
import { openRoutine } from './openRoutine.js';
import { editRoutine, editTraining } from './editRoutines.js';
import { createExercisesForServer } from './createWorkout.js';

// Containers
const createRoutineBtn = document.querySelector('#create-routine-btn-modal');
const routineContainer = document.querySelector('.routine-container');
const routineModal = document.querySelector('.routines-modal');
const excercises = document.querySelector('.modal-excercises');
const routineTitleInput = document.querySelector('#routine-name');

createRoutineBtn.addEventListener('click', () => {
    createRoutine(routineTitleInput, routineModal, excercises);
});

// Routine constructor
class Routine {
    constructor(name, excercises) {
        this.name = name;
        this.excercises = excercises;
    }
}

// create a routine
function createRoutine(input, modalClosed, componentClosed) {
    // Create excercises for routine in the server
    const serverExcercises = createExercisesForServer(componentClosed);

    const excerciseContainers = Array.from(componentClosed.childNodes);

    // create object for displaying routine excercises
    const excerciseObjects = [];

    excerciseContainers.forEach(excer => {
        const obj = {};
        obj.name = excer.firstChild.innerHTML;
        excerciseObjects.push(obj);
    });


    // create routine for the server
    const routine = new Routine(input.value, JSON.stringify(serverExcercises));
    createRoutineServer(routine);
    displayCreatedRoutine(excerciseObjects, input);

    // hide components
    closeModal(modalClosed);
    hideTrainingComponent(componentClosed);
    input.value = '';
}

const routineTrainer = document.querySelector('.open-routine');
const routineTrainerExercises = document.querySelector('.routine-trainer-exercises');

// create btn for routine
function createTrainBtn(container) {
    const trainBtn = document.createElement('button');
    trainBtn.innerHTML = 'Entrenar';
    trainBtn.className = 'button-blue-width-style';
    trainBtn.addEventListener('click', () => {
        openRoutine(trainBtn, routineTrainer, routineTrainerExercises);
    });
    container.appendChild(trainBtn);
}

// cancel routine trainer
const cancelRoutineTrainer = document.querySelector('#routine-train-cancel');
cancelRoutineTrainer.addEventListener('click', () => {
    closeModal(routineTrainer);
    hideTrainingComponent(routineTrainerExercises);
});

// cancel edit routine
const cancelEditRoutine = document.querySelector('#routine-edit-cancel');
cancelEditRoutine.addEventListener('click', () => {
    closeModal(editRoutineModal);
    hideTrainingComponent(editRoutineExercises);
});

// edit btn
const editRoutineModal = document.querySelector('.edit-routine');
const editRoutineExercises = document.querySelector('.routine-edit-exercises');

function createEditBtn(container) {
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.addEventListener('click', () => {
        editRoutine(editBtn, editRoutineModal, editRoutineExercises);
    });
    container.appendChild(editBtn);
}


// for each routine create the DOM element
function displayRoutines(block) {
    const div = document.createElement('div');
    const routineTitle = document.createElement('h4');

    div.className = 'routine-display-container';
    routineTitle.innerHTML = block.name;

    div.appendChild(routineTitle);
    createEditBtn(div);

    if (block.excercises !== undefined) {
        const excercisesArray = JSON.parse(block.excercises);
        routinePreview(excercisesArray, div);
    }

    createTrainBtn(div);
    routineContainer.appendChild(div);
}

// preview
function routinePreview(arr, container) {
    const ul = document.createElement('ul');

    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = arr[i].name;
        ul.appendChild(li);
    }

    container.appendChild(ul);
}

// display routine when created
function displayCreatedRoutine(arr, input) {
    const div = document.createElement('div');
    const routineHeader = document.createElement('h4');

    routineHeader.innerHTML = input.value;
    div.appendChild(routineHeader);
    routinePreview(arr, div);
    createTrainBtn(div);

    routineContainer.appendChild(div);
}

// Display routines from the server
import {
    createRoutineServer,
    getAllRoutines,
    createData
} from '../server connections/routines.js';

// get routines from server and display them 
getAllRoutines();

// exports
export { createRoutine, displayRoutines, routinePreview };
