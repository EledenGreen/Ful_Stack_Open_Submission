import { useState } from "react";

const Button = (props) => (
  <button onClick= {props.handleClick}>
    {props.text}
  </button>
)
const Total = (props) => {
  return (
    <div>
      <div>All: {props.total}</div>
    </div>
  )
}

const Statistics = (props) => {

  let w_good = props.good*1
  let w_bad = props.bad*-1
  let w_neutral = props.neutral*0
  let numerator = w_good + w_bad + w_neutral
  let avg = numerator/props.total
  let good_per = (props.good/props.total)*100
  let str = good_per + ' ' + '%'
  if(props.total == 0)
  {
    return(
      <div>No feedback given</div>
    )
  }
  else
  {
  return (
    <table>
      <StatisticLine text='Good' value={props.good} />
      <StatisticLine text='Neutral' value={props.neutral} />
      <StatisticLine text='Bad' value={props.bad} />
      <StatisticLine text="All" value={props.total} />
      <StatisticLine text='Average' value={avg} />
      <StatisticLine text='Positive' value={str} />
    </table>
  )
  }
}

const StatisticLine = (props) => {

  return (
    <tbody>
      <tr>
      <td>{props.text}</td><td>: {props.value} </td>
      </tr>
    </tbody>
  )
  
}

const App = () => {
  const [good, setGood]  = useState(0)
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setTotal(good + bad +neutral)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(good+bad+neutral)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
    setTotal(good + bad + neutral)
  }

  return (
    <div>
      <div><strong>Give feedback</strong></div>
      <br></br>
      <Button handleClick = {handleGoodClick} text='Good' />
      <Button handleClick = {handleNeutralClick} text="Neutral" />
      <Button handleClick = {handleBadClick} text='Bad' />
      <div></div>
      <br></br>
      <div><strong>STATISTICS</strong></div>
      <br></br>
      <Statistics good={good} neutral={neutral} bad={bad} total={good+bad+neutral}/>
    </div>
  )
}


export default App