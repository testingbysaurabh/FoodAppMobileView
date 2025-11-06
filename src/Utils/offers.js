export const OFFERS = [
  "10% off on all items",
  "Buy 1 Get 1 offers",
  "₹100 off on ₹499+",
  "Free delivery today",
  "20% off for students",
  "Extra 5% with card",
];

export function getRandomOffer() {
  const i = Math.floor(Math.random() * OFFERS.length);
  return OFFERS[i];
}


Math.randam = getRandomOffer;
