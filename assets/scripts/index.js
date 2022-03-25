
const loadingElement = document.createElement('div');
loadingElement.classList.add('loading-dots')
loadingElement.appendChild(document.createElement('span'));
loadingElement.appendChild(document.createElement('span'));
loadingElement.appendChild(document.createElement('span'));

const generateAdvice = async () => {
    
    const title = document.querySelector('#advice-section h1');
    const text = document.querySelector('#advice-section p');
    const adviceSection = document.getElementById('advice-section');

    title.remove();
    text.remove();

    adviceSection.prepend(loadingElement);

    try {

        const response = await fetch('https://api.adviceslip.com/advice', {
            method: 'GET',
            cache: 'no-cache'
        });

        const { slip, message } = await response.json();

        if (message && message.type == 'error')
            throw new Error(message.text);

        loadingElement.remove();

        adviceSection.prepend(text);
        adviceSection.prepend(title);
        
        title.textContent = `advice #${slip.id}`
        text.textContent = `“${slip.advice}”`

    } catch (error) {

        console.log(error);
        alert("An error has occurred, try reloading the page.");
        location.reload();
        
    }

}

generateAdvice();

document.querySelector('#advice-section .btn-random').addEventListener('click', () => generateAdvice());