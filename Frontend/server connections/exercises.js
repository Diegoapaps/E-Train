import { displayExercise } from '../components/exercises.js';

const url = `http://localhost:3000/tracker/excercises`;

// get al routines fro the server
function getAllExercises() {
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(json => {
            console.log(json.data);

            const exercises = json.data.sort((a, b) => a.name > b.name ? 1 : -1);

            exercises.forEach(excercise => displayExercise(excercise));
        })
        .catch(err => {
            console.log(err);
        });
}

export { getAllExercises };