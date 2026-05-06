# 운명상담소 질문-선택지 수정표

현재 실제 화면에 표시되는 질문과 선택지입니다. 질문 prefix는 제거되어 캐릭터 bridge 뒤에 이 문장만 표시됩니다.

## 연애 love

### relationship_status

질문: 요즘 마음 쓰이는 사람이 있어요?

| 선택지 | value | context |
|---|---|---|
| 자꾸 떠오르는 사람이 있다 | has_interest | relationship_status: has_interest |
| 연락은 하는데 애매하다 | uncertain | relationship_status: uncertain |
| 만나는 사람은 있는데 흔들린다 | in_relationship | relationship_status: in_relationship |
| 지금은 혼자가 더 편하다 | single | relationship_status: single |

### relationship_stage

질문: 그 사람과는 어디쯤 와 있어요?

| 선택지 | value | context |
|---|---|---|
| 가끔 연락만 이어진다 | contacting | relationship_stage: contacting |
| 서로 마음은 있는 것 같다 | mutual_interest | relationship_stage: mutual_interest |
| 만나도 관계가 또렷하지 않다 | undefined_dating | relationship_stage: undefined_dating |
| 이어갈지 접을지 고민된다 | reconsidering | relationship_stage: reconsidering |

### partner_signal

질문: 상대 반응은 요즘 어때요?

| 선택지 | value | context |
|---|---|---|
| 다정했다가 또 차가워진다 | mixed | partner_signal: mixed |
| 연락은 해도 먼저 오진 않는다 | passive | partner_signal: passive |
| 말보다 행동으로 챙긴다 | steady_action | partner_signal: steady_action |
| 요즘은 조금 멀어진 것 같다 | distant | partner_signal: distant |

### user_emotion

질문: 그때 마음이 어땠어요?

| 선택지 | value | context |
|---|---|---|
| 작은 반응에도 계속 흔들린다 | anxious | user_emotion: anxious |
| 좋긴 한데 상처받을까 봐 조심스럽다 | careful | user_emotion: careful |
| 좋아도 내 생활은 지키고 싶다 | balanced | user_emotion: balanced |
| 애매하게 끌기보다 답을 알고 싶다 | needs_clarity | user_emotion: needs_clarity |

### user_action_style

질문: 애매할 때 보통 어떻게 해요?

| 선택지 | value | context |
|---|---|---|
| 먼저 묻고 싶은데 자존심이 걸린다 | waiting | user_action_style: waiting |
| 답답하면 결국 직접 물어본다 | ask_directly | user_action_style: ask_directly |
| 괜찮은 척하지만 계속 신경 쓰인다 | think_alone | user_action_style: think_alone |
| 상처받기 전에 살짝 물러난다 | create_distance | user_action_style: create_distance |

### desired_outcome

질문: 지금 제일 알고 싶은 건 뭐예요?

| 선택지 | value | context |
|---|---|---|
| 이 관계가 이어질지 알고 싶다 | confirm_relationship | desired_outcome: confirm_relationship |
| 내가 먼저 움직여도 될지 궁금하다 | action_timing | desired_outcome: action_timing |
| 상대 마음을 더 읽고 싶다 | read_partner | desired_outcome: read_partner |
| 접어야 하면 마음을 정리하고 싶다 | let_go | desired_outcome: let_go |

## 재물 money

### money_focus

질문: 요즘 돈은 뭐가 제일 걸려요?

| 선택지 | value | context |
|---|---|---|
| 월급이 들어와도 금방 사라진다 | income_shortage | money_focus: income_shortage |
| 생각보다 돈이 자꾸 샌다 | spending_leak | money_focus: spending_leak |
| 모으려고 해도 자꾸 새는 느낌이다 | saving_difficulty | money_focus: saving_difficulty |
| 투자나 집 문제를 못 정하겠다 | investment_property | money_focus: investment_property |

### spending_style

질문: 돈 쓸 때 자주 이러진 않나요?

| 선택지 | value | context |
|---|---|---|
| 스트레스 받으면 충동적으로 산다 | stress_spend | spending_style: stress_spend |
| 큰돈은 며칠씩 고민한다 | delayed_spend | spending_style: delayed_spend |
| 필요하면 비싸도 그냥 산다 | time_value_spend | spending_style: time_value_spend |
| 나보다 주변에 쓰는 돈이 많다 | support_spend | spending_style: support_spend |

### saving_style

질문: 돈 모으는 건 어떤 편이에요?

| 선택지 | value | context |
|---|---|---|
| 월급 받으면 먼저 빼두려 한다 | pay_self_first | saving_style: pay_self_first |
| 남는 돈 모으려다 늘 실패한다 | save_leftover | saving_style: save_leftover |
| 통장을 나눠야 마음이 놓인다 | separate_accounts | saving_style: separate_accounts |
| 수입이 들쑥날쑥해 계획이 흔들린다 | irregular_income | saving_style: irregular_income |

### risk_attitude

질문: 큰돈 앞에서는 마음이 어때요?

| 선택지 | value | context |
|---|---|---|
| 잃을까 봐 쉽게 못 움직인다 | loss_fear | risk_attitude: loss_fear |
| 작게 해봐야 겨우 움직인다 | small_test | risk_attitude: small_test |
| 확신이 들면 크게도 간다 | bold_when_clear | risk_attitude: bold_when_clear |
| 남 말보다 숫자를 봐야 믿는다 | check_numbers | risk_attitude: check_numbers |

### money_goal

질문: 돈으로 제일 만들고 싶은 건요?

| 선택지 | value | context |
|---|---|---|
| 비상금이 있어야 숨이 트일 것 같다 | emergency_fund | money_goal: emergency_fund |
| 월급 말고 다른 돈길이 필요하다 | side_income | money_goal: side_income |
| 집이나 큰 자산을 준비하고 싶다 | big_asset | money_goal: big_asset |
| 빚이나 밀린 돈부터 털고 싶다 | debt_cleanup | money_goal: debt_cleanup |

### current_pressure

질문: 지금 제일 압박으로 오는 건요?

| 선택지 | value | context |
|---|---|---|
| 고정비가 먼저 빠져나가 버겁다 | fixed_cost | current_pressure: fixed_cost |
| 미래 준비가 늦은 것 같아 불안하다 | future_anxiety | current_pressure: future_anxiety |
| 가족 일 때문에 돈이 묶인다 | family_pressure | current_pressure: family_pressure |
| 기회는 보이는데 자금이 모자라다 | capital_gap | current_pressure: capital_gap |

## 직업 job

### job_status

질문: 요즘 일은 어떤 상태에 가까워요?

| 선택지 | value | context |
|---|---|---|
| 회사에 남아도 답답하고 나가도 불안하다 | employed_unsure | job_status: employed_unsure |
| 이직 생각이 꽤 진지해졌다 | considering_change | job_status: considering_change |
| 쉬면서 다음 일을 찾는 중이다 | between_jobs | job_status: between_jobs |
| 안정적이지만 막힌 느낌이다 | stable_but_stuck | job_status: stable_but_stuck |

### job_concern

질문: 일에서 뭐가 제일 걸려요?

| 선택지 | value | context |
|---|---|---|
| 연봉은 아쉬운데 움직일 확신이 없다 | salary_reward | job_concern: salary_reward |
| 이 일이 나랑 맞는지 모르겠다 | fit_doubt | job_concern: fit_doubt |
| 일보다 사람 때문에 더 지친다 | people_stress | job_concern: people_stress |
| 성장할 길이 안 보여 막힌 느낌이다 | growth_block | job_concern: growth_block |

### work_style

질문: 일할 때 뭐가 제일 편해요?

| 선택지 | value | context |
|---|---|---|
| 혼자 집중해야 일이 된다 | independent | work_style: independent |
| 사람들과 맞춰갈 때 힘이 난다 | collaborative | work_style: collaborative |
| 마감이 딱 있어야 움직인다 | clear_deadline | work_style: clear_deadline |
| 새 문제를 맡을 때 살아난다 | new_problem | work_style: new_problem |

