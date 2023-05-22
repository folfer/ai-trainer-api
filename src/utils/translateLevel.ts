export function TranslateLevel(level: string) {
  let translatedLevel
  if (level === 'starter') {
    translatedLevel = 'iniciante'
  } else if (level === 'intermediary') {
    translatedLevel = 'intermediário'
  } else {
    translatedLevel = 'avançado'
  }

  return translatedLevel
}
