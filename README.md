# :package: Correios Package Tracking API
Uma API simples para rastrear os pacotes dos Correios

## 🚀 Tecnologias
* [Express](https://expressjs.com/pt-br/) - Um framework web para Node.js
* [Axios](https://github.com/axios/axios) - Um cliente HTTP baseado em Promises para Browser e Node.js
* [Node HTML Parser](https://github.com/taoqf/node-html-parser) - Uma biblioteca para manipular a árvore do DOM de forma mais simples

## :wrench: Pré-requisitos
* [Node.js](https://nodejs.org/en/)
* [Yarn](https://yarnpkg.com/) ou [npm](https://www.npmjs.com/)

## :fire: Instalação e execução
1. Clone esse repositório;
```bash
$ git clone https://github.com/joaowicktor/correios-package-tracking.git
```
2. Entre na pasta `cd correios-package-tracking`;
3. Rode `yarn` ou `npm install` para instalar as dependências do projeto;
4. Rode `yarn dev` ou `npm run dev` para iniciar o servidor.

## :zap: Exemplos
#### GET `/api/track/code=CODIGO_DE_RASTREIO`
_Caso o código seja **válido**_
```json
{
  "success": true,
  "message": "Encomenda encontrada",
  "data": {
    "packageCode": "AB123456789BR",
    "packageDates": {
      "postDate": "21/01/2020",
      "lastForwarding": "23/01/2020",
      "deliveryForecast": "06/02/2020"
    },
    "packageHistory": [
      {
        "date": "23/01/2020",
        "time": "21:08",
        "local": "CURITIBA / PR",
        "type": "Objeto encaminhado",
        "description": "de Unidade de Tratamento em CURITIBA / PR para Unidade de Tratamento em LONDRINA / PR",
        "from": "Unidade de Tratamento em CURITIBA / PR",
        "to": "Unidade de Tratamento em LONDRINA / PR"
      },
      {
        "date": "22/01/2020",
        "time": "14:52",
        "local": "CURITIBA / PR",
        "type": "Objeto encaminhado",
        "description": "de Agência dos Correios em CURITIBA / PR para Unidade de Tratamento em CURITIBA / PR",
        "from": "Agência dos Correios em CURITIBA / PR",
        "to": "Unidade de Tratamento em CURITIBA / PR"
      },
      {
        "date": "22/01/2020",
        "time": "13:06",
        "local": "CURITIBA / PR",
        "type": "Objeto postado",
        "description": ""
      }
    ]
  }
}
```

_Caso o código seja **inválido**_
```json
{
  "success": false,
  "errorCode": 404,
  "message": "O código não existe ou já passaram 180 dias após a data de postagem"
}
```

---
Feito com :heart: por João Wicktor 👋