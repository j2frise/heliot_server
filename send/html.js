var axios = require('axios');
var moment = require('moment');
var link = 'https://heliot.netlify.app';

module.exports = {

    home: function(){
        return `
            <h3>HELIoT SERVER HETIC</h3>
            <a target='_blank' href='${link}' class='link2' style='color:margin-right: 50px'>Lien vers la plateforme</a>                                  
        `
    }
}
