module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ["standard", "prettier"],
    rules: {
        "generator-star-spacing": "off",
        "space-before-function-paren": "off",
        semi: "error",
        indent: ["error", 4],
    },
}
