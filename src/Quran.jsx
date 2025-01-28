import React, { useState, useEffect, useRef } from "react";
import { FaQuran } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import { IoBookmark } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Bookmarks from "./Bookmarks";

const Quran = () => {
  const [surahs, setSurahs] = useState([]);
  const [ayahs, setAyahs] = useState([]);
  const [tempSurahs, setTempSurahs] = useState([]);
  const [title, setTitle] = useState("Al-Faatiha");
  const [loading, setLoading] = useState(false);
  const [bookmarkSaved, setBookmarkSaved] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => {
    const savedQuranBookmarks = localStorage.getItem("savedQuranBookmarks");
    return savedQuranBookmarks ? JSON.parse(savedQuranBookmarks) : [];
  });
  const timeoutRef = useRef(null);
  const [showBookmark, setShowBookmark] = useState(false);

  useEffect(() => {
    localStorage.setItem("savedQuranBookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    getVerse();
  }, []);

  async function getVerse() {
    setLoading(true);
    const url = "https://api.alquran.cloud/v1/quran/en.asad";
    const response = await fetch(url);
    const data = await response.json();
    setSurahs(data.data.surahs);
    setTempSurahs(data.data.surahs);
    setAyahs(data.data.surahs[0].ayahs);
    setLoading(false);
  }

  function playAudio(ayahsText) {
    const utterance = new SpeechSynthesisUtterance(ayahsText);
    window.speechSynthesis.speak(utterance);
  }

  function getAyahByNumber(number, surahName) {
    const getAyah = surahs.find((surah) => surah.number === number);
    if (getAyah) {
      setAyahs(getAyah.ayahs);
      setTitle(surahName);
    }
  }

  function filterSurahs(text) {
    const filteredSurahs = tempSurahs.filter((surah) =>
      surah.englishName
        .replace(/-/g, " ")
        .trim()
        .toLowerCase()
        .includes(text.trim().toLowerCase())
    );
    setSurahs(filteredSurahs);
  }

  function bookmarkText(text) {
   
    setBookmarks((prev) => {
      const sameText = prev.some((prevAyah) => prevAyah.text === text);
      if (sameText) {
        return prev; 
      } else {
     
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      setBookmarkSaved(false);
    }

    setBookmarkSaved(true);

    timeoutRef.current = setTimeout(() => {
      setBookmarkSaved(false);
    }, 5000);

        // Add the new bookmark
        return [...prev, { id: Math.random(), text }];
      }
    });
  }

  return (
    <div>
      <div className="container">
        <div className="quran-info">
          <h1>
            Quran App <FaQuran />
          </h1>
          <button onClick={() => setShowBookmark(false)}>Read Quran</button>
          <br />
          <br />
          <button onClick={() => setShowBookmark(true)}>Bookmarks</button>
          <p>Made by @Suad Pllana</p>
        </div>

        {!showBookmark ? (
          <>
            <div className="surahs">
              <div className="search-surah">
                <h2>Surahs</h2>
                <input
                  className="search-surahs"
                  type="text"
                  placeholder="Search surahs"
                  onChange={(e) => filterSurahs(e.target.value)}
                />
              </div>

              {!loading ? (
                surahs.map((surah) => (
                  <div
                    className="surah"
                    key={surah.number}
                    onClick={() => getAyahByNumber(surah.number, surah.englishName)}
                  >
                    <h2>
                      {surah.number}. {surah.englishName}
                    </h2>
                    <p>{surah.englishNameTranslation}</p>
                    <p>
                      {surah.revelationType}, {surah.ayahs.length} ayahs
                    </p>
                    <hr />
                  </div>
                ))
              ) : (
                <AiOutlineLoading3Quarters className="loading" />
              )}
            </div>

            <div className="ayahs">
              <h1>{title} ayahs</h1>

              {!loading ? (
                ayahs.map((ayah) => (
                  <div key={ayah.number}>
                    <p>
                      {ayah.numberInSurah}. {ayah.text}
                    </p>
                    {bookmarks.length > 0 ? (
                      bookmarks.some((bookmark) => bookmark.text === ayah.text) ? (
                        <IoBookmark className="icon" />
                      ) : (
                        <CiBookmark className="icon" onClick={() => bookmarkText(ayah.text)} />
                      )
                    ) : (
                      <CiBookmark className="icon" onClick={() => bookmarkText(ayah.text)} />
                    )}

                    <HiOutlineSpeakerWave
                      className="icon"
                      onClick={() => playAudio(ayah.text)}
                    />
                    <hr />
                  </div>
                ))
              ) : (
                <AiOutlineLoading3Quarters className="loading" />
              )}
            </div>
          </>
        ) : (
          <Bookmarks bookmarks={bookmarks} setBookmarks={setBookmarks} />
        )}
      </div>

      {bookmarkSaved && (
        <div className="toastNotification">
          <p>Bookmark saved</p>
          <div className="timer"></div>
        </div>
      )}
    </div>
  );
};

export default Quran;
