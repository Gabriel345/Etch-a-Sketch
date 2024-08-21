document.addEventListener('DOMContentLoaded', () => {
    const openModalButton = document.getElementById('openModal');
    const modal = document.getElementById('myModal');
    const createGridButton = document.getElementById('createGrid');
    const resetGridButton = document.getElementById('resetGrid');
    const numDivsInput = document.getElementById('numDivs');
    const container = document.getElementById('container');
    const colorPicker = document.getElementById('colorPicker');
    const instructionPopup = document.getElementById('instructionPopup');
    const closePopupButton = document.getElementById('closePopupButton');
    let isShiftPressed = false;

    openModalButton.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Shift') {
            isShiftPressed = true;
        }
    });

    window.addEventListener('keyup', (event) => {
        if (event.key === 'Shift') {
            isShiftPressed = false;
        }
    });

    createGridButton.addEventListener('click', () => {
        const numDivs = parseInt(numDivsInput.value);
        if (isNaN(numDivs) || numDivs < 1 || numDivs > 100) {
            alert('Por favor, insira um número válido entre 1 e 100.');
            return;
        }

        // Remove todos os filhos existentes no container
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        const windowSize = Math.min(window.innerWidth, window.innerHeight) * 0.9;
        const pixelSize = Math.floor(windowSize / numDivs);

        container.style.width = `${pixelSize * numDivs}px`;
        container.style.height = `${pixelSize * numDivs}px`;
        container.style.gridTemplateColumns = `repeat(${numDivs}, ${pixelSize}px)`;
        container.style.gridTemplateRows = `repeat(${numDivs}, ${pixelSize}px)`;

        for (let i = 0; i < numDivs * numDivs; i++) {
            const pixelDiv = document.createElement('div');
            pixelDiv.classList.add('pixel-div');
            pixelDiv.style.width = `${pixelSize}px`;
            pixelDiv.style.height = `${pixelSize}px`;

            pixelDiv.dataset.lightness = 100; // Inicialmente branco
            pixelDiv.style.backgroundColor = `hsl(0, 0%, 100%)`; // Cor inicial branca

            pixelDiv.addEventListener('mouseover', () => {
                if (isShiftPressed) {
                    pixelDiv.style.backgroundColor = colorPicker.value; // Usa a cor selecionada no color picker
                }
            });

            container.appendChild(pixelDiv);
        }

        // Exibe o pop-up após a criação da grid
        instructionPopup.style.display = 'block';

        // Fecha o modal
        modal.style.display = 'none';
    });

    closePopupButton.addEventListener('click', () => {
        instructionPopup.style.display = 'none';
    });

    resetGridButton.addEventListener('click', () => {
        const pixelDivs = container.querySelectorAll('.pixel-div');
        pixelDivs.forEach(div => {
            div.dataset.lightness = 100; // Inicialmente branco
            div.style.backgroundColor = `hsl(0, 0%, 100%)`; // Cor inicial branca
        });
    });

    // Fecha automaticamente o pop-up após 5 segundos
    setTimeout(() => {
        instructionPopup.style.display = 'none';
    }, 5000);
});
