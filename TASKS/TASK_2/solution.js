const redButton = document.getElementById("redButton");
const greenButton = document.getElementById("greenButton");
const blueButton = document.getElementById("blueButton");

const changeStyle = () => {
    function changeByColor(property, val){
        property.style.color = val
    }
    function changeByFontWeight(property, val){
        property.style.fontWeight = val
    }
    return{
        color: function(property,val){
           changeByColor(property, val)
        },
        bold: function(property,val){
            changeByFontWeight(property, val)
         },
    }
}

let change = changeStyle();


redButton.addEventListener("click", function handleClick() {
    change.color(redButton,"red")
    change.bold(redButton, "bold")
});
greenButton.addEventListener("click", function handleClick() {
    change.color(greenButton, "green")
    change.bold(greenButton, "normal")
});
blueButton.addEventListener("click", function handleClick() {
    change.color(blueButton,"blue")
    change.bold(blueButton, "bold")
});


// Here we are creating a function called changeStyle(). This function creates two inner functions changeByColor() and changeByFontWeight() each take in a property and a value, and then updates the property with value of the new style. The return function now returns two objects: color and bold whose values will be an anonymous function which will also take in a property and value and pass them to their appropriate functions.