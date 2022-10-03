// observable that acts as a state with items with value and priority, we can add items and remove items by id
// we can also get the top item by priority

import { BehaviorSubject } from 'rxjs';

export class PriorityStack {
  constructor() {
    this.subject$ = new BehaviorSubject([]);
  }

  add(item) {
    this.subject$.next([...this.subject$.getValue(), item]);
  }

  remove(id) {
    this.subject$.next(this.subject$.getValue().filter(item => item.id !== id));
  }

  getTopValue() {
    return this.subject$.getValue().sort((a, b) => {
      const dif = b.priority - a.priority
      if (dif === 0 || dif === 1) {
        return 1;
      }
      return -1;
    }
    )[0].value;
  }
}

// subscribe to the observable
const priorityStack = new PriorityStack();
priorityStack.subject$.subscribe(console.log);

// add items
priorityStack.add({ id: 1, value: 'a', priority: 1 });
priorityStack.add({ id: 2, value: 'b', priority: 2 });
priorityStack.add({ id: 3, value: 'c', priority: 3 });
priorityStack.add({ id: 4, value: 'd', priority: 1 });
priorityStack.add({ id: 5, value: 'e', priority: 3 });

// get top priority item
console.log(priorityStack.getTopValue());

// remove items
priorityStack.remove(5);
priorityStack.remove(3);

console.log(priorityStack.getTopValue());
