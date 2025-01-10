import React from 'react'
import {useState, useEffect} from "react"
const Quran = () => {

    const [quranData , setQuranData] = useState([])
    const [surahsCount , setSurahsCount] = useState(0)
    const [ayahsCount, setAyahsCount] = useState(0)

    useEffect(() => {
      getVerse()
  }, [])

        async function getVerse(){
            const url = "https://api.alquran.cloud/v1/quran/en.asad";
            const response = await fetch(url)
            const data = await response.json()
        
            setQuranData(data)
           
        }
        function playAudio(){
          const utterance = new SpeechSynthesisUtterance(quranData.data.surahs[surahsCount].ayahs[ayahsCount].text);
          window.speechSynthesis.speak(utterance);
        }
        function nextVerse(){
          getVerse()
            
          if(ayahsCount >= quranData.data.surahs[surahsCount].ayahs.length - 2){
            setAyahsCount(0)
            setSurahsCount(prev => prev + 1)
           }
           setAyahsCount(prev => prev + 1)
           console.log(ayahsCount)
        }
        function previousVerse(){
          console.log(ayahsCount)
          if(ayahsCount == 0 ){
         return
           }
         
          setAyahsCount(prev => prev - 1);
    
        }
    

  return (
    <div>
      <div className="container">
      <h1>Quran Verses🕋</h1>
        {quranData.data ? <>
            <h1>Arabic Name: {quranData.data.surahs[surahsCount].englishName ? quranData.data.surahs[surahsCount].englishName : ""}</h1>
        <h2>English: {quranData.data.surahs[surahsCount].englishNameTranslation ? quranData.data.surahs[surahsCount].englishNameTranslation : ""}</h2>
            <p>{quranData.data.surahs[surahsCount].ayahs[ayahsCount].text ? quranData.data.surahs[surahsCount].ayahs[ayahsCount].text : ""}</p>
                            </> :<></>}
        <button onClick={previousVerse}>Previous Verse</button>
        <button onClick={nextVerse}>Next verse</button>
        <button className="audioReciter" onClick={playAudio}>Play audio</button>
      </div>
    </div>
  )
}

export default Quran
