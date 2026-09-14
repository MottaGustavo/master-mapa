const container = document.getElementById('mapaContainer');
const mapaImg = document.getElementById('mapaImg');

let zoom = 1;
let posX = 0;
let posY = 0;

let arrastando = false;
let inicioX = 0;
let inicioY = 0;
let inicioPosX = 0;
let inicioPosY = 0;

function atualizarMapa() {
    container.style.transform =
        `translate(${posX}px, ${posY}px) scale(${zoom})`;
}

function alterarZoom(valor) {
    zoom += valor;

    if (zoom < 1) zoom = 1;
    if (zoom > 4) zoom = 4;

    // Quando voltar para o zoom 1, centraliza novamente
    if (zoom === 1) {
        posX = 0;
        posY = 0;
    }

    atualizarMapa();
}


// ==============================
// ARRASTAR MAPA COM MOUSE
// ==============================

container.addEventListener('mousedown', function(e) {

    if (zoom <= 1) return;

    arrastando = true;

    inicioX = e.clientX;
    inicioY = e.clientY;

    inicioPosX = posX;
    inicioPosY = posY;

    container.style.transition = 'none';

    e.preventDefault();
});

document.addEventListener('mousemove', function(e) {

    if (!arrastando) return;

    posX = inicioPosX + (e.clientX - inicioX);
    posY = inicioPosY + (e.clientY - inicioY);

    atualizarMapa();
});

document.addEventListener('mouseup', function() {

    if (!arrastando) return;

    arrastando = false;

    container.style.transition = 'transform 0.2s ease-out';
});


// ==============================
// ARRASTAR MAPA NO CELULAR
// ==============================

container.addEventListener('touchstart', function(e) {

    if (zoom <= 1) return;

    if (e.touches.length !== 1) return;

    arrastando = true;

    inicioX = e.touches[0].clientX;
    inicioY = e.touches[0].clientY;

    inicioPosX = posX;
    inicioPosY = posY;

    container.style.transition = 'none';

    e.preventDefault();

}, { passive: false });


container.addEventListener('touchmove', function(e) {

    if (!arrastando) return;

    if (e.touches.length !== 1) return;

    posX = inicioPosX +
        (e.touches[0].clientX - inicioX);

    posY = inicioPosY +
        (e.touches[0].clientY - inicioY);

    atualizarMapa();

    e.preventDefault();

}, { passive: false });


container.addEventListener('touchend', function() {

    arrastando = false;

    container.style.transition = 'transform 0.2s ease-out';

});