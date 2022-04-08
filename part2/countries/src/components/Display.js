const Display = ({ filter, data }) => {
  if (!filter) return

  if (data.length > 10) {
    return 'Too many matches, specify another filter'
  }

  if (data.length > 1) {
    return (
      <>
        {data.map((country) => (
          <div key={country.cca2}>{country.name.common}</div>
        ))}
      </>
    )
  }

  if (data.length === 1) {
    return (
      <>
        <h2>{data[0].name.common}</h2>
        <div>Capital {data[0].capital[0]}</div>
        <div>Area {data[0].area}</div>
        <h4>Languages:</h4>
        <ul>
          {Object.keys(data[0].languages).map((lang) => (
            <li key={lang}>{data[0].languages[lang]}</li>
          ))}
        </ul>
        <img src={data[0].flags.png} alt={`flag of ${data[0].name.common}`} />
      </>
    )
  }

  return 'No Results'
}

export default Display
