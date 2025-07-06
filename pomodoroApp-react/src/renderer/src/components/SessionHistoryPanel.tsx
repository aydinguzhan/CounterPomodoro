import React from 'react'

interface Session {
  id: number
  start: Date
  end: Date
  duration: number
}

interface Props {
  sessions: Session[]
  isOpen: boolean
  onClose: () => void
  onDelete: (id: number) => void
  onClearAll: () => void
}

export default function SessionHistoryPanel({
  sessions,
  isOpen,
  onClose,
  onDelete,
  onClearAll
}: Props) {
  const total = sessions.reduce((acc, s) => acc + s.duration, 0)

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className={`panel-wrapper ${isOpen ? 'open' : ''}`}>
      <div className="panel">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Oturum Geçmişi</h2>

        {sessions.length > 0 && (
          <button className="clear-all-btn" onClick={onClearAll}>
            🗑️ Tümünü Temizle
          </button>
        )}

        <p className="total">Toplam Süre: {formatTime(total)}</p>

        <div className="session-list">
          {sessions.length === 0 ? (
            <p>Henüz geçmiş bulunmuyor.</p>
          ) : (
            sessions.map((s) => (
              <div key={s.id} className="session-item">
                <div>
                  <strong>Başlangıç:</strong> {new Date(s.start).toLocaleTimeString()}
                </div>
                <div>
                  <strong>Bitiş:</strong> {new Date(s.end).toLocaleTimeString()}
                </div>
                <div>
                  <strong>Süre:</strong> {formatTime(s.duration)}
                </div>
                <button className="delete-btn" onClick={() => onDelete(s.id)}>
                  🗑️ Sil
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
