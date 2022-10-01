import { BehaviorSubject, scan } from "rxjs";

const prioMap = {
  "page": 0,
  "modal": 1,
  "alert": 2
}

const initialState = {
  title: "My App",
  prio: prioMap["page"]
}

// BehaviorSubject holds an initial value even before anything is subscribed
const subject$ = new BehaviorSubject(initialState);
const source = subject$.pipe(
  scan((acc, curr) => {
    if (acc.prio <= curr.prio) {
      return curr
    }
    return acc
  })
);

const observer = (newVal) => console.log(`Set document title as ${newVal.title}`)

source.subscribe(observer)

subject$.next({ title: "Home", prio: prioMap['page'] });
subject$.next({ title: "Modal 1", prio: prioMap['modal'] });
subject$.next({ title: "Page", prio: prioMap['page'] });
subject$.next({ title: "Alert", prio: prioMap['alert'] });

setTimeout(() => {
  subject$.next({ title: "Modal 2", prio: prioMap['modal'] });
}, 500);