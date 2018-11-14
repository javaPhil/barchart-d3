/**
 * sample data
 * "PIG POPULATIONS": [
    {
      "year": 2000,
      "island": "Hawaii",
      "pigPopulation": 5260
    },
    {
      "year": 2000,
      "island": "Maui",
      "pigPopulation": 1250
    },
 * @param {*} json
 */

const parsePigJson = json => {
  if (!json) return {}
  const parsedJson = {}
  const pigJSON = json['PIG POPULATIONS']

  if (pigJSON) {
    for (let object of pigJSON) {
      const { year, pigPopulation, island } = object
      const jsonArray = parsedJson[year] ? parsedJson[year] : []
      jsonArray.push({ island, pigPopulation })

      parsedJson[year] = jsonArray
    }
    return parsedJson
  } else {
    return {}
  }
}

export default parsePigJson
