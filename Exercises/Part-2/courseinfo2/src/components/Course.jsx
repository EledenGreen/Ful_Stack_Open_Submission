import Content from './Content'

const Course = ({course}) => {
    return (
      <div>
        <div>
          {course.map(courses => (
            <Content key ={courses.id} courses={courses} />
          ))}
        </div>
      </div>
    )
  }

export default Course