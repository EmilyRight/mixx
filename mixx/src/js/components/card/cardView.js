import GB_VALUE from '../../constants/gbParameterId';
import { partnersList, successSvg } from '../../constants/parnters-list';
import PROFITS_LIST from '../../constants/profit-list';
import { html } from '../utils';

class CardView {
  constructor() {
    this.state = null;
    this.cardsList = document.querySelector('.tariff-card__list');
  }

  /**
   * @param {string} [selector]
   * @param {SafeHtml} [outerHtml]
  */
  render(selector, outerHtml) {
    if (arguments.length === 2) {
      this.querySelector(selector).outerHTML = String(outerHtml);
    } else {
      this.cardsList.innerHTML = String(this.createHtml());
    }
  }

  createPartnersList() {
    return html`
    <ul class="offers__list">
      ${partnersList.map((item) => html`
        <li class="offers-list__item">
        <img src= ${item.imgSrc} alt="" />
      </li>
    `)}
    <ul>
    `;
  }

  createProfitsList(list) {
    return html`
    <ul class="card__benefits benefits benefits-list">
    ${list.map((profitsListItem) => {
    const { imageSrc } = profitsListItem;
    return html`
      <li class="benefits-list__item benefits__item_S">
        <div class="benefits__icon">
          <img src=${imageSrc} alt="" />
        </div>
        <div class="benefits__text">${profitsListItem.text}</div>
      </li>
      `;
  })}

    </ul>
    `;
  }

  createHtml() {
    const card = this.state.items;

    return html`
    ${card.map((item) => {
    const mixxType = item.frontName.split(' ')[1]; // S, L, M, Max
    const profitsObject = PROFITS_LIST.filter((it) => it.id === item.frontName);
    const profitsList = profitsObject[0].profits;
    const gbValueString = item.parameters.filter((it) => it.id === GB_VALUE)[0].value;
    const gbValueNumber = gbValueString.split(',').reduce((prev, next) => Number(prev) + Number(next));
    return html`
          <div class="tariff-card__content card mixx-${mixxType}">
          <h4 class="card__title name">
            <span class="name__main">MiXX </span
            ><span class="name__label">${mixxType}</span>
          </h4>
          <div class="card__gb gb">
            <span class="gb__number">${gbValueNumber}</span>
            <span class="gb__text"
              >ГБ&nbsp;дополнительного трафика каждый месяц</span
            >
          </div>
          ${mixxType !== 'Max'
    ? html`<div class="card__offers offers">
                <div class="offers__text offers__text">
                  Базовые предложения уже&nbsp;включены в&nbsp;подписку
                </div>
                ${this.createPartnersList()}
                <div class="offers__ok-icon">
                  <img src=${successSvg} alt="" />
                </div>
                </div>`
    : html`<div class="card__offers offers all-offers">
            <div class="offers__text">Включены все предложения</div>
            <div class="offers__ok-icon">
              <img src=${successSvg} alt="" />
            </div>
          </div>`
}

          ${this.createProfitsList(profitsList)}
          <div class="card__price-block price">
            <div class="price__block">
              <div class="price__info">
                <div class="price__discounted-price">0 <span>₽</span></div>
                <div class="price__normal">${item.abonentFee}</div>
              </div>
              <div class="price__period">в&nbsp;месяц</div>
              <div class="price__condition">при первом подключении</div>
            </div>
            <a href="" class="price__button btn js-gtm-event" data-event="event">Купить</a>
          </div>
        </div>
          `;
  })}`;
  }
}

export default CardView;
