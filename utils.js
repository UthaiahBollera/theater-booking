class Seat {
  constructor (seatNum, seatType, price, seatRow, seatColumn, isBooked, isGoldenSeat) {
    this.seatNum = seatNum;
    this.seatType = seatType;
    this.price = isGoldenSeat ? 1000 : price;
    this.isSelected = false;
    this.isBooked = isBooked;
    this.seatRow = seatRow;
    this.seatColumn = seatColumn;
    this.isGoldenSeat = isGoldenSeat;
  }
};

export const transformSeatMatrix = function (seatType, price) {
  const arr = this;
  return arr.map((rows, index) => {
    const seatRow = index + 1;
    return rows.map((row, seatColumn) => row === null ? null : new Seat(seatRow, seatType, price, index, seatColumn, row === 1, row == 2));
  });
};

export const getTotalAmount = function () {
  var arr = this;
  return arr
    .map((row) => row
      .filter(seat => seat != null)
      .filter(d => (d.isSelected))
      .map(d => d.price)
      .reduce((a, b) => a + b, 0))
    .reduce((a, b) => a + b, 0);
};

export const clearIsSelected = function () {
  const arr = this;
  return arr.map((rows, index) => {
    return rows.map((row) => {
      if (row === null) {
        return null;
      }
      row.isSelected = false;
      return row;
    });
  });
};