import postcss from "postcss"
import plugin from "."

const opts = { from: undefined }

test("Transform Red", () => {
  return postcss([ plugin ])
    .process(".red { color: red; }", opts)
    .then((result) => {
      expect(result.css).toMatchSnapshot()
    })
})

test("Transform Blue", () => {
  return postcss([ plugin ])
    .process(".blue { color: blue; }", opts)
    .then((result) => {
      expect(result.css).toMatchSnapshot()
    })
})

test("Transform Green", () => {
  return postcss([ plugin ])
    .process(".green { color: green; }", opts)
    .then((result) => {
      expect(result.css).toMatchSnapshot()
    })
})

test("Transform Orange", () => {
  return postcss([ plugin ])
    .process(".orange { color: orange; }", opts)
    .then((result) => {
      expect(result.css).toMatchSnapshot()
    })
})

test("Transform Yellow", () => {
  return postcss([ plugin ])
    .process(".yellow { color: yellow; }", opts)
    .then((result) => {
      expect(result.css).toMatchSnapshot()
    })
})
