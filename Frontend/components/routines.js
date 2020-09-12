// Routines
import { closeModal, hideTrainingComponent, showModal } from './routineCreator.js';

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
    const serverExcercises = [];
    const excerciseContainers = Array.from(componentClosed.childNodes);
    excerciseContainers.forEach(cont => {
        const items = Array.from(cont.childNodes);
        const excercise = {};
        excercise.name = items[0].innerHTML;
        items.forEach(item => {
            if (item.className !== 'set-container-header' && item.previousSibling) {
                const elements = Array.from(item.childNodes);
                const set = `Set ${elements[0].innerHTML}`;
                excercise[set] = {
                    anterior: elements[1].innerHTML,
                    kg: elements[2].value,
                    reps: elements[3].value
                };
            }
        });
        serverExcercises.push(excercise);
    });

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

// create btn for routine
function createTrainBtn(container) {
    const trainBtn = document.createElement('button');
    trainBtn.innerHTML = 'Entrenar';
    trainBtn.className = 'button-blue-width-style';
    trainBtn.addEventListener('click', () => {
        openRoutine(trainBtn);
    });
    container.appendChild(trainBtn);
}

// Open routine
const routineTrainer = document.querySelector('.open-routine');
const routineTitle = document.querySelector('#routine-title');

function openRoutine(btn) {
    showModal(routineTrainer);
    const txt = btn.parentElement.firstChild.innerHTML;
    routineTitle.innerHTML = txt;
}

// cancel routine trainer
const cancelRoutineTrainer = document.querySelector('#routine-train-cancel');
cancelRoutineTrainer.addEventListener('click', () => {
    closeModal(routineTrainer);
});

// for each routine create the DOM element
function displayRoutines(block) {
    const div = document.createElement('div');
    const routineTitle = document.createElement('h4');

    routineTitle.innerHTML = block.name;

    div.appendChild(routineTitle);

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
