import React from 'react'

const Header2 = props =>
<h2>{props.text}</h2>

const Total = props => {
  const total = props.parts.reduce((acc,element) => acc + element.exercises, 0)
  return <p>yhteensä {total} tehtävää</p>
}
  

const Part = props =>
  <p>{props.part.name} {props.part.exercises}</p>

const Content = props => (
    props.parts.map(part =>
        <Part 
            key={part.id}
            part={part}
        />
    )
)

const Course = ({course}) => {
    return (
    <div>
        <Header2 text={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} exercises={course.exercises} />
    </div>
    )
}

export default Course
