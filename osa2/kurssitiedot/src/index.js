import React from 'react'
import ReactDOM from 'react-dom'

const Header = props =>
  <h1>{props.course}</h1>

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
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} exercises={course.exercises} />
    </div>
    )
}

const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }
    
  
    return (
      <div>
        <Course course={course} />
      </div>
    )
  }

ReactDOM.render(
  <App />,
  document.getElementById('root')
)