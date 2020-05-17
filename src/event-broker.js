let listeners = {};

export default {
  registerListener: (event, callback) => {
    if (!listeners[event]) {
      listeners[event] = [];
    }

    listeners[event].push(callback);
    console.log(listeners);
    console.log(listeners[event]);
  },

  unregisterListener: (event, callback) => {
    listeners[event] = listeners[event].filter((cb) => cb != callback);
  },

  emit(event, data) {
    listeners[event].forEach((callback) => {
      callback(data);
    });
  },
};
