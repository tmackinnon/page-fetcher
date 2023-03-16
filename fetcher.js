const fs = require('fs'); //file system module
const request = require('request'); //request module
const args = process.argv.slice(2); //for taking in 2 args url and file path


const url = args[0]; //use https://example.com/ in command line
const localFilePath = args[1];

//You need to make an http request 
//and wait for the response
request(url, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

  //After the http request is complete,take the data you receive 
  //and write it to a file in your local filesystem
  fs.writeFile(localFilePath, body, err => {
    if (err) {
      console.error(err);
    }
    //read the file to find the # of characters to convert to bytes
    fs.readFile(localFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      let bytes = data.length;
      console.log(`Downloaded and saved ${bytes} bytes to ${localFilePath}.`);
    });
  });
});