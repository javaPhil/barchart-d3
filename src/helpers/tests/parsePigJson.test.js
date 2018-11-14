import parsePigJson from '../parsePigJson'

const goodJson = {
  'PIG POPULATIONS': [
    {
      'year': 2000,
      'island': 'Hawaii',
      'pigPopulation': 5260
    },
    {
      'year': 2000,
      'island': 'Maui',
      'pigPopulation': 1250
    }
  ]
}

const badJson = {
  'dragon_ninjas': [
    {
      count: 500,
      emotionLevel: 'hungry',
      skillLevel: 9001
    }
  ]
}

const malformedJson = [1, 5, 15, 25, 50, 99]

test('an expected set of json returns an object of parsed data', () => {
  const expectedJson = { '2000': [{ 'island': 'Hawaii', 'pigPopulation': 5260 }, { 'island': 'Maui', 'pigPopulation': 1250 }] }
  expect(parsePigJson(goodJson)).toEqual(expectedJson)
})

test('a bad set of json returns an empty object', () => {
  expect(parsePigJson(badJson)).toEqual({})
})

test('a malformed set of json returns an empty object', () => {
  expect(parsePigJson(malformedJson)).toEqual({})
})

test('a falsy parameter returns an empty object', () => {
  expect(parsePigJson(null)).toEqual({})
})
