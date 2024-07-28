document.addEventListener('DOMContentLoaded', () => {
    const openModalButton = document.getElementById('openModal');
    const modal = document.getElementById('myModal');
    const createGridButton = document.getElementById('createGrid');
    const numDivsInput = document.getElementById('numDivs');
    const container = document.getElementById('container');
    let isShiftPressed = false;

    // Abrir o modal quando o botão for clicado
    openModalButton.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Fechar o modal quando clicar fora dele
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Verificar se a tecla Shift está pressionada
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

    // Criar a grade de divs quando o botão no modal for clicado
    createGridButton.addEventListener('click', () => {
        const numDivs = parseInt(numDivsInput.value);
        if (isNaN(numDivs) || numDivs < 1 || numDivs > 100) {
            alert('Por favor, insira um número válido entre 1 e 100.');
            return;
        }

        // Limpar o contêiner antes de adicionar as novas divs
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        // Calcular o tamanho do contêiner como um quadrado perfeito
        const windowSize = Math.min(window.innerWidth, window.innerHeight) * 0.9; // 90% do menor valor entre largura e altura da janela
        const pixelSize = Math.floor(windowSize / numDivs);  // Tamanho de cada pixel

        container.style.width = `${pixelSize * numDivs}px`;
        container.style.height = `${pixelSize * numDivs}px`;
        container.style.gridTemplateColumns = `repeat(${numDivs}, ${pixelSize}px)`;
        container.style.gridTemplateRows = `repeat(${numDivs}, ${pixelSize}px)`;

        // Criar as divs (pixels)
        for (let i = 0; i < numDivs * numDivs; i++) {
            const pixelDiv = document.createElement('div');
            pixelDiv.classList.add('pixel-div');
            pixelDiv.style.width = `${pixelSize}px`;
            pixelDiv.style.height = `${pixelSize}px`;

            // Definir o valor inicial de claridade (lightness) para cada pixel
            pixelDiv.dataset.lightness = 10; // Corresponde ao 80% no CSS

            // Adicionar evento mouseover para mudar a cor em degradê apenas quando Shift estiver pressionado
            pixelDiv.addEventListener('mouseover', () => {
                if (isShiftPressed) {
                    let lightness = parseInt(pixelDiv.dataset.lightness);
                    if (lightness > 0) {
                        lightness -= 2; // Reduzir a claridade em 2% em cada passagem
                        pixelDiv.dataset.lightness = lightness;
                        pixelDiv.style.backgroundColor = `hsl(0, 0%, ${lightness}%)`;
                    }
                }
            });

            container.appendChild(pixelDiv);
        }

        // Fechar o modal após a criação da grade
        modal.style.display = 'none';
    });
});
