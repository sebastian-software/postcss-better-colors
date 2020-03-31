import postcss from "postcss"

import plugin from "."

const options = { from: undefined }

test("Transform Red", () => postcss([ plugin ])
  .process(".red { color: red; }", options)
  .then((result) => {
    expect(result.css).toMatchSnapshot()
  }))

test("Transform Blue", () => postcss([ plugin ])
  .process(".blue { color: blue; }", options)
  .then((result) => {
    expect(result.css).toMatchSnapshot()
  }))

test("Transform Green", () => postcss([ plugin ])
  .process(".green { color: green; }", options)
  .then((result) => {
    expect(result.css).toMatchSnapshot()
  }))

test("Transform Orange", () => postcss([ plugin ])
  .process(".orange { color: orange; }", options)
  .then((result) => {
    expect(result.css).toMatchSnapshot()
  }))

test("Transform Yellow", () => postcss([ plugin ])
  .process(".yellow { color: yellow; }", options)
  .then((result) => {
    expect(result.css).toMatchSnapshot()
  }))
