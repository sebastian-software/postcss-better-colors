import postcss from "postcss"
import plugin from "."

test("Transform Colors", () => {
  return postcss([ plugin ]).process(".red { color: red; }").then((result) => {
    expect(result.css).toMatchSnapshot()
  })
})
