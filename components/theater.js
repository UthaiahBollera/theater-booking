import { seatingTypes } from "../constants.js";

export default (props = {}) => {
  let rowNumber = 65;
  const {
    onSeatingTypeChanged,
    onseatSelected,
    onNumberOfSeatSelected,
    executiveSeatMatrix,
    clubSeatMatrix,
    maxSeatSelection = 0,
    totalAmount
  } = props;    
  const doc = document.createElement('div');
  doc.id = "theater";
  doc.addEventListener("change", (event) => {
    const { target } = event || {};
    // @ts-ignore
    const { id = null } = target || {};
    if (id === 'seat-select') {
      onNumberOfSeatSelected(parseInt(event.target.value));
    }
  });
  doc.addEventListener("click", (event) => {
    const { target } = event || {};
    const { seatingType, seatingIsBooked, seatingRow, seatingColumn } = target.dataset || {};
    // @ts-ignore    
    if (seatingIsBooked === "false") {      
      onSeatingTypeChanged(seatingType);
      onseatSelected({ seatingRow, seatingColumn, seatingType });
    }
  });

  doc.innerHTML = `<div class="theater-container">
  <!-- Seat Selector -->
  <div id='seat-selector'>
    <label>
      Please select number of seat: 
      <select id='seat-select'>
        ${(() => {      
      return [...new Array(10)].map((s, i) => {
        return `<option>${i + 1}</option>`;
      });
    })()}        
      </select>
    </label>
    <div class="seat-types">
      <div>
        <div class="seat available">  </div>
        Available Seat
      </div>
      <div>
        <div class="seat booked">  </div>
        Booked Seat
      </div>
      <div>
        <div class="seat available golden">  </div>
        Golden Seat
      </div>
      <div>
        <div class=" seat available selected">  </div>
        Selected Seat
      </div>
    </div>
  </div>
<!--Club Seat Arrangement -->
<div id="seating">
  <div id="club-seating">    
  <div class="heading">
    CLUB - 250.00
  </div>
    ${(() => {
      let seatStr = ``;
      clubSeatMatrix.forEach((seatRows = [], index) => {
        seatStr +=`<div class="row-label">${String.fromCharCode(rowNumber++)}</div>`;
        seatRows.forEach((row = {}, index_row) => {
          const seatNumber = +index_row + 1;
          const { isBooked = false, seatRow = null, seatColumn = null, isSelected = false, isGoldenSeat } = row || {};
          let className = `seat `;
          className += (row === null ? 'hidden ' : '');
          className += (isBooked ? 'booked' : 'available');
          className += (isSelected ? ' selected' : '');          
          seatStr += `<div
          data-seating-is-golden="${isGoldenSeat}"
          data-seating-select="${isSelected}"
          data-seating-row="${seatRow}"
          data-seating-column="${seatColumn}"
          data-seating-is-booked="${isBooked}"
          data-seating-number="${seatNumber}"
          data-seating-type="${seatingTypes.CLUB}"
          class=" ${className}">
          ${seatNumber}
        </div>`;
        });
        seatStr += "<div class='separator'></div>";
      });
      return seatStr;
    })()}
  </div>
  <div id="executive-seating">
  <div class="heading">
    EXECUTIVE - 500.00, GOLDEN - 1000.00
  </div>
  ${(() => {
      let seatStr = ``;
      executiveSeatMatrix.forEach((seatRows = [], index) => {
        seatStr +=`<div class="row-label">${String.fromCharCode(rowNumber++)}</div>`;
        seatRows.forEach((row = {}, index_row) => {
          const seatNumber = +index_row + 1;
          const { isBooked = false, seatRow = null, seatColumn = null, isSelected = false, isGoldenSeat } = row || {};
          let className = `seat `;
          className += (row === null ? 'hidden ' : '');
          className += (isBooked ? 'booked' : 'available');
          className += (isSelected ? ' selected' : '');
          className += (isGoldenSeat ? ' golden' : '');
          seatStr += `<div 
        data-seating-is-golden="${isGoldenSeat}"  
        data-seating-select="${isSelected}"
        data-seating-row="${seatRow}"
        data-seating-column="${seatColumn}"  
        data-seating-is-booked="${isBooked}"
        data-seating-number="${seatNumber}"
        data-seating-type="${seatingTypes.EXECUTIVE}"
         class="${className}">
        ${seatNumber}
      </div>`;
        });
        seatStr += "<div class='separator'></div>";
      });
      return seatStr;
    })()}
  </div>
<div id="book-seat-container">
    <button type="button" class="pay ${totalAmount==0 ? 'disabled' : ''}">
    Pay ₹${totalAmount}
    </button>
</div>
</div>
  </div>`;
  doc.querySelector('#seat-select').value = maxSeatSelection;
  return doc;;
};