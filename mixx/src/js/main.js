/* eslint-disable no-new */
/// /////// DocReady //////////

import CardModel from './components/card/cardModel';
import CardPresenter from './components/card/cardPresentor';
import CardView from './components/card/cardView';
import ApiService from './services/api-service';

const apiService = new ApiService();
const cardModel = new CardModel(apiService);

window.addEventListener('load', () => {
  cardModel.loadData().then(() => {
    const cardView = new CardView();
    new CardPresenter(cardView, cardModel);
  });
});
