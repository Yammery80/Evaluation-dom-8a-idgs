'use strict';

// Declaración de utilidade s y referencias
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// Referencias a elementos del DOM

const form = $('#formTarea');
const inputTitulo = $('#inputTitulo');
const selectTag = $('#selectTag');

const listaTareas = $('#listaTareas');

//Agregar nuevas tareas

const buildTarea = ({title, tag}) => {

    const li = document.createElement('li');

    li.className = 'card';

    li.dataset.id = 't' + Date.now();
    li.dataset.tag = tag;
    li.dataset.fav = '0';

    li.innerHTML = `
        <div class="card__head">
            <span class="badge">${tag}</span>

            <div class="actions">
                <button class="icon" data-action="fav">☆</button>
                <button class="icon" data-action="done">✓</button>
                <button class="icon danger" data-action="del">🗑</button>
            </div>
        </div>

        <p class="card__title">${title}</p>
    `;

    return li;
};

//Eliminar tarjeta individual 

listaTareas.addEventListener('click',(e)=>{

    const btn = e.target.closest('button');
    if(!btn) return;

    const action = btn.dataset.action;
    const card = btn.closest('.card');

    if(!card) return;

    //eliminar

    if(action === 'del'){
        card.remove();
    }
    // completado de tarea

    if(action === 'done'){
        card.classList.toggle('is-done');
    }

    applyFilters();
    updateStats();
});



//Agregar tarea funcion

form.addEventListener('submit', (e)=>{

    e.preventDefault();

    const title = inputTitulo.value.trim();
    const tag = selectTag.value;

    if(!title) return;

    const task = buildTarea({title, tag});

    listaTareas.prepend(task);

    inputTitulo.value = '';
    inputTitulo.focus();

    applyFilters();
    updateStats();
});