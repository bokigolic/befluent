import Navbar from './components/Navbar/Navbar'
import TabBar from './components/TabBar/TabBar'
import FlagSwitcher from './components/FlagSwitcher/FlagSwitcher'
import SearchBar from './components/SearchBar/SearchBar'
import useStore from './store/useStore'

function App() {
  const activePage = useStore((s) => s.activePage)

  return (
    <>
      <Navbar />
      <TabBar />
      <div className="wrap">
        {activePage === 'dictionary' && (
          <>
            <FlagSwitcher />
            <SearchBar onSearch={(word) => console.log('search:', word)} />
          </>
        )}
        {activePage === 'history' && (
          <p style={{ color: 'var(--t2)' }}>History coming soon...</p>
        )}
      </div>
    </>
  )
}

export default App
