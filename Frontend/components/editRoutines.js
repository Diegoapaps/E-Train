import { closeModal, hideTrainingComponent, showModal } from './routineCreator.js';
import { returnData, getRoutine } from '../server connections/routines.js';
import { displayRoutine } from './openRoutine.js';
import { updateRoutineServer, deleteRoutine } from '../server connections/routines.js';
import { createExercisesForServer } from './createWorkout.js';

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

    const serverExercises = createExercisesForServer(container);
    obj.excercises = JSON.stringify(serverExercises);

    updateRoutineServer(id, obj);
    setTimeout(() => window.location.reload(), 2000);
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