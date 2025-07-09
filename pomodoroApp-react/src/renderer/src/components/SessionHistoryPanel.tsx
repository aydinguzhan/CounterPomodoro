import React, { useState } from 'react'

interface Session {
  id: number
  start: Date
  end: Date
  duration: number
}

interface Props {
  sessions: Session[]
  tasks: Task[]
  isOpen: boolean
  onClose: () => void
  onDeleteSession: (id: number) => void
  onDeleteTask: (id: number) => void
  onClearAllSessions: () => void
  onClearAllTasks: () => void
  onToggleTaskCompleted: (id: number) => void
}

interface Task {
  id: number
  name: string
  completed: boolean
}

export default function SessionTaskHistoryPanel({
  sessions,
  tasks,
  isOpen,
  onClose,
  onDeleteSession,
  onDeleteTask,
  onClearAllSessions,
  onClearAllTasks,
  onToggleTaskCompleted
}: Props) {
  const [activeTab, setActiveTab] = useState<'sessions' | 'tasks'>('sessions')

  const totalSessionsDuration = sessions.reduce((acc, s) => acc + s.duration, 0)
  const totalTasksCompleted = tasks.filter((task) => task.completed).length

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
        <h2>Oturum ve Görev Geçmişi</h2>
        <div className="tabs-container">
          <div className="tab-buttons">
            <button
              className={`tab-button ${activeTab === 'sessions' ? 'active' : ''}`}
              onClick={() => setActiveTab('sessions')}
            >
              Oturum Geçmişi
            </button>
            <button
              className={`tab-button ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              Görev Geçmişi
            </button>
          </div>
        </div>

        {activeTab === 'sessions' && (
          <>
            {sessions.length > 0 && (
              <button className="clear-all-btn" onClick={onClearAllSessions}>
                🗑️ Tüm Oturumları Temizle
              </button>
            )}

            <p className="total">Toplam Oturum Süresi: {formatTime(totalSessionsDuration)}</p>

            <div className="session-list">
              {sessions.length === 0 ? (
                <p>Henüz oturum geçmişi bulunmuyor.</p>
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
                    <button className="delete-btn" onClick={() => onDeleteSession(s.id)}>
                      🗑️ Sil
                    </button>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {activeTab === 'tasks' && (
          <>
            {tasks.length > 0 && (
              <button className="clear-all-btn" onClick={onClearAllTasks}>
                🗑️ Tüm Görevleri Temizle
              </button>
            )}

            <p className="total">Tamamlanan Görevler: {totalTasksCompleted}</p>

            <div className="task-list">
              {tasks.length === 0 ? (
                <p>Henüz görev geçmişi bulunmuyor.</p>
              ) : (
                tasks.map((task) => (
                  <div key={task.id} className="task-item">
                    <div>
                      <strong>Adı:</strong>
                      <br /> {task.name}
                    </div>
                    <div>
                      <strong>Durum:</strong> {task.completed ? '✅ Tamamlandı' : '❌ Tamamlanmadı'}
                    </div>

                    <div className="task-buttons">
                      <button className="toggle-btn" onClick={() => onToggleTaskCompleted(task.id)}>
                        {task.completed ? '↩ Geri Al' : '✔ Tamamla'}
                      </button>

                      <button className="delete-btn" onClick={() => onDeleteTask(task.id)}>
                        🗑️ Sil
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
