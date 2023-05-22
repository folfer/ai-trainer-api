export function TranslateGoal(goal: string) {
  let translatedGoal
  if (goal === 'hypertrophy') {
    translatedGoal = 'hipertrofia'
  } else if (goal === 'slimmering') {
    translatedGoal = 'emagrecimento'
  } else if (goal === 'strengthEndurance') {
    translatedGoal = 'força e resistência'
  } else {
    translatedGoal = 'saúde'
  }

  return translatedGoal
}
