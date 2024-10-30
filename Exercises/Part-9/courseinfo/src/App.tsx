const App = () => {
  const courseName = 'Half Stack application development'
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ]

  interface HeaderProps {
    courseName: string
  }

  const Header = (props: HeaderProps) => {
    return <h2>{props.courseName}</h2>
  }

  interface courseParts {
    name: string
    exerciseCount: number
  }

  interface ContentProps {
    courseParts: courseParts[]
  }

  const Content = (props: ContentProps) => {
    return (
      <>
        {props.courseParts.map((item, index) => (
          <div key={index}>
            {item.name} {item.exerciseCount}
          </div>
        ))}
      </>
    )
  }

  const Total = (props: ContentProps) => {
    const total = props.courseParts.reduce(
      (sum, part) => sum + part.exerciseCount,
      0
    )

    return <div>Number of exercises: {total}</div>
  }

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  )
}

export default App
