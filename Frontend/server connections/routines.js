// Send Routine to server
// Server URL
const url = `http://localhost:3000/tracker/routines`;

// array for tracking name and id
const data = [];

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


// push objects to data array
function createData(item) {
    const obj = {
        id: item._id,
        name: item.name
    }
    data.push(obj);
}

// get data array
function returnData() {
    return data;
}

// fetch for getting a single routine
function getRoutine(id) {
    return fetch(`${url}/${id}`)
        .then(response => {
            return response.json();
        })
        .then(json => {
            return json.data;
        })
        .catch(err => {
            console.log(err);
        });
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
            console.log(json.data);
        })
        .catch(err => {
            console.log(err);
        });
}



// fetch funtion for updating routine
function updateRoutineServer(id, obj) {
    fetch(`${url}/${id}`, {
        method: 'PUT',
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
    createData,
    returnData,
    getRoutine,
    updateRoutineServer
};