import { CoursePart } from "../App"

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  switch(coursePart.kind) {
    case "basic":
      return (
        <div>
          <h3>{coursePart.name}</h3>
          <p>{coursePart.description}</p>
          <p>exercise count: {coursePart.exerciseCount}</p>
        </div>
      )
    case "group":
      return (
        <div>
          <h3>{coursePart.name}</h3>
          <p>exercise count: {coursePart.exerciseCount}</p>
          <p>group project count: {coursePart.groupProjectCount}</p>
        </div>
      )
    case "background":
      return (
        <div>
          <h3>{coursePart.name}</h3> 
          <p>{coursePart.description}</p>
          <p>exercise count: {coursePart.exerciseCount}</p>
          <p>submit to {coursePart.backgroundMaterial}</p>
        </div>
      )
    case "special":
      return (
        <div>
          <h3>{coursePart.name}</h3>
          <p>{coursePart.description}</p> 
          <p>exercise count: {coursePart.exerciseCount}</p>
          <p>required skills: {coursePart.requirements.join(",")}</p>
        </div>
      )
    default:
      return null
  }
}

export default Part
