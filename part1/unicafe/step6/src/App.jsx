import { useState } from 'react'

const Header = () => {
  return <h2>give feedback</h2>
}

const Content = () => {
  return <h2>Statistics</h2>
}

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>
  
}

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {

  if (!(props.good || props.neutral || props.bad)) {
    return <p>No feedback given</p>
  }

  return (
    <table>
        <tbody>
          <StatisticsLine text = "good" value={props.good}/>
          <StatisticsLine text = "neutral" value={props.neutral}/>
          <StatisticsLine text = "bad" value={props.bad}/>
          <StatisticsLine text = "all" value={props.good + props.neutral + props.bad}/>
          <StatisticsLine text = "average" value={(props.good-props.bad) / (props.good + props.neutral + props.bad)}/>
          <StatisticsLine text = "positive" value={(props.good * 100) / (props.good + props.neutral + props.bad) +" %"}/>
        </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => {
    return (
      setGood(good + 1)
    )
  }

  const neutralClick = () => {
    return (
      setNeutral(neutral + 1)
    )
  }

  const badClick = () => {
    return (
      setBad(bad + 1)
    )
  }

  return (
    <div>
      <Header />
      <Button handleClick={goodClick} text="good"/>
      <Button handleClick={neutralClick} text="neutral"/>
      <Button handleClick={badClick} text="bad"/>
      <Content />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
}

export default App