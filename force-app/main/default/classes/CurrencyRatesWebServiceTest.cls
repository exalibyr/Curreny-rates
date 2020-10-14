@IsTest
public with sharing class CurrencyRatesWebServiceTest {
    
    @IsTest
    public static void testGetRates200() {
        Test.startTest();

        SingleRequestMock mock = new SingleRequestMock(200, 'OK', '{"base":"GBP","rates":{"GBP":0.90591,"HKD":9.135},"date":"2020-10-13"}', null);
        Test.setMock(HttpCalloutMock.class, mock);

        String responseBody = CurrencyRatesWebService.getRates('GBP');
        System.assert(responseBody != null);
        Map<String, Object> bodyMap = (Map<String, Object>) JSON.deserializeUntyped(responseBody);
        System.assert(bodyMap.get('base') != null);
        System.assert(bodyMap.get('rates') != null);
        System.assert(bodyMap.get('date') != null);

        Test.stopTest();
    }

    @IsTest
    public static void testGetRates400() {
        Test.startTest();

        SingleRequestMock mock = new SingleRequestMock(400, 'Bad request', '{"error": "Base \'RU\' is not supported."}', null);
        Test.setMock(HttpCalloutMock.class, mock);

        String responseBody = CurrencyRatesWebService.getRates('RU');
        System.assert(responseBody == null);

        Test.stopTest();
    }

}
