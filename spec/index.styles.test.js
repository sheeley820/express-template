let { JSDOM } = require('jsdom')
let { fireEvent, getByText } = require('@testing-library/dom')
let path = require('path')

const HTML_UNDER_TEST = path.resolve(__dirname, './../public/index.html')
const options = { 
    runScripts: 'dangerously', 
    resources: "usable", 
    includeNodeLocations: true
}

let dom
let body

describe("scripts", () => {
    beforeEach((done) => {
        JSDOM.fromFile(HTML_UNDER_TEST, options).then(domObject => {
            body = domObject.window.document.body
            dom = domObject
            dom.window.document.addEventListener('DOMContentLoaded', () => done())
        })
      })

    describe("computedStyles", () => {
        it("should set font family of paragraph text to Franklin Gothic Medium", () => {
            const pElements = body.getElementsByTagName("p")

            for(let element of pElements) {
                expect(dom.window.getComputedStyle(element).fontFamily).toContain("Franklin Gothic Medium")
            }
        })

        it("should set greeting paragraph text to red", () => {
            const greetingElement = dom.window.document.getElementById("greeting")
            
            expect(greetingElement.style.color).toEqual("red")
        })

        it("should set greeting paragraph text to blue when user click on it", () => {
            const greetingElement = dom.window.document.getElementById("greeting")
            
            fireEvent.click(greetingElement)

            expect(greetingElement.style.color).toEqual("blue")
        })
    })
})