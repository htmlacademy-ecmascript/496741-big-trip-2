import ApiService from './framework/api-service';
import { Method, Url } from './const.js';

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({url: Url.POINTS}).then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: Url.DESTINATIONS}).then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: Url.OFFERS}).then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptPointToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  #adaptPointToServer(point) {
    const adaptedPoint = {
      ...point,
      'base_price': point.basePrice,
      'date_from': point.dateFrom,
      'date_to': point.dateTo,
      'is_favorite': point.isFavorite,
    };

    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
