const container = document.getElementById('container');

for (let i = 1; i <= 16; i++) {
    const novaDiv = document.createElement('div');
    novaDiv.classList.add('nova-div');
    container.appendChild(novaDiv);

    novaDiv.addEventListener('mousemove', (e) => {
        const { offsetX, offsetY } = e;
        const pixel = document.createElement('div');
        pixel.classList.add('pixel-trail');
        pixel.style.left = `${offsetX - 10}px`;
        pixel.style.top = `${offsetY - 10}px`; 

        novaDiv.appendChild(pixel);
    });
}
