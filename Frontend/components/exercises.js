import { getAllExercises } from '../server connections/exercises.js';
getAllExercises();

// Display excercises
const exerciseContainer = document.querySelector('.exercise-list');

function displayExercise(item) {
    const div = document.createElement('div');
    const h3 = document.createElement('h3');

    h3.textContent = item.name;
    div.className = 'exercises-block';
    div.appendChild(h3);

    item.muscles.forEach(muscle => {
        const span = document.createElement('span');
        span.textContent = muscle;
        span.className = 'muscle-span';
        div.appendChild(span);
    });

    exerciseContainer.appendChild(div);

}

// filter excercises
const searchExerciseInput = document.querySelector('#search-exercise');

searchExerciseInput.addEventListener('input', () => {
    filterItems(exerciseContainer, searchExerciseInput.value);
})

function filterItems(container, input) {
    const text = input.toUpperCase();
    const containers = Array.from(container.childNodes);
    containers.forEach(item => {
        if (item.firstChild.innerHTML.toUpperCase().indexOf(text) > -1) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}

// filter exercises by muscle
const muscles = document.querySelector('#select-exercise');

muscles.addEventListener('change', () => {
    filterByOption(muscles, exerciseContainer);
});

function filterByOption(selector, container) {
    const text = selector.options[selector.selectedIndex].textContent;
    const containers = Array.from(container.childNodes);

    containers.forEach(cont => {
        const elts = Array.from(cont.childNodes);
        let show = false;
        elts.forEach(elt => {
            if (elt.textContent === text) {
                show = true;
                cont.style.display = '';
            }
        });
        if (show === false) {
            cont.style.display = 'none';
        }
    });
}

export { displayExercise };