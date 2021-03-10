function helloWorld() {
    let helloElement = document.getElementById("greeting")
    let worldElement = document.createElement('p')
    worldElement.textContent = "World"
    helloElement.after(worldElement)
}

helloWorld()