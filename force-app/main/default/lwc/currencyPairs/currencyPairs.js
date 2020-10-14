import { LightningElement, track } from 'lwc';
import getRates from "@salesforce/apex/CurrencyRatesWebService.getRates";

const columns = [
     {label: 'Currency pair', fieldName: 'name', type: 'text'},
     {label: 'Value', fieldName: 'value', type: 'text'}
];

const comboboxOptions = [
             { label: 'EUR', value: 'EUR' },
             { label: 'GBP', value: 'GBP' },
             { label: 'HKD', value: 'HKD' },
             { label: 'IDR', value: 'IDR' },
             { label: 'ILS', value: 'ILS' },
             { label: 'DKK', value: 'DKK' },
             { label: 'INR', value: 'INR' },
             { label: 'CHF', value: 'CHF' },
             { label: 'MXN', value: 'MXN' },
             { label: 'CZK', value: 'CZK' },
             { label: 'SGD', value: 'SGD' },
             { label: 'THB', value: 'THB' },
             { label: 'HRK', value: 'HRK' },
             { label: 'MYR', value: 'MYR' },
             { label: 'NOK', value: 'NOK' },
             { label: 'CNY', value: 'CNY' },
             { label: 'BGN', value: 'BGN' },
             { label: 'PHP', value: 'PHP' },
             { label: 'SEK', value: 'SEK' },
             { label: 'PLN', value: 'PLN' },
             { label: 'ZAR', value: 'ZAR' },
             { label: 'CAD', value: 'CAD' },
             { label: 'ISK', value: 'ISK' },
             { label: 'BRL', value: 'BRL' },
             { label: 'RON', value: 'RON' },
             { label: 'NZD', value: 'NZD' },
             { label: 'TRY', value: 'TRY' },
             { label: 'JPY', value: 'JPY' },
             { label: 'RUB', value: 'RUB' },
             { label: 'KRW', value: 'KRW' },
             { label: 'USD', value: 'USD' },
             { label: 'HUF', value: 'HUF' },
             { label: 'AUD', value: 'AUD' }
         ];

export default class CurrencyPairs extends LightningElement {
     columns = columns;
     @track rates = [];
     @track error;
     currencyBase = 'EUR';

     get comboboxOptions() {
         return comboboxOptions;
     }
 
     handleChangeCombobox(event) {
         this.currencyBase = event.detail.value;
         this.handleLoad();
     }

     connectedCallback() {
          this.handleLoad();
     }

     handleLoad() {
          console.log('base = ' + this.currencyBase);
          getRates({ currencyBase: this.currencyBase })
              .then(data => {
                   console.log('DATA = ' + data);
                   if (data != null) {
                         var response = JSON.parse(data);
                         console.log('RESPONSE = ' + response);
                         if (response != null) {
                              var i = 0, array = [];
                              for (var field in response.rates) {
                                   array.push({
                                        id: i,
                                        name: response.base + '/' + field,
                                        value: response.rates[field]
                                   });
                                   i++;
                              }
                              console.log('ARRAY = ' + array);
                              this.rates = array;
                         }
                   }
              })
              .catch(error => {
                  this.error = error;
                  console.log('Error: ' + error);
                  alert('Error!');
              });
      }

}

