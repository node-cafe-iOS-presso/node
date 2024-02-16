enum EReaderLevel {
  STUDENT = '초등학생',
  COLLEAGE = '대학생',
  EXPERT = '전문가',
}

enum EPerspective {
  a = '개발자',
  b = '디자이너',
  c = '마케터',
  d = '기획자',
}

interface IPromptData {
  role: string; // 역할
  reader_level: EReaderLevel; // 말하는 난이도
  perspective: EPerspective; // 관점
  // tone: ETone; // 말투
}

export const generatePromptByData = (data: IPromptData) => {
  console.log(data);
  return;
};
