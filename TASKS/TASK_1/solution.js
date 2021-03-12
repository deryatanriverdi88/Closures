
const firstButton = document.getElementById("firstButton");
const secondButton = document.getElementById("secondButton");
const firstText = document.getElementById("firstText");
const secondText = document.getElementById("secondText");

const applaud = () => {
  let clicked = 0;
  const addToClick = (id) => {
    clicked += 1
    return id.innerText = `You clapped ${clicked} times`
  };
  return addToClick;
};


let firrstApplaud = applaud();
let secondApplaud = applaud();
firstButton.addEventListener("click", function handleClick() {
  firstApplaud(firstText)
});

secondButton.addEventListener("click", function handleClick() {
  secondApplaud(secondText)
});


// Here we are creating a function called applaud(). This function is initializing the clicked variable and a function called addToClick() which takes in an elements id. The addToClick() function then increases clicked variable from its outerscope by 1 and then updates the elements inner text.