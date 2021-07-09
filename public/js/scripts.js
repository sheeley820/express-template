function helloWorld() {
    let helloElement = document.getElementById("greeting")
    let worldElement = document.createElement('p')
    worldElement.textContent = "World"
    helloElement.after(worldElement)
}

function changeColor(el) {
    el.classList.add("active")
}

helloWorld()

document.getElementById("sum").innerText = add(10, 10)