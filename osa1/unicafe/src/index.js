import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Headers = props => <h1>{props.text}</h1>

const Display = props => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Presentage = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.good * 100 / (props.good + props.neutral + props.bad)} % </td>
    </tr>
  )
}

const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )

const Statistics = (props) => {
  if (props.good > 0 || props.bad > 0 || props.neutral > 0){
    return(
      <div>
        <Headers text={'statistics'} />
        <table>
          <tbody>
            <Display text={'good'} value={props.good} />
            <Display text={'neutral'} value={props.neutral} />
            <Display text={'bad'} value={props.bad} />
            <Display text={'all'} value={props.good + props.neutral + props.bad} />
            <Display text={'average'} value={
                (props.good - props.bad) / (props.good + props.neutral + props.bad)} />
            <Presentage text={'positive'} good={props.good} neutral={props.neutral} bad={props.bad} />
          </tbody>
        </table>
      </div>
    )
 }

 return(
   <div>
     <p>No feedback given</p>
   </div>
 )
}

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)