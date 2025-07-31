'use client'
import React, { useEffect, useState } from 'react'
import Modal from '../ui/Modal'
import { Vehicle, Film } from '../types'
import LoadingSpinner from '../ui/NextUISpinner'

/**
 * Vehicle details component - displays Star Wars vehicles with film information
 * @returns {JSX.Element} Vehicle details page component
 */
export default function VehicleDetails() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [filmDetails, setFilmDetails] = useState<Record<string, Film>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedFilms, setSelectedFilms] = useState<Film[]>([])
  const [modalTitle, setModalTitle] = useState('')
 /**
   * Extracts ID from Star Wars API URL
   * @param {string} url - Full API URL to extract ID from
   * @returns {string} Extracted ID from URL
   */
  const extractId = (url: string): string => {
    const parts = url.split('/').filter(part => part !== '')
    return parts[parts.length - 1]
  }
 /**
   * Fetches film details from Star Wars API
   * @param {string[]} filmUrls - Array of film API URLs to fetch
   * @returns {Promise<Record<string, Film>>} Promise resolving to film details object
   */
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

  /**
   * Opens modal displaying films for selected vehicle
   * @param {Vehicle} vehicle - Vehicle object containing film URLs
   * @returns {Promise<void>} Promise that resolves when modal opens
   */
  const openFilmsModal = async (vehicle: Vehicle) => {
    setModalTitle(`Films featuring ${vehicle.name}`)
    
    // Fetch film details if not already loaded
    const newFilmDetails = await fetchFilmDetails(vehicle.films)
    const allFilmDetails = { ...filmDetails, ...newFilmDetails }
    
    // Get the film objects for the modal
    const films = vehicle.films.map(url => allFilmDetails[url]).filter(Boolean)
    setSelectedFilms(films)
    setModalOpen(true)
  }
 /**
   * Closes the films modal and resets state
   * @returns {void}
   */
  const closeModal = () => {
    setModalOpen(false)
    setSelectedFilms([])
    setModalTitle('')
  }
  /**
   * Fetches vehicle data from Star Wars API
   * @returns {Promise<void>} Promise that resolves when data is fetched
   */
  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('https://swapi.info/api/vehicles')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setVehicles(Array.isArray(data) ? data : [])
    } catch (err) {
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
     message="Loading vehicles from a galaxy far, far away..." 
   />
 )
  if (error) return (
    <div className="text-red-400 p-4">
      <p>Error: {error}</p>
      <button 
        onClick={fetchData}
        className="mt-2 px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500"
      >
        Try Again
      </button>
    </div>
  )
  if (!vehicles.length) return (
    <div className="text-gray-400 p-4">
      No vehicles available
      <button 
        onClick={fetchData}
        className="ml-2 px-4 py-2 bg-orange-400 text-white rounded hover:bg-orange-500"
      >
        Refresh
      </button>
    </div>
  )

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {vehicles.map(vehicle => (
          <div 
            key={vehicle.url}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-orange-400/20 hover:border-orange-400/50 transition-colors"
          >
            <div className="bg-black/50 py-3 px-4 border-b border-orange-400/20">
              <h2 className="text-orange-400 text-xl font-bold truncate">{vehicle.name}</h2>
              <p className="text-gray-400 text-sm">{vehicle.vehicle_class}</p>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-gray-400 text-xs uppercase">Model</p>
                  <p className="text-white">{vehicle.model}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase">Manufacturer</p>
                  <p className="text-white">{vehicle.manufacturer}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase">Cost</p>
                  <p className="text-white">{vehicle.cost_in_credits} credits</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs uppercase">Max Speed</p>
                  <p className="text-white">{vehicle.max_atmosphering_speed} km/h</p>
                </div>
              </div>
              
              <button
                onClick={() => openFilmsModal(vehicle)}
                className="w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors bg-orange-400/10 text-orange-400 hover:bg-orange-400/20 border border-orange-400/30"
              >
                View {vehicle.films.length} Film{vehicle.films.length !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={closeModal} title={modalTitle}>
        {selectedFilms.length > 0 ? (
          <div className="space-y-4">
            {selectedFilms.map((film, index) => (
              <div key={film.url || index} className="bg-gray-800 rounded-lg p-4 border border-orange-400/20 hover:border-orange-400/40 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-orange-400 font-bold text-lg">
                      Episode {film.episode_id}: {film.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{film.release_date}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-3">
                  <div>
                    <span className="text-gray-400 text-xs uppercase">Director:</span>
                    <p className="text-white">{film.director}</p>
                  </div>
                  <div>
                    <span className="text-gray-400 text-xs uppercase">Producer:</span>
                    <p className="text-white">{film.producer}</p>
                  </div>
                </div>
                
                <div>
                  <span className="text-gray-400 text-xs uppercase">Opening Crawl:</span>
                  <p className="text-white text-sm mt-1 leading-relaxed max-h-32 overflow-y-auto">
                    {film.opening_crawl}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-orange-400 animate-pulse">Loading films...</div>
          </div>
        )}
      </Modal>
    </>
  )
}