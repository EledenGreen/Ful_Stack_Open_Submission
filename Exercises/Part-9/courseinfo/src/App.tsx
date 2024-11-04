import './App.css'

const App = () => {
  const courseName = 'Half Stack application development'

  interface CoursePartBase {
    name: string
    exerciseCount: number
  }

  interface CoursePartDescription extends CoursePartBase {
    description: string
  }

  interface CoursePartBasic extends CoursePartDescription {
    kind: 'basic'
  }

  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number
    kind: 'group'
  }

  interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial: string
    kind: 'background'
  }

  interface CoursePartSpecial extends CoursePartDescription {
    requirements: string[]
    kind: 'special'
  }

  type CoursePart =
    | CoursePartBasic
    | CoursePartGroup
    | CoursePartBackground
    | CoursePartSpecial

  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
      kind: 'basic',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: 'group',
    },
    {
      name: 'Basics of type Narrowing',
      exerciseCount: 7,
      description: 'How to go from unknown to string',
      kind: 'basic',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      backgroundMaterial:
        'https://type-level-typescript.com/template-literal-types',
      kind: 'background',
    },
    {
      name: 'TypeScript in frontend',
      exerciseCount: 10,
      description: 'a hard part',
      kind: 'basic',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      kind: 'special',
    },
  ]

  interface HeaderProps {
    courseName: string
  }

  const Header = (props: HeaderProps) => {
    return <h2>{props.courseName}</h2>
  }

  interface ContentProps {
    courseParts: CoursePart[]
  }

  const Content = (props: ContentProps) => {
    return (
      <>
        <Part courseParts={props.courseParts} />
      </>
    )
  }

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }

  const Part = (props: ContentProps) => {
    return (
      <>
        {props.courseParts.map((item, index) => {
          switch (item.kind) {
            case 'basic':
              return (
                <div key={index}>
                  <p style={{ fontWeight: 'bold' }}>
                    {item.name} {item.exerciseCount}
                  </p>
                  <p style={{ fontStyle: 'italic' }}>{item.description}</p>
                </div>
              )
            case 'group':
              return (
                <div key={index}>
                  <p style={{ fontWeight: 'bold' }}>
                    {item.name} {item.exerciseCount}
                  </p>
                  <p style={{ fontStyle: 'italic' }}>
                    project exercises: {item.groupProjectCount}
                  </p>
                </div>
              )
            case 'background':
              return (
                <div key={index}>
                  <p style={{ fontWeight: 'bold' }}>
                    {item.name} {item.exerciseCount}
                  </p>
                  <p style={{ fontStyle: 'italic' }}>{item.description}</p>
                  <p>
                    Background Material:{' '}
                    <a href={item.backgroundMaterial} target="_blank">
                      {item.backgroundMaterial}
                    </a>
                  </p>
                </div>
              )

            case 'special':
              return (
                <div key={index}>
                  <p style={{ fontWeight: 'bold' }}>
                    {item.name} {item.exerciseCount}
                  </p>
                  <p style={{ fontStyle: 'italic' }}>{item.description}</p>
                  <p>Requirements: {item.requirements.join(', ')}</p>
                </div>
              )
            default:
              return assertNever(item)
          }
        })}
      </>
    )
  }

  const Total = (props: ContentProps) => {
    const total = props.courseParts.reduce(
      (sum, part) => sum + part.exerciseCount,
      0
    )

    return (
      <div>
        <hr />
        Total exercises: {total}
      </div>
    )
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
