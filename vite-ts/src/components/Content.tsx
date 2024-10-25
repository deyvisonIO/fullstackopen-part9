import Part from "./Part";
import { CoursePart } from "../App";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map(coursePart => <Part key={coursePart.name} coursePart={coursePart}/>)}
    </>
  )
}

export default Content
