const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

const server = http.createServer(function (req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);

  if (page == '/') {
    fs.readFile('index.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    console.log(req)
    if ('choice' in params) {
      let inputText = params['choice']
      inputText = inputText.toString().toLowerCase().replace(/[^A-Za-z0–9]/g, '')
      let inputTextReversed = inputText.split('').reverse().join("");
      let palindrome = ''
      let isPalindrome = inputText === inputTextReversed
      if (isPalindrome) {
        palindrome = `${params['choice']}   is a palindrome! `
      }
      else {
        palindrome = `${params['choice']} is not a palindrom!`
      }
      res.writeHead(200, { 'Content-type': 'application/json' })
      const objToJson = {
        inputedText: params['choice'],
        outcome: palindrome
      }
      res.end(JSON.stringify({ objToJson }));
    }
  }
  else if (page == '/css/style.css') {
    fs.readFile('css/style.css', function (err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == '/js/main.js') {
    fs.readFile('js/main.js', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(data);
      res.end();
    });
  } else {
    figlet('404!!', function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
