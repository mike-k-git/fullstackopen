import Weather from './Weather'

const Details = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <div>Capital {country.capital[0]}</div>
      <div>Area {country.area}</div>
      <h4>Languages:</h4>
      <ul>
        {Object.keys(country.languages).map((lang) => (
          <li key={lang}>{country.languages[lang]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
      <Weather country={country} />
    </>
  )
}

export default Details
