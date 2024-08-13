import pluginJs from "@eslint/js";


export default [
  pluginJs.configs.recommended,
  {
    rules: {
    "no-undef": 0,
    "no-unused-vars": 1,
    "prefer-const": 1,
    "no-const-assign": 1,
    "no-var": 1,
    "no-new-object": 1,
    "object-shorthand": 1,
    "quote-props": 0,
    "no-prototype-builtins": 1,
    "prefer-object-spread": 1,
    "no-array-constructor": 1,
    "prefer-destructuring": 1,
    "quotes": 1,
    "prefer-template": 1,
    "no-useless-escape": 1,
    "func-style": 0,
    "default-param-last": 1,
    "space-before-blocks": 1,
    "no-param-reassign": 1,
    "prefer-spread": 1,
    "prefer-arrow-callback": 1,
    "arrow-spacing": 1,
    "no-confusing-arrow": 1,
    "implicit-arrow-linebreak": 1,
    "no-useless-constructor": 1,
    "class-methods-use-this": 1,
    "dot-notation": 1,
    "no-multi-assign": 1
  }
}
]