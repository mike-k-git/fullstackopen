import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral
  const avg = (good - bad) / all
  const goodPct = (good / all) * 100

  return (
    <>
      <h2>Statistics</h2>
      <div>
        good {good}
        <br />
        neutral {neutral}
        <br />
        bad {bad}
        <br />
        all {all}
        <br />
        average {avg}
        <br />
        positive {goodPct}%
      </div>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give feedback</h2>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
