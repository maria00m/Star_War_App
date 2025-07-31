
/**
 * @interface Planet
 * @description Represents a planet in the Star Wars universe with detailed planetary characteristics
 */
export interface Planet {
  /** @type {string} The name of this planet */
  name: string
  /** @type {string} The number of standard hours it takes for this planet to complete a single rotation on its axis */
  rotation_period: string
  /** @type {string} The number of standard days it takes for this planet to complete a single orbit of its local star */
  orbital_period: string
  /** @type {string} The diameter of this planet in kilometers */
  diameter: string
  /** @type {string} The climate of this planet (arid, temperate, tropical, etc.) */
  climate: string
  /** @type {string} A number denoting the gravity of this planet, where "1" is normal or 1 standard G */
  gravity: string
  /** @type {string} The terrain of this planet (desert, grasslands, mountains, etc.) */
  terrain: string
  /** @type {string} The percentage of the planet surface that is naturally occurring water or bodies of water */
  surface_water: string
  /** @type {string} The average population of sentient beings inhabiting this planet */
  population: string
  /** @type {string[]} An array of People URL Resources that live on this planet */
  residents: string[]
  /** @type {string[]} An array of Film URL Resources that this planet has appeared in */
  films: string[]
  /** @type {string} The ISO 8601 date format of the time that this resource was created */
  created: string
  /** @type {string} The ISO 8601 date format of the time that this resource was edited */
  edited: string
  /** @type {string} The hypermedia URL of this resource */
  url: string
}

/**
 * @interface Character
 * @description Represents a character/person in the Star Wars universe with biographical and physical information
 */
export interface Character {
  /** @type {string} The name of this person */
  name: string
  /** @type {string} The height of the person in centimeters */
  height: string
  /** @type {string} The mass of the person in kilograms */
  mass: string
  /** @type {string} The hair color of this person (blonde, brown, black, etc.) */
  hair_color: string
  /** @type {string} The skin color of this person */
  skin_color: string
  /** @type {string} The eye color of this person */
  eye_color: string
  /** @type {string} The birth year of the person, using the in-universe standard of BBY or ABY */
  birth_year: string
  /** @type {string} The gender of this person (male, female, hermaphrodite, n/a) */
  gender: string
  /** @type {string} The URL of a planet resource, a planet that this person was born on or inhabits */
  homeworld: string
  /** @type {string[]} An array of film resource URLs that this person has been in */
  films: string[]
  /** @type {string[]} An array of species resource URLs that this person belongs to */
  species: string[]
  /** @type {string[]} An array of vehicle resource URLs that this person has piloted */
  vehicles: string[]
  /** @type {string[]} An array of starship resource URLs that this person has piloted */
  starships: string[]
  /** @type {string} The ISO 8601 date format of the time that this resource was created */
  created: string
  /** @type {string} The ISO 8601 date format of the time that this resource was edited */
  edited: string
  /** @type {string} The hypermedia URL of this resource */
  url: string
}

/**
 * @interface Film
 * @description Represents a Star Wars film/movie with comprehensive episode information
 */
export interface Film {
  /** @type {string} The title of this film */
  title: string
  /** @type {number} The episode number of this film */
  episode_id: number
  /** @type {string} The opening paragraphs at the beginning of this film */
  opening_crawl: string
  /** @type {string} The name of the director of this film */
  director: string
  /** @type {string} The name(s) of the producer(s) of this film */
  producer: string
  /** @type {string} The ISO 8601 date format of film release at original creator country */
  release_date: string
  /** @type {string[]} An array of people resource URLs that are in this film */
  characters: string[]
  /** @type {string[]} An array of planet resource URLs that are in this film */
  planets: string[]
  /** @type {string[]} An array of starship resource URLs that are in this film */
  starships: string[]
  /** @type {string[]} An array of vehicle resource URLs that are in this film */
  vehicles: string[]
  /** @type {string[]} An array of species resource URLs that are in this film */
  species: string[]
  /** @type {string} The ISO 8601 date format of the time that this resource was created */
  created: string
  /** @type {string} The ISO 8601 date format of the time that this resource was edited */
  edited: string
  /** @type {string} The hypermedia URL of this resource */
  url: string
}

/**
 * @interface Starship
 * @description Represents a starship in the Star Wars universe with detailed technical specifications
 */
export interface Starship {
  /** @type {string} The name of this starship (common name, such as "Death Star") */
  name: string
  /** @type {string} The model or official name of this starship (such as "T-65 X-wing") */
  model: string
  /** @type {string} The manufacturer of this starship */
  manufacturer: string
  /** @type {string} The cost of this starship new, in galactic credits */
  cost_in_credits: string
  /** @type {string} The length of this starship in meters */
  length: string
  /** @type {string} The maximum speed of this starship in the atmosphere */
  max_atmosphering_speed: string
  /** @type {string} The number of personnel needed to run or pilot this starship */
  crew: string
  /** @type {string} The number of non-essential people this starship can transport */
  passengers: string
  /** @type {string} The maximum number of kilograms that this starship can transport */
  cargo_capacity: string
  /** @type {string} The maximum length of time that this starship can provide consumables for its entire crew without having to resupply */
  consumables: string
  /** @type {string} The class of this starships hyperdrive */
  hyperdrive_rating: string
  /** @type {string} The Maximum number of Megalights per hour that this starship can travel */
  MGLT: string
  /** @type {string} The class of this starship (Starfighter, Deep Space Mobile Battlestation, etc.) */
  starship_class: string
  /** @type {string[]} An array of People URL Resources that this starship has been piloted by */
  pilots: string[]
  /** @type {string[]} An array of Film URL Resources that this starship has appeared in */
  films: string[]
  /** @type {string} The ISO 8601 date format of the time that this resource was created */
  created: string
  /** @type {string} The ISO 8601 date format of the time that this resource was edited */
  edited: string
  /** @type {string} The hypermedia URL of this resource */
  url: string
}

/**
 * @interface Vehicle
 * @description Represents a vehicle in the Star Wars universe with detailed specifications for ground-based and atmospheric vehicles
 */
export interface Vehicle {
  /** @type {string} The name of this vehicle (common name, such as "Sand Crawler") */
  name: string
  /** @type {string} The model or official name of this vehicle (such as "All-Terrain Armored Transport") */
  model: string
  /** @type {string} The manufacturer of this vehicle */
  manufacturer: string
  /** @type {string} The cost of this vehicle new, in Galactic Credits */
  cost_in_credits: string
  /** @type {string} The length of this vehicle in meters */
  length: string
  /** @type {string} The maximum speed of this vehicle in the atmosphere */
  max_atmosphering_speed: string
  /** @type {string} The number of personnel needed to run or pilot this vehicle */
  crew: string
  /** @type {string} The number of non-essential people this vehicle can transport */
  passengers: string
  /** @type {string} The maximum number of kilograms that this vehicle can transport */
  cargo_capacity: string
  /** @type {string} The maximum length of time that this vehicle can provide consumables for its entire crew without having to resupply */
  consumables: string
  /** @type {string} The class of this vehicle (wheeled, repulsorcraft, etc.) */
  vehicle_class: string
  /** @type {string[]} An array of People URL Resources that this vehicle has been piloted by */
  pilots: string[]
  /** @type {string[]} An array of Film URL Resources that this vehicle has appeared in */
  films: string[]
  /** @type {string} The ISO 8601 date format of the time that this resource was created */
  created: string
  /** @type {string} The ISO 8601 date format of the time that this resource was edited */
  edited: string
  /** @type {string} The hypermedia URL of this resource */
  url: string
}