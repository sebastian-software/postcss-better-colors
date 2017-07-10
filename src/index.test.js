import postcss from "postcss"
import plugin from "."

test("Transform Red", () => {
  return postcss([ plugin ]).process(".red { color: red; }").then((result) => {
    expect(result.css).toMatchSnapshot()
  })
})

test("Transform Blue", () => {
  return postcss([ plugin ]).process(".blue { color: blue; }").then((result) => {
    expect(result.css).toMatchSnapshot()
  })
})

test("Transform Green", () => {
  return postcss([ plugin ]).process(".green { color: green; }").then((result) => {
    expect(result.css).toMatchSnapshot()
  })
})

test("Transform Orange", () => {
  return postcss([ plugin ]).process(".orange { color: orange; }").then((result) => {
    expect(result.css).toMatchSnapshot()
  })
})

test("Transform Yellow", () => {
  return postcss([ plugin ]).process(".yellow { color: yellow; }").then((result) => {
    expect(result.css).toMatchSnapshot()
  })
})
