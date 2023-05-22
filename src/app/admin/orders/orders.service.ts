import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from './order.interface';
import { ApiService } from '../../core/api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrdersService extends ApiService {
  private url =
    'http://viktarius-cart-api-dev.us-east-1.elasticbeanstalk.com/api/v3';

  getOrders(): Observable<Order[]> {
    return this.http
      .get<{
        body: { orders: Order[] };
      }>(`${this.url}/orders`)
      .pipe(map((response) => response.body.orders));
  }

  createOrder(body: any): Observable<boolean> {
    return this.http.post<boolean>(`${this.url}/orders`, body);
  }

  deleteOrder(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/orders/${id}`);
  }
}
