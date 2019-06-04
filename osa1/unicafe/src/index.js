import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Headers = props => <h1>{props.text}</h1>

const Display = props => <div>{props.text} {props.value}</div>

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Headers text={'give feedback'} />
      <Button handleClick={() => handleGood()} text="good" />
      <Button handleClick={() => handleNeutral()} text="neutral" />
      <Button handleClick={() => handleBad()} text="bad" />
      <Headers text={'statistics'} />
      <Display text={'good'} value={good} />
      <Display text={'neutral'} value={neutral} />
      <Display text={'bad'} value={bad} />

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)