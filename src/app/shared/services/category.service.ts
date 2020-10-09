import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class CategoryService {
  constructor(private db: AngularFireDatabase) {}
  getCategories() {
    return this.db
      .list('/categories', (ref) => ref.orderByChild('name'))
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((action) => ({
            key: action.key,
            val: action.payload.val(),
          }));
        })
      );
  }
}
