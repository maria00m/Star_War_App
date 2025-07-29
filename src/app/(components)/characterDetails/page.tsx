'use client'
import React, { useEffect, useState } from 'react'
import Modal from '../ui/Modal'
import { Character, Film } from '../types'
import LoadingSpinner from '../ui/NextUISpinner'

export default function CharacterDetails() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [filmDetails, setFilmDetails] = useState<Record<string, Film>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedFilms, setSelectedFilms] = useState<Film[]>([])
  const [modalTitle, setModalTitle] = useState('')

  const extractId = (url: string): string => {
    const parts = url.split('/').filter(part => part !== '')
    return parts[parts.length - 1]
  }

  const fetchFilmDetails = async (filmUrls: string[]) => {
    const newFilmDetails: Record<string, Film> = {}
    
    for (const url of filmUrls) {
      if (!filmDetails[url]) {
        try {
          const response = await fetch(url)
          if (!response.ok) throw new Error(`Failed to fetch film: ${url}`)
          const data: Film = await response.json()
          newFilmDetails[url] = data
        } catch (err) {
          console.error(`Error fetching film ${url}:`, err)
        }
      }
    }
    
    setFilmDetails(prev => ({ ...prev, ...newFilmDetails }))
    return newFilmDetails
  }

  const openFilmsModal = async (character: Character) => {
    setModalTitle(`Films featuring ${character.name}`)
    
    const newFilmDetails = await fetchFilmDetails(character.films)
    const allFilmDetails = { ...filmDetails, ...newFilmDetails }
    
    
    const films = character.films.map(url => allFilmDetails[url]).filter(Boolean)
    setSelectedFilms(films)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedFilms([])
    setModalTitle('')
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('https://swapi.info/api/people')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      // console.log('API Response:', data) // Debug log
      
      let charactersArray: Character[] = []
      
      if (Array.isArray(data)) {
        charactersArray = data
      } else if (data.results && Array.isArray(data.results)) {
        charactersArray = data.results
      } else if (data.data && Array.isArray(data.data)) {
        charactersArray = data.data
      } else {
        console.warn('Unexpected API response structure:', data)
        charactersArray = []
      }
      
      // console.log('Characters array:', charactersArray) 
      setCharacters(charactersArray)
    } catch (err) {
      console.error('Fetch error:', err)
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

if (loading) return (
  <LoadingSpinner
    size="lg" 
    color="warning" 
    message="Loading films ,far away..." 
  />
)
  if (error) return (
    <div className="text-red-400 p-4">
      <p>Error: {error}</p>
      <button 
        onClick={fetchData}
        className="mt-2 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
      >
        Try Again
      </button>
    </div>
  )
  if (!characters.length) return (
    <div className="text-gray-400 p-4">
      No characters available
      <button 
        onClick={fetchData}
        className="ml-2 px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
      >
        Refresh
      </button>
    </div>
  )

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        {characters.map(character => (
          <div 
            key={character.url}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-yellow-400/20 hover:border-yellow-400/50 transition-colors"
          >
            <div className="bg-black/50 py-3 px-4 border-b border-yellow-400/20">
              <h2 className="text-yellow-400 text-xl font-bold truncate">{character.name}</h2>
              <p className="text-gray-400 text-sm">{character.gender} • {character.birth_year}</p>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-gray-400 text-xs uppercase">Height</p>
                  <p className="text-white">{character.height !== 'unknown' ? `${character.height} cm` : 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase">Mass</p>
                  <p className="text-white">{character.mass !== 'unknown' ? `${character.mass} kg` : 'Unknown'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase">Hair Color</p>
                  <p className="text-white">{character.hair_color}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase">Eye Color</p>
                  <p className="text-white">{character.eye_color}</p>
                </div>
              </div>
              
              <button
                onClick={() => openFilmsModal(character)}
                className="w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20 border border-yellow-400/30"
              >
                View {character.films.length} film{character.films.length !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={modalTitle}
      >
        <div className="space-y-4">
          {selectedFilms.length > 0 ? (
            selectedFilms.map((film, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4 border border-yellow-400/20">
                <h3 className="text-yellow-400 font-bold text-lg mb-2">
                  Episode {film.episode_id}: {film.title}
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-gray-400 text-xs uppercase">Director</p>
                    <p className="text-white text-sm">{film.director}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase">Release Date</p>
                    <p className="text-white text-sm">{film.release_date}</p>
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase">Producer</p>
                  <p className="text-white text-sm">{film.producer}</p>
                </div>
                {film.opening_crawl && (
                  <div className="mt-3">
                    <p className="text-gray-400 text-xs uppercase">Opening Crawl</p>
                    <p className="text-white text-sm italic mt-1 line-clamp-4">
                      {film.opening_crawl}
                    </p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-8">
              <p>Loading film details...</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}