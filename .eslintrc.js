module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2024: true,
    },
    extends: ["airbnb-base", "prettier"],
    overrides: [
        {
            env: {
                node: true,
            },
            files: [".eslintrc.{js,cjs}"],
            parserOptions: {
                sourceType: "script",
            },
        },
    ],
    parserOptions: {
        ecmaVersion: "latest",
    },
    plugins: ["unicorn"],
    rules: {},
}
