
const fetchWeatherforecast = (location) => {
    const url = `/weather?address=${location}`;
    fetch(url).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                messageOne.textContent = data.error;
            } else {
                messageTwo.textContent= `${data.location}`
                messageTwo.textContent= `${data.forecast}`
            }
        })
    })
}

const weatherFormElement = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherFormElement.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    if(!location) {
        return messageOne.textContent = 'You must enter an address!'
    }
    messageOne.textContent = 'loading message ...';
    messageOne.textContent, messageTwo.textContent = '';
    fetchWeatherforecast(location);
});