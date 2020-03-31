import postcss from "postcss"
import helpers from "postcss-message-helpers"
import webcolors from "webcolors"

const DEFAULTS = webcolors.mrmrs

// All props that use the <color> data type
// https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#See_also
const PROPS = new Set([
  "color",
  "background",
  "background-color",
  "border",
  "border-color",
  "outline",
  "outline-color",
  "text-shadow",
  "box-shadow"
])

// CSS color keywords to replace
const KEYWORDS = [
  "aqua",
  "black",
  "blue",
  "fuchsia",
  "gray",
  "green",
  "lime",
  "maroon",
  "navy",
  "olive",
  "orange",
  "purple",
  "red",
  "silver",
  "teal",
  "white",
  "yellow"
]

const KEYWORD_REGEX = new RegExp(`\\b(${KEYWORDS.join("|")})\\b`)

export default postcss.plugin("postcss-color-palette", (options = {}) => {
  options.palette = options.palette || DEFAULTS

  if (typeof options.palette === "string") {
    if (Object.prototype.hasOwnProperty.call(webcolors, options.palette)) {
      options.palette = webcolors[options.palette]
    } else {
      throw new Error(`Unknown webcolors palette: "${options.palette}"`)
    }
  }

  const palette = options.palette
  const transforms = []

  // For each color keyword, generate a [RegExp, 'replacement'] pair,
  // i.e. the arguments to String.prototype.replace
  KEYWORDS.forEach((keyword) => {
    if (Object.prototype.hasOwnProperty.call(palette, keyword) && palette[keyword]) {
      transforms.push([
        new RegExp(`\\b(${keyword})(\\s*([^(]|$))`, "gi"),
        `${palette[keyword]}$2`
      ])
    }
  })

  function reducer(value, arguments_) {
    return value.replace(...arguments_)
  }

  return function processor(sheet) {
    sheet.walkDecls((decl) => {
      // Check if the decl is of a color-related property and make sure
      // it has a value containing a replaceable color
      if (
        !PROPS.has(decl.prop) ||
        !decl.value ||
        !KEYWORD_REGEX.test(decl.value)
      ) {
        return
      }

      // Transform!
      // eslint-disable-next-line immutable/no-mutation
      decl.value = helpers.try(() => transforms.reduce(reducer, decl.value), decl.source)
    })
  }
})
