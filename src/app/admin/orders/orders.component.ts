import { Component } from '@angular/core';
import { OrdersService } from './orders.service';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Order } from './order.interface';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
  readonly columns = ['from', 'count', 'address', 'status', 'items', 'action'];

  private updateOrderTrigger$: BehaviorSubject<number> =
    new BehaviorSubject<number>(0);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public readonly orders$: Observable<Order[]> = this.updateOrderTrigger$
    .asObservable()
    .pipe(switchMap(() => this.ordersService.getOrders()));

  constructor(private readonly ordersService: OrdersService) {}

  public deleteOrder(id: string) {
    this.ordersService
      .deleteOrder(id)
      .pipe(
        tap(() => {
          this.updateOrderTrigger$.next(this.updateOrderTrigger$.value + 1);
        })
      )
      .subscribe();
  }
}
