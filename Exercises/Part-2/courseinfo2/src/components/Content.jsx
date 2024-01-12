import Part from './Part'
import Total from './Total'


//const variables are passed as props by the <Content .... />
const Content = ({courses}) => {
    return (
      <div>
        <h2>{courses.name}</h2>
        <Part parts={courses.parts} />
        <Total parts={courses.parts} />
      </div>
    )
  }

  export default Content
