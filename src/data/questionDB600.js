export function normalizeTopic(topic) {
  const map = {
    career: 'job',
    total: 'general',
    연애: 'love',
    재물: 'money',
    직업: 'job',
    사업: 'business',
    '종합 운세': 'general',
    연애운: 'love',
    금전운: 'money',
    직업운: 'job',
    사업운: 'business',
  };
  return map[topic] || topic || 'general';
}

const FLOW_STAGES = {
  love: ['relationship_status', 'relationship_stage', 'partner_signal', 'user_emotion', 'user_action_style', 'desired_outcome'],
  money: ['money_focus', 'spending_style', 'saving_style', 'risk_attitude', 'money_goal', 'current_pressure'],
  job: ['job_status', 'job_concern', 'work_style', 'decision_style', 'career_goal', 'stress_point'],
  business: ['business_stage', 'business_concern', 'decision_style', 'risk_attitude', 'growth_goal', 'weak_point'],
  general: ['life_focus', 'current_state', 'emotional_condition', 'relationship_energy', 'money_work_flow', 'yearly_direction'],
};

const questionVariants = Array.from({ length: 20 }, (_, index) => `variant_${index + 1}`);

const abstractChoiceWords = ['집중형', '감정형', '안정형', '성장형', '관계형', '분석형', '직관형', '현실형', '추진형', '회피형', '리스크 성향'];
const surveyPrefixes = ['지금 기준으로', '최근 흐름을 보면', '가장 솔직하게 고르면', '마음에 오래 남는 쪽은', '요즘 상황에 가까운 건', '현실적으로 따져보면'];

function c(label, value, traits, context) {
  return { label, value, traits, context };
}

const stageQuestionConfig = {
  love: {
    relationship_status: ['요즘 마음 쓰이는 사람이 있어요?', ['love', 'relationship_status', 'current_state'], [
      c('자꾸 떠오르는 사람이 있다', 'has_interest', ['emotion_depth', 'relationship_focus'], { relationship_status: 'has_interest' }),
      c('연락은 하는데 애매하다', 'uncertain', ['attachment', 'decision_delay'], { relationship_status: 'uncertain' }),
      c('만나는 사람은 있는데 흔들린다', 'in_relationship', ['relationship_focus', 'stability'], { relationship_status: 'in_relationship' }),
      c('지금은 혼자가 더 편하다', 'single', ['self_focus', 'stability'], { relationship_status: 'single' }),
    ]],
    relationship_stage: ['그 사람과는 어디쯤 와 있어요?', ['love', 'relationship_stage', 'distance'], [
      c('가끔 연락만 이어진다', 'contacting', ['decision_delay', 'attachment'], { relationship_stage: 'contacting' }),
      c('서로 마음은 있는 것 같다', 'mutual_interest', ['emotion_depth', 'relationship_focus'], { relationship_stage: 'mutual_interest' }),
      c('만나도 관계가 또렷하지 않다', 'undefined_dating', ['attachment', 'risk_avoidance'], { relationship_stage: 'undefined_dating' }),
      c('이어갈지 접을지 고민된다', 'reconsidering', ['planning', 'self_focus'], { relationship_stage: 'reconsidering' }),
    ]],
    partner_signal: ['상대 반응은 요즘 어때요?', ['love', 'partner_signal', 'reaction'], [
      c('다정했다가 또 차가워진다', 'mixed', ['emotion_depth', 'decision_delay'], { partner_signal: 'mixed' }),
      c('연락은 해도 먼저 오진 않는다', 'passive', ['attachment', 'risk_avoidance'], { partner_signal: 'passive' }),
      c('말보다 행동으로 챙긴다', 'steady_action', ['stability', 'relationship_focus'], { partner_signal: 'steady_action' }),
      c('요즘은 조금 멀어진 것 같다', 'distant', ['emotion_depth', 'self_focus'], { partner_signal: 'distant' }),
    ]],
    user_emotion: ['그때 마음이 어땠어요?', ['love', 'user_emotion', 'inner_state'], [
      c('작은 반응에도 계속 흔들린다', 'anxious', ['emotion_depth', 'attachment'], { user_emotion: 'anxious' }),
      c('좋긴 한데 상처받을까 봐 조심스럽다', 'careful', ['risk_avoidance', 'emotion_depth'], { user_emotion: 'careful' }),
      c('좋아도 내 생활은 지키고 싶다', 'balanced', ['stability', 'self_focus'], { user_emotion: 'balanced' }),
      c('애매하게 끌기보다 답을 알고 싶다', 'needs_clarity', ['direct_action', 'planning'], { user_emotion: 'needs_clarity' }),
    ]],
    user_action_style: ['애매할 때 보통 어떻게 해요?', ['love', 'user_action_style', 'behavior'], [
      c('먼저 묻고 싶은데 자존심이 걸린다', 'waiting', ['decision_delay', 'attachment'], { user_action_style: 'waiting' }),
      c('답답하면 결국 직접 물어본다', 'ask_directly', ['direct_action', 'relationship_focus'], { user_action_style: 'ask_directly' }),
      c('괜찮은 척하지만 계속 신경 쓰인다', 'think_alone', ['emotion_depth', 'risk_avoidance'], { user_action_style: 'think_alone' }),
      c('상처받기 전에 살짝 물러난다', 'create_distance', ['self_focus', 'risk_avoidance'], { user_action_style: 'create_distance' }),
    ]],
    desired_outcome: ['지금 제일 알고 싶은 건 뭐예요?', ['love', 'desired_outcome', 'goal'], [
      c('이 관계가 이어질지 알고 싶다', 'confirm_relationship', ['relationship_focus', 'planning'], { desired_outcome: 'confirm_relationship' }),
      c('내가 먼저 움직여도 될지 궁금하다', 'action_timing', ['direct_action', 'emotion_depth'], { desired_outcome: 'action_timing' }),
      c('상대 마음을 더 읽고 싶다', 'read_partner', ['attachment', 'emotion_depth'], { desired_outcome: 'read_partner' }),
      c('접어야 하면 마음을 정리하고 싶다', 'let_go', ['self_focus', 'planning'], { desired_outcome: 'let_go' }),
    ]],
  },
  money: {
    money_focus: ['요즘 돈은 뭐가 제일 걸려요?', ['money', 'money_focus', 'current_issue'], [
      c('월급이 들어와도 금방 사라진다', 'income_shortage', ['money_control', 'career_ambition'], { money_focus: 'income_shortage' }),
      c('생각보다 돈이 자꾸 샌다', 'spending_leak', ['impulse', 'money_control'], { money_focus: 'spending_leak' }),
      c('모으려고 해도 자꾸 새는 느낌이다', 'saving_difficulty', ['planning', 'risk_avoidance'], { money_focus: 'saving_difficulty' }),
      c('투자나 집 문제를 못 정하겠다', 'investment_property', ['growth', 'risk_taking'], { money_focus: 'investment_property' }),
    ]],
    spending_style: ['돈 쓸 때 자주 이러진 않나요?', ['money', 'spending_style', 'behavior'], [
      c('스트레스 받으면 충동적으로 산다', 'stress_spend', ['impulse', 'emotion_depth'], { spending_style: 'stress_spend' }),
      c('큰돈은 며칠씩 고민한다', 'delayed_spend', ['planning', 'money_control'], { spending_style: 'delayed_spend' }),
      c('필요하면 비싸도 그냥 산다', 'time_value_spend', ['growth', 'direct_action'], { spending_style: 'time_value_spend' }),
      c('나보다 주변에 쓰는 돈이 많다', 'support_spend', ['relationship_focus', 'stability'], { spending_style: 'support_spend' }),
    ]],
    saving_style: ['돈 모으는 건 어떤 편이에요?', ['money', 'saving_style', 'control'], [
      c('월급 받으면 먼저 빼두려 한다', 'pay_self_first', ['planning', 'money_control'], { saving_style: 'pay_self_first' }),
      c('남는 돈 모으려다 늘 실패한다', 'save_leftover', ['decision_delay', 'money_control'], { saving_style: 'save_leftover' }),
      c('통장을 나눠야 마음이 놓인다', 'separate_accounts', ['stability', 'planning'], { saving_style: 'separate_accounts' }),
      c('수입이 들쑥날쑥해 계획이 흔들린다', 'irregular_income', ['risk_avoidance', 'growth'], { saving_style: 'irregular_income' }),
    ]],
    risk_attitude: ['큰돈 앞에서는 마음이 어때요?', ['money', 'risk_attitude', 'decision'], [
      c('잃을까 봐 쉽게 못 움직인다', 'loss_fear', ['risk_avoidance', 'decision_delay'], { risk_attitude: 'loss_fear' }),
      c('작게 해봐야 겨우 움직인다', 'small_test', ['planning', 'growth'], { risk_attitude: 'small_test' }),
      c('확신이 들면 크게도 간다', 'bold_when_clear', ['risk_taking', 'direct_action'], { risk_attitude: 'bold_when_clear' }),
      c('남 말보다 숫자를 봐야 믿는다', 'check_numbers', ['money_control', 'planning'], { risk_attitude: 'check_numbers' }),
    ]],
    money_goal: ['돈으로 제일 만들고 싶은 건요?', ['money', 'money_goal', 'future'], [
      c('비상금이 있어야 숨이 트일 것 같다', 'emergency_fund', ['stability', 'risk_avoidance'], { money_goal: 'emergency_fund' }),
      c('월급 말고 다른 돈길이 필요하다', 'side_income', ['growth', 'career_ambition'], { money_goal: 'side_income' }),
      c('집이나 큰 자산을 준비하고 싶다', 'big_asset', ['planning', 'stability'], { money_goal: 'big_asset' }),
      c('빚이나 밀린 돈부터 털고 싶다', 'debt_cleanup', ['money_control', 'planning'], { money_goal: 'debt_cleanup' }),
    ]],
    current_pressure: ['지금 제일 압박으로 오는 건요?', ['money', 'current_pressure', 'pressure'], [
      c('고정비가 먼저 빠져나가 버겁다', 'fixed_cost', ['money_control', 'risk_avoidance'], { current_pressure: 'fixed_cost' }),
      c('미래 준비가 늦은 것 같아 불안하다', 'future_anxiety', ['emotion_depth', 'planning'], { current_pressure: 'future_anxiety' }),
      c('가족 일 때문에 돈이 묶인다', 'family_pressure', ['relationship_focus', 'stability'], { current_pressure: 'family_pressure' }),
      c('기회는 보이는데 자금이 모자라다', 'capital_gap', ['growth', 'business_drive'], { current_pressure: 'capital_gap' }),
    ]],
  },
  job: {
    job_status: ['요즘 일은 어떤 상태에 가까워요?', ['job', 'job_status', 'current_state'], [
      c('회사에 남아도 답답하고 나가도 불안하다', 'employed_unsure', ['decision_delay', 'career_ambition'], { job_status: 'employed_unsure' }),
      c('이직 생각이 꽤 진지해졌다', 'considering_change', ['direct_action', 'planning'], { job_status: 'considering_change' }),
      c('쉬면서 다음 일을 찾는 중이다', 'between_jobs', ['self_focus', 'growth'], { job_status: 'between_jobs' }),
      c('안정적이지만 막힌 느낌이다', 'stable_but_stuck', ['stability', 'career_ambition'], { job_status: 'stable_but_stuck' }),
    ]],
    job_concern: ['일에서 뭐가 제일 걸려요?', ['job', 'job_concern', 'issue'], [
      c('연봉은 아쉬운데 움직일 확신이 없다', 'salary_reward', ['career_ambition', 'money_control'], { job_concern: 'salary_reward' }),
      c('이 일이 나랑 맞는지 모르겠다', 'fit_doubt', ['self_focus', 'decision_delay'], { job_concern: 'fit_doubt' }),
      c('일보다 사람 때문에 더 지친다', 'people_stress', ['relationship_focus', 'emotion_depth'], { job_concern: 'people_stress' }),
      c('성장할 길이 안 보여 막힌 느낌이다', 'growth_block', ['growth', 'planning'], { job_concern: 'growth_block' }),
    ]],
    work_style: ['일할 때 뭐가 제일 편해요?', ['job', 'work_style', 'behavior'], [
      c('혼자 집중해야 일이 된다', 'independent', ['self_focus', 'planning'], { work_style: 'independent' }),
      c('사람들과 맞춰갈 때 힘이 난다', 'collaborative', ['relationship_focus', 'growth'], { work_style: 'collaborative' }),
      c('마감이 딱 있어야 움직인다', 'clear_deadline', ['planning', 'direct_action'], { work_style: 'clear_deadline' }),
      c('새 문제를 맡을 때 살아난다', 'new_problem', ['growth', 'career_ambition'], { work_style: 'new_problem' }),
    ]],
    decision_style: ['커리어 선택 앞에선 뭘 봐요?', ['job', 'decision_style', 'decision'], [
      c('조건을 비교해야 마음이 놓인다', 'compare_conditions', ['planning', 'money_control'], { decision_style: 'compare_conditions' }),
      c('오래 버틸 수 있을지가 먼저다', 'sustainability_first', ['stability', 'risk_avoidance'], { decision_style: 'sustainability_first' }),
      c('기회가 오면 놓치고 싶지 않다', 'take_opportunity', ['direct_action', 'risk_taking'], { decision_style: 'take_opportunity' }),
      c('조언을 들어도 결국 오래 고민한다', 'deliberate_after_advice', ['decision_delay', 'relationship_focus'], { decision_style: 'deliberate_after_advice' }),
    ]],
    career_goal: ['앞으로 일은 어떻게 가고 싶어요?', ['job', 'career_goal', 'future'], [
      c('전문성을 키워 인정받고 싶다', 'expertise', ['career_ambition', 'planning'], { career_goal: 'expertise' }),
      c('연봉과 조건을 확실히 올리고 싶다', 'better_reward', ['money_control', 'career_ambition'], { career_goal: 'better_reward' }),
      c('내 생활이 무너지지 않았으면 한다', 'life_balance', ['self_focus', 'stability'], { career_goal: 'life_balance' }),
      c('새 분야로 넘어가 보고 싶다', 'new_field', ['growth', 'risk_taking'], { career_goal: 'new_field' }),
    ]],
    stress_point: ['일에서 언제 제일 지쳐요?', ['job', 'stress_point', 'pressure'], [
      c('기준이 자꾸 바뀌면 지친다', 'moving_goalpost', ['planning', 'risk_avoidance'], { stress_point: 'moving_goalpost' }),
      c('애쓴 만큼 인정 못 받으면 무너진다', 'unrecognized', ['emotion_depth', 'career_ambition'], { stress_point: 'unrecognized' }),
      c('사람 눈치 봐야 할 때 힘들다', 'people_tension', ['relationship_focus', 'emotion_depth'], { stress_point: 'people_tension' }),
      c('일이 밀리면 쉬어도 안 쉰 것 같다', 'overload', ['self_focus', 'stability'], { stress_point: 'overload' }),
    ]],
  },
  business: {
    business_stage: ['사업은 지금 어디쯤 와 있어요?', ['business', 'business_stage', 'current_state'], [
      c('시작하고 싶은데 손해 볼까 봐 겁난다', 'idea_validation', ['planning', 'risk_avoidance'], { business_stage: 'idea_validation' }),
      c('작게 시작했고 반응을 보는 중이다', 'early_market', ['growth', 'business_drive'], { business_stage: 'early_market' }),
      c('매출은 있는데 확장이 겁난다', 'revenue_scaling', ['money_control', 'planning'], { business_stage: 'revenue_scaling' }),
      c('아직 시작 전인데 계속 생각난다', 'pre_start', ['decision_delay', 'growth'], { business_stage: 'pre_start' }),
    ]],
    business_concern: ['사업에서 뭐가 제일 걸려요?', ['business', 'business_concern', 'issue'], [
      c('버틸 돈이 부족할까 봐 불안하다', 'cash_runway', ['money_control', 'risk_avoidance'], { business_concern: 'cash_runway' }),
      c('아이템보다 고객 반응이 더 걱정된다', 'customer_fit', ['planning', 'growth'], { business_concern: 'customer_fit' }),
      c('같이할 사람을 믿어도 될지 모르겠다', 'team_partner', ['relationship_focus', 'business_drive'], { business_concern: 'team_partner' }),
      c('확장해야 할지 버텨야 할지 모르겠다', 'scale_timing', ['decision_delay', 'career_ambition'], { business_concern: 'scale_timing' }),
    ]],
    decision_style: ['큰 결정은 보통 뭘 보고 해요?', ['business', 'decision_style', 'decision'], [
      c('숫자가 맞아야 겨우 움직인다', 'numbers_first', ['money_control', 'planning'], { decision_style: 'numbers_first' }),
      c('고객 반응이 오면 바로 바꾼다', 'customer_signal', ['growth', 'direct_action'], { decision_style: 'customer_signal' }),
      c('혼자 정하기엔 자꾸 불안하다', 'seek_input', ['relationship_focus', 'decision_delay'], { decision_style: 'seek_input' }),
      c('타이밍이 오면 먼저 치고 나간다', 'timing_action', ['risk_taking', 'business_drive'], { decision_style: 'timing_action' }),
    ]],
    risk_attitude: ['위험이 보이면 어떻게 해요?', ['business', 'risk_attitude', 'risk'], [
      c('작게 해봐야 다음 돈을 쓴다', 'test_before_spend', ['planning', 'risk_avoidance'], { risk_attitude: 'test_before_spend' }),
      c('잃을 범위가 정해지면 움직인다', 'bounded_risk', ['money_control', 'direct_action'], { risk_attitude: 'bounded_risk' }),
      c('불확실하면 결정이 늦어진다', 'slow_under_uncertainty', ['decision_delay', 'risk_avoidance'], { risk_attitude: 'slow_under_uncertainty' }),
      c('기회가 크면 부담도 감수한다', 'accept_big_upside', ['risk_taking', 'business_drive'], { risk_attitude: 'accept_big_upside' }),
    ]],
    growth_goal: ['사업에서 제일 키우고 싶은 건요?', ['business', 'growth_goal', 'future'], [
      c('다시 찾아오는 고객을 늘리고 싶다', 'repeat_customers', ['relationship_focus', 'growth'], { growth_goal: 'repeat_customers' }),
      c('매출보다 남는 구조가 먼저다', 'profit_stability', ['money_control', 'stability'], { growth_goal: 'profit_stability' }),
      c('브랜드를 더 알리고 싶다', 'brand_awareness', ['fire_expression', 'business_drive'], { growth_goal: 'brand_awareness' }),
      c('혼자 버티는 구조를 바꾸고 싶다', 'systemize', ['planning', 'growth'], { growth_goal: 'systemize' }),
    ]],
    weak_point: ['사업하면서 어디서 자주 약해져요?', ['business', 'weak_point', 'pressure'], [
      c('돈 걱정 때문에 기회도 망설인다', 'funding_fear', ['risk_avoidance', 'decision_delay'], { weak_point: 'funding_fear' }),
      c('할 일이 많으면 우선순위가 흐려진다', 'priority_blur', ['planning', 'business_drive'], { weak_point: 'priority_blur' }),
      c('사람 문제에서 단호하게 말하기 어렵다', 'soft_on_people', ['relationship_focus', 'emotion_depth'], { weak_point: 'soft_on_people' }),
      c('실패 생각이 나면 손이 느려진다', 'fear_slows_action', ['risk_avoidance', 'emotion_depth'], { weak_point: 'fear_slows_action' }),
    ]],
  },
  general: {
    life_focus: ['요즘 제일 마음 쓰이는 건요?', ['general', 'life_focus', 'current_issue'], [
      c('관계 때문에 마음이 자주 흔들린다', 'relationships', ['relationship_focus', 'emotion_depth'], { life_focus: 'relationships' }),
      c('돈과 일이 동시에 압박으로 온다', 'money_work', ['money_control', 'career_ambition'], { life_focus: 'money_work' }),
      c('일단 내 마음부터 회복하고 싶다', 'self_recovery', ['self_focus', 'stability'], { life_focus: 'self_recovery' }),
      c('새로 시작하고 싶은데 확신이 부족하다', 'direction', ['planning', 'growth'], { life_focus: 'direction' }),
    ]],
    current_state: ['요즘 하루는 어떤 느낌이에요?', ['general', 'current_state', 'rhythm'], [
      c('바쁜데 마음은 정리가 안 된다', 'busy_unclear', ['direct_action', 'decision_delay'], { current_state: 'busy_unclear' }),
      c('멈춰 있는 것 같아 답답하다', 'stuck', ['risk_avoidance', 'emotion_depth'], { current_state: 'stuck' }),
      c('조금씩 정리하는 중이다', 'organizing', ['planning', 'stability'], { current_state: 'organizing' }),
      c('기회도 부담도 같이 늘었다', 'chance_pressure', ['growth', 'career_ambition'], { current_state: 'chance_pressure' }),
    ]],
    emotional_condition: ['요즘 마음은 어느 쪽이에요?', ['general', 'emotional_condition', 'emotion'], [
      c('괜찮은 척하지만 속은 지친다', 'quietly_tired', ['emotion_depth', 'self_focus'], { emotional_condition: 'quietly_tired' }),
      c('작은 일에도 예민해진다', 'sensitive', ['emotion_depth', 'risk_avoidance'], { emotional_condition: 'sensitive' }),
      c('큰일은 없는데 의욕이 없다', 'low_drive', ['decision_delay', 'stability'], { emotional_condition: 'low_drive' }),
      c('새로 시작하고 싶은 마음이 있다', 'ready_for_new', ['growth', 'direct_action'], { emotional_condition: 'ready_for_new' }),
    ]],
    relationship_energy: ['사람 만나는 건 요즘 어때요?', ['general', 'relationship_energy', 'relationship'], [
      c('가까운 사람에게 기대고 싶다', 'need_closeness', ['relationship_focus', 'attachment'], { relationship_energy: 'need_closeness' }),
      c('좋은데 금방 피곤해진다', 'socially_tired', ['self_focus', 'emotion_depth'], { relationship_energy: 'socially_tired' }),
      c('정리해야 할 관계가 떠오른다', 'need_boundary', ['planning', 'risk_avoidance'], { relationship_energy: 'need_boundary' }),
      c('새 인연이나 협업이 궁금하다', 'open_connection', ['growth', 'relationship_focus'], { relationship_energy: 'open_connection' }),
    ]],
    money_work_flow: ['돈과 일은 어떤 흐름이에요?', ['general', 'money_work_flow', 'reality'], [
      c('열심히 해도 결과가 늦다', 'effort_slow_result', ['career_ambition', 'decision_delay'], { money_work_flow: 'effort_slow_result' }),
      c('지출과 책임이 같이 늘었다', 'pressure_increase', ['money_control', 'risk_avoidance'], { money_work_flow: 'pressure_increase' }),
      c('기회는 보이는데 확신이 없다', 'opportunity_unclear', ['growth', 'planning'], { money_work_flow: 'opportunity_unclear' }),
      c('지금은 무리보다 안정이 필요하다', 'need_stability', ['stability', 'self_focus'], { money_work_flow: 'need_stability' }),
    ]],
    yearly_direction: ['앞으로는 어떻게 가고 싶어요?', ['general', 'yearly_direction', 'future'], [
      c('복잡한 것부터 하나씩 정리하고 싶다', 'cleanup', ['planning', 'stability'], { yearly_direction: 'cleanup' }),
      c('기회가 오면 놓치고 싶지 않다', 'catch_chance', ['direct_action', 'growth'], { yearly_direction: 'catch_chance' }),
      c('몸과 마음을 먼저 회복하고 싶다', 'recover', ['self_focus', 'emotion_depth'], { yearly_direction: 'recover' }),
      c('관계, 돈, 일의 균형을 잡고 싶다', 'rebalance', ['relationship_focus', 'money_control'], { yearly_direction: 'rebalance' }),
    ]],
  },
};

function buildStageQuestion(topic, stage, stageIndex, variantIndex) {
  const [baseText, tags, choices] = stageQuestionConfig[topic][stage];
  return {
    id: `${topic}_${String(stageIndex + 1).padStart(2, '0')}_${String(variantIndex + 1).padStart(2, '0')}`,
    topic,
    stage,
    text: baseText,
    choices: choices.map((item) => ({ ...item, context: { ...item.context } })),
    tags: [...tags, `stage_${stageIndex + 1}`, `variant_${variantIndex + 1}`],
  };
}

function fallbackQuestion(topic, stage, stageIndex) {
  const [baseText, tags, choices] = stageQuestionConfig[topic][stage];
  return {
    id: `${topic}_${String(stageIndex + 1).padStart(2, '0')}_fallback`,
    topic,
    stage,
    text: baseText,
    choices: choices.map((item) => ({ ...item, context: { ...item.context } })),
    tags: [...tags, `stage_${stageIndex + 1}`, 'fallback'],
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

  const selected = candidates
    .map((question) => {
      const pattern = getChoicePattern(question);
      const repeatedPattern = usedChoicePatterns.has(pattern) ? 10 : 0;
      const tagPenalty = countOverlap(question.tags, recentTags) * 3;
      const variantNumber = Number(question.id.split('_').at(-1) || 1);
      const flowOffset = Math.abs(((answers.length * 7) % questionVariants.length) - variantNumber) * 0.01;
      return { question, score: -tagPenalty - repeatedPattern - flowOffset };
    })
    .sort((a, b) => b.score - a.score || a.question.id.localeCompare(b.question.id))[0]?.question || null;

  if (!selected) return null;
  const validation = validateQuestion(selected);
  if (validation.ok) return selected;
  console.warn(`[questionDB] fallback question used: ${selected.id}`, validation.errors);
  return fallbackQuestion(key, nextStage, flow.indexOf(nextStage));
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
  if (String(question?.text || '').length > 45) errors.push('질문이 너무 깁니다.');
  if (surveyPrefixes.some((prefix) => String(question?.text || '').startsWith(prefix))) errors.push('반복 prefix가 포함되어 있습니다.');
  const labels = (question?.choices || []).map((choice) => choice.label);
  if (new Set(labels).size !== labels.length) errors.push('중복 선택지가 있습니다.');
  if (labels.some((label) => abstractChoiceWords.some((word) => label.includes(word)))) errors.push('추상 선택지 금지어가 포함되어 있습니다.');
  if (labels.some((label) => label.length < 7 || label.length > 36)) errors.push('선택지는 7~36자 사이가 좋습니다.');
  if (!(question?.choices || []).every((choice) => Object.prototype.hasOwnProperty.call(choice.context || {}, question.stage))) {
    errors.push('stage와 context 키가 일치하지 않습니다.');
  }
  if (!(question?.tags || []).includes(question?.topic) || !(question?.tags || []).includes(question?.stage)) {
    errors.push('topic/stage 태그가 부족합니다.');
  }
  if (!labels.every((label) => /(다|요|싶다|같다|한다|된다|않다|있다|없다)$/.test(label))) {
    errors.push('선택지는 실제 행동이나 속마음 문장이어야 합니다.');
  }
  const contextMatches = (question?.choices || []).filter((choice) => choice.context?.[question.stage]).length;
  if (contextMatches !== question.choices.length) {
    errors.push('질문 범위와 선택지 context가 맞지 않습니다.');
  }
  if (!errors.length && seenQuestions?.add) seenQuestions.add(question.text);
  if (errors.length) console.warn(`[questionDB] invalid question: ${question?.id || 'unknown'}`, errors);
  return { ok: errors.length === 0, errors };
}
