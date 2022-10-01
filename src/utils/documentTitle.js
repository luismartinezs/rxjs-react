import { Subject, scan } from "rxjs";

const prioMap = {
  "page": 0,
  "modal": 1,
  "alert": 2
}

const subject$ = new Subject();
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