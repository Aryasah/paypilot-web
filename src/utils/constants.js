export default class URLs {
    static BASE_URL = 'http://43.204.228.125:8080';
    
    // URLs for different API endpoints
    static pingBackend = () => `${URLs.BASE_URL}/ping`;
  
    static getScheduledPayments = (userId) => `${URLs.BASE_URL}/scheduled_payment/list?userId=${userId}`;
    
    static schedulePayment = () => `${URLs.BASE_URL}/scheduled_payment/schedule`;
  
    static updateScheduledPayment = (scheduledPaymentId) => `${URLs.BASE_URL}/scheduled_payment/modify/${scheduledPaymentId}`;
  
    static cancelScheduledPayment = (scheduledPaymentId) => `${URLs.BASE_URL}/scheduled_payment/cancel/${scheduledPaymentId}`;
  
    static getPaymentHistory = () => `${URLs.BASE_URL}/payment/history`;
  
    static getPaymentOverview = () => `${URLs.BASE_URL}/payment/overview/bill`;
  
    static getPaymentProgress = (userId) => `${URLs.BASE_URL}/payment/with-amount-paid?userId=${userId}`;
  
    static addPayment = () => `${URLs.BASE_URL}/payment/add`;
  
    static getBills = () => `${URLs.BASE_URL}/bill`;

    static getBillsByCategories = (userId,billCategory,fromDate,toDate) => `${URLs.BASE_URL}/bill/user/${userId}/category/${billCategory}?fromDate=${fromDate}&toDate=${toDate}`;
  }
  