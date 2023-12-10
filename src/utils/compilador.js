const fs = require('fs/promises');
const handlebars = require('handlebars');

const compilerHtml = async (file, context) => {
    const readEmail = await fs.readFile(file);
    const compiler = handlebars.compile(readEmail.toString());
    const stringCompilada = compiler(context);
    return stringCompilada;

};
module.exports =  compilerHtml;