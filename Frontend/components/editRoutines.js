import { closeModal, hideTrainingComponent, showModal } from './routineCreator.js';
import { returnData, getRoutine } from '../server connections/routines.js';
import { displayRoutine } from './openRoutine.js';
import { updateRoutineServer, deleteRoutine } from '../server connections/routines.js';

// get names and ids
const data = returnData();

const edit = true;

// edit training btn
const editTrainingBtn = document.querySelector('#edit-routine-training');
const editRoutineModal = document.querySelector('.edit-routine');
const editRoutineExercises = document.querySelector('.routine-edit-exercises');

// delete routine btn
const deleteRoutineBtn = document.querySelector('#delete-routine');

// display routine for editing
function editRoutine(btn, modal, container) {
    showModal(modal);
    const txt = btn.parentElement.firstChild.textContent;

    data.forEach(async item => {
        if (item.name === txt) {
            modal.firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling.value = txt;
            const routine = await getRoutine(item.id);
            const exercises = JSON.parse(routine.excercises);
            displayRoutine(exercises, container, edit);

            editTrainingBtn.addEventListener('click', () => editTraining(editRoutineExercises, editRoutineModal, item.id));
            deleteRoutineBtn.addEventListener('click', () => confirmDeleteRoutine(item.id));
        }
    });
}

// create updated routine for server
function editTraining(container, modal, id) {
    const obj = {};
    const nameInput = modal.firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling.value;
    obj.name = nameInput;

    const serverExercises = getEditComponents(container);
    obj.excercises = JSON.stringify(serverExercises);

    updateRoutineServer(id, obj);
    setTimeout(() => window.location.reload(), 2000);
}

// create updated routine for server
function getEditComponents(container) {
    const serverExcercises = [];
    const excerciseContainers = Array.from(container.childNodes);
    excerciseContainers.forEach(cont => {
        const items = Array.from(cont.childNodes);
        const excercise = {};
        excercise.name = items[0].value;
        items.forEach(item => {
            if (item.className !== 'set-container-header' && item.previousSibling && item.nextSibling) {
                const elements = Array.from(item.childNodes);
                const set = `Set ${elements[0].textContent}`;
                excercise[set] = {
                    anterior: elements[1].textContent,
                    kg: elements[2].value,
                    reps: elements[3].value
                };
            }
        });
        serverExcercises.push(excercise);
    });
    return serverExcercises;
}

// confirm elimination of routine
function confirmDeleteRoutine(id) {
    const confirmation = confirm('¿Seguro que quieres borrar esta rutina?');
    if (confirmation === true) {
        deleteRoutine(id);
        setTimeout(() => window.location.reload(), 2000);
    }
}







export { editRoutine, editTraining };