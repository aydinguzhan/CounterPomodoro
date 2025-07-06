import React from 'react'

const style: React.CSSProperties = {
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.4)',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 18,
  fontWeight: 'bold',
  userSelect: 'none',
  // @ts-ignore
  WebkitAppRegion: 'drag' // Burası sürüklenebilir alan
}

const noDragStyle: React.CSSProperties = {
  // @ts-ignore
  WebkitAppRegion: 'no-drag' // Bu alan sürüklenmez, tıklanabilir
}

export default function Widget() {
  return (
    <div style={style}>
      <div style={noDragStyle}>
        {/* Sürüklenemeyen interaktif alan */}
        <button onClick={() => alert('Butona tıklandı!')}>Buton</button>
      </div>
      <span style={{ marginLeft: 10 }}>Widget - Sürükleyebilirsiniz</span>
    </div>
  )
}