### decision_style

질문: 커리어 선택 앞에선 뭘 봐요?

| 선택지 | value | context |
|---|---|---|
| 조건을 비교해야 마음이 놓인다 | compare_conditions | decision_style: compare_conditions |
| 오래 버틸 수 있을지가 먼저다 | sustainability_first | decision_style: sustainability_first |
| 기회가 오면 놓치고 싶지 않다 | take_opportunity | decision_style: take_opportunity |
| 조언을 들어도 결국 오래 고민한다 | deliberate_after_advice | decision_style: deliberate_after_advice |

### career_goal

질문: 앞으로 일은 어떻게 가고 싶어요?

| 선택지 | value | context |
|---|---|---|
| 전문성을 키워 인정받고 싶다 | expertise | career_goal: expertise |
| 연봉과 조건을 확실히 올리고 싶다 | better_reward | career_goal: better_reward |
| 내 생활이 무너지지 않았으면 한다 | life_balance | career_goal: life_balance |
| 새 분야로 넘어가 보고 싶다 | new_field | career_goal: new_field |

### stress_point

질문: 일에서 언제 제일 지쳐요?

| 선택지 | value | context |
|---|---|---|
| 기준이 자꾸 바뀌면 지친다 | moving_goalpost | stress_point: moving_goalpost |
| 애쓴 만큼 인정 못 받으면 무너진다 | unrecognized | stress_point: unrecognized |
| 사람 눈치 봐야 할 때 힘들다 | people_tension | stress_point: people_tension |
| 일이 밀리면 쉬어도 안 쉰 것 같다 | overload | stress_point: overload |

## 사업 business

### business_stage

질문: 사업은 지금 어디쯤 와 있어요?

| 선택지 | value | context |
|---|---|---|
| 시작하고 싶은데 손해 볼까 봐 겁난다 | idea_validation | business_stage: idea_validation |
| 작게 시작했고 반응을 보는 중이다 | early_market | business_stage: early_market |
| 매출은 있는데 확장이 겁난다 | revenue_scaling | business_stage: revenue_scaling |
| 아직 시작 전인데 계속 생각난다 | pre_start | business_stage: pre_start |

### business_concern

질문: 사업에서 뭐가 제일 걸려요?

| 선택지 | value | context |
|---|---|---|
| 버틸 돈이 부족할까 봐 불안하다 | cash_runway | business_concern: cash_runway |
| 아이템보다 고객 반응이 더 걱정된다 | customer_fit | business_concern: customer_fit |
| 같이할 사람을 믿어도 될지 모르겠다 | team_partner | business_concern: team_partner |
| 확장해야 할지 버텨야 할지 모르겠다 | scale_timing | business_concern: scale_timing |

### decision_style

질문: 큰 결정은 보통 뭘 보고 해요?

| 선택지 | value | context |
|---|---|---|
| 숫자가 맞아야 겨우 움직인다 | numbers_first | decision_style: numbers_first |
| 고객 반응이 오면 바로 바꾼다 | customer_signal | decision_style: customer_signal |
| 혼자 정하기엔 자꾸 불안하다 | seek_input | decision_style: seek_input |
| 타이밍이 오면 먼저 치고 나간다 | timing_action | decision_style: timing_action |

### risk_attitude

질문: 위험이 보이면 어떻게 해요?

| 선택지 | value | context |
|---|---|---|
| 작게 해봐야 다음 돈을 쓴다 | test_before_spend | risk_attitude: test_before_spend |
| 잃을 범위가 정해지면 움직인다 | bounded_risk | risk_attitude: bounded_risk |
| 불확실하면 결정이 늦어진다 | slow_under_uncertainty | risk_attitude: slow_under_uncertainty |
| 기회가 크면 부담도 감수한다 | accept_big_upside | risk_attitude: accept_big_upside |

### growth_goal

질문: 사업에서 제일 키우고 싶은 건요?

