import { createWorkoutServer } from '../server connections/workouts.js';
import { closeModal, hideTrainingComponent } from './routineCreator.js';

// server URL
const url = `http://localhost:3000/tracker/workouts`;

const endTrainingBtn = document.querySelector('#end-routine-training');
const trainingContainer = document.querySelector('.routine-trainer-exercises');
const openRoutineModal = document.querySelector('.open-routine');

endTrainingBtn.addEventListener('click', () => {
    const exercises = createExercisesForServer(trainingContainer);
    const name = endTrainingBtn.parentElement.parentElement.firstChild.nextSibling.firstChild.nextSibling.textContent;
    const workout = new Workout(name, JSON.stringify(exercises));
    createWorkoutServer(workout, url);
    closeModal(openRoutineModal);
    hideTrainingComponent(trainingContainer);
});

class Workout {
    constructor(name, exercises) {
        this.name = name;
        this.exercises = exercises;
    }
}

function createExercisesForServer(container) {
    const serverExcercises = [];
    const excerciseContainers = Array.from(container.childNodes);
    excerciseContainers.forEach(cont => {
        const items = Array.from(cont.childNodes);
        const excercise = {};
        if (items[0].value === undefined) {
            excercise.name = items[0].textContent;
        } else {
            excercise.name = items[0].value;
        }
        items.forEach(item => {
            if (item.className !== 'set-container-header' && item.previousSibling && item.className !== 'add-set-btn') {
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

export { createExercisesForServer };