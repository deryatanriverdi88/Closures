const firstButton = document.getElementById("firstButton");
const firstText = document.getElementById("firstText");


let clicked = 0

const applaud = () => {
    //Add your code here..
}

console.log(clicked)
firstButton.addEventListener("click", function handleClick() {
    // This needs to be updated too!
    firstText.innerText = `You clapped ${clicked++} times`
});


//Instructions:
// We have been asked to implement two buttons that will allow users to applaud a blog post using to different buttons. Each button will be a different instance of clapping.
// Add an event listener to the second button so that its inner text will update when clicked.
// Complete the applaud() function that it implements closure so that each button will update clicked by 1 independently