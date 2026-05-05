const traitChoiceSets = {
  love: [
    [
      { label: '마음에 걸리는 사람이 있다', value: 'has_interest', traits: ['emotion_depth', 'attachment', 'relationship_focus'] },
      { label: '지금은 나에게 집중하고 싶다', value: 'self_focus', traits: ['self_focus', 'stability'] },
      { label: '애매한 관계가 있다', value: 'ambiguous', traits: ['decision_delay', 'emotion_depth'] },
      { label: '정리하고 싶은 사람이 있다', value: 'letting_go', traits: ['planning', 'self_focus'] },
    ],
    [
      { label: '먼저 표현한다', value: 'direct_expression', traits: ['direct_action', 'fire_expression'] },
      { label: '상대 반응을 기다린다', value: 'wait_signal', traits: ['attachment', 'decision_delay'] },
      { label: '친구처럼 천천히 본다', value: 'slow_bonding', traits: ['stability', 'planning'] },
      { label: '마음을 숨기는 편이다', value: 'hide_feelings', traits: ['emotion_depth', 'risk_avoidance'] },
    ],
    [
      { label: '설렘이 가장 크다', value: 'excitement', traits: ['emotion_depth', 'impulse'] },
      { label: '불안이 먼저 올라온다', value: 'anxiety', traits: ['attachment', 'risk_avoidance'] },
      { label: '편안함을 중요하게 본다', value: 'comfort', traits: ['stability', 'relationship_focus'] },
      { label: '확신이 없으면 멈춘다', value: 'needs_clarity', traits: ['planning', 'decision_delay'] },
    ],
    [
      { label: '대화로 확인한다', value: 'talk_check', traits: ['direct_action', 'relationship_focus'] },
      { label: '혼자 오래 생각한다', value: 'overthink', traits: ['emotion_depth', 'decision_delay'] },
      { label: '거리를 둔다', value: 'distance', traits: ['self_focus', 'risk_avoidance'] },
      { label: '상황을 더 지켜본다', value: 'observe', traits: ['planning', 'stability'] },
    ],
  ],
  money: [
    [
      { label: '고정 수입을 선호한다', value: 'fixed_income', traits: ['stability', 'money_control'] },
      { label: '부수입을 만들고 싶다', value: 'side_income', traits: ['growth', 'planning'] },
      { label: '큰 기회가 오면 움직인다', value: 'big_chance', traits: ['risk_taking', 'direct_action'] },
      { label: '지금은 지출 통제가 먼저다', value: 'spending_control', traits: ['money_control', 'risk_avoidance'] },
    ],
    [
      { label: '며칠 고민하고 쓴다', value: 'delayed_spend', traits: ['planning', 'money_control'] },
      { label: '기분에 따라 쓴다', value: 'mood_spend', traits: ['impulse', 'emotion_depth'] },
      { label: '필요하면 과감하게 쓴다', value: 'decisive_spend', traits: ['direct_action', 'risk_taking'] },
      { label: '가격보다 가치가 중요하다', value: 'value_spend', traits: ['growth', 'planning'] },
    ],
    [
      { label: '예금과 저축이 편하다', value: 'saving_first', traits: ['stability', 'risk_avoidance'] },
      { label: '소액 투자를 해본다', value: 'small_invest', traits: ['planning', 'growth'] },
      { label: '흐름이 좋으면 크게 본다', value: 'bold_invest', traits: ['risk_taking', 'business_drive'] },
      { label: '아직 기준을 못 정했다', value: 'no_rule', traits: ['decision_delay', 'risk_avoidance'] },
    ],
    [
      { label: '부동산처럼 실물이 좋다', value: 'real_estate', traits: ['stability', 'planning'] },
      { label: '현금 흐름이 더 중요하다', value: 'cashflow', traits: ['money_control', 'career_ambition'] },
      { label: '사업자금을 모으고 싶다', value: 'business_fund', traits: ['business_drive', 'growth'] },
      { label: '빚은 최대한 피하고 싶다', value: 'debt_avoid', traits: ['risk_avoidance', 'money_control'] },
    ],
  ],
  job: [
    [
      { label: '지금 회사에서 성장하고 싶다', value: 'grow_current', traits: ['career_ambition', 'growth'] },
      { label: '이직을 진지하게 본다', value: 'job_change', traits: ['direct_action', 'career_ambition'] },
      { label: '안정성이 더 중요하다', value: 'stable_job', traits: ['stability', 'risk_avoidance'] },
      { label: '잠시 쉬며 정리하고 싶다', value: 'career_pause', traits: ['self_focus', 'planning'] },
    ],
    [
      { label: '연봉 상승이 우선이다', value: 'salary_first', traits: ['career_ambition', 'money_control'] },
      { label: '적성에 맞아야 오래 간다', value: 'fit_first', traits: ['self_focus', 'stability'] },
      { label: '사람 관계가 가장 크다', value: 'people_issue', traits: ['relationship_focus', 'emotion_depth'] },
      { label: '직무 전문성을 키우고 싶다', value: 'expertise', traits: ['planning', 'growth'] },
    ],
    [
      { label: '갈등은 바로 말한다', value: 'direct_conflict', traits: ['direct_action', 'metal_standard'] },
      { label: '참다가 한 번에 말한다', value: 'delayed_conflict', traits: ['decision_delay', 'emotion_depth'] },
      { label: '기록하고 근거로 말한다', value: 'document_conflict', traits: ['planning', 'stability'] },
      { label: '가능하면 피한다', value: 'avoid_conflict', traits: ['risk_avoidance', 'self_focus'] },
    ],
    [
      { label: '리더 역할을 해보고 싶다', value: 'leader', traits: ['career_ambition', 'direct_action'] },
      { label: '실무 전문가가 맞다', value: 'specialist', traits: ['planning', 'stability'] },
      { label: '협업이 잘 맞는다', value: 'collaboration', traits: ['relationship_focus', 'growth'] },
      { label: '혼자 집중하는 일이 편하다', value: 'independent', traits: ['self_focus', 'metal_standard'] },
    ],
  ],
  business: [
    [
      { label: '아이템 검증이 먼저다', value: 'validate_item', traits: ['planning', 'risk_avoidance'] },
      { label: '고객 반응을 보며 바꾼다', value: 'customer_iterate', traits: ['growth', 'business_drive'] },
      { label: '좋은 타이밍이면 밀어붙인다', value: 'push_timing', traits: ['direct_action', 'risk_taking'] },
      { label: '자금 안정이 먼저다', value: 'funding_first', traits: ['money_control', 'stability'] },
    ],
    [
      { label: '혼자 결정하는 편이다', value: 'solo_decision', traits: ['direct_action', 'business_drive'] },
      { label: '파트너 의견을 많이 본다', value: 'partner_input', traits: ['relationship_focus', 'planning'] },
      { label: '숫자가 맞아야 움직인다', value: 'number_based', traits: ['money_control', 'metal_standard'] },
      { label: '직감이 오면 실행한다', value: 'gut_action', traits: ['impulse', 'risk_taking'] },
    ],
    [
      { label: '작게 실험한다', value: 'small_test', traits: ['planning', 'risk_avoidance'] },
      { label: '확신 후 확장한다', value: 'scale_after_signal', traits: ['stability', 'growth'] },
      { label: '빠르게 시장을 잡고 싶다', value: 'fast_scale', traits: ['business_drive', 'direct_action'] },
      { label: '결정이 자주 늦어진다', value: 'slow_decision', traits: ['decision_delay', 'risk_avoidance'] },
    ],
    [
      { label: '브랜드를 먼저 키운다', value: 'brand_first', traits: ['growth', 'fire_expression'] },
      { label: '운영 효율을 먼저 잡는다', value: 'operation_first', traits: ['planning', 'money_control'] },
      { label: '사람과 조직이 관건이다', value: 'team_first', traits: ['relationship_focus', 'business_drive'] },
      { label: '리스크 관리가 우선이다', value: 'risk_first', traits: ['risk_avoidance', 'stability'] },
    ],
  ],
  general: [
    [
      { label: '관계가 가장 신경 쓰인다', value: 'relationship_focus', traits: ['relationship_focus', 'emotion_depth'] },
      { label: '돈과 일이 가장 크다', value: 'work_money', traits: ['money_control', 'career_ambition'] },
      { label: '내 마음이 먼저다', value: 'self_mind', traits: ['self_focus', 'emotion_depth'] },
      { label: '올해 방향이 궁금하다', value: 'year_flow', traits: ['planning', 'growth'] },
    ],
    [
      { label: '바쁘게 움직이는 중이다', value: 'busy', traits: ['direct_action', 'career_ambition'] },
      { label: '멈춘 느낌이 든다', value: 'stuck', traits: ['decision_delay', 'risk_avoidance'] },
      { label: '정리하는 시기다', value: 'organizing', traits: ['planning', 'stability'] },
      { label: '감정 기복이 크다', value: 'mood_wave', traits: ['emotion_depth', 'impulse'] },
    ],
    [
      { label: '현실적인 조언이 필요하다', value: 'practical_advice', traits: ['planning', 'metal_standard'] },
      { label: '위로가 먼저 필요하다', value: 'comfort_need', traits: ['emotion_depth', 'self_focus'] },
      { label: '새로운 기회가 궁금하다', value: 'new_chance', traits: ['growth', 'risk_taking'] },
      { label: '관계 정리가 필요하다', value: 'relationship_cleanup', traits: ['relationship_focus', 'decision_delay'] },
    ],
    [
      { label: '바로 행동하고 싶다', value: 'act_now', traits: ['direct_action', 'fire_expression'] },
      { label: '한 달 정도 보고 싶다', value: 'month_observe', traits: ['planning', 'stability'] },
      { label: '올해 흐름을 보고 싶다', value: 'year_observe', traits: ['growth', 'planning'] },
      { label: '아직 마음이 정리되지 않았다', value: 'not_ready', traits: ['decision_delay', 'emotion_depth'] },
    ],
  ],
};

const topicBlocks = {
  love: [
    ['연애 상황', ['지금 마음에 걸리는 사람이 있나요?', '관계의 단계는 어디에 가깝나요?', '상대와의 거리는 어떻게 느껴지나요?', '최근 가장 설렜던 장면은 무엇인가요?', '현재 관계에서 가장 애매한 부분은 무엇인가요?', '상대에게 기대하는 변화는 무엇인가요?'], ['relationship', 'situation']],
    ['감정 상태', ['그 사람을 생각하면 가장 먼저 드는 감정은 무엇인가요?', '답장을 기다릴 때 마음은 어떻게 움직이나요?', '상대의 작은 말에 영향을 많이 받나요?', '좋아하는 마음을 얼마나 오래 품는 편인가요?', '지금 마음에서 가장 큰 불안은 무엇인가요?', '관계를 떠올릴 때 몸이 먼저 반응하는 순간은 언제인가요?'], ['emotion', 'inner_state']],
    ['행동 패턴', ['좋아하는 마음을 표현할 때 어떤 방식이 편한가요?', '상대가 애매하게 굴면 어떻게 행동하나요?', '갈등이 생기면 먼저 풀려고 하나요?', '관계가 불안할 때 연락 패턴은 어떻게 바뀌나요?', '마음이 식었다고 느끼면 어떤 행동을 하나요?', '상대의 마음을 확인하려고 어떤 시도를 하나요?'], ['behavior', 'relationship']],
    ['의사결정 방식', ['고백이나 정리를 결정할 때 무엇을 기준으로 삼나요?', '주변 조언과 내 감정 중 무엇을 더 믿나요?', '확신이 부족할 때도 움직일 수 있나요?', '관계의 다음 단계를 정할 때 가장 필요한 것은 무엇인가요?', '기다림과 표현 사이에서 어떤 쪽을 고르나요?', '상대가 늦게 반응하면 결론을 어떻게 내리나요?'], ['decision', 'timing']],
    ['불안 요소', ['연애에서 가장 반복되는 걱정은 무엇인가요?', '상대의 어떤 태도가 가장 불안하게 하나요?', '이전 관계에서 남은 패턴이 있나요?', '내가 자주 참고 넘어가는 부분은 무엇인가요?', '사랑받고 있다는 확신은 무엇으로 느끼나요?', '관계가 깨질까 봐 피하는 말이 있나요?'], ['anxiety', 'pattern']],
  ],
  money: [
    ['수입', ['현재 수입 구조는 어디에 가깝나요?', '수입을 늘리기 위해 가장 먼저 생각하는 방법은 무엇인가요?', '부수입을 만들 때 가장 걱정되는 점은 무엇인가요?', '월급 외 기회를 보면 어떤 반응이 먼저 나오나요?', '수입 공백이 생기면 어떤 계획을 세우나요?', '돈을 벌 때 포기하기 어려운 기준은 무엇인가요?'], ['income', 'money']],
    ['지출', ['돈을 쓸 때 가장 자주 드는 감정은 무엇인가요?', '갑작스러운 지출이 생기면 어떻게 대처하나요?', '큰 금액을 쓰기 전 어떤 확인을 하나요?', '후회가 남는 소비는 어떤 종류인가요?', '생활비를 줄여야 할 때 어디부터 조정하나요?', '기분 소비가 생기는 순간은 언제인가요?'], ['spending', 'control']],
    ['저축과 투자', ['저축과 투자 중 더 마음이 가는 쪽은 어디인가요?', '투자 제안을 받으면 가장 먼저 무엇을 확인하나요?', '손실 가능성을 보면 어떻게 반응하나요?', '돈을 묶어두는 것과 굴리는 것 중 어느 쪽이 편한가요?', '장기 투자와 단기 수익 중 무엇이 더 끌리나요?', '투자 기준을 세울 때 누구의 말을 참고하나요?'], ['saving', 'investment']],
    ['부동산과 자금', ['부동산처럼 큰 결정을 생각하면 무엇이 걱정되나요?', '전세, 월세, 매매 중 지금 더 신경 쓰이는 것은 무엇인가요?', '사업자금을 모은다면 어떤 방식이 편한가요?', '대출을 활용하는 것에 대해 어떻게 느끼나요?', '목돈이 생기면 가장 먼저 어디에 쓰고 싶나요?', '가족이나 지인과 돈이 엮이면 어떤 기준을 세우나요?'], ['real_estate', 'funding']],
    ['리스크 성향', ['돈 문제에서 내가 감당할 수 있는 위험은 어디까지인가요?', '기회처럼 보이지만 불확실한 제안을 받으면 어떻게 하나요?', '손해를 본 뒤 다시 도전하는 편인가요?', '재정 결정을 미루게 만드는 이유는 무엇인가요?', '안정과 성장 중 지금 더 필요한 것은 무엇인가요?', '올해 정리하고 싶은 돈 문제는 무엇인가요?'], ['risk', 'future']],
  ],
  job: [
    ['이직', ['이직을 생각하게 만드는 가장 큰 이유는 무엇인가요?', '새 회사 제안을 받으면 가장 먼저 무엇을 보나요?', '지금 떠나지 못하게 하는 이유는 무엇인가요?', '이직 타이밍을 판단할 때 어떤 신호를 보나요?', '새로운 직무에 도전할 때 가장 걱정되는 것은 무엇인가요?', '면접이나 제안 앞에서 어떤 마음이 커지나요?'], ['career_change', 'decision']],
    ['적성', ['현재 일이 나와 맞는다고 느끼는 순간은 언제인가요?', '일할 때 가장 몰입되는 업무는 무엇인가요?', '반대로 가장 에너지가 빠지는 업무는 무엇인가요?', '내 강점이 잘 드러나는 환경은 어디인가요?', '혼자 하는 일과 협업 중 어느 쪽이 편한가요?', '다음 직무에서 꼭 살리고 싶은 능력은 무엇인가요?'], ['aptitude', 'growth']],
    ['연봉과 보상', ['연봉 상승이 지금 얼마나 중요한가요?', '보상이 부족하다고 느낄 때 어떻게 반응하나요?', '성과를 인정받기 위해 어떤 행동을 하나요?', '돈과 워라밸 중 무엇을 더 포기하기 어렵나요?', '협상 상황에서 어떤 방식으로 말하나요?', '보상보다 의미가 중요해지는 순간은 언제인가요?'], ['salary', 'reward']],
    ['인간관계', ['상사나 동료와 부딪힐 때 나는 어떻게 반응하나요?', '팀 분위기가 나에게 미치는 영향은 어느 정도인가요?', '업무 갈등을 해결할 때 가장 어려운 점은 무엇인가요?', '나를 지치게 하는 사람의 유형은 무엇인가요?', '피드백을 받으면 어떤 감정이 먼저 올라오나요?', '협업에서 꼭 지켜졌으면 하는 기준은 무엇인가요?'], ['work_relationship', 'conflict']],
    ['성장과 안정성', ['지금 커리어에서 가장 필요한 변화는 무엇인가요?', '성장과 안정성 중 어디에 마음이 더 가나요?', '새로운 일을 맡으면 먼저 무엇을 확인하나요?', '현재 일을 오래 지속할 수 있는 조건은 무엇인가요?', '내가 번아웃을 느끼는 신호는 무엇인가요?', '올해 커리어에서 만들고 싶은 결과는 무엇인가요?'], ['growth', 'stability']],
  ],
  business: [
    ['자금', ['지금 사업에서 가장 중요한 자금 고민은 무엇인가요?', '초기 비용을 쓸 때 가장 걱정되는 부분은 무엇인가요?', '현금 흐름이 흔들리면 무엇부터 조정하나요?', '투자를 받는 것에 대해 어떻게 느끼나요?', '사업자금을 모을 때 어떤 방식이 편한가요?', '매출 목표를 세울 때 얼마나 공격적으로 잡나요?'], ['funding', 'cashflow']],
    ['아이템', ['사업 아이템을 고를 때 가장 먼저 보는 것은 무엇인가요?', '고객 반응이 예상과 다를 때 어떻게 하나요?', '아이디어가 많을 때 우선순위는 어떻게 정하나요?', '시장 검증을 위해 어떤 행동을 먼저 하나요?', '브랜드와 제품력 중 어디에 더 힘을 주나요?', '아이템을 접어야 한다고 느끼는 기준은 무엇인가요?'], ['item', 'market']],
    ['확장', ['확장 타이밍을 판단할 때 보는 기준은 무엇인가요?', '사람을 뽑는 결정은 어떤 기준으로 하나요?', '새 채널을 열 때 가장 걱정되는 것은 무엇인가요?', '매출이 오르면 가장 먼저 어디에 투자하고 싶나요?', '확장을 미루게 만드는 이유는 무엇인가요?', '올해 사업에서 키우고 싶은 지표는 무엇인가요?'], ['scale', 'growth']],
    ['파트너', ['파트너에게 가장 기대하는 것은 무엇인가요?', '동업 제안을 받으면 무엇부터 확인하나요?', '의견 충돌이 생기면 어떻게 풀어가나요?', '믿을 수 있는 사람이라고 느끼는 기준은 무엇인가요?', '일과 친분이 섞이면 어떤 부분이 어려운가요?', '팀 안에서 내가 맡고 싶은 역할은 무엇인가요?'], ['partner', 'team']],
    ['리스크와 결정', ['리스크가 보일 때 나는 어떤 방식으로 움직이나요?', '큰 결정을 앞두면 누구의 말을 가장 참고하나요?', '숫자와 직감이 다를 때 무엇을 따르나요?', '실패 가능성을 보면 속도가 어떻게 바뀌나요?', '사업에서 가장 자주 미루는 결정은 무엇인가요?', '지금 당장 결정해야 할 문제가 있다면 무엇인가요?'], ['risk', 'decision']],
  ],
  general: [
    ['연애와 관계', ['요즘 삶에서 가장 크게 흔들리는 관계는 무엇인가요?', '사람들과의 거리감은 지금 어떤 상태인가요?', '가까운 사람에게 가장 듣고 싶은 말은 무엇인가요?', '관계에서 내가 반복해서 참는 부분은 무엇인가요?', '새로운 인연을 받아들일 준비는 어느 정도인가요?', '정리해야 할 관계가 있다면 어떤 기준이 필요할까요?'], ['relationship', 'love']],
    ['돈과 일', ['돈과 일 중 지금 더 크게 신경 쓰이는 것은 무엇인가요?', '현실적인 문제를 해결할 때 가장 먼저 하는 행동은 무엇인가요?', '올해 수입 흐름에서 가장 확인하고 싶은 것은 무엇인가요?', '일의 방향이 흔들릴 때 어떤 선택을 하나요?', '돈 때문에 미루는 일이 있다면 무엇인가요?', '안정과 성장 중 올해 더 필요한 것은 무엇인가요?'], ['money', 'job']],
    ['컨디션과 마음', ['최근 내 마음을 가장 많이 차지하는 생각은 무엇인가요?', '몸과 마음의 리듬은 어떤 상태인가요?', '혼자 있을 때 반복해서 떠오르는 걱정은 무엇인가요?', '회복을 위해 가장 필요한 것은 무엇인가요?', '감정 기복이 커질 때 어떤 행동을 하나요?', '나를 다시 움직이게 하는 순간은 언제인가요?'], ['condition', 'emotion']],
    ['올해 흐름', ['올해 안에 꼭 정리하고 싶은 문제는 무엇인가요?', '새롭게 시작하고 싶은 영역은 어디인가요?', '기회가 오면 바로 잡을 준비가 되어 있나요?', '올해 가장 조심해야 할 습관은 무엇인가요?', '상반기와 하반기 중 더 기대되는 시기는 언제인가요?', '올해의 나에게 필요한 한 가지 기준은 무엇인가요?'], ['year_flow', 'future']],
    ['의사결정', ['중요한 선택 앞에서 나는 무엇을 가장 두려워하나요?', '결정을 미루게 만드는 이유는 무엇인가요?', '주변 조언과 내 직감 중 무엇을 더 믿나요?', '선택 후 후회가 생기면 어떻게 정리하나요?', '지금 바로 바꿀 수 있는 작은 행동은 무엇인가요?', '앞으로의 흐름에서 가장 확인하고 싶은 것은 무엇인가요?'], ['decision', 'pattern']],
  ],
};

function makeQuestion(topic, block, blockIndex, text, textIndex, roundIndex) {
  const idNumber = roundIndex * 30 + blockIndex * 6 + textIndex + 1;
  const choiceSet = traitChoiceSets[topic][(blockIndex + textIndex + roundIndex) % traitChoiceSets[topic].length];
  const roundPrefix = ['현재 기준으로', '최근 흐름을 보면', '중요한 선택 앞에서', '앞으로를 생각하면'][roundIndex];
  return {
    id: `${topic}_${String(idNumber).padStart(3, '0')}`,
    topic,
    text: `${roundPrefix}, ${text}`,
    choices: choiceSet,
    tags: [...block[2], `round_${roundIndex + 1}`, block[0]],
  };
}

function makeQuestions(topic) {
  return Array.from({ length: 4 }).flatMap((_, roundIndex) =>
    topicBlocks[topic].flatMap((block, blockIndex) =>
      block[1].map((text, textIndex) => makeQuestion(topic, block, blockIndex, text, textIndex, roundIndex)),
    ),
  );
}

export const questionDB = {
  love: makeQuestions('love'),
  money: makeQuestions('money'),
  job: makeQuestions('job'),
  business: makeQuestions('business'),
  general: makeQuestions('general'),
};

export function normalizeTopic(topic) {
  const map = { career: 'job', total: 'general', 연애: 'love', 재물: 'money', 직업: 'job', 사업: 'business', '종합 운세': 'general', 연애운: 'love', 금전운: 'money', 직업운: 'job', 사업운: 'business' };
  return map[topic] || topic || 'general';
}

export function selectNextQuestion(topic, previousAnswers = []) {
  const key = normalizeTopic(topic);
  const answers = Array.isArray(previousAnswers) ? previousAnswers : Object.values(previousAnswers || {});
  if (answers.length >= 7) return null;

  const answeredIds = new Set(answers.map((answer) => answer.questionId));
  const tagCounts = answers.flatMap((answer) => answer.tags || []).reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});
  const previousTags = new Set(Object.keys(tagCounts));
  const candidates = (questionDB[key] || questionDB.general).filter((question) => !answeredIds.has(question.id));

  if (!answers.length) return candidates[0] || null;

  return candidates
    .map((question) => {
      const overlap = question.tags.filter((tag) => previousTags.has(tag)).length;
      const repetition = question.tags.reduce((sum, tag) => sum + (tagCounts[tag] || 0), 0);
      const diversity = new Set(question.tags).size;
      return { question, score: overlap * 3 + diversity - repetition * 1.4 };
    })
    .sort((a, b) => b.score - a.score || a.question.id.localeCompare(b.question.id))[0]?.question || candidates[0] || null;
}

export function getQuestionsForTopic(topic, limit = 7) {
  const selectedAnswers = [];
  const selectedQuestions = [];
  let next = selectNextQuestion(topic, selectedAnswers);
  while (next && selectedQuestions.length < limit) {
    selectedQuestions.push(next);
    selectedAnswers.push({
      questionId: next.id,
      questionText: next.text,
      selectedChoice: next.choices[0].label,
      value: next.choices[0].value,
      traits: next.choices[0].traits,
      tags: next.tags,
    });
    next = selectNextQuestion(topic, selectedAnswers);
  }
  return selectedQuestions;
}
