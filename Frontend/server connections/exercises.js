
// get al routines fro the server
async function getAllExercises(container, url) {
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json.data;
    } catch (err) {
        console.log(err);
    }
}

export { getAllExercises };

