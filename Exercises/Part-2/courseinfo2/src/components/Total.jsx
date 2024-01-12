const Total = ({parts}) => {
    const sum = parts.reduce(
      (accumulator, currentValue) => accumulator + currentValue.exercises,
      0,
    )

    return (
      <div>
        <p>Total no. of Exercises: {sum}</p>
      </div>
    )
  }

  export default Total