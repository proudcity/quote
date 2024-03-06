const { readFileSync, writeFileSync } = require('fs');

const data = readFileSync('populations.csv', 'utf-8').split('\n').map(x => x.split(','));
data.shift();
let transformed = 'City,State,Population\n';
for (const city of data)
    if (city[8] != city[9])
        transformed += city[8].substring(0, city[8].lastIndexOf(' ')) + ',' + city[9] + ',' + city[13] + '\n';
writeFileSync('transformed.csv', transformed);