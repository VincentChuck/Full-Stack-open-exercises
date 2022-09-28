import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const length = anecdotes.length

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(length).fill(0))

  const selectRandom = () => {
    let random = Math.floor(Math.random() * length)
    console.log('anecdote',random,'is currently displayed')
    return setSelected(random)
  }

  const handleVote = () => {
    const copyVotes = [...votes]
    copyVotes[selected] += 1
    console.log('votes:',copyVotes)
    return setVotes(copyVotes)
  }
  const highestVote = Math.max(...votes)
  const mostVoted = votes.indexOf(highestVote)

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]} <br/>
      <div>has {votes[selected]} votes</div>
      <button onClick={handleVote}>vote</button>
      <button onClick={selectRandom}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      {anecdotes[mostVoted]} <br/>
      <div>has {votes[mostVoted]} votes</div>
    </div>
  )
}

export default App