const Course = ({ course }) => {
  const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total sum={total} />
    </>
  )
}

const Header = ({ name }) => <h2>{name}</h2>

const Total = ({ sum }) => <strong>total of {sum} exercises</strong>

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ parts }) =>
  <>
    {parts.map(part =>
      <Part key={part.id} part={part} />
    )}
  </>

export default Course