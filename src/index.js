import postcss from "postcss"
import helpers from "postcss-message-helpers"
import webcolors from "webcolors"

const DEFAULTS = webcolors.mrmrs

// All props that use the <color> data type
// https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#See_also
const PROPS = [
  "color",
  "background",
  "background-color",
  "border",
  "border-color",
  "outline",
  "outline-color",
  "text-shadow",
  "box-shadow"
]

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

export default postcss.plugin("postcss-color-palette", (opts = {}) => {
  opts.palette = opts.palette || DEFAULTS

  if (typeof opts.palette === "string") {
    if (Object.prototype.hasOwnProperty.call(webcolors, opts.palette)) {
      opts.palette = webcolors[opts.palette]
    } else {
      throw new Error(`Unknown webcolors palette: "${opts.palette}"`)
    }
  }

  const palette = opts.palette
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

  function reducer(value, args) {
    return value.replace(...args)
  }

  return function processor(sheet) {
    sheet.walkDecls((decl) => {
      // Check if the decl is of a color-related property and make sure
      // it has a value containing a replaceable color
      if (
        PROPS.indexOf(decl.prop) === -1 ||
        !decl.value ||
        !KEYWORD_REGEX.test(decl.value)
      ) {
        return
      }

      // Transform!
      // eslint-disable-next-line immutable/no-mutation
      decl.value = helpers.try(() => {
        return transforms.reduce(reducer, decl.value)
      }, decl.source)
    })
  }
})
