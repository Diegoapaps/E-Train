// Send Routine to server
// Server URL
const url = `http://localhost:3000/tracker/routines`;

import { displayRoutines, routinePreview } from '../components/routines.js';

// get al routines fro the server
function getAllRoutines() {
    fetch(url)
        .then(response => {
            return response.json();
        })
        .then(json => {
            console.log(json.data);

            for (let i = 0; i < json.data.length; i++) {
                displayRoutines(json.data[i]);
                createData(json.data[i]);
            }
        })
        .catch(err => {
            console.log(err);
        });
}

// array for tracking name and id
const data = [];

// push objects to data array
function createData(item) {
    const obj = {
        id: item._id,
        name: item.nombre
    }
    data.push(obj);
}

// fetch function for creating routine
function createRoutineServer(obj) {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            return response.json();
        })
        .then(json => {
            console.log(json);
        })
        .catch(err => {
            console.log(err);
        });
}

export {
    createRoutineServer,
    getAllRoutines,
    createData
};