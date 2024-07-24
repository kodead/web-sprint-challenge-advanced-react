import React, { useState } from 'react'
import axios from 'axios'
// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  function getXY() {
    const x = (index % 3) + 1;
    const y = Math.floor(index /3) + 1;
    return {x, y};
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  }

  function getXYMessage() {
    const {x, y} = getXY()
    return `Coordinates (${x}, ${y})`;

    
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }

  function reset() {
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
    // Use this helper to reset all states to their initial values.
  }

  function getNextIndex(direction) {
    let newIndex = index;
    if ( direction === 'left' && index % 3 !== 0) newIndex -= 1;
    else if (direction === 'right' && index % 3 !== 2) newIndex += 1;
    else if (direction === 'up' && index > 2) newIndex -= 3;
    else if (direction === 'down' && index < 6) newIndex += 3;
    return newIndex;
    // This helper takes a direction ("left", "up", etc) and calculates what the next index
    // of the "B" would be. If the move is impossible because we are at the edge of the grid,
    // this helper should return the current index unchanged.
  }

  function move(evt) {
    const direction = evt.target.id;
    const newIndex = getNextIndex(direction)
    if ( newIndex !== index) {
      setIndex(newIndex);
      setSteps(steps + 1)
    }
    // This event handler can use the helper above to obtain a new index for the "B",
    // and change any states accordingly.
  }

  function onChange(evt) {
    setEmail(evt.target.value);
    // You will need this to update the value of the input.
  }

  function onSubmit(evt) {
    evt.preventDefault();
    const { x, y } = getXY();
    const payload = { x, y, steps, email }
    axios.post('http://localhost:9000/api/result', payload)
    .then(res => setMessage(res.data.message))
    .catch(err => setMessage(err.response.data.message))
    // Use a POST request to send a payload to the server.
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>LEFT</button>
        <button id="up" onClick={move}>UP</button>
        <button id="right" onClick={move}>RIGHT</button>
        <button id="down" onClick={move}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}
