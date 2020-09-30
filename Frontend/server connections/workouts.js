
function getAllWorkouts(url) {
    return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(json => {
            console.log(json.data);
            return json.data;
        })
        .catch(err => {
            console.log(err);
        });
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

export { getAllWorkouts, createWorkoutServer };