import * as actionTypes from "../action-types.js";
import { seatingTypes } from "../constants.js";
import * as utils from "../utils.js";

const clubSeatingPrice = 250;
const executiveSeatingPrice = 500;
let clubSeatMatrix = [[...new Array(10).fill(0),...new Array(5).fill(1)], [null, null, ...new Array(10).fill(1), ...new Array(3).fill(0)]];
let executiveSeatMatrix = [[null, null, null, null, null, null, null, ...new Array(8).fill(1)],
[null, null, null, null, null, null, null, ...new Array(8).fill(1)],
[null, null, null, null, null, null, null, ...new Array(2).fill(1), ...new Array(6).fill(2)],
[null, null, null, null, null, null, null, ...new Array(8).fill(1)],
[null, null, null, ...new Array(12).fill(1)],
[null, null, null, 0, ...new Array(11).fill(1)],
[null, null, null, ...new Array(2).fill(0), ...new Array(2).fill(1), ...new Array(3).fill(0), ...new Array(5).fill(1)],
[null, null, null, ...new Array(2).fill(1), ...new Array(7).fill(0), ...new Array(3).fill(2)]];


const initialState = {
  selectedSeatingType: null,
  clubSeatMatrix: utils.transformSeatMatrix.call(JSON.parse(JSON.stringify(clubSeatMatrix)), seatingTypes.CLUB, clubSeatingPrice),
  executiveSeatMatrix: utils.transformSeatMatrix.call(JSON.parse(JSON.stringify(executiveSeatMatrix)), seatingTypes.EXECUTIVE, executiveSeatingPrice),
  maxSeatSelection: 5,
  selectedSeats: 0,
  numberOfClubSeats: 0,
  numberOfExecutiveSeats: 0,
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APP_INIT:
      return {
        ...initialState
      };
    case actionTypes.NUMEROFSEAT_UPDATED:
      return {
        ...initialState,
        clubSeatMatrix: utils.clearIsSelected.call(state.clubSeatMatrix),
        executiveSeatMatrix: utils.clearIsSelected.call(state.executiveSeatMatrix),
        maxSeatSelection: action.data,
        totalAmount: (utils.getTotalAmount.call(state.clubSeatMatrix) ||  utils.getTotalAmount.call(state.executiveSeatMatrix))
      };
    case actionTypes.SEATING_TYPE_CHANGED:
      return {
        ...initialState,
        maxSeatSelection: state.maxSeatSelection,
        selectedSeatingType: action.data,
        totalAmount: (utils.getTotalAmount.call(state.clubSeatMatrix) ||  utils.getTotalAmount.call(state.executiveSeatMatrix))
      };
    case actionTypes.UPDATE_CLUBMATRIX:
      return {
        ...initialState,
        numberOfClubSeats: 0,
        selectedSeatingType: null,
        maxSeatSelection: state.maxSeatSelection,
        clubSeatMatrix: utils.clearIsSelected.call(state.clubSeatMatrix),
        totalAmount: (utils.getTotalAmount.call(state.clubSeatMatrix) ||  utils.getTotalAmount.call(state.executiveSeatMatrix))
      };
    case actionTypes.UPDATE_EXECUTIVEMATRIX:
      return {
        ...initialState,
        numberOfExecutiveSeats: 0,
        selectedSeatingType: null,
        maxSeatSelection: state.maxSeatSelection,
        executiveSeatMatrix: utils.clearIsSelected.call(state.executiveSeatMatrix),
        totalAmount: (utils.getTotalAmount.call(state.clubSeatMatrix) ||  utils.getTotalAmount.call(state.executiveSeatMatrix))
      };
    case actionTypes.SEAT_SELECTED:
      const { seatingRow, seatingColumn, seatingType } = action.data;
      if (seatingType === seatingTypes.CLUB) {
        state.clubSeatMatrix[seatingRow][seatingColumn].isSelected = !state.clubSeatMatrix[seatingRow][seatingColumn].isSelected;
        state.numberOfClubSeats += 1;
      }
      if (seatingType === seatingTypes.EXECUTIVE) {
        state.executiveSeatMatrix[seatingRow][seatingColumn].isSelected = !state.executiveSeatMatrix[seatingRow][seatingColumn].isSelected;
        state.numberOfExecutiveSeats += 1;
      }
      return {
        ...state,
        maxSeatSelection: state.maxSeatSelection,
        totalAmount: (utils.getTotalAmount.call(state.clubSeatMatrix) ||  utils.getTotalAmount.call(state.executiveSeatMatrix))
      };
  }
};