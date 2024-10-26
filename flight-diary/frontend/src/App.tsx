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
          <input type="text" name="date" id="date" />
        </div>
        <div>
          <label htmlFor="visibility">visibility</label>
          <input type="text" name="visibility" id="visibility" />
        </div>
        <div>
          <label htmlFor="weather">weather</label>
          <input type="text" name="weather" id="weather" />
        </div>
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
