global without sharing class CurrencyRatesWebService {
    @AuraEnabled(cacheable=true)
    global static String getRates(String currencyBase) {
        String endpoint = 'https://api.ratesapi.io/api/latest';
        if (currencyBase != null) {
            endpoint += '?base=' + currencyBase;
        }
        HttpRequest request = new HttpRequest();
        request.setMethod('GET');
        request.setEndpoint(endpoint);
        System.System.debug('request = ' + request);
        HttpResponse response = new Http().send(request);
        if (response.getStatusCode() == 200) {
            System.System.debug('RESPONSE OK');
            return response.getBody();
        } else {
            System.System.debug('RESPONSE FAILED');
            return null;
        }
    }

}
