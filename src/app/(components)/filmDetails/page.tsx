'use client'
import React, { useEffect, useState } from 'react'
import Modal from '../ui/Modal'
import { Film, Character } from '../types'
import LoadingSpinner from '../ui/NextUISpinner'

export default function FilmDetails() {
  const [films, setFilms] = useState<Film[]>([])
  const [characterDetails, setCharacterDetails] = useState<Record<string, Character>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([])
  const [modalTitle, setModalTitle] = useState('')

  const extractId = (url: string): string => {
    const parts = url.split('/').filter(part => part !== '')
    return parts[parts.length - 1]
  }

  const fetchCharacterDetails = async (characterUrls: string[]) => {
    const newCharacterDetails: Record<string, Character> = {}
    
    for (const url of characterUrls) {
      if (!characterDetails[url]) {
        try {
          const response = await fetch(url)
          if (!response.ok) throw new Error(`Failed to fetch character: ${url}`)
          const data: Character = await response.json()
          newCharacterDetails[url] = data
        } catch (err) {
          console.error(`Error fetching character ${url}:`, err)
        }
      }
    }
    
    setCharacterDetails(prev => ({ ...prev, ...newCharacterDetails }))
    return newCharacterDetails
  }

  const openCharactersModal = async (film: Film) => {
    setModalTitle(`Characters in ${film.title}`)
    
    // Fetch character details if not already loaded
    const newCharacterDetails = await fetchCharacterDetails(film.characters)
    const allCharacterDetails = { ...characterDetails, ...newCharacterDetails }
    
    // Get the character objects for the modal
    const characters = film.characters.map(url => allCharacterDetails[url]).filter(Boolean)
    setSelectedCharacters(characters)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedCharacters([])
    setModalTitle('')
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('https://swapi.info/api/films')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('API Response:', data) // Debug log
      
      // Handle different possible response structures
      let filmsArray: Film[] = []
      
      if (Array.isArray(data)) {
        filmsArray = data
      } else if (data.results && Array.isArray(data.results)) {
        filmsArray = data.results
      } else if (data.data && Array.isArray(data.data)) {
        filmsArray = data.data
      } else {
        console.warn('Unexpected API response structure:', data)
        filmsArray = []
      }
      
      console.log('Films array:', filmsArray) // Debug log
      setFilms(filmsArray)
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
     message="Loading planets from a galaxy far, far away..." 
   />
 )
  if (error) return (
    <div className="text-red-400 p-4">
      <p>Error: {error}</p>
      <button 
        onClick={fetchData}
        className="mt-2 px-4 py-2 bg-purple-400 text-white rounded hover:bg-purple-500"
      >
        Try Again
      </button>
    </div>
  )
  if (!films.length) return (
    <div className="text-gray-400 p-4">
      No films available
      <button 
        onClick={fetchData}
        className="ml-2 px-4 py-2 bg-purple-400 text-white rounded hover:bg-purple-500"
      >
        Refresh
      </button>
    </div>
  )

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {films.map(film => (
          <div 
            key={film.url}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-purple-400/20 hover:border-purple-400/50 transition-colors"
          >
            <div className="bg-black/50 py-3 px-4 border-b border-purple-400/20">
              <h2 className="text-purple-400 text-xl font-bold truncate">
                Episode {film.episode_id}: {film.title}
              </h2>
              <p className="text-gray-400 text-sm">{film.release_date}</p>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-gray-400 text-xs uppercase">Director</p>
                  <p className="text-white">{film.director}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase">Producer</p>
                  <p className="text-white">{film.producer}</p>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-gray-400 text-xs uppercase">Opening Crawl</p>
                <p className="text-white text-sm line-clamp-3">{film.opening_crawl}</p>
              </div>
              
              <button
                onClick={() => openCharactersModal(film)}
                className="w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors bg-purple-400/10 text-purple-400 hover:bg-purple-400/20 border border-purple-400/30"
              >
                View {film.characters.length} character{film.characters.length !== 1 ? 's' : ''}
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
          {selectedCharacters.length > 0 ? (
            selectedCharacters.map((character, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4 border border-purple-400/20">
                <h3 className="text-purple-400 font-bold text-lg mb-2">
                  {character.name}
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-gray-400 text-xs uppercase">Gender</p>
                    <p className="text-white text-sm">{character.gender}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase">Birth Year</p>
                    <p className="text-white text-sm">{character.birth_year}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase">Height</p>
                    <p className="text-white text-sm">{character.height !== 'unknown' ? `${character.height} cm` : 'Unknown'}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase">Mass</p>
                    <p className="text-white text-sm">{character.mass !== 'unknown' ? `${character.mass} kg` : 'Unknown'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-xs uppercase">Hair Color</p>
                    <p className="text-white text-sm">{character.hair_color}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase">Eye Color</p>
                    <p className="text-white text-sm">{character.eye_color}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-8">
              <p>Loading character details...</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  )
}