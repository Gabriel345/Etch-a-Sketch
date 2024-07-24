const container= document.getElementById('container');

for (let i = 1; i <= 16; i++){
    const novaDiv = document.createElement('div');
    novaDiv.textContent=`essa é a div nº${i}`;
    novaDiv.classList.add('nova-div');
    container.appendChild(novaDiv);
}