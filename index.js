#!/usr/bin/env node

const name = 'create-zigzag-app';
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const ora = require('ora');
const spinner = ora({
  spinner: {
    interval: 200,
    frames: [
      'Downloading...😄',
      'Downloading...😝',
    ]
  }
});

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
      case 'react':
        spinner.start();
        fs.copy(
            path.resolve(__dirname, target),
            path.resolve(process.cwd(), target)
          )
          .then(() => {
            spinner.stop();
            console.log('Success!!');
          })
          .catch((e) => {
            spinner.stop();
            console.error(e);
          })
          .finally(() => process.exit());
        break;
      default:
        console.log(`아직 개발이 안됐어요... ${target} 버전 개발해주세요 :)`);
        process.exit();
    }
  });
