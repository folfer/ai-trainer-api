export function TranslateGender(gender: string) {
  let translatedGender
  if (gender === 'male') {
    translatedGender = 'homem'
  } else {
    translatedGender = 'mulher'
  }

  return translatedGender
}
