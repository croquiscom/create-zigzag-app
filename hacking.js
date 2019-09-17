#!/usr/bin/env node

const name = 'create-zigzag-app';
const inquirer = require('inquirer');

inquirer
  .prompt({
    name,
    type: 'list',
    message: '고르세요. Choose.',
    choices: [
      'Vanilla',
      'React',
      'React + MaterialUI',
      'Next.js',
      'Next.js + MaterialUI'
    ]
  })
  .then((v) => {
    console.log(v[name]);
  });
