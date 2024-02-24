export const language = [
  {
    label: "Javascript",
    value: 0,
    hint: "Initialize project with javascript",
  },
  {
    label: "Typescript",
    value: 1,
    hint: "Initialize project with Typescript",
  },
  // Add more platforms and frameworks as needed
];
export const packageManager = [
  {
    label: "npm",
    value: "npm",
    hint: "Initialize project with NPM",
  },
  {
    label: "pnpm",
    value: "pnpm",
    hint: "Initialize project with pnpm",
  },
  {
    label: "yarn",
    value: "yarn",
    hint: "Initialize project with yarn",
  },
  // Add more platforms and frameworks as needed
];
export const webFrameworks = {
  npm: [
    { label: "React", value: ["vite", "React"] },
    { label: "Vue", value: ["vite", "Vue"] },
    { label: "Preact", value: ["vite", "Preact"] },
    { label: "Svelte", value: ["vite", "Svelte"] },
    { label: "Solid", value: ["vite", "Solid"] },
    { label: "lit", value: ["vite", "lit"] },
    { label: "Qwick", value: ["vite", "Qwick"] },
  ],
  pnpm: [
    { label: "React", value: ["vite", "React"] },
    { label: "Vue", value: ["vite", "Vue"] },
    { label: "Preact", value: ["vite", "Preact"] },
    { label: "Svelte", value: ["vite", "Svelte"] },
    { label: "Solid", value: ["vite", "Solid"] },
    { label: "lit", value: ["vite", "lit"] },
    { label: "Qwick", value: ["vite", "Qwick"] },
  ],
  yarn: [
    { label: "React", value: ["vite", "React"] },
    { label: "Vue", value: ["vite", "Vue"] },
    { label: "Preact", value: ["vite", "Preact"] },
    { label: "Svelte", value: ["vite", "Svelte"] },
    { label: "Solid", value: ["vite", "Solid"] },
    { label: "lit", value: ["vite", "lit"] },
    { label: "Qwick", value: ["vite", "Qwick"] },
  ],
};
export const command = {
  vite: ({ packageManager, language, webFrameworks, Name }) => {
    const c = `npm create vite@latest ${Name} -- --template ${webFrameworks}${
      language == 1 ? "-ts" : ""
    }`.toLowerCase();
    return c;
  },
};
