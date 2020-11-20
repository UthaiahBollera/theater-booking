import * as actionTypes from "./action-types.js";

export const onNumberOfSeatSelected = (dispatch) => (n) => {
  dispatch({
    type: actionTypes.NUMEROFSEAT_UPDATED,
    data: n
  });
};

export const onSeatingTypeChanged = (dispatch, getState) => (seatingType) => {
  const { selectedSeatingType, maxSeatSelection } = getState();
  if (selectedSeatingType == null && maxSeatSelection) {
    dispatch({
      type: actionTypes.SEATING_TYPE_CHANGED,
      data: (selectedSeatingType !== seatingType) ? seatingType : null
    });
  }
};


export const onseatSelected = (dispatch, getState) => ({ seatingRow, seatingColumn, seatingType }) => {
  const state = getState(); //TODO: Complete checking corner cases
  const { selectedSeatingType, maxSeatSelection } = state;
  if (seatingType !== selectedSeatingType) {
    return;
  }
  let { numberOfClubSeats, numberOfExecutiveSeats } = state;
  if (numberOfClubSeats + 1 >= maxSeatSelection) {
    dispatch({
      type: actionTypes.UPDATE_CLUBMATRIX
    });
  }
  if (numberOfExecutiveSeats + 1 >= maxSeatSelection) {
    dispatch({
      type: actionTypes.UPDATE_EXECUTIVEMATRIX
    });
  }
  dispatch({
    type: actionTypes.SEAT_SELECTED,
    data: { seatingRow, seatingColumn, seatingType }
  });
};