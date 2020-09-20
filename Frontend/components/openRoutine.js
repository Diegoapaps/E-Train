import { closeModal, hideTrainingComponent, showModal } from './routineCreator.js';
import { returnData, getRoutine } from '../server connections/routines.js';
import { deleteSet } from './fastTrain.js';

// get names and ids
const data = returnData();

// Open routine
const edit = false;

function openRoutine(btn, modal, container) {
    showModal(modal);
    const txt = btn.parentElement.firstChild.textContent;

    data.forEach(async item => {
        if (item.name === txt) {
            modal.firstChild.nextSibling.firstChild.nextSibling.textContent = txt;
            const routine = await getRoutine(item.id);
            const exercises = JSON.parse(routine.excercises);
            displayRoutine(exercises, container, edit);
        }
    });
}

// Display routine
function displayRoutine(arr, container, isEdit) {
    arr.forEach(elt => addTrainerExcercise(elt, container, isEdit));
}

function addTrainerExcercise(item, container, isEdit) {
    const div = document.createElement('div');
    div.className = 'fast-train-excercises-grid';

    createHeadersForTrainer(item, div, isEdit);

    container.appendChild(div);
}

function createHeadersForTrainer(item, container, isEdit) {
    const div = document.createElement('div');
    const sets = document.createElement('h4');
    const excerciseTitle = document.createElement('h3');
    const anterior = document.createElement('h4');
    const kg = document.createElement('h4');
    const reps = document.createElement('h4');
    kg.innerHTML = 'Kg';
    reps.innerHTML = 'Reps';
    anterior.innerHTML = 'Anterior';
    div.className = 'set-container-header';
    sets.innerHTML = 'Set';
    const keys = Object.keys(item);

    if (isEdit === true) {
        const excerciseTitle = document.createElement('input');
        const deletePlaceholder = document.createElement('h4');
        const addSet = document.createElement('button');
        addSetFunction(addSet, keys, container, isEdit);
        addSet.innerHTML = 'Añadir Set';
        addSet.className = 'add-set-btn';
        excerciseTitle.setAttribute('type', 'text');
        excerciseTitle.value = item.name;
        const titles = [sets, anterior, kg, reps, deletePlaceholder];
        titles.forEach(title => div.appendChild(title));
        container.appendChild(excerciseTitle);
        container.appendChild(div);
        container.appendChild(addSet);

        for (let i = 1; i < keys.length; i++) {
            createInputsForTrainer(keys[i], container, isEdit, addSet);
        }
    } else {
        excerciseTitle.innerHTML = item.name;
        const titles = [sets, anterior, kg, reps];
        titles.forEach(title => div.appendChild(title));
        container.appendChild(excerciseTitle);
        container.appendChild(div);

        for (let i = 1; i < keys.length; i++) {
            createInputsForTrainer(keys[i], container, isEdit);
        }
    }

}

function createInputsForTrainer(item, container, isEdit, refEl) {
    const setNumber = document.createElement('span');
    const div = document.createElement('div');
    const anteriorNumber = document.createElement('span');
    const kgNumber = document.createElement('input');
    const repNumber = document.createElement('input');
    div.className = 'set-container';
    setNumber.textContent = item[4];
    kgNumber.setAttribute('type', 'number');
    repNumber.setAttribute('type', 'number');
    anteriorNumber.textContent = '10';

    if (isEdit === true) {
        const dltSet = document.createElement('button');
        dltSet.innerHTML = 'X';
        dltSet.className = 'delete-set';
        dltSet.addEventListener('click', function () {
            deleteSet(dltSet);
        });
        const inputs = [setNumber, anteriorNumber, kgNumber, repNumber, dltSet];
        inputs.forEach(input => div.appendChild(input));
    } else {
        const inputs = [setNumber, anteriorNumber, kgNumber, repNumber];
        inputs.forEach(input => div.appendChild(input));
    }

    container.insertBefore(div, refEl);
}

function addSetFunction(btn, arr, container, isEdit) {
    btn.addEventListener('click', () => {
        const index = btn.parentElement.childNodes.length - 2;
        createInputsForTrainer(`Set ${index}`, container, isEdit, btn.parentElement.lastChild);
    });
}

export { openRoutine, displayRoutine };