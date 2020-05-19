let listeners = {};

export default {
  registerListener: (event, callback) => {
    if (!listeners[event]) {
      listeners[event] = [];
    }

    listeners[event].push(callback);
  },

  unregisterListener: (event, callback) => {
    listeners[event] = listeners[event].filter((cb) => cb != callback);
  },

  emit(event, data) {
    console.log(event);
    console.log(data);
    if (listeners[event]) {
      listeners[event].forEach((callback) => {
        console.log(data);
        callback(data);
      });
    }
  },
};
