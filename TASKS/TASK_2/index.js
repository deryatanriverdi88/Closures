const redButton = document.getElementById("redButton");


const changeStyle = () =>{   
    // Add your code here..
}



redButton.addEventListener("click", function handleClick() {
    // This needs to be updated too!
    redButton.style.color = 'red'
    redButton.style.fontWeight= 'bold'
});

// Instructions
// Fill out the change style function so that it will change the text color and the font weight of the red, blue, and green buttons.
// Your function should use closure and return two private functions color, and bold.
