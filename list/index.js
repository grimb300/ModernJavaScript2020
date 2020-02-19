#!/usr/bin/env node

const fs = require('fs');

fs.readdir(process.cwd(), (err, files) => {
  if (err) {
    console.log(err);
  }

  console.log(files);
});
