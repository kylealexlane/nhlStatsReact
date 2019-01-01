const goaliesBasicColumns = [
  'last_name',
  'first_name',
  'pos_code',
  'num_shots',
  'num_goals',
  'sum_xgoals',
  'save_perc',
  'xsave_perc',
  'saves_aa_per_shot',
  'mean_ang',
  'mean_dist',
  'shot_quality'
];

const playersBasicColumns = [
  'last_name',
  'first_name',
  'pos_code',
  'num_shots',
  'num_goals',
  'sum_xgoals',
  'avg_shoot_perc',
  'avg_xgoals',
  'goals_aa_per_shot',
  'mean_ang',
  'mean_dist',
  'shot_quality'
];

const teamsOffensiveBasicColumns = [
  'name',
  'num_shots',
  'num_goals',
  'sum_xgoals',
  'avg_shoot_perc',
  'avg_xgoals',
  'goals_aa_per_shot',
  'shot_quality',
  'mean_dist',
  'mean_ang'
];

const teamsDefensiveBasicColumns = [
  'name',
  'num_shots',
  'num_goals',
  'sum_xgoals',
  'save_perc',
  'xsave_perc',
  'saves_aa_per_shot',
  'shot_quality',
  'mean_dist',
  'mean_ang'
];

const basicOptions = [
  {label: "Year",
    val: "year"},
  {label: "Game Type",
    val: "gametype"},
  {label: "Items Per Page",
    val: "pagenum"}
];

const basicPlusSituationOptions = [
  {label: "Year",
    val: "year"},
  {label: "Game Type",
    val: "gametype"},
  {label: "Situation",
    val: "situation"},
  {label: "Items Per Page",
    val: "pagenum"}
];

const basicDefaultOptions = ["year", "gametype"];
const basicPlusSituationDefaultOptions = ["year", "gametype", "situation"];

export default {
  goaliesBasicColumns: goaliesBasicColumns,
  goaliesBasicOptions: basicOptions,
  goaliesBasicDefaultOptions: basicDefaultOptions,

  playersBasicColumns: playersBasicColumns,
  playersBasicOptions: basicOptions,
  playersBasicDefaultOptions: basicDefaultOptions,


  teamsOffensiveBasicColumns: teamsOffensiveBasicColumns,
  teamsOffensiveBasicOptions: basicPlusSituationOptions,
  teamsOffensiveDefaultOptions: basicPlusSituationDefaultOptions,

  teamsDefensiveBasicColumns: teamsDefensiveBasicColumns,
  teamsDefensiveBasicOptions: basicPlusSituationOptions,
  teamsDefensiveDefaultOptions: basicPlusSituationDefaultOptions,
}