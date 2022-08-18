const adjectives = [
  '기쁜',
  '똑똑한',
  '따뜻한',
  '시원한',
  '강한',
  '큰',
  '작은',
  '성실한',
  '긴',
  '빠른',
];
const colors = [
  '핑크',
  '레드',
  '그린',
  '블랙',
  '블루',
  '화이트',
  '퍼플',
  '옐로우',
  '오렌지',
  '베이지',
];

const locations = [
  '아시아',
  '아프리카',
  '아메리카',
  '유럽',
  '페르시아',
  '중동',
  '남미',
  '북미',
  '대서양',
  '태평양',
  '인도',
  '남극',
  '북극',
];

const animals = [
  '코끼리',
  '치타',
  '거북이',
  '토끼',
  '고양이',
  '강아지',
  '호랑이',
  '부엉이',
  '악어',
  '기린',
];

const rand = (max: number) => {
  return Math.floor(Math.random() * (max + 1));
};

export const generateRandomNickname = () => {
  const randomAdjective = adjectives[rand(adjectives.length - 1)];
  const randomColor = colors[rand(colors.length - 1)];
  const randomLocation = locations[rand(locations.length - 1)];
  const randomAnimal = animals[rand(animals.length - 1)];

  return randomAdjective + randomColor + randomLocation + randomAnimal;
};
