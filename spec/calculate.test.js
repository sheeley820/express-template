let { JSDOM } = require('jsdom')
let { fireEvent, getByText } = require('@testing-library/dom')
let path = require('path')

const HTML_UNDER_TEST = path.resolve(__dirname, './template.html')
const options = { 
    runScripts: 'dangerously', 
    resources: "usable", 
    includeNodeLocations: true
}

let dom
let body
const html = ''+
'<!DOCTYPE html>'+
    '<html>'+
    '<head>'+
        '<title>Blank</title>'+
    '</head>'+
    '<body>'+
        '<script src="../public/js/calculate.js"></script>'+
    '</body>'+
'</html>'



describe("calculate", () => {
    beforeEach((done) => {
        dom = new JSDOM(html, options)
        body = dom.window.document.body
        dom.window.document.addEventListener('DOMContentLoaded', () => done())
    })

    describe("add", () => {
        it("should add two positive integers", () => {
            const add = (a, b) => a + b
            expect(add(10, 10)).toEqual(20)
        })
    })  
})