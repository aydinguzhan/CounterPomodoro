import React, { useState } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
  onAddTask: (taskName: string) => void
}

export default function TaskModal({ isOpen, onClose, onAddTask }: Props) {
  const [taskName, setTaskName] = useState('')

  const handleSubmit = () => {
    if (taskName.trim()) {
      onAddTask(taskName.trim())
      setTaskName('')
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Yeni Görev Ekle</h2>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Görev adı girin..."
          className="modal-input"
        />
        <button className="start-button" onClick={handleSubmit}>
          Ekle
        </button>
      </div>
    </div>
  )
}
