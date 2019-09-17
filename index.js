#!/usr/bin/env node

const name = 'create-zigzag-app';
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');

inquirer
  .prompt({
    name,
    type: 'list',
    message: 'Select one!',
    choices: [
      'vanilla',
      'react',
      'react-material-ui',
      'nextjs',
      'nextjs-material-ui'
    ]
  })
  .then((value) => {
    const target = value[name];
    switch (target) {
      case 'vanilla':
        fs.copy(
            path.resolve(__dirname, target),
            path.resolve(process.cwd(), target)
          )
          .then(() => console.log('Success!!'))
          .catch(console.error);
        break;
      default:
        console.log(`아직 개발이 안됐어요... ${target} 버전 개발해주세요 :)`);
    }
  });