| 선택지 | value | context |
|---|---|---|
| 다시 찾아오는 고객을 늘리고 싶다 | repeat_customers | growth_goal: repeat_customers |
| 매출보다 남는 구조가 먼저다 | profit_stability | growth_goal: profit_stability |
| 브랜드를 더 알리고 싶다 | brand_awareness | growth_goal: brand_awareness |
| 혼자 버티는 구조를 바꾸고 싶다 | systemize | growth_goal: systemize |

### weak_point

질문: 사업하면서 어디서 자주 약해져요?

| 선택지 | value | context |
|---|---|---|
| 돈 걱정 때문에 기회도 망설인다 | funding_fear | weak_point: funding_fear |
| 할 일이 많으면 우선순위가 흐려진다 | priority_blur | weak_point: priority_blur |
| 사람 문제에서 단호하게 말하기 어렵다 | soft_on_people | weak_point: soft_on_people |
| 실패 생각이 나면 손이 느려진다 | fear_slows_action | weak_point: fear_slows_action |

## 종합운세 general

### life_focus

질문: 요즘 제일 마음 쓰이는 건요?

| 선택지 | value | context |
|---|---|---|
| 관계 때문에 마음이 자주 흔들린다 | relationships | life_focus: relationships |
| 돈과 일이 동시에 압박으로 온다 | money_work | life_focus: money_work |
| 일단 내 마음부터 회복하고 싶다 | self_recovery | life_focus: self_recovery |
| 새로 시작하고 싶은데 확신이 부족하다 | direction | life_focus: direction |

### current_state

질문: 요즘 하루는 어떤 느낌이에요?

| 선택지 | value | context |
|---|---|---|
| 바쁜데 마음은 정리가 안 된다 | busy_unclear | current_state: busy_unclear |
| 멈춰 있는 것 같아 답답하다 | stuck | current_state: stuck |
| 조금씩 정리하는 중이다 | organizing | current_state: organizing |
| 기회도 부담도 같이 늘었다 | chance_pressure | current_state: chance_pressure |

### emotional_condition

질문: 요즘 마음은 어느 쪽이에요?

| 선택지 | value | context |
|---|---|---|
| 괜찮은 척하지만 속은 지친다 | quietly_tired | emotional_condition: quietly_tired |
| 작은 일에도 예민해진다 | sensitive | emotional_condition: sensitive |
| 큰일은 없는데 의욕이 없다 | low_drive | emotional_condition: low_drive |
| 새로 시작하고 싶은 마음이 있다 | ready_for_new | emotional_condition: ready_for_new |

### relationship_energy

질문: 사람 만나는 건 요즘 어때요?

| 선택지 | value | context |
|---|---|---|
| 가까운 사람에게 기대고 싶다 | need_closeness | relationship_energy: need_closeness |
| 좋은데 금방 피곤해진다 | socially_tired | relationship_energy: socially_tired |
| 정리해야 할 관계가 떠오른다 | need_boundary | relationship_energy: need_boundary |
| 새 인연이나 협업이 궁금하다 | open_connection | relationship_energy: open_connection |

### money_work_flow

질문: 돈과 일은 어떤 흐름이에요?

| 선택지 | value | context |
|---|---|---|
| 열심히 해도 결과가 늦다 | effort_slow_result | money_work_flow: effort_slow_result |
| 지출과 책임이 같이 늘었다 | pressure_increase | money_work_flow: pressure_increase |
| 기회는 보이는데 확신이 없다 | opportunity_unclear | money_work_flow: opportunity_unclear |
| 지금은 무리보다 안정이 필요하다 | need_stability | money_work_flow: need_stability |

### yearly_direction

질문: 앞으로는 어떻게 가고 싶어요?

| 선택지 | value | context |
|---|---|---|
| 복잡한 것부터 하나씩 정리하고 싶다 | cleanup | yearly_direction: cleanup |
| 기회가 오면 놓치고 싶지 않다 | catch_chance | yearly_direction: catch_chance |
| 몸과 마음을 먼저 회복하고 싶다 | recover | yearly_direction: recover |
| 관계, 돈, 일의 균형을 잡고 싶다 | rebalance | yearly_direction: rebalance |

