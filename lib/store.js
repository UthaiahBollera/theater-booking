

/**
 * A tiny implementation of redux
 * @param {*} reducer 
 * @param {*} initialState 
 */
const createStore = (reducer, initialState = null) => {
  const store = {};
  const validateAction = (action = {}) => {
    if (!action.type) {
      throw new TypeError('Action type should be defined.');
    }
  };
  store.state = initialState;
  store.listeners = [];
  store.subscribe = listener => store.listeners.push(listener);
  store.dispatch = action => {
    console.log(action);
    validateAction(action);
    store.state = reducer(store.state, action);
    store.listeners.forEach(listener => {
      const state = Object.seal(store.state);
      listener(state);
    });
  };
  store.connect = (mapStateToProps, mapDispatchToProps) => {
    return (Component) => {
      const combinedProps = {
        ...mapStateToProps(Object.assign(store.getState())),
        ...mapDispatchToProps(store.dispatch, store.getState)
      };
      return Component(combinedProps);
    };
  };
  store.getState = () => store.state;
  return store;
};

export default createStore;