require('dotenv').config();

console.log(process.env.REACT_APP_VERSION);
if (process.env.REACT_APP_VERSION) {
    console.log('set env => process.env.REACT_APP_VERSION');
} else {
    process.env.REACT_APP_VERSION = `${(Number(process.env.REACT_APP_VERSION) + 0.1).toFixed(1)}`
    console.log(process.env.REACT_APP_VERSION);
}
