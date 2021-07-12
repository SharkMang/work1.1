class EventEmitter {
  constructor() {
    this.events = {
    };
  }

  subscribe(eventName, fn) {
    if(!this.events[eventName]) {
      this.events[eventName] = [];
    }
      
    this.events[eventName].push(fn);
    
    return () => {
      this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
    }
  }

  emit(eventName, args) {
    const event = this.events[eventName];
    event && event.forEach(callback => callback.call(null, args));
  }
}