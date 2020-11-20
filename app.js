import createStore from "./lib/store.js";
import bookingReducer from "./reducers/booking-reducer.js";
import Theater from "./components/theater.js";
import * as actionTypes from "./action-types.js";
import * as actions from "./actions.js";

const store = createStore(bookingReducer);
const appEle = document.getElementById('app');

const mapStateToProps = (state, ownProps) => {
  return state;
};
const mapDispatchToProps = (dispatch, getState) => {
  return {
    onNumberOfSeatSelected: actions.onNumberOfSeatSelected(dispatch),
    onSeatingTypeChanged: actions.onSeatingTypeChanged(dispatch, getState),
    onseatSelected: actions.onseatSelected(dispatch, getState)
  };
};

const render = () => {
  appEle.innerHTML = "";
  appEle.appendChild(store.connect(mapStateToProps, mapDispatchToProps)(Theater));
};
store.subscribe(render);
store.dispatch({
  type: actionTypes.APP_INIT
});
