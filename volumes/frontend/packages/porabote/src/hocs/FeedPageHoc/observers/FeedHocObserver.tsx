export default class FeedHocObserver {

  events = {
    change: {},
    submit: {},
    error: {},
  }

  subscribe = (event: string, listenedFieldName: string, handler: Function) => {
      this.events[event][listenedFieldName] = handler;
  }

  unsubscribe = (event: string, listenedFieldName: string) => {
    if (typeof this.events[event][listenedFieldName] != "undefined") {
      delete this.events[event][listenedFieldName];
    }
  }

  emit = (eventName: string, {name: string, value: any}) => {
    console.log(name, value);
    for (let fieldName in this.events[eventName]) {
      let handlers = this.events[eventName][fieldName];
      handlers.forEach((handler: Function) => {
        handler();
      })
    }
  }
}