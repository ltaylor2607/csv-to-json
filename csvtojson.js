const fs = require('fs');
const csv = require('csvtojson');
const path = require('path');

const convertToJson = (csvPath = 'customer-data.csv') => {
    let json = [];
    csv()
        .fromFile(csvPath)
        .on('json', (jsonObj) => {
            json.push(jsonObj);
        })
        .on('done', (error) => {
            saveToFile(json);
            console.log('Data has been processed');
        });
    
    const saveToFile = (json) => {
        const data = JSON.stringify(json, null, 4);
        fs.writeFileSync(path.join(__dirname, 'customer-data.json'), data);
    }
};

convertToJson(process.argv[2]);
