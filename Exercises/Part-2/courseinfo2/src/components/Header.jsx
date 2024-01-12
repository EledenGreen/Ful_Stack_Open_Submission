

const Header = ({course}) => {
    return (
      <div>
        <p><strong>Course Name: {course.name}</strong></p>
        {course.map(courses => <Content key={courses.id} parts={courses} />)}
      </div>
    )
}
export default Header