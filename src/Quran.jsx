import React from 'react'
import {useState, useEffect} from "react"
const Quran = () => {

    const [quranData , setQuranData] = useState([])
    const [surahsCount , setSurahsCount] = useState(0)
    const [ayahsCount, setAyahsCount] = useState(0)
        async function getVerse(){
            setAyahsCount(prev => prev + 1)

            
            const url = "https://api.alquran.cloud/v1/quran/en.asad";
            const response = await fetch(url)
            const data = await response.json()
           if(ayahsCount >= data.data.surahs[surahsCount].ayahs.length - 2){
            setAyahsCount(0)
            setSurahsCount(prev => prev + 1)
           }
            setQuranData(data)
           console.log(data.data)
        }


        useEffect(() => {
            getVerse()
        }, [])

  return (
    <div>
      <div className="container">
    
        {quranData.data > 0 ? <>
            <h1>{quranData.data.surahs[surahsCount].englishName}</h1>
        <h2>{quranData.data.surahs[surahsCount].englishNameTranslation}</h2>
            <p>{quranData.data.surahs[surahsCount].ayahs[ayahsCount].text}</p>
                            </> :<></>}
        <button onClick={getVerse}>Next verse</button>
      </div>
    </div>
  )
}

export default Quran
