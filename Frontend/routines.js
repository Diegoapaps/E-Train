// Routines
import { closeModal, hideTrainingComponent, showModal } from './routineCreator.js';

// 
const createRoutineBtn = document.querySelector('#create-routine-btn-modal');
const routineContainer = document.querySelector('.routine-container');
const routineModal = document.querySelector('.routines-modal');
const excercises = document.querySelector('.modal-excercises');
const routineTitleInput = document.querySelector('#routine-name');

createRoutineBtn.addEventListener('click', () => {
    createRoutine(routineTitleInput, routineModal, excercises);
});

function createRoutine(input, modalClosed, componentClosed) {
    const div = document.createElement('div');
    const routineTitle = document.createElement('h4');

    routineTitle.innerHTML = input.value;

    div.appendChild(routineTitle);
    routinePreview(div, componentClosed);
    createTrainBtn(div);
    routineContainer.appendChild(div);

    closeModal(modalClosed);
    hideTrainingComponent(componentClosed);
    input.value = '';
}

function createTrainBtn(container) {
    const trainBtn = document.createElement('button');
    trainBtn.innerHTML = 'Entrenar';
    trainBtn.className = 'button-blue-width-style';
    trainBtn.addEventListener('click', () => {
        openRoutine(trainBtn);
    });
    container.appendChild(trainBtn);
}

function routinePreview(container, array) {
    const ul = document.createElement('ul');
    const items = Array.from(array.childNodes);

    for (let i = 0; i < 3; i++) {
        const li = document.createElement('li');
        if (items[i] !== undefined) {
            li.innerHTML = items[i].firstChild.innerHTML;
            ul.appendChild(li);
        }
    }

    container.appendChild(ul);
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

export { createRoutine };