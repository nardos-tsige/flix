import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import TopBar from './ui/TopBar.jsx'
import Bottom from './ui/Bottom.jsx'
import Alert from './ui/Alert.jsx'
import Spinner from './ui/Spinner.jsx'
import InfoPanel from './ui/InfoPanel.jsx'
import PersonPanel from './ui/PersonPanel.jsx'
import VideoFrame from './ui/VideoFrame.jsx'
import Landing from './screens/Landing.jsx'
import Films from './screens/Films.jsx'
import Shows from './screens/Shows.jsx'
import People from './screens/People.jsx'
import Saved from './screens/Saved.jsx'
import Find from './screens/Find.jsx'
import Missing from './screens/Missing.jsx'
import { useThemeCtx } from './state/ThemeState.jsx'
import { useCatalog } from './hooks/useCatalog.js'
import { api } from './api/data.js'

const Shell = () => {
  const { theme } = useThemeCtx()
  const nav = useNavigate()
  const [route, setRoute] = useState('landing')
  const [openFilm, setOpenFilm] = useState(null)
  const [openPerson, setOpenPerson] = useState(null)
  const [alsoLike, setAlsoLike] = useState([])
  const [videoKey, setVideoKey] = useState(null)

  const catalog = useCatalog()

  const go = (key) => {
    setRoute(key)
    const path = {
      landing: '/',
      films: '/films',
      shows: '/shows',
      people: '/people',
      saved: '/saved',
      find: '/find',
    }[key]
    nav(path || '/')
    window.scrollTo({ top: 0 })
  }

  useEffect(() => {
    if (openFilm?.id) {
      api.getSimilar(openFilm.id).then(setAlsoLike)
    } else {
      setAlsoLike([])
    }
  }, [openFilm])

  const openMovie = async (m) => {
    // Sometimes callers pass just { id } — fetch the full record
    if (m && !m.title) {
      const full = await api.getById(m.id)
      if (full) setOpenFilm(full)
    } else {
      setOpenFilm(m)
    }
  }

  const dark = theme === 'dark'

  return (
    <div
      className={`
        min-h-screen flex flex-col
        ${dark ? 'bg-night-base text-ink-main' : 'bg-day-base text-ink-dark'}
      `}
    >
      <TopBar current={route} onGo={go} />

      <main className="flex-1">
        {catalog.loading ? (
          <div className="min-h-[75vh] grid place-items-center">
            <Spinner label="warming up the projector..." />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Landing {...catalog} onOpen={openMovie} onPlay={setVideoKey} onGo={go} onPerson={setOpenPerson} />} />
            <Route path="/films" element={<Films movies={catalog.movies} onOpen={openMovie} onPlay={setVideoKey} />} />
            <Route path="/shows" element={<Shows shows={catalog.shows} onOpen={openMovie} onPlay={setVideoKey} />} />
            <Route path="/people" element={<People people={catalog.people} onOpen={setOpenPerson} />} />
            <Route path="/saved" element={<Saved onOpen={openMovie} onPlay={setVideoKey} onGo={go} />} />
            <Route path="/find" element={<Find onOpen={openMovie} onPerson={setOpenPerson} onPlay={setVideoKey} />} />
            <Route path="*" element={<Missing onGo={go} />} />
          </Routes>
        )}
      </main>

      <Bottom onGo={go} />

      {openFilm && (
        <InfoPanel
          film={openFilm}
          alsoLike={alsoLike}
          onClose={() => setOpenFilm(null)}
          onPlay={setVideoKey}
          onOpen={openMovie}
        />
      )}

      {openPerson && (
        <PersonPanel
          person={openPerson}
          onClose={() => setOpenPerson(null)}
          onOpen={openMovie}
        />
      )}

      {videoKey && (
        <VideoFrame videoKey={videoKey} onClose={() => setVideoKey(null)} />
      )}

      <Alert />
    </div>
  )
}

export default function App() {
  return <Shell />
}