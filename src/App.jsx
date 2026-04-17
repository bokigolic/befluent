import Navbar from './components/Navbar/Navbar'
import TabBar from './components/TabBar/TabBar'
import FlagSwitcher from './components/FlagSwitcher/FlagSwitcher'
import SearchBar from './components/SearchBar/SearchBar'
import ResultCard from './components/ResultCard/ResultCard'
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen'
import HistoryPage from './pages/HistoryPage/HistoryPage'
import useStore from './store/useStore'

function App() {
  const activePage    = useStore((s) => s.activePage)
  const setActivePage = useStore((s) => s.setActivePage)
  const dictMode      = useStore((s) => s.dictMode)
  const currentWord   = useStore((s) => s.currentWord)
  const setCurrentWord = useStore((s) => s.setCurrentWord)
  const addToHistory  = useStore((s) => s.addToHistory)
  const addXP         = useStore((s) => s.addXP)

  const handleSearch = (word) => {
    setCurrentWord(word)
    addToHistory(word, dictMode)
    addXP(5)
  }

  const handleWordClick = (word) => {
    setCurrentWord(word)
    addToHistory(word, dictMode)
    addXP(3)
  }

  const handleHistoryClick = (word, mode) => {
    setActivePage('dictionary')
    setCurrentWord(word)
    addToHistory(word, mode)
  }

  return (
    <>
      <Navbar />
      <TabBar />
      <div className="wrap">
        {activePage === 'dictionary' && (
          <>
            <FlagSwitcher />
            <SearchBar onSearch={handleSearch} />
            {!currentWord
              ? <WelcomeScreen onSearch={handleSearch} />
              : (
                <ResultCard
                  word={currentWord}
                  dictMode={dictMode}
                  onWordClick={handleWordClick}
                />
              )
            }
          </>
        )}
        {activePage === 'history' && (
          <HistoryPage onWordClick={handleHistoryClick} />
        )}
      </div>
    </>
  )
}

export default App
