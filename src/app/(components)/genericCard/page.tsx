// 'use client'
// import React, { useEffect, useState } from 'react'

// // Enhanced type definitions with proper optional fields
// type SWAPIResource = {
//   name?: string
//   title?: string
//   url: string
//   films?: string[]
//   [key: string]: any
// } & (
//   | {
//       model?: string
//       manufacturer?: string
//       cost_in_credits?: string
//       length?: string
//       starship_class?: string
//       vehicle_class?: string
//       max_atmosphering_speed?: string
//     }
//   | {
//       climate?: string
//       terrain?: string
//       population?: string
//       diameter?: string
//       rotation_period?: string
//       orbital_period?: string
//     }
//   | {
//       episode_id?: number
//       director?: string
//       producer?: string
//       release_date?: string
//       opening_crawl?: string
//       characters?: string[]
//       planets?: string[]
//       starships?: string[]
//       vehicles?: string[]
//       species?: string[]
//     }
//   | {
//       height?: string
//       mass?: string
//       hair_color?: string
//       skin_color?: string
//       eye_color?: string
//       birth_year?: string
//       gender?: string
//       homeworld?: string
//       species?: string[]
//       vehicles?: string[]
//       starships?: string[]
//     }
// )

// interface ResourceCardProps {
//   resource: SWAPIResource
//   resourceType: 'starships' | 'vehicles' | 'planets' | 'films' | 'people'
//   expandedResourceId: string | null
//   onToggleDetails: (resourceUrl: string) => void
//   relatedDetails?: Record<string, { name?: string; title?: string }>
// }

// const ResourceCard: React.FC<ResourceCardProps> = ({
//   resource,
//   resourceType,
//   expandedResourceId,
//   onToggleDetails,
//   relatedDetails = {}
// }) => {
//   // Safe URL extraction
//   const extractId = (url: string): string => {
//     try {
//       const parts = url.split('/').filter(Boolean)
//       return parts[parts.length - 1] || ''
//     } catch {
//       return ''
//     }
//   }

//   const resourceId = extractId(resource.url)
//   const isExpanded = expandedResourceId === resourceId

//   // Color schemes with fallbacks
//   const colorSchemes = {
//     starships: 'blue',
//     vehicles: 'green',
//     planets: 'orange',
//     films: 'purple',
//     people: 'yellow'
//   } as const

//   const colorScheme = colorSchemes[resourceType] || 'gray'

//   // Safe property access with fallbacks
//   const getDisplayProperties = () => {
//     const commonProps = [
//       { label: 'Name', value: resource.name || resource.title || 'Unknown' }
//     ]

//     switch (resourceType) {
//       case 'starships':
//         return [
//           ...commonProps,
//           { label: 'Model', value: resource.model || 'Unknown' },
//           { label: 'Class', value: resource.starship_class || 'Unknown' },
//           { label: 'Cost', value: resource.cost_in_credits ? `${resource.cost_in_credits} credits` : 'Unknown' },
//           { label: 'Length', value: resource.length ? `${resource.length}m` : 'Unknown' }
//         ]
//       case 'vehicles':
//         return [
//           ...commonProps,
//           { label: 'Model', value: resource.model || 'Unknown' },
//           { label: 'Class', value: resource.vehicle_class || 'Unknown' },
//           { label: 'Cost', value: resource.cost_in_credits ? `${resource.cost_in_credits} credits` : 'Unknown' },
//           { label: 'Speed', value: resource.max_atmosphering_speed ? `${resource.max_atmosphering_speed} km/h` : 'Unknown' }
//         ]
//       case 'planets':
//         return [
//           ...commonProps,
//           { label: 'Climate', value: resource.climate || 'Unknown' },
//           { label: 'Terrain', value: resource.terrain || 'Unknown' },
//           { label: 'Population', value: resource.population || 'Unknown' },
//           { label: 'Diameter', value: resource.diameter ? `${resource.diameter} km` : 'Unknown' }
//         ]
//       case 'films':
//         return [
//           { label: 'Title', value: resource.title || 'Unknown' },
//           { label: 'Episode', value: resource.episode_id?.toString() || 'Unknown' },
//           { label: 'Director', value: resource.director || 'Unknown' },
//           { label: 'Release Date', value: resource.release_date || 'Unknown' }
//         ]
//       case 'people':
//         return [
//           ...commonProps,
//           { label: 'Gender', value: resource.gender || 'Unknown' },
//           { label: 'Birth Year', value: resource.birth_year || 'Unknown' },
//           { label: 'Height', value: resource.height ? `${resource.height} cm` : 'Unknown' },
//           { label: 'Mass', value: resource.mass ? `${resource.mass} kg` : 'Unknown' }
//         ]
//       default:
//         return commonProps
//     }
//   }

//   // Safe related items access
//   const getRelatedItems = () => {
//     const items: string[] = []
//     let label = 'Related'

//     switch (resourceType) {
//       case 'starships':
//       case 'vehicles':
//       case 'planets':
//       case 'people':
//         label = 'Films'
//         if (resource.films) {
//           items.push(...resource.films.map(url => relatedDetails[url]?.title || 'Loading...'))
//         }
//         break
//       case 'films':
//         label = 'Characters'
//         if (resource.characters) {
//           items.push(...resource.characters.map(url => relatedDetails[url]?.name || 'Loading...'))
//         }
//         break
//     }

//     return { label, items }
//   }

//   const displayProperties = getDisplayProperties()
//   const { label: relatedLabel, items: relatedItems } = getRelatedItems()

//   return (
//     <div className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-${colorScheme}-400/20 hover:border-${colorScheme}-400/50 transition-colors`}>
//       {/* Card Header */}
//       <div className={`bg-black/50 py-3 px-4 border-b border-${colorScheme}-400/20`}>
//         <h2 className={`text-${colorScheme}-400 text-xl font-bold truncate`}>
//           {resource.name || resource.title || 'Unknown'}
//         </h2>
//         <p className="text-gray-400 text-sm capitalize">
//           {resourceType.slice(0, -1)}
//         </p>
//       </div>
      
//       {/* Card Body */}
//       <div className="p-4">
//         <div className="grid grid-cols-2 gap-3 mb-3">
//           {displayProperties.slice(1, 5).map((prop, index) => (
//             <div key={index}>
//               <p className="text-gray-400 text-xs uppercase">{prop.label}</p>
//               <p className="text-white">{prop.value}</p>
//             </div>
//           ))}
//         </div>
        
//         {/* Expandable Section */}
//         {relatedItems.length > 0 && (
//           <>
//             <button
//               onClick={() => onToggleDetails(resource.url)}
//               className={`w-full py-1 px-2 rounded-full text-xs font-medium transition-colors ${
//                 isExpanded
//                   ? `bg-${colorScheme}-400/30 text-${colorScheme}-300`
//                   : `bg-${colorScheme}-400/10 text-${colorScheme}-400 hover:bg-${colorScheme}-400/20`
//               }`}
//             >
//               {relatedItems.length} {relatedLabel.toLowerCase()}
//             </button>
            
//             {isExpanded && (
//               <div className={`mt-3 pt-2 border-t border-${colorScheme}-400/20`}>
//                 <h4 className={`text-${colorScheme}-400 text-sm font-medium mb-2`}>
//                   {relatedLabel}:
//                 </h4>
//                 <ul className="space-y-2 max-h-40 overflow-y-auto">
//                   {relatedItems.map((item, index) => (
//                     <li key={index} className="text-white text-sm">
//                       {item}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   )
// }