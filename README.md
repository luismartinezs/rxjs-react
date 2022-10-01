## Tasks

- [ ] When entitler is mounted, register it
  - [ ] Register it in SubjectBehavior observer, add entitler data to the state, e.g. uniqueId, title, prio
- [ ] When entitler is unmounted, deregister it
  - [ ] To deregister it, remove corresponding entitler data to state
- [ ] Subscribe to documentEntitler observer
  - [ ] Subscriber receives title of top priority entitler
- [ ] Set title based on documentEntitler priority