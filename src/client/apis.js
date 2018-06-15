import axios from 'axios';
import xmlConverter from 'xml-js';

export function getDataDogData() {
    return axios.get('https://status.datadoghq.com//index.json')
        .then(res => {
            const { components } = res.data;
            // select the required services
            const queriedData = components.filter(x => x.name === 'Alerting Engine' || x.name === 'Event Pipeline');
            return queriedData;
        })
        .catch(e => e);
}

export function getAzureData() {
    const defaultAzure = [
        { 
            name : 'Virtual machines',
            'East US 2' : 'operational',
            'East US' : 'operational',
            'North Europe' : 'operational'
        }, {
            name : 'Cloud services',
            'East US 2' : 'operational',
            'East US' : 'operational',
            'North Europe' : 'operational'
        }
    ];
    return axios.get('https://azure.microsoft.com/en-us/status/feed/')
        .then((res) => {
            // convers xml to json
            const parsedRes = JSON.parse(xmlConverter.xml2json(res.data, { compact : true, spaces : 4 }));
            // check for errors and error location of services and update defaultAzure
            // if (parsedRes.rss.channel.item) {
            //     return parsedRes.rss.channel.item.category;
            // }
            //  return defaultAzure object
            return defaultAzure;
        })
        .catch(e => {
            console.log(e);
            return defaultAzure;
        });
}