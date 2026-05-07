export const heavenlyStems = {
  갑: { element: 'wood', yinYang: 'yang', label: '갑목', description: '크게 자라는 나무처럼 방향성이 생기면 오래 밀고 가는 힘이 있습니다.' },
  을: { element: 'wood', yinYang: 'yin', label: '을목', description: '부드럽지만 쉽게 꺾이지 않는 풀처럼 주변 흐름을 잘 읽습니다.' },
  병: { element: 'fire', yinYang: 'yang', label: '병화', description: '햇빛처럼 드러나는 에너지가 있어 표현과 존재감이 강합니다.' },
  정: { element: 'fire', yinYang: 'yin', label: '정화', description: '촛불처럼 가까운 사람에게 깊게 집중하는 힘이 있습니다.' },
  무: { element: 'earth', yinYang: 'yang', label: '무토', description: '큰 산처럼 쉽게 흔들리지 않지만 변화에는 시간이 걸립니다.' },
  기: { element: 'earth', yinYang: 'yin', label: '기토', description: '밭의 흙처럼 현실을 돌보고 관계를 관리하는 힘이 있습니다.' },
  경: { element: 'metal', yinYang: 'yang', label: '경금', description: '단단한 금속처럼 기준이 분명하고 결단이 빠를 수 있습니다.' },
  신: { element: 'metal', yinYang: 'yin', label: '신금', description: '보석처럼 섬세한 기준과 감각이 강합니다.' },
  임: { element: 'water', yinYang: 'yang', label: '임수', description: '큰 물처럼 생각이 깊고 흐름을 크게 봅니다.' },
  계: { element: 'water', yinYang: 'yin', label: '계수', description: '비처럼 조용히 스며드는 감성과 직관이 있습니다.' },
};

export const earthlyBranches = {
  자: { element: 'water', yinYang: 'yang', label: '자수', hiddenStems: ['계'], description: '속으로 생각과 감정이 깊게 움직입니다.' },
  축: { element: 'earth', yinYang: 'yin', label: '축토', hiddenStems: ['기', '계', '신'], description: '현실을 견디며 천천히 쌓아가는 힘이 있습니다.' },
  인: { element: 'wood', yinYang: 'yang', label: '인목', hiddenStems: ['갑', '병', '무'], description: '시작하고 뻗어나가려는 힘이 살아 있습니다.' },
  묘: { element: 'wood', yinYang: 'yin', label: '묘목', hiddenStems: ['을'], description: '관계를 살피고 부드럽게 넓히는 힘이 있습니다.' },
  진: { element: 'earth', yinYang: 'yang', label: '진토', hiddenStems: ['무', '을', '계'], description: '변화 앞에서도 현실의 중심을 잡으려 합니다.' },
  사: { element: 'fire', yinYang: 'yin', label: '사화', hiddenStems: ['병', '무', '경'], description: '표현과 실행의 온도가 올라오기 쉽습니다.' },
  오: { element: 'fire', yinYang: 'yang', label: '오화', hiddenStems: ['정', '기'], description: '감정의 속도와 추진력이 강해집니다.' },
  미: { element: 'earth', yinYang: 'yin', label: '미토', hiddenStems: ['기', '정', '을'], description: '관계와 현실을 함께 품고 조율하려 합니다.' },
  신: { element: 'metal', yinYang: 'yang', label: '신금', hiddenStems: ['경', '임', '무'], description: '판단과 정리, 빠른 대응력이 살아납니다.' },
  유: { element: 'metal', yinYang: 'yin', label: '유금', hiddenStems: ['신'], description: '섬세한 기준과 마무리 감각이 강합니다.' },
  술: { element: 'earth', yinYang: 'yang', label: '술토', hiddenStems: ['무', '신', '정'], description: '책임과 정리를 통해 버티는 힘이 있습니다.' },
  해: { element: 'water', yinYang: 'yin', label: '해수', hiddenStems: ['임', '갑'], description: '감성과 직관이 넓고 깊게 흐릅니다.' },
};

export const elementKorean = {
  wood: '목',
  fire: '화',
  earth: '토',
  metal: '금',
  water: '수',
};

export const elementCounselWords = {
  wood: ['성장', '계획', '시작', '관계 확장'],
  fire: ['표현', '열정', '추진', '감정의 속도'],
  earth: ['안정', '현실', '신중함', '버티는 힘'],
  metal: ['판단', '기준', '정리', '결단'],
  water: ['감성', '직관', '생각', '유연함'],
};

export const tenGodDescriptions = {
  비견: '내 기준과 자존심으로 버티는 힘',
  겁재: '사람과 경쟁, 나눔 속에서 움직이는 힘',
  식신: '꾸준히 표현하고 결과를 만드는 힘',
  상관: '틀을 바꾸고 솔직하게 드러내는 힘',
  편재: '기회, 거래, 확장 자금을 보는 힘',
  정재: '고정 수입과 관리, 현실 감각을 잡는 힘',
  편관: '압박 속에서 결단하고 돌파하는 힘',
  정관: '책임, 관계의 약속, 조직 질서를 보는 힘',
  편인: '직관과 특별한 배움으로 방향을 잡는 힘',
  정인: '보호, 공부, 안정된 이해를 바탕으로 버티는 힘',
};

export const topicTenGodFocus = {
  love: ['정관', '편관', '정재', '편재', '식신', '상관', '정인', '편인'],
  money: ['정재', '편재', '식신', '상관'],
  job: ['정관', '편관', '정인', '편인', '식신', '상관', '비견', '겁재'],
  business: ['편재', '식신', '상관', '비견', '겁재', '정관', '편관'],
  general: ['비견', '겁재', '식신', '상관', '정재', '편재', '정관', '편관', '정인', '편인'],
};

export const topicSajuGuides = {
  love: {
    title: '연애',
    base: '관계에서는 끌림보다 반복되는 태도와 약속의 온도를 같이 봐야 합니다.',
    advice: '지금은 마음만 오래 붙잡기보다 상대가 행동으로 보여주는지를 보세요.',
  },
  money: {
    title: '재물',
    base: '돈은 들어오는 힘보다 새는 길을 먼저 막을 때 안정됩니다.',
    advice: '큰돈은 감정의 확신보다 현금 흐름과 회수 기간을 먼저 확인하세요.',
  },
  job: {
    title: '직업',
    base: '일에서는 책임, 전문성, 표현 방식이 함께 맞아야 오래 갑니다.',
    advice: '감정 피로와 실제 조건을 나눠 적으면 다음 선택이 선명해집니다.',
  },
  business: {
    title: '사업',
    base: '사업은 기회와 사람 문제, 자금의 속도를 같이 다뤄야 합니다.',
    advice: '크게 벌리기 전 작게 검증하고 손실 한도를 먼저 정하세요.',
  },
  general: {
    title: '종합운세',
    base: '전체 흐름은 균형, 올해의 압력, 지금 나이대의 숙제가 같이 움직입니다.',
    advice: '한 번에 다 바꾸기보다 가장 급한 한 가지부터 정리하세요.',
  },
};
