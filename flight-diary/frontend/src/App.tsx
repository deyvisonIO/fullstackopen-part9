import axios from "axios";
import React, { useEffect, useState } from "react"

interface Diary {
  id: number;
  date: string;
  visibility: 'great' | 'good' | 'ok' | 'poor';
  weather: 'sunny' | 'rainy' | 'cloudy' |'stormy' | 'windy';
}


function App() {
  const [diaryEntries, setDiaryEntries] = useState<Diary[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/diaries").then(response => setDiaryEntries(response.data))
  }, [])


  function addDiary(diaryEntrie: Diary) {
    setDiaryEntries(state => [...state, diaryEntrie]); 
  }

  return (
    <div>
      <DiaryForm addDiary={addDiary}/>
      <Diaries diaryEntries={diaryEntries}/>
    </div>
  )
}

function DiaryForm({ addDiary }: { addDiary: (diaryEntrie: Diary) => void }) {
  const [notification, setNotification] = useState("");

  function submitDiary(event: React.SyntheticEvent<HTMLFormElement>){
    event.preventDefault();
    const date = event.currentTarget.date.value;
    const visibility = event.currentTarget.visibility.value;
    const comment = event.currentTarget.comment.value;
    const weather = event.currentTarget.weather.value;

    axios.post("http://localhost:3000/api/diaries", { date, visibility, comment, weather })
      .then(response => response?.data?.error ? notify(response.data.error) : addDiary(response.data))
      .catch(error => notify(error.response.data))
  }

  function notify(content: string) {
    setNotification(content)
    setTimeout(() => setNotification(""), 5000)
  }

  return (
    <div>
      {notification ? <p>{notification}</p> : null}
      <form onSubmit={submitDiary}>
        <div>
          <label htmlFor="date">date</label>
          <input type="date" name="date" id="date" />
        </div>
        <fieldset>
          <label>Visibility: </label>
          <span>
            <label htmlFor="great">great</label>
            <input type="radio" name="visibility" value="great" id="great" />
          </span>
          <span>
            <label htmlFor="good">good</label>
            <input type="radio" name="visibility" value="good" id="good" />
          </span>
          <span>
            <label htmlFor="ok">ok</label>
            <input type="radio" name="visibility" value="ok" id="ok" />
          </span>
          <span>
            <label htmlFor="poor">poor</label>
            <input type="radio" name="visibility" value="poor" id="poor" />
          </span>
        </fieldset>
        <fieldset>
          <label>Weather: </label>
          <span>
            <label htmlFor="sunny">sunny</label>
            <input type="radio" name="weather" value="sunny" id="sunny" />
          </span>
          <span>
            <label htmlFor="rainy">rainy</label>
            <input type="radio" name="weather" value="rainy" id="rainy" />
          </span>
          <span>
            <label htmlFor="cloudy">cloudy</label>
            <input type="radio" name="weather" value="cloudy" id="cloudy" />
          </span>
          <span>
            <label htmlFor="stormy">stormy</label>
            <input type="radio" name="weather" value="stormy" id="stormy" />
          </span>
          <span>
            <label htmlFor="windy">windy</label>
            <input type="radio" name="weather" value="windy" id="windy" />
          </span>
        </fieldset>
        <div>
          <label htmlFor="comment">comment</label>
          <input type="text" name="comment" id="comment" />
        </div>
        <button type="submit">add</button>
      </form> 
    </div>
  )
}

function Diaries({ diaryEntries}: { diaryEntries: Diary[]}) {
  if(diaryEntries.length === 0) {
    return null
  }
  return (
    <>
      {diaryEntries.map((diary: Diary) => <p key={diary.id}>{diary.date} {diary.visibility} {diary.weather}</p>)}
    </>
  )
}


export default App
