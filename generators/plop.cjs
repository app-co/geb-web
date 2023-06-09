module.exports = function (plop) {
  plop.setGenerator('jsx', {
    description: 'Create a jsx',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'what is your component name?',
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/pages/{{pascalCase name}}/index.tsx',
        templateFile: 'templates/index.tsx.hbs',
      },

      {
        type: 'add',
        path: '../src/pages/{{pascalCase name}}/styles.ts',
        templateFile: 'templates/styles.ts.hbs',
      },
    ],
  })
}
