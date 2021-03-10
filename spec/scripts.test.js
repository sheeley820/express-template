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

    describe("helloWorld", () => {
        it("should add a paragraph element following the greeting element", () => {
            const worldElement = getByText(body, "World")

            expect(worldElement).not.toBeNull();
            expect(worldElement).toBeDefined()
            expect(worldElement.textContent).toEqual("World")
        })

        it("should get element by id for greeting", () => {
            const documentSpy = jest.spyOn(dom.window.document, "getElementById")

            dom.window.helloWorld()

            expect(documentSpy).toBeCalledTimes(1)
        })

        it("should create element using the document object", () => {
            //Use Jest to mock an object
            const mockElement = jest.fn(arg => { {textContent: ""} })
            const documentSpy = jest.spyOn(dom.window.document, "createElement").mockReturnValue(mockElement)

            dom.window.helloWorld()

            expect(documentSpy).toBeCalledTimes(1)
            expect(mockElement.textContent).toEqual("World")
        })

        it("should add the new element after the hello element", () => {
            //Create our own stubs to be returned
            const stubHelloElement = { "after" : () => {} }
            const stubWorldElement = { textContent: "" }
            jest.spyOn(dom.window.document, "getElementById").mockReturnValue(stubHelloElement)
            jest.spyOn(dom.window.document, "createElement").mockReturnValue(stubWorldElement)
            const afterSpy = jest.spyOn(stubHelloElement, "after")

            dom.window.helloWorld()

            expect(afterSpy).toBeCalledTimes(1)
            expect(afterSpy).toBeCalledWith(stubWorldElement)
        })
    })
})