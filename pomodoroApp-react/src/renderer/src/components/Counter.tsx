import { useEffect, useState, useReducer } from 'react'
import Confetti from 'react-confetti'
import { Util } from '../utils/Utitls'
import { useWindowSize } from '../hooks/useWindowSize'
import SessionHistoryPanel from './SessionHistoryPanel'

type Session = {
  id: number
  start: Date
  end: Date
  duration: number
}

export default function Counter() {
  const { width, height } = useWindowSize()

  const [inputMinute, setInputMinute] = useState<string>('30')
  const [count, setCount] = useState<number>(0)

  const [state, dispatchReducer] = useReducer(
    (action: any, state: any) => {
      return { ...action, ...state }
    },
    {
      intervalId: null,
      isRunning: false,
      isPaused: false,
      sessionStartTime: null
    }
  )

  const { intervalId, isRunning, isPaused, sessionStartTime } = state

  const [showCongrats, setShowCongrats] = useState(false)
  const [sessionHistory, setSessionHistory] = useState<Session[]>([])

  const [panelOpen, setPanelOpen] = useState(false)

  const util = new Util()

  const totalWorkedSeconds = sessionHistory.reduce((acc, s) => acc + s.duration, 0)

  useEffect(() => {
    const stored = localStorage.getItem('sessionHistory')
    if (stored) {
      const parsed = JSON.parse(stored)
      const restored = parsed.map((s: any) => ({
        ...s,
        start: new Date(s.start),
        end: new Date(s.end)
      }))
      setSessionHistory(restored)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('sessionHistory', JSON.stringify(sessionHistory))
  }, [sessionHistory])

  const startTimer = () => {
    if (intervalId) clearInterval(intervalId)
    const totalSeconds = parseInt(inputMinute) * 60
    setCount(totalSeconds)
    const id = util.setTimer(setCount, totalSeconds)

    dispatchReducer({
      intervalId: id,
      isRunning: true,
      isPaused: false,
      sessionStartTime: new Date()
    })
  }

  const pauseTimer = () => {
    if (intervalId) clearInterval(intervalId)

    dispatchReducer({
      intervalId: null,
      isRunning: false,
      isPaused: true
    })
  }

  const resumeTimer = () => {
    const id = util.setTimer(setCount, count)
    dispatchReducer({
      intervalId: id,
      isRunning: true,
      isPaused: false
    })
  }

  const stopTimer = () => {
    if (intervalId) clearInterval(intervalId)
    dispatchReducer({
      intervalId: null,
      isRunning: false,
      isPaused: false
    })
  }

  const resetTimer = () => {
    if (intervalId) clearInterval(intervalId)
    setCount(0)
    dispatchReducer({
      intervalId: null,
      isRunning: false,
      isPaused: false,
      sessionStartTime: null
    })
    // setIsRunning(false)
    // setIsPaused(false)
    // setIntervalId(null)
    // setSessionStartTime(null)
  }

  const handlePause = () => {
    if (!sessionStartTime) return

    const end = new Date()
    const duration = Math.floor((end.getTime() - sessionStartTime.getTime()) / 1000)

    setSessionHistory((prev) => [
      ...prev,
      {
        id: Date.now(),
        start: sessionStartTime,
        end,
        duration
      }
    ])

    setPanelOpen(true)
    pauseTimer()
  }

  const handleMainButtonClick = () => {
    if (!isRunning && !isPaused) startTimer()
    else if (isRunning) handlePause()
    else if (isPaused) resumeTimer()
  }

  const renderButtonText = () => {
    if (!isRunning && !isPaused) return 'Başlat'
    if (isRunning) return 'Durdur'
    if (isPaused) return 'Devam Et'
    return ''
  }

  const closeCongrats = () => {
    setShowCongrats(false)
  }

  const deleteSession = (id: number) => {
    setSessionHistory((prev) => prev.filter((s) => s.id !== id))
  }

  const clearAllSessions = () => {
    setSessionHistory([])
  }

  useEffect(() => {
    if (count === 0 && (isRunning || isPaused)) {
      stopTimer()
      if (sessionStartTime) {
        const end = new Date()
        const duration = Math.floor((end.getTime() - sessionStartTime.getTime()) / 1000)

        setSessionHistory((prev) => [
          ...prev,
          {
            id: Date.now(),
            start: sessionStartTime,
            end,
            duration
          }
        ])
      }
      setShowCongrats(true)
      dispatchReducer({ sessionStartTime: null })
    }
  }, [count])

  return (
    <>
      <button onClick={() => setPanelOpen(true)} className="history-button">
        <span className="icon">📜</span>
        <span>Geçmiş</span>
      </button>

      <SessionHistoryPanel
        isOpen={panelOpen}
        sessions={sessionHistory}
        onClose={() => setPanelOpen(false)}
        onDelete={deleteSession}
        onClearAll={clearAllSessions}
      />

      <div className="counter-container">
        <h1>Geri Sayım</h1>

        <div className="counter-input-wrapper">
          <label className="input-label" htmlFor="minute-input">
            Çalışma Süresi
          </label>
          <div className="counter-input-field-wrapper">
            <input
              id="minute-input"
              type="number"
              value={inputMinute}
              onChange={(e) => setInputMinute(e.target.value)}
              min={1}
              step={5}
              className="counter-input-field"
              placeholder="Dakika gir"
              disabled={isRunning}
            />
            <div className="input-suffix">dakika</div>
          </div>
        </div>

        {/* Butonlar */}
        <div className="button-group">
          <button onClick={handleMainButtonClick} className="start-button">
            {renderButtonText()}
          </button>

          <button
            onClick={resetTimer}
            className="start-button reset-button"
            disabled={!isRunning && !isPaused && count === 0}
          >
            Sıfırla
          </button>
        </div>

        {/* Sayaç */}
        <h2 className="counter-display">{util.formatTime(count)}</h2>

        {/* Confetti & Tebrik Ekranı */}
        {showCongrats && (
          <div className="congrats-overlay">
            <Confetti width={width} height={height} numberOfPieces={300} recycle={false} />
            <div className="congrats-content">
              <button className="close-btn" onClick={closeCongrats}>
                &times;
              </button>
              <h2>Tebrikler! 🎉</h2>
              <p>
                Toplam Çalışma Süreniz: <strong>{util.formatTime(totalWorkedSeconds)}</strong>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
