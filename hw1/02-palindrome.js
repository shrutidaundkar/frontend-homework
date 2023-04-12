const elem = document.querySelector('input');
const resultText = document.getElementById('resultText');
elem.addEventListener('input', handleInput);

function handleInput(){
    let input = parseInt(elem.value);
    if(input >= 0){
        let reverseInput = parseInt(String(elem.value).split('').reverse().join(''));
        if( input == reverseInput){
            resultText.style.color = 'green';
            resultText.innerHTML = 'Yes. this is a palindrome!';
        }else{
            resultText.style.color = 'red';
            resultText.innerHTML = 'No. Try again.'
        }
    }else if(input<0){
        resultText.style.color = 'red';
        resultText.innerHTML = 'Enter a positive number!';
    }else{
        resultText.style.color = 'black';
        resultText.innerHTML = 'Please enter a number first!';
    }
}