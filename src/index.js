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
    if (webcolors.hasOwnProperty(opts.palette)) {
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
    if (palette.hasOwnProperty(keyword) && palette[keyword]) {
      transforms.push([
        new RegExp(`\\b(${keyword})(\\s*([^(]|$))`, "gi"),
        `${palette[keyword]}$2`
      ])
    }
  })

  return function processor(css) {
    css.walkDecls((decl) => {
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
      decl.value = helpers.try(() => {
        return transforms.reduce((value, args) => {
          return value.replace(...args)
        }, decl.value)
      }, decl.source)
    })
  }
})
