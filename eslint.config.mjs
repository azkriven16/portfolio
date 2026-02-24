import js from "@eslint/js";

export default [
  {
    ignores: [".open-next/**", ".next/**", "node_modules/**"],
  },
  js.configs.recommended,
];
