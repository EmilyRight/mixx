class CardPresenter {
  /**
   * @param {CardView} view
   * @param {CardModel} model
   */
  constructor(view, model) {
    this.view = view;
    this.model = model;

    // this.addEventListeners();
    window.queueMicrotask(() => this.updateView());
  }

  handleWindowPopState() {
    this.updateView();
  }

  createViewState() {
    const items = this.model.getSubscriptions();
    items.sort((a, b) => Number(a.billingId) - Number(b.billingId));
    return {
      items,
    };
  }

  updateView() {
    this.view.state = this.createViewState();
    this.view.render();
  }
}

export default CardPresenter;
