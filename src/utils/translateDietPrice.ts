export function TranslatedDietPrice(dietPrice: string) {
  let translatedDietPrice;
  if (dietPrice === "cheap") {
    translatedDietPrice = "barata";
  } else {
    translatedDietPrice = "sem restrição de valor";
  }

  return translatedDietPrice;
}
