/**
 * @typedef ServiceOptions
 * @prop {string} baseUrl
 * @prop {number} minResponseTime
 * @prop {string} authorization
 */
class ApiService {
  constructor() {
    const siteId = this.getRegion();
    const urlPrefix = siteId?.slice(4).toLowerCase() || 'msk';
    const tariffsPath = '.tele2.ru/tariffs?format=json';
    this.baseUrl = `https://${urlPrefix}${tariffsPath}`;
  }

  getRegion() {
    const siteIdString = window.location.search;
    const siteId = new URLSearchParams(siteIdString).get('region');
    return siteId;
  }

  async request() {
    const fetchOptions = { method: 'GET', headers: { Accept: 'application/json, text/plain' } };
    const responsePromise = await fetch(this.baseUrl, fetchOptions);

    return new Promise((resolve, reject) => {
      try {
        const response = responsePromise;
        if (!response.ok) {
          throw new Error(String(response.status));
        }
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getSubscriptionList() {
    const response = await this.request();
    return response.json();
  }
}

export default ApiService;
