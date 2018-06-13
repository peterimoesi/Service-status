import axios from 'axios';
import xmlConverter from 'xml-js';

export function getDataDogData() {
    return axios.get('https://status.datadoghq.com//index.json')
        .then(res => res.data)
        .catch(e => e);
}

export function getAzureData() {
    return axios.get('https://azure.microsoft.com/en-us/status/feed/')
        .then((res) => {
            console.log(res.data);
            return xmlConverter.xml2json(res.data, { compact : false, spaces : 4 });
        })
        .catch(e => e);
}