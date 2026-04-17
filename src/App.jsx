import Navbar from './components/Navbar/Navbar'
import TabBar from './components/TabBar/TabBar'
import useStore from './store/useStore'

function App() {
  const activePage = useStore((s) => s.activePage)

  return (
    <>
      <Navbar />
      <TabBar />
      <div className="wrap">
        {activePage === 'dictionary' && (
          <p style={{ color: 'var(--t2)' }}>Dictionary coming soon...</p>
        )}
        {activePage === 'history' && (
          <p style={{ color: 'var(--t2)' }}>History coming soon...</p>
        )}
      </div>
    </>
  )
}

export default App
