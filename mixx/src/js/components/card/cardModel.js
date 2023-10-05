class CardModel {
  #apiService;

  #subscriptions;

  /**
   * @param {ApiService} apiService
   */
  constructor(apiService) {
    this.#apiService = apiService;
  }

  /**
   * @return {Promise<void>}
   */
  async loadData() {
    try {
      const data = await this.#apiService.getSubscriptionList();
      this.#subscriptions = data.contents[0].mainContent[1].subscription.contents[0].options;
    } catch (error) {
      console.log('Error', error);
    }
  }

  getSubscriptions() {
    return this.#subscriptions;
  }
}

export default CardModel;
