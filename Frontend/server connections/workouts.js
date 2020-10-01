const data = [];

// server URL
const url = `http://localhost:3000/tracker/workouts`;

function returnData() {
    return data;
}

function getAllWorkouts(url) {
    return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(json => {
            console.log(json.data);

            for (let i = 0; i < json.data.length; i++) {
                createData(json.data[i]);
            }

            return json.data;
        })
        .catch(err => {
            console.log(err);
        });
}

function deleteWorkoutServer(id) {
    fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            return response.json();
        })
        .then(json => {
            console.log(json);
        })
        .catch(err => {
            console.log(err);
        })
}

function createWorkoutServer(obj, url) {
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

function createData(item) {
    const obj = {
        id: item._id,
        name: item.name
    }
    data.push(obj);
}

export { getAllWorkouts, createWorkoutServer, returnData, deleteWorkoutServer };