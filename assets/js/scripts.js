const proyects = [
    {
        name: 'Casa de campo',
        description: 'Un lugar ideal para descansar de la ciudad.',
        src: 'assets/img/casa-de-campo.jpg',
        rooms: 2,
        meters: 170
    },
    {
        name: 'Casa de playa',
        description: 'Despierta tus días oyendo el océano.',
        src: 'assets/img/casa-playa.jpg',
        rooms: 2,
        meters: 130
    },
    {
        name: 'Casa en el centro',
        description: 'Tan cerca de ti todo lo que necesitas.',
        src: 'assets/img/casa-centro.jpg',
        rooms: 1,
        meters: 80
    },
    {
        name: 'Casa de rodante',
        description: 'Conviértete en un nómada del mundo sin salir de tu casa.',
        src: 'assets/img/casa-rodante.jpg',
        rooms: 1,
        meters: 6
    },
    {
        name: 'Departamento',
        description: 'Desde las alturas todo se ve mejor.',
        src: 'assets/img/departamento.jpg',
        rooms: 3,
        meters: 200
    },
    {
        name: 'Mansión',
        description: 'Vive una vida lujosa en la mansión de tus sueños.',
        src: 'assets/img/mansion.jpg',
        rooms: 5,
        meters: 500
    }
];

const inputRooms = document.getElementById('number-rooms');
const inputSince = document.getElementById('mts-since');
const inputUntil = document.getElementById('mts-until');
const btnSearch = document.getElementById('btn-search');
const btnReset = document.getElementById('btn-reset');
const content = document.getElementById('lista-proyectos');
const elemTotal = document.getElementById('total');
let countTotal = proyects.length;
let html = '';

init();

btnSearch.addEventListener('click', function(){
    let rooms = Number(inputRooms.value);
    let since = Number(inputSince.value);
    let until = Number(inputUntil.value);

    if(rooms != '' && since != '' && until != ''){

        spinner();
        setTimeout(function(){
            html = '';
            content.innerHTML = '';
            elemTotal.innerHTML = '';
            countTotal = 0;
            for (const proyect of proyects) {
                if(proyect.rooms === rooms && proyect.meters >= since &&  proyect.meters <= until){
                    countTotal++;
                    html += getProyect(proyect.name, proyect.description, proyect.src, proyect.rooms, proyect.meters);
                }
            }
            content.innerHTML = html;
            elemTotal.innerHTML = countTotal;
            notResult(countTotal);
        },2500);

    }else{
        alert(`Faltan campos por completar.`);
    }

});

btnReset.addEventListener('click', function(){
    init();
    resetForm();
});


function resetForm(){
    inputRooms.value = '';
    inputSince.value = '';
    inputUntil.value = '';
}

function init(){
    html = '';
    content.innerHTML = '';
    elemTotal.innerHTML = proyects.length;
    for(const proyect of proyects) {
        html += getProyect(proyect.name, proyect.description, proyect.src, proyect.rooms, proyect.meters);
    }
    content.innerHTML = html;
}

function notResult(countProyect){
    if(countProyect === 0){
        content.innerHTML = `<div class="alert alert-info" role="alert">
        <i class="fa-solid fa-circle-info me-1"></i> Lo sentimos, no hay resultados para tu búsqueda.
        </div>`;
    }
}

function spinner(){
    content.innerHTML = `<div class="spinner-border text-light position-absolute m-auto" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`;
}

function getProyect(name, description, src, rooms, meters){
    return `<div class="col-3 mb-3">
    <div title="Proyecto ${name}" class="card border-0 h-100">
        <img src="${src}" class="card-img-top" alt="${name}">
        <div class="card-body position-relative">
          <h2 class="card-title h5">${name}</h2>
          <ul class="list-unstyled mt-3">
            <li class="mb-1"><i class="fa-solid fa-person-shelter me-2"></i> Cuartos:  <strong>${rooms}</strong></li>
            <li class="mb-1"><i class="fa-solid fa-ruler-combined me-2"></i> Metros: <strong>${meters} Mts.</strong></li>
          </ul>
          <p class="card-text mb-5 pb-3">${description}</p>
          <a href="#" class="btn btn-primary px-3 position-absolute">Ver más &raquo;</a>
        </div>
      </div>
</div>`;
}