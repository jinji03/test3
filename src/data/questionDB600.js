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

const legacyQuestionDB = {
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

function legacySelectNextQuestion(topic, previousAnswers = []) {
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

function legacyGetQuestionsForTopic(topic, limit = 7) {
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

const FLOW_STAGES = {
  love: ['relationship_status', 'relationship_stage', 'partner_signal', 'user_emotion', 'user_action_style', 'desired_outcome'],
  money: ['money_focus', 'spending_style', 'saving_style', 'risk_attitude', 'money_goal', 'current_pressure'],
  job: ['job_status', 'job_concern', 'work_style', 'decision_style', 'career_goal', 'stress_point'],
  business: ['business_stage', 'business_concern', 'decision_style', 'risk_attitude', 'growth_goal', 'weak_point'],
  general: ['life_focus', 'current_state', 'emotional_condition', 'relationship_energy', 'money_work_flow', 'yearly_direction'],
};

const questionVariants = [
  '지금 기준으로',
  '최근 흐름을 보면',
  '가장 솔직하게 고르면',
  '마음에 오래 남는 쪽은',
  '요즘 상황에 가까운 건',
  '실제로 자주 겪는 건',
  '혼자 있을 때 떠오르는 건',
  '결정을 앞두고 보면',
  '상대나 상황을 떠올리면',
  '이번 달 흐름에서',
  '가장 신경 쓰이는 건',
  '반복해서 나타나는 건',
  '내가 인정하기 어려운 건',
  '이미 답변해온 흐름을 보면',
  '다음 선택을 생각하면',
  '지금 마음에 가까운 건',
  '현실적으로 따져보면',
  '최근 대화나 행동을 보면',
  '내가 바라는 방향은',
  '오늘 상담에서 짚고 싶은 건',
];

const abstractChoiceWords = ['집중형', '감정형', '안정형', '성장형', '관계형', '분석형', '직관형', '현실형', '추진형', '회피형'];

function c(label, value, traits, context) {
  return { label, value, traits, context };
}

const stageQuestionConfig = {
  love: {
    relationship_status: ['현재 연애 상황은 어디에 가장 가깝나요?', ['love', 'relationship_status', 'current_state'], [
      c('마음에 걸리는 사람이 있다', 'has_interest', ['emotion_depth', 'relationship_focus'], { relationship_status: 'has_interest' }),
      c('서로 애매하게 연락하는 사람이 있다', 'uncertain', ['attachment', 'decision_delay'], { relationship_status: 'uncertain' }),
      c('현재 만나고 있는 사람이 있다', 'in_relationship', ['relationship_focus', 'stability'], { relationship_status: 'in_relationship' }),
      c('지금은 혼자 지내고 있다', 'single', ['self_focus', 'stability'], { relationship_status: 'single' }),
    ]],
    relationship_stage: ['그 관계는 지금 어느 단계에 가깝나요?', ['love', 'relationship_stage', 'distance'], [
      c('가끔 연락만 이어지고 있다', 'contacting', ['decision_delay', 'attachment'], { relationship_stage: 'contacting' }),
      c('서로 호감은 보이지만 말로 확인하지 않았다', 'mutual_interest', ['emotion_depth', 'relationship_focus'], { relationship_stage: 'mutual_interest' }),
      c('만나고 있지만 다음 단계가 불분명하다', 'undefined_dating', ['attachment', 'risk_avoidance'], { relationship_stage: 'undefined_dating' }),
      c('이미 정리할지 이어갈지 고민 중이다', 'reconsidering', ['planning', 'self_focus'], { relationship_stage: 'reconsidering' }),
    ]],
    partner_signal: ['상대의 태도는 요즘 어떻게 느껴지나요?', ['love', 'partner_signal', 'reaction'], [
      c('따뜻할 때와 차가울 때가 번갈아 온다', 'mixed', ['emotion_depth', 'decision_delay'], { partner_signal: 'mixed' }),
      c('연락은 하지만 먼저 다가오지는 않는다', 'passive', ['attachment', 'risk_avoidance'], { partner_signal: 'passive' }),
      c('말보다 행동으로 챙겨주는 편이다', 'steady_action', ['stability', 'relationship_focus'], { partner_signal: 'steady_action' }),
      c('요즘 거리가 조금 멀어진 느낌이다', 'distant', ['emotion_depth', 'self_focus'], { partner_signal: 'distant' }),
    ]],
    user_emotion: ['그 상황에서 당신 마음은 어디에 가장 가까운가요?', ['love', 'user_emotion', 'inner_state'], [
      c('작은 반응에도 마음이 크게 흔들린다', 'anxious', ['emotion_depth', 'attachment'], { user_emotion: 'anxious' }),
      c('좋지만 상처받을까 봐 조심스럽다', 'careful', ['risk_avoidance', 'emotion_depth'], { user_emotion: 'careful' }),
      c('기대는 있지만 내 생활도 지키고 싶다', 'balanced', ['stability', 'self_focus'], { user_emotion: 'balanced' }),
      c('이제는 확실한 답을 듣고 싶다', 'needs_clarity', ['direct_action', 'planning'], { user_emotion: 'needs_clarity' }),
    ]],
    user_action_style: ['애매한 순간에 당신은 보통 어떻게 행동하나요?', ['love', 'user_action_style', 'behavior'], [
      c('먼저 묻기보다 상대의 다음 반응을 기다린다', 'waiting', ['decision_delay', 'attachment'], { user_action_style: 'waiting' }),
      c('답답해지면 직접 물어보는 편이다', 'ask_directly', ['direct_action', 'relationship_focus'], { user_action_style: 'ask_directly' }),
      c('티 내지 않고 혼자 오래 생각한다', 'think_alone', ['emotion_depth', 'risk_avoidance'], { user_action_style: 'think_alone' }),
      c('상처받기 전에 일부러 거리를 둔다', 'create_distance', ['self_focus', 'risk_avoidance'], { user_action_style: 'create_distance' }),
    ]],
    desired_outcome: ['이 상담 끝에 가장 확인하고 싶은 결과는 무엇인가요?', ['love', 'desired_outcome', 'goal'], [
      c('이 관계가 이어질 가능성이 있는지 알고 싶다', 'confirm_relationship', ['relationship_focus', 'planning'], { desired_outcome: 'confirm_relationship' }),
      c('내가 먼저 움직여도 되는지 알고 싶다', 'action_timing', ['direct_action', 'emotion_depth'], { desired_outcome: 'action_timing' }),
      c('상대 마음을 어떻게 읽어야 할지 알고 싶다', 'read_partner', ['attachment', 'emotion_depth'], { desired_outcome: 'read_partner' }),
      c('정리해야 한다면 어떻게 마음을 접을지 알고 싶다', 'let_go', ['self_focus', 'planning'], { desired_outcome: 'let_go' }),
    ]],
  },
  money: {
    money_focus: ['현재 가장 신경 쓰이는 돈 문제는 무엇인가요?', ['money', 'money_focus', 'current_issue'], [
      c('월급이나 고정 수입이 부족하게 느껴진다', 'income_shortage', ['money_control', 'career_ambition'], { money_focus: 'income_shortage' }),
      c('생각보다 지출이 자주 커진다', 'spending_leak', ['impulse', 'money_control'], { money_focus: 'spending_leak' }),
      c('저축을 하고 싶은데 잘 쌓이지 않는다', 'saving_difficulty', ['planning', 'risk_avoidance'], { money_focus: 'saving_difficulty' }),
      c('투자나 부동산 판단이 고민된다', 'investment_property', ['growth', 'risk_taking'], { money_focus: 'investment_property' }),
    ]],
    spending_style: ['돈을 쓸 때 자주 나타나는 모습은 무엇인가요?', ['money', 'spending_style', 'behavior'], [
      c('스트레스 받으면 충동적으로 산 적이 있다', 'stress_spend', ['impulse', 'emotion_depth'], { spending_style: 'stress_spend' }),
      c('큰돈은 며칠 고민하고 결제한다', 'delayed_spend', ['planning', 'money_control'], { spending_style: 'delayed_spend' }),
      c('필요하다고 느끼면 가격보다 시간을 아낀다', 'time_value_spend', ['growth', 'direct_action'], { spending_style: 'time_value_spend' }),
      c('나보다 가족이나 주변 사람에게 쓰는 돈이 많다', 'support_spend', ['relationship_focus', 'stability'], { spending_style: 'support_spend' }),
    ]],
    saving_style: ['저축이나 돈 관리에서 가장 가까운 습관은 무엇인가요?', ['money', 'saving_style', 'control'], [
      c('월급이 들어오면 먼저 따로 빼두려고 한다', 'pay_self_first', ['planning', 'money_control'], { saving_style: 'pay_self_first' }),
      c('남는 돈을 모으려다 보니 자주 실패한다', 'save_leftover', ['decision_delay', 'money_control'], { saving_style: 'save_leftover' }),
      c('통장이나 카드가 나뉘어 있어야 마음이 편하다', 'separate_accounts', ['stability', 'planning'], { saving_style: 'separate_accounts' }),
      c('수입이 일정하지 않아 계획이 자주 흔들린다', 'irregular_income', ['risk_avoidance', 'growth'], { saving_style: 'irregular_income' }),
    ]],
    risk_attitude: ['투자나 큰돈 결정 앞에서 당신은 보통 어떤가요?', ['money', 'risk_attitude', 'decision'], [
      c('손해 볼까 봐 쉽게 결정하지 못한다', 'loss_fear', ['risk_avoidance', 'decision_delay'], { risk_attitude: 'loss_fear' }),
      c('소액으로 먼저 해보고 감을 잡는다', 'small_test', ['planning', 'growth'], { risk_attitude: 'small_test' }),
      c('확실한 기회라고 느끼면 크게 움직일 수 있다', 'bold_when_clear', ['risk_taking', 'direct_action'], { risk_attitude: 'bold_when_clear' }),
      c('다른 사람 말보다 숫자를 직접 확인해야 한다', 'check_numbers', ['money_control', 'planning'], { risk_attitude: 'check_numbers' }),
    ]],
    money_goal: ['돈과 관련해 가장 만들고 싶은 결과는 무엇인가요?', ['money', 'money_goal', 'future'], [
      c('비상금을 만들어 불안하지 않고 싶다', 'emergency_fund', ['stability', 'risk_avoidance'], { money_goal: 'emergency_fund' }),
      c('월급 외 부수입을 만들고 싶다', 'side_income', ['growth', 'career_ambition'], { money_goal: 'side_income' }),
      c('집이나 큰 자산을 준비하고 싶다', 'big_asset', ['planning', 'stability'], { money_goal: 'big_asset' }),
      c('빚이나 밀린 돈 문제를 정리하고 싶다', 'debt_cleanup', ['money_control', 'planning'], { money_goal: 'debt_cleanup' }),
    ]],
    current_pressure: ['지금 돈 문제에서 가장 압박으로 느껴지는 건 무엇인가요?', ['money', 'current_pressure', 'pressure'], [
      c('매달 고정비가 먼저 빠져나가는 게 부담스럽다', 'fixed_cost', ['money_control', 'risk_avoidance'], { current_pressure: 'fixed_cost' }),
      c('미래 준비가 늦어진 것 같아 불안하다', 'future_anxiety', ['emotion_depth', 'planning'], { current_pressure: 'future_anxiety' }),
      c('가족이나 주변 상황 때문에 돈이 묶인다', 'family_pressure', ['relationship_focus', 'stability'], { current_pressure: 'family_pressure' }),
      c('기회는 보이는데 시작할 자금이 부족하다', 'capital_gap', ['growth', 'business_drive'], { current_pressure: 'capital_gap' }),
    ]],
  },
  job: {
    job_status: ['현재 일이나 커리어 상태는 어디에 가깝나요?', ['job', 'job_status', 'current_state'], [
      c('지금 회사에 다니지만 마음이 흔들린다', 'employed_unsure', ['decision_delay', 'career_ambition'], { job_status: 'employed_unsure' }),
      c('이직이나 전환을 진지하게 고민 중이다', 'considering_change', ['direct_action', 'planning'], { job_status: 'considering_change' }),
      c('쉬거나 준비하면서 다음 일을 찾고 있다', 'between_jobs', ['self_focus', 'growth'], { job_status: 'between_jobs' }),
      c('현재 일은 안정적이지만 성장감이 부족하다', 'stable_but_stuck', ['stability', 'career_ambition'], { job_status: 'stable_but_stuck' }),
    ]],
    job_concern: ['일에서 가장 크게 걸리는 문제는 무엇인가요?', ['job', 'job_concern', 'issue'], [
      c('연봉이나 보상이 노력에 비해 아쉽다', 'salary_reward', ['career_ambition', 'money_control'], { job_concern: 'salary_reward' }),
      c('내 적성과 맞는지 자주 의심된다', 'fit_doubt', ['self_focus', 'decision_delay'], { job_concern: 'fit_doubt' }),
      c('상사나 동료와의 관계가 지친다', 'people_stress', ['relationship_focus', 'emotion_depth'], { job_concern: 'people_stress' }),
      c('앞으로 성장할 길이 잘 보이지 않는다', 'growth_block', ['growth', 'planning'], { job_concern: 'growth_block' }),
    ]],
    work_style: ['일할 때 당신에게 잘 맞는 방식은 무엇인가요?', ['job', 'work_style', 'behavior'], [
      c('혼자 집중해서 끝내는 일이 편하다', 'independent', ['self_focus', 'planning'], { work_style: 'independent' }),
      c('사람들과 맞춰가며 결과를 만드는 편이다', 'collaborative', ['relationship_focus', 'growth'], { work_style: 'collaborative' }),
      c('목표와 마감이 분명해야 속도가 난다', 'clear_deadline', ['planning', 'direct_action'], { work_style: 'clear_deadline' }),
      c('새로운 문제를 맡을 때 에너지가 난다', 'new_problem', ['growth', 'career_ambition'], { work_style: 'new_problem' }),
    ]],
    decision_style: ['커리어 결정을 앞두면 보통 무엇을 먼저 보나요?', ['job', 'decision_style', 'decision'], [
      c('조건과 연봉을 표로 비교한다', 'compare_conditions', ['planning', 'money_control'], { decision_style: 'compare_conditions' }),
      c('내가 오래 버틸 수 있을지 먼저 생각한다', 'sustainability_first', ['stability', 'risk_avoidance'], { decision_style: 'sustainability_first' }),
      c('기회가 왔을 때 놓치지 않는 쪽을 택한다', 'take_opportunity', ['direct_action', 'risk_taking'], { decision_style: 'take_opportunity' }),
      c('주변 조언을 듣고도 마지막엔 오래 고민한다', 'deliberate_after_advice', ['decision_delay', 'relationship_focus'], { decision_style: 'deliberate_after_advice' }),
    ]],
    career_goal: ['앞으로 일에서 가장 원하는 방향은 무엇인가요?', ['job', 'career_goal', 'future'], [
      c('전문성을 키워 인정받고 싶다', 'expertise', ['career_ambition', 'planning'], { career_goal: 'expertise' }),
      c('연봉과 조건을 확실히 올리고 싶다', 'better_reward', ['money_control', 'career_ambition'], { career_goal: 'better_reward' }),
      c('내 생활을 지킬 수 있는 일을 하고 싶다', 'life_balance', ['self_focus', 'stability'], { career_goal: 'life_balance' }),
      c('새로운 분야로 넘어갈 가능성을 보고 싶다', 'new_field', ['growth', 'risk_taking'], { career_goal: 'new_field' }),
    ]],
    stress_point: ['일에서 가장 빨리 지치게 만드는 순간은 언제인가요?', ['job', 'stress_point', 'pressure'], [
      c('일의 기준이 자주 바뀔 때 지친다', 'moving_goalpost', ['planning', 'risk_avoidance'], { stress_point: 'moving_goalpost' }),
      c('내 노력이 인정받지 못한다고 느낄 때 힘들다', 'unrecognized', ['emotion_depth', 'career_ambition'], { stress_point: 'unrecognized' }),
      c('사람 사이에서 눈치를 많이 봐야 할 때 지친다', 'people_tension', ['relationship_focus', 'emotion_depth'], { stress_point: 'people_tension' }),
      c('쉬어도 회복되지 않을 만큼 일이 밀릴 때 힘들다', 'overload', ['self_focus', 'stability'], { stress_point: 'overload' }),
    ]],
  },
  business: {
    business_stage: ['현재 사업은 어느 단계에 가장 가깝나요?', ['business', 'business_stage', 'current_state'], [
      c('아이템을 준비하거나 검증하는 단계다', 'idea_validation', ['planning', 'risk_avoidance'], { business_stage: 'idea_validation' }),
      c('작게 시작했고 고객 반응을 보는 중이다', 'early_market', ['growth', 'business_drive'], { business_stage: 'early_market' }),
      c('매출은 있지만 확장 판단이 어렵다', 'revenue_scaling', ['money_control', 'planning'], { business_stage: 'revenue_scaling' }),
      c('아직 시작 전이지만 창업을 고민 중이다', 'pre_start', ['decision_delay', 'growth'], { business_stage: 'pre_start' }),
    ]],
    business_concern: ['사업에서 지금 가장 큰 고민은 무엇인가요?', ['business', 'business_concern', 'issue'], [
      c('자금이 버틸 수 있을지 걱정된다', 'cash_runway', ['money_control', 'risk_avoidance'], { business_concern: 'cash_runway' }),
      c('고객이 정말 원하는지 확신이 부족하다', 'customer_fit', ['planning', 'growth'], { business_concern: 'customer_fit' }),
      c('사람을 뽑거나 함께할 파트너가 고민된다', 'team_partner', ['relationship_focus', 'business_drive'], { business_concern: 'team_partner' }),
      c('언제 확장해야 할지 판단이 어렵다', 'scale_timing', ['decision_delay', 'career_ambition'], { business_concern: 'scale_timing' }),
    ]],
    decision_style: ['사업 결정을 내릴 때 가장 자주 쓰는 기준은 무엇인가요?', ['business', 'decision_style', 'decision'], [
      c('매출과 비용 숫자가 맞아야 움직인다', 'numbers_first', ['money_control', 'planning'], { decision_style: 'numbers_first' }),
      c('고객 반응이 보이면 빠르게 바꾼다', 'customer_signal', ['growth', 'direct_action'], { decision_style: 'customer_signal' }),
      c('혼자 판단하기보다 의견을 많이 듣는다', 'seek_input', ['relationship_focus', 'decision_delay'], { decision_style: 'seek_input' }),
      c('타이밍이 왔다고 느끼면 먼저 실행한다', 'timing_action', ['risk_taking', 'business_drive'], { decision_style: 'timing_action' }),
    ]],
    risk_attitude: ['리스크가 보일 때 당신은 보통 어떻게 움직이나요?', ['business', 'risk_attitude', 'risk'], [
      c('작게 실험한 뒤 다음 돈을 쓴다', 'test_before_spend', ['planning', 'risk_avoidance'], { risk_attitude: 'test_before_spend' }),
      c('손실 범위를 정해두면 실행할 수 있다', 'bounded_risk', ['money_control', 'direct_action'], { risk_attitude: 'bounded_risk' }),
      c('불확실하면 결정이 자주 늦어진다', 'slow_under_uncertainty', ['decision_delay', 'risk_avoidance'], { risk_attitude: 'slow_under_uncertainty' }),
      c('기회가 크면 부담을 감수할 수 있다', 'accept_big_upside', ['risk_taking', 'business_drive'], { risk_attitude: 'accept_big_upside' }),
    ]],
    growth_goal: ['사업에서 가장 키우고 싶은 결과는 무엇인가요?', ['business', 'growth_goal', 'future'], [
      c('반복 구매하는 고객을 늘리고 싶다', 'repeat_customers', ['relationship_focus', 'growth'], { growth_goal: 'repeat_customers' }),
      c('매출보다 먼저 수익 구조를 안정시키고 싶다', 'profit_stability', ['money_control', 'stability'], { growth_goal: 'profit_stability' }),
      c('브랜드를 더 많은 사람에게 알리고 싶다', 'brand_awareness', ['fire_expression', 'business_drive'], { growth_goal: 'brand_awareness' }),
      c('혼자 하던 일을 시스템으로 만들고 싶다', 'systemize', ['planning', 'growth'], { growth_goal: 'systemize' }),
    ]],
    weak_point: ['사업을 하며 가장 자주 약해지는 부분은 무엇인가요?', ['business', 'weak_point', 'pressure'], [
      c('돈이 부족해질까 봐 좋은 기회도 망설인다', 'funding_fear', ['risk_avoidance', 'decision_delay'], { weak_point: 'funding_fear' }),
      c('해야 할 일이 많아 우선순위가 흐려진다', 'priority_blur', ['planning', 'business_drive'], { weak_point: 'priority_blur' }),
      c('사람 문제에서 단호하게 말하기 어렵다', 'soft_on_people', ['relationship_focus', 'emotion_depth'], { weak_point: 'soft_on_people' }),
      c('실패 가능성을 떠올리면 실행 속도가 느려진다', 'fear_slows_action', ['risk_avoidance', 'emotion_depth'], { weak_point: 'fear_slows_action' }),
    ]],
  },
  general: {
    life_focus: ['요즘 삶에서 가장 크게 신경 쓰이는 영역은 무엇인가요?', ['general', 'life_focus', 'current_issue'], [
      c('관계와 마음의 거리가 가장 신경 쓰인다', 'relationships', ['relationship_focus', 'emotion_depth'], { life_focus: 'relationships' }),
      c('돈과 일의 현실 문제가 가장 크다', 'money_work', ['money_control', 'career_ambition'], { life_focus: 'money_work' }),
      c('내 컨디션과 마음 회복이 먼저다', 'self_recovery', ['self_focus', 'stability'], { life_focus: 'self_recovery' }),
      c('올해 방향을 다시 정하고 싶다', 'direction', ['planning', 'growth'], { life_focus: 'direction' }),
    ]],
    current_state: ['현재 하루하루의 흐름은 어디에 가까운가요?', ['general', 'current_state', 'rhythm'], [
      c('바쁘게 움직이지만 마음은 정리되지 않았다', 'busy_unclear', ['direct_action', 'decision_delay'], { current_state: 'busy_unclear' }),
      c('멈춰 있는 느낌이라 답답하다', 'stuck', ['risk_avoidance', 'emotion_depth'], { current_state: 'stuck' }),
      c('조금씩 정리하면서 균형을 찾고 있다', 'organizing', ['planning', 'stability'], { current_state: 'organizing' }),
      c('기회와 부담이 동시에 늘어난 느낌이다', 'chance_pressure', ['growth', 'career_ambition'], { current_state: 'chance_pressure' }),
    ]],
    emotional_condition: ['최근 감정 상태는 어떤 쪽에 가장 가깝나요?', ['general', 'emotional_condition', 'emotion'], [
      c('괜찮은 척하지만 속으로는 자주 지친다', 'quietly_tired', ['emotion_depth', 'self_focus'], { emotional_condition: 'quietly_tired' }),
      c('작은 일에도 예민하게 반응할 때가 있다', 'sensitive', ['emotion_depth', 'risk_avoidance'], { emotional_condition: 'sensitive' }),
      c('큰 문제는 없지만 의욕이 예전 같지 않다', 'low_drive', ['decision_delay', 'stability'], { emotional_condition: 'low_drive' }),
      c('새로 시작하고 싶은 마음이 올라온다', 'ready_for_new', ['growth', 'direct_action'], { emotional_condition: 'ready_for_new' }),
    ]],
    relationship_energy: ['사람들과의 관계 에너지는 요즘 어떤가요?', ['general', 'relationship_energy', 'relationship'], [
      c('가까운 사람에게 더 기대고 싶다', 'need_closeness', ['relationship_focus', 'attachment'], { relationship_energy: 'need_closeness' }),
      c('사람을 만나면 좋지만 금방 피곤해진다', 'socially_tired', ['self_focus', 'emotion_depth'], { relationship_energy: 'socially_tired' }),
      c('정리해야 할 관계가 떠오른다', 'need_boundary', ['planning', 'risk_avoidance'], { relationship_energy: 'need_boundary' }),
      c('새로운 인연이나 협업이 궁금하다', 'open_connection', ['growth', 'relationship_focus'], { relationship_energy: 'open_connection' }),
    ]],
    money_work_flow: ['돈과 일의 흐름은 요즘 어떻게 느껴지나요?', ['general', 'money_work_flow', 'reality'], [
      c('열심히 하는데 결과가 늦게 오는 느낌이다', 'effort_slow_result', ['career_ambition', 'decision_delay'], { money_work_flow: 'effort_slow_result' }),
      c('지출이나 책임이 늘어 압박이 있다', 'pressure_increase', ['money_control', 'risk_avoidance'], { money_work_flow: 'pressure_increase' }),
      c('새 기회가 보이지만 확신이 부족하다', 'opportunity_unclear', ['growth', 'planning'], { money_work_flow: 'opportunity_unclear' }),
      c('지금은 무리보다 안정이 필요하다', 'need_stability', ['stability', 'self_focus'], { money_work_flow: 'need_stability' }),
    ]],
    yearly_direction: ['올해 남은 흐름에서 가장 원하는 방향은 무엇인가요?', ['general', 'yearly_direction', 'future'], [
      c('복잡한 문제를 하나씩 정리하고 싶다', 'cleanup', ['planning', 'stability'], { yearly_direction: 'cleanup' }),
      c('좋은 기회가 오면 놓치지 않고 싶다', 'catch_chance', ['direct_action', 'growth'], { yearly_direction: 'catch_chance' }),
      c('내 마음과 몸을 먼저 회복하고 싶다', 'recover', ['self_focus', 'emotion_depth'], { yearly_direction: 'recover' }),
      c('관계, 돈, 일의 균형을 다시 잡고 싶다', 'rebalance', ['relationship_focus', 'money_control'], { yearly_direction: 'rebalance' }),
    ]],
  },
};

function buildStageQuestion(topic, stage, stageIndex, variantIndex) {
  const [baseText, tags, choices] = stageQuestionConfig[topic][stage];
  return {
    id: `${topic}_${String(stageIndex + 1).padStart(2, '0')}_${String(variantIndex + 1).padStart(2, '0')}`,
    topic,
    stage,
    text: `${questionVariants[variantIndex]}, ${baseText}`,
    choices: choices.map((item) => ({ ...item, context: { ...item.context } })),
    tags: [...tags, `stage_${stageIndex + 1}`, `variant_${variantIndex + 1}`],
  };
}

function buildFlowQuestions(topic) {
  return FLOW_STAGES[topic].flatMap((stage, stageIndex) =>
    questionVariants.map((_, variantIndex) => buildStageQuestion(topic, stage, stageIndex, variantIndex)),
  );
}

export const questionDB = Object.fromEntries(Object.keys(FLOW_STAGES).map((topic) => [topic, buildFlowQuestions(topic)]));

function normalizeAnswers(previousAnswers) {
  if (Array.isArray(previousAnswers)) return previousAnswers;
  return Object.values(previousAnswers || {}).filter(Boolean);
}

function normalizePattern(label = '') {
  return String(label).replace(/[,.!?]/g, '').replace(/\s+/g, ' ').trim();
}

export function getChoicePattern(question) {
  return (question?.choices || []).map((choice) => normalizePattern(choice.label)).join('|');
}

function countOverlap(left = [], right = []) {
  const rightSet = new Set(right);
  return left.filter((item) => rightSet.has(item)).length;
}

export function selectNextQuestion(topic, previousAnswers = []) {
  const key = normalizeTopic(topic);
  const flow = FLOW_STAGES[key] || FLOW_STAGES.general;
  const answers = normalizeAnswers(previousAnswers);
  if (answers.length >= flow.length + 1) return null;

  const askedQuestionIds = new Set(answers.map((answer) => answer.questionId).filter(Boolean));
  const usedStages = new Set(answers.map((answer) => answer.stage).filter(Boolean));
  const recentAnswers = answers.slice(-3);
  const recentTags = recentAnswers.flatMap((answer) => answer.tags || []);
  const recentChoicePatterns = new Set(recentAnswers.map((answer) => answer.choicePattern).filter(Boolean));
  const usedChoicePatterns = new Set(answers.map((answer) => answer.choicePattern).filter(Boolean));
  const nextStage = flow.find((stage) => !usedStages.has(stage));
  if (!nextStage) return null;

  const strictCandidates = (questionDB[key] || questionDB.general)
    .filter((question) => question.stage === nextStage)
    .filter((question) => !askedQuestionIds.has(question.id))
    .filter((question) => !recentChoicePatterns.has(getChoicePattern(question)));
  const candidates = strictCandidates.length
    ? strictCandidates
    : (questionDB[key] || questionDB.general).filter((question) => question.stage === nextStage && !askedQuestionIds.has(question.id));

  return candidates
    .map((question) => {
      const pattern = getChoicePattern(question);
      const repeatedPattern = usedChoicePatterns.has(pattern) ? 10 : 0;
      const tagPenalty = countOverlap(question.tags, recentTags) * 3;
      const variantNumber = Number(question.id.split('_').at(-1) || 1);
      const flowOffset = Math.abs(((answers.length * 7) % questionVariants.length) - variantNumber) * 0.05;
      return { question, score: -tagPenalty - repeatedPattern - flowOffset };
    })
    .sort((a, b) => b.score - a.score || a.question.id.localeCompare(b.question.id))[0]?.question || null;
}

export function getQuestionsForTopic(topic, limit = 6) {
  const selectedAnswers = [];
  const selectedQuestions = [];
  let next = selectNextQuestion(topic, selectedAnswers);
  while (next && selectedQuestions.length < limit) {
    selectedQuestions.push(next);
    const firstChoice = next.choices[0];
    selectedAnswers.push({
      questionId: next.id,
      stage: next.stage,
      questionText: next.text,
      selectedChoice: firstChoice.label,
      value: firstChoice.value,
      traits: firstChoice.traits,
      context: firstChoice.context,
      choicePattern: getChoicePattern(next),
      tags: next.tags,
    });
    next = selectNextQuestion(topic, selectedAnswers);
  }
  return selectedQuestions;
}

export function validateQuestion(question, seenQuestions = new Set()) {
  const errors = [];
  if (!question?.id || !question?.topic || !question?.stage || !question?.text) errors.push('필수 필드가 없습니다.');
  if (!Array.isArray(question?.choices) || question.choices.length < 3 || question.choices.length > 5) errors.push('선택지는 3~5개여야 합니다.');
  if (seenQuestions.has(question?.text)) errors.push('중복 질문입니다.');
  const labels = (question?.choices || []).map((choice) => choice.label);
  if (new Set(labels).size !== labels.length) errors.push('중복 선택지가 있습니다.');
  if (labels.some((label) => abstractChoiceWords.some((word) => label.includes(word)))) errors.push('추상 선택지 금지어가 포함되어 있습니다.');
  if (!(question?.choices || []).every((choice) => Object.prototype.hasOwnProperty.call(choice.context || {}, question.stage))) {
    errors.push('stage와 context 키가 일치하지 않습니다.');
  }
  if (!(question?.tags || []).includes(question?.topic) || !(question?.tags || []).includes(question?.stage)) {
    errors.push('topic/stage 태그가 부족합니다.');
  }
  if (!labels.every((label) => label.length >= 8 && /(다|요|중이다|싶다|느낀다)$/.test(label))) {
    errors.push('선택지는 행동, 상황, 감정이 드러나는 일반 문장이어야 합니다.');
  }
  return { ok: errors.length === 0, errors };
}
