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

const allSummariesPlayer = [
  'last_name',
  'first_name',
  'pos_code',

  'num_shots',
  "wrist_shot_num",
  "slap_shot_num",
  "snap_shot_num",
  "backhand_num",
  "tip_in_num",
  "deflected_num",
  "wrap_around_num",

  'num_goals',
  "num_goals_wrist_shot",
  "num_goals_slap_shot",
  "num_goals_snap_shot",
  "num_goals_backhand",
  "num_goals_tip_in",
  "num_goals_deflected",
  "num_goals_wrap_around",

  'sum_xgoals',
  "wrist_shot_pred",
  "slap_shot_pred",
  "snap_shot_pred",
  "backhand_pred",
  "tip_in_pred",
  "deflected_pred",
  "wrap_around_pred",

  "wrist_shot_freq",
  "slap_shot_freq",
  "snap_shot_freq",
  "backhand_freq",
  "tip_in_freq",
  "deflected_freq",
  "wrap_around_freq",



  'avg_shoot_perc',
  'avg_xgoals',
  'goals_aa_per_shot',
  'mean_ang',
  'mean_dist',
  'shot_quality'
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

  allSummariesPlayer: allSummariesPlayer,
}
