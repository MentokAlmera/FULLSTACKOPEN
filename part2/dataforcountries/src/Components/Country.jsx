import Weather from './Weather'

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital?.[0]}</div>
      <div>Area: {country.area}</div>

      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>

      <img
        src={country.flags.png}
        alt={`flag of ${country.name.common}`}
        width="150"
      />

      {/* ✅ Weather component */}
      <Weather country={country} />
    </div>
  )
}

export default Country
