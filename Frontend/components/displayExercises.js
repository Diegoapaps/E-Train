import { getAllExercises } from '../server connections/exercises.js';
const overlay = document.querySelector('.overlay');

// Display exercises
async function displayAllExcercises(container, url, isBtn, titleReference) {
    const exercises = await getAllExercises(container, url);
    const sortedExercises = exercises.sort((a, b) => a.name > b.name ? 1 : -1);
    sortedExercises.forEach(excer => displayExercise(excer, container, isBtn, titleReference));
}

// create each exercise element
function displayExercise(item, container, isBtn, titleReference) {
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

    if (isBtn === true) {
        const btn = document.createElement('button');
        btn.className = 'blue-style-btn';
        btn.textContent = '+';
        addToRoutineListener(btn, titleReference);
        div.appendChild(btn);
    }

    container.appendChild(div);
}

// filter by options
function filterByOption(selector, container) {
    const text = selector.options[selector.selectedIndex].textContent;
    const containers = Array.from(container.childNodes);

    if (text === 'Todos') {
        containers.forEach(cont => {
            cont.style.display = '';
        })
    } else {
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
}

// filter by input
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

// add exercise to routine
function addToRoutineListener(btn, titleReference) {
    btn.addEventListener('click', () => {
        addToRoutine(btn, titleReference);
    });
}

function addToRoutine(btn, titleReference) {
    const elements = Array.from(titleReference.childNodes);
    const txt = btn.parentElement.firstChild.textContent;

    elements.forEach(elt => {
        if (elt.firstChild.textContent === 'Ejercicio') {
            elt.firstChild.textContent = txt;
        }
    });

    closeModal(btn.parentElement.parentElement.parentElement);
    hideTrainingComponent(btn.parentElement.parentElement);
}

function closeModal(modal) {
    modal.style.transform = 'scale(0) translate(-50%, -50%)';
    overlay.style.display = 'none';
}

function hideTrainingComponent(elt) {
    const containers = Array.from(elt.childNodes);
    containers.forEach(container => container.parentElement.removeChild(container));
}

export { displayAllExcercises, displayExercise, filterItems, filterByOption };