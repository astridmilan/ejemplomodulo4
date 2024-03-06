const moment = require('moment');

moment.locale('es');

const date = moment().format('DD [de] MMMM [del] YYYY [a las] h:mm a');

console.log(`Ejecutaste la aplicaciòn el ${date}`);