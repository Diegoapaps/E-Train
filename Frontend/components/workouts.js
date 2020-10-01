import { getAllWorkouts, returnData } from '../server connections/workouts.js';
import { deleteWorkoutServer } from '../server connections/workouts.js';

// server URL
const url = `http://localhost:3000/tracker/workouts`;

// containers
const workoutContainer = document.querySelector('.workout-container');

async function displayWorkouts(url, container) {
    const workouts = await getAllWorkouts(url);
    workouts.forEach(workout => displayWorkout(workout, container));
}

function displayWorkout(item, container) {
    const div = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    const h4 = document.createElement('h4');
    const h42 = document.createElement('h4');
    const dltBtn = document.createElement('button');

    dltBtn.setAttribute('name', item._id);

    div.className = 'workout-block';
    div2.className = 'workout-block-grid';
    div3.className = 'dlt-workout-btn';
    h3.textContent = item.name;
    h4.textContent = 'Ejercicios';
    h42.textContent = 'Mejor Serie';
    dltBtn.textContent = 'Eliminar';
    dltBtn.className = 'cancel-btn';

    addDeleteWorkoutListener(dltBtn);

    const newDate = new Date(item.date);
    const formatedDate = getDate(newDate);

    p.textContent = formatedDate;

    div3.appendChild(h3);
    div3.appendChild(dltBtn);
    div.appendChild(div3);
    div.appendChild(p);
    div2.appendChild(h4);
    div2.appendChild(h42);

    const exercises = JSON.parse(item.exercises);

    displayExercises(div2, exercises);

    div.appendChild(div2);
    container.appendChild(div);
}

function getDate(date) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`
}

function displayExercises(container, arr) {
    arr.forEach(exer => {
        const p2 = document.createElement('p');
        const p3 = document.createElement('p');
        const keys = Object.keys(exer);
        const values = Object.values(exer);
        const title = values[0];
        p2.textContent = `${keys.length - 1} x ${title}`;
        container.appendChild(p2);

        const objectValues = [];

        values.forEach(val => {
            if (typeof val === 'object') {
                objectValues.push(val);
            }
        });

        const kgs = [];
        const reps = [];

        objectValues.forEach(val => {
            kgs.push(Number(val.kg));
            reps.push(Number(val.reps));
        });

        const maxKg = Math.max.apply(null, kgs);
        const index = kgs.indexOf(maxKg);

        p3.textContent = `${maxKg} kg x ${reps[index]}`;
        container.appendChild(p3);
    });
}

function addDeleteWorkoutListener(btn) {
    btn.addEventListener('click', () => {
        const data = returnData();
        const txt = btn.parentElement.firstChild.textContent;
        const confirmation = confirm('¿Seguro que quieres borrar este entrenamiento?');
        if (confirmation === true) {
            deleteWorkout(data, txt, btn.getAttribute('name'));
        }
    });
}

function deleteWorkout(arr, txt, id) {
    deleteWorkoutServer(id);

}

displayWorkouts(url, workoutContainer);