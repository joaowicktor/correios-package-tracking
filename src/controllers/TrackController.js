const axios = require('axios');
const qs = require('qs');
const htmlParser = require('node-html-parser');

const { getLocations } = require('../utils/tracking-helpers');
const { ResponseFormat } = require('../core');

module.exports = {
  index: async (req, res) => {
    const { code: packageCode } = req.query;

    const url = 'https://www2.correios.com.br/sistemas/rastreamento/resultado.cfm';

    const config = {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseEncoding: 'latin1'
    };

    const { data } = await axios.post(url, qs.stringify({ objetos: packageCode }), config);

    const root = htmlParser.parse(data);

    if (!root.querySelector('.listEvent')) {
      return res.status(400).json(ResponseFormat.error(false, 404, 'O código não existe ou já passaram 180 dias após a data de postagem'))
    }

    const packageDates = {
      postDate: null,
      lastForwarding: null,
      deliveryForecast: null
    }

    root.querySelector('#datas').querySelectorAll('div').map(a => {
      const [ type, date ] = a.structuredText.split('\n');

      switch (type) {
        case 'Postagem':
          packageDates.postDate = date;
          break;
        case 'Objeto encaminhado':
          packageDates.lastForwarding = date;
          break;
        case 'Previsão de entrega':
          packageDates.deliveryForecast = date;
          break;
        default:
          break;
      }
    })

    const obj = {
      packageCode,
      packageDates,
      packageHistory: []
    };

    root.querySelectorAll('table').map(table => {
      const arr = table.structuredText.split('\n');
      obj.packageHistory.push({
        date: arr[0],
        time: arr[1],
        local: arr[2].toUpperCase(),
        type: arr[3],
        description: arr[4] || '',
        ...getLocations(arr[4])
      });
      
    })

    return res.json(ResponseFormat.build(true, 'Encomenda encontrada', obj));
  }
}