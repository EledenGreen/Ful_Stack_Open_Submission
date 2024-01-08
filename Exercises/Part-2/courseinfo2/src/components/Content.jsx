import Part from './Part'


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

  export default Content