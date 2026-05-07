'use client'

import { useState } from 'react'

const initialTasks = [
  { id: 1, title: 'Šport', person: 'Sara', type: 'Dnevno', icon: '🏃‍♀️', color: 'bg-violet-200', done: false, points: 10 },
  { id: 2, title: 'Branje 20 minut', person: 'Tijan', type: 'Dnevno', icon: '📚', color: 'bg-blue-200', done: false, points: 5 },
  { id: 3, title: 'Pospravi sobo', person: 'Sija', type: 'Dnevno', icon: '🧸', color: 'bg-pink-200', done: false, points: 5 },
  { id: 4, title: 'Sprehod z Missy', person: 'Družina', type: 'Dnevno', icon: '🐾', color: 'bg-yellow-200', done: false, points: 8 },
  { id: 5, title: 'Zalij vrt', person: 'Sara', type: 'Tedensko', icon: '🌱', color: 'bg-green-200', done: false, points: 7 },
  { id: 6, title: 'Čiščenje kopalnice', person: 'Družina', type: 'Tedensko', icon: '🧽', color: 'bg-cyan-200', done: false, points: 10 },
]

const profiles = [
  { name: 'Sara', emoji: '👩', text: 'text-violet-700', bg: 'bg-violet-100' },
  { name: 'Tijan', emoji: '👦', text: 'text-blue-700', bg: 'bg-blue-100' },
  { name: 'Sija', emoji: '👧', text: 'text-pink-700', bg: 'bg-pink-100' },
  { name: 'Missy', emoji: '🐶', text: 'text-yellow-700', bg: 'bg-yellow-100' },
]

export default function Page() {
  const [activeUser, setActiveUser] = useState('Sara')
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState('Vse')

  function toggleTask(id) {
    setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task))
  }

  const visibleTasks = tasks.filter(task => {
    const userMatch = activeUser === 'Missy' ? task.title.includes('Missy') : task.person === activeUser || task.person === 'Družina'
    const filterMatch = filter === 'Vse' || task.type === filter
    return userMatch && filterMatch
  })

  const points = tasks
    .filter(task => task.done && (task.person === activeUser || task.person === 'Družina'))
    .reduce((sum, task) => sum + task.points, 0)

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-violet-100 to-cyan-100 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-8 rounded-[2rem] bg-white/80 p-6 shadow-xl backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-black text-violet-700 md:text-6xl">Pisani Plan 🌈</h1>
              <p className="mt-2 text-gray-700">Družinski planer za dnevna, tedenska in mesečna opravila.</p>
            </div>
            <button className="rounded-2xl bg-violet-600 px-6 py-3 text-lg font-bold text-white shadow-lg hover:bg-violet-700">+ Dodaj opravilo</button>
          </div>
        </section>

        <section className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {profiles.map(profile => (
            <button key={profile.name} onClick={() => setActiveUser(profile.name)} className={`${profile.bg} rounded-3xl p-5 text-left shadow-lg transition hover:scale-105 ${activeUser === profile.name ? 'ring-4 ring-violet-500' : ''}`}>
              <div className="mb-2 text-4xl">{profile.emoji}</div>
              <h2 className={`text-2xl font-black ${profile.text}`}>{profile.name}</h2>
              <p className="text-gray-700">{profile.name === activeUser ? points : 0} točk ⭐</p>
            </button>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-[2rem] bg-white p-6 shadow-xl lg:col-span-2">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <h2 className="text-3xl font-black text-violet-700">Opravila za: {activeUser} ✨</h2>
              <div className="flex gap-2">
                {['Vse', 'Dnevno', 'Tedensko', 'Mesečno'].map(item => (
                  <button key={item} onClick={() => setFilter(item)} className={`rounded-2xl px-4 py-2 font-bold ${filter === item ? 'bg-violet-600 text-white' : 'bg-violet-100 text-violet-700'}`}>{item}</button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {visibleTasks.map(task => (
                <div key={task.id} className={`${task.color} rounded-3xl p-5 shadow-md ${task.done ? 'opacity-60' : ''}`}>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{task.icon}</div>
                      <div>
                        <h3 className={`text-2xl font-black text-gray-800 ${task.done ? 'line-through' : ''}`}>{task.title}</h3>
                        <p className="text-gray-700">{task.person} · {task.type} · {task.points} točk</p>
                      </div>
                    </div>
                    <button onClick={() => toggleTask(task.id)} className="rounded-2xl bg-white px-5 py-3 font-black shadow hover:scale-105">
                      {task.done ? '↩ Razveljavi' : '✔ Opravljeno'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[2rem] bg-white p-6 shadow-xl">
              <h2 className="mb-4 text-3xl font-black text-pink-600">Nagrade 🎁</h2>
              <div className="space-y-3 font-bold">
                <div className="rounded-2xl bg-pink-100 p-4">🍦 Sladoled za 30 točk</div>
                <div className="rounded-2xl bg-yellow-100 p-4">🎬 Filmski večer</div>
                <div className="rounded-2xl bg-cyan-100 p-4">🎮 Dodaten čas za igrice</div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-6 shadow-xl">
              <h2 className="mb-4 text-3xl font-black text-yellow-600">Missy 🐾</h2>
              <div className="space-y-3 text-lg font-bold">
                <div className="rounded-2xl bg-yellow-100 p-4">🦴 Hrana</div>
                <div className="rounded-2xl bg-yellow-100 p-4">🚶 Sprehod</div>
                <div className="rounded-2xl bg-yellow-100 p-4">💧 Voda</div>
                <div className="rounded-2xl bg-yellow-100 p-4">🩺 Veterinar</div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  )
}
