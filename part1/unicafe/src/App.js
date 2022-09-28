import { useState } from 'react'

const Button = ({ handleGood, handleNeutral, handleBad }) => {
  return (
    <>
        <button onClick={handleGood}>good</button>
        <button onClick={handleNeutral}>neutral</button>
        <button onClick={handleBad}>bad</button>
    </>
  )
}

const StatisticLine = ({ text, stat }) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>{text}</td>
          <td>{stat}</td>
        </tr>
      </tbody>
    </table>
  )
}

const Statistics = ({ good,neutral,bad,all,average,positive}) => {
  if (all > 0) {
    return (
      <>
        <h2>statistics</h2>
        <StatisticLine text='good' stat={good} />
        <StatisticLine text='neutral' stat={neutral} />
        <StatisticLine text='bad' stat={bad} />
        <StatisticLine text='all' stat={all} />
        <StatisticLine text='average' stat={average} />
        <StatisticLine text='positive' stat={positive} />
      </>
    )
  }
  return (
    <>
      <h2>statistics</h2>
      <p>No feedback given</p>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad //number of reviews
  const average = (good - bad) / all //average score (good:1 average: 0 bad:-1)
  const positive = good / all * 100 //percentage of number of good reviews

  return (
    <div>
      <h2>give feedback</h2>
      <Button 
        handleGood={()=>setGood(good+1)} 
        handleNeutral={()=>setNeutral(neutral+1)} 
        handleBad={()=>setBad(bad+1)} 
      />
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        all={all} 
        average={average} 
        positive={positive} 
      />
    </div>
  )
}

export default App