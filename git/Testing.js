const file = require('./Result_container/Result.json');
const jsonexport = require('jsonexport');
const fs = require('fs');
// console.log(file.length);
let value = jsonexport(file, function(err, csv){
    if (err) return console.error(err);
    else
    {
        console.log(csv);
        fs.writeFile('./Result_container/Result.csv',csv,err=>
        {
            if(err)console.log(err);
            else console.log("Success");
        })
        // return csv;
    }
});
// console.log(value);
