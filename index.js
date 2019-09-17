#!/usr/bin/env node

const name = 'create-zigzag-app';
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');

inquirer
  .prompt({
    name,
    type: 'list',
    message: '고르세요. Choose..',
    choices: [
      'vanilla',
      'react',
      'react-material-ui',
      'nextjs',
      'nextjs-material-ui'
    ]
  })
  .then((value) => {
    fs.copy(__dirname, path.resolve(process.cwd(), value[name]))
      .then(() => console.log('성공했어요! Success!!'))
      .catch(console.error);
  });
