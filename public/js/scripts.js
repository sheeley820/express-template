function helloWorld() {
    let helloElement = document.getElementById("greeting")
    let worldElement = document.createElement('p')
    worldElement.textContent = "World"
    helloElement.after(worldElement)
}

function changeColor(el) {
    el.style.color = "blue"
}

helloWorld()

document.getElementById("sum").innerText = add(10, 10)