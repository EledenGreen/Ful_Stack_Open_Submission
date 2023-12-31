const Header = ({course}) => {
  return (
    <div>
      <p>Course Name: {course.name}</p>
    </div>
  )
}

const Total = ({parts}) => {
  return (
    <div>
      <p>Total no. of Exercises: {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
    </div>
  )
}

const App = () => {
  const course = {
    name:'Half Stack application development',
    parts : [
  {
    name :'Fundamentals of React',
    exercises : 10
  },
  {
    name: 'Using props to pass data',
    exercises : 7
  },
  {
    name: 'State of a component',
    exercises : 14
  }
]
}
  return (
    <>
      <Header course = {course}/>
      <Content parts = {course.parts} />
      <Total parts = {course.parts} />
    </>
  )
}

//const variables are passed as props by the <Content .... />
const Content = ({parts}) => {
  return (
    <div>
      <Part no='1' topic={parts[0].name} exercise={parts[0].exercises} />
      <Part no='2' topic={parts[1].name} exercise={parts[1].exercises} />
      <Part no='3' topic={parts[2].name} exercise={parts[2].exercises} /> 
    </div>
  )
}

const Part = ({no, topic, exercise}) => {
  return (
    <div>
      <p>Part {no}:{topic} | Exercises: {exercise}</p>
    </div>
  )
}

export default App