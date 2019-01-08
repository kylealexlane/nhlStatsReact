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

const playersFreqColumns = [
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

  "wrist_shot_freq",
  "slap_shot_freq",
  "snap_shot_freq",
  "backhand_freq",
  "tip_in_freq",
  "deflected_freq",
  "wrap_around_freq",
];

const playersShootPercColumns = [
  'last_name',
  'first_name',
  'pos_code',
  'num_shots',
  'avg_shoot_perc',
  'wrist_shot_shooting_perc',
  'slap_shot_shooting_perc',
  'snap_shot_shooting_perc',
  'backhand_shooting_perc',
  'tip_in_shooting_perc',
  'deflected_shooting_perc',
  'deflected_shooting_perc',
  'avg_xgoals',
  'avg_xgoals_wrist_shot',
  'avg_xgoals_slap_shot',
  'avg_xgoals_snap_shot',
  'avg_xgoals_backhand',
  'avg_xgoals_tip_in',
  'avg_xgoals_deflected',
  'avg_xgoals_wrap_around',
];

const playersActualValsColumns = [
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

  "wrist_shot_freq",
  "slap_shot_freq",
  "snap_shot_freq",
  "backhand_freq",
  "tip_in_freq",
  "deflected_freq",
  "wrap_around_freq",

  'avg_shoot_perc',
  'wrist_shot_shooting_perc',
  'slap_shot_shooting_perc',
  'snap_shot_shooting_perc',
  'backhand_shooting_perc',
  'tip_in_shooting_perc',
  'deflected_shooting_perc',
  'deflected_shooting_perc',

  'mean_ang',
  'mean_dist',
  'shot_quality'
];

const playersExpectedValsColumns = [
  'last_name',
  'first_name',
  'pos_code',

  'num_shots',

  'sum_xgoals',
  "wrist_shot_pred",
  "slap_shot_pred",
  "snap_shot_pred",
  "backhand_pred",
  "tip_in_pred",
  "deflected_pred",
  "wrap_around_pred",

  'avg_xgoals',
  'avg_xgoals_wrist_shot',
  'avg_xgoals_slap_shot',
  'avg_xgoals_snap_shot',
  'avg_xgoals_backhand',
  'avg_xgoals_tip_in',
  'avg_xgoals_deflected',
  'avg_xgoals_wrap_around',

  'goals_aa_per_shot',
  'shot_quality'
];

const playersGoalDataColumns = [
  'last_name',
  'first_name',
  'pos_code',

  'num_shots',
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

  'goals_aa_per_shot',
  'mean_ang',
  'mean_dist',
  'shot_quality'
];

const playersAllSummariesColumns = [
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
  'wrist_shot_shooting_perc',
  'slap_shot_shooting_perc',
  'snap_shot_shooting_perc',
  'backhand_shooting_perc',
  'tip_in_shooting_perc',
  'deflected_shooting_perc',
  'deflected_shooting_perc',

  'avg_xgoals',
  'avg_xgoals_wrist_shot',
  'avg_xgoals_slap_shot',
  'avg_xgoals_snap_shot',
  'avg_xgoals_backhand',
  'avg_xgoals_tip_in',
  'avg_xgoals_deflected',
  'avg_xgoals_wrap_around',

  'goals_aa_per_shot',
  'mean_ang',
  'mean_dist',
  'shot_quality'
];



// Get player column data from players - just remove last_name, etc... and add in proper start
let list = ["year", "month"];
playersBasicColumns.forEach(function(metric) {
  if(metric !== "last_name" && metric !== "first_name" && metric !== "pos_code"){
    list.push(metric);}});
const playerBasicColumns = list;

list = ["year", "month"];
playersFreqColumns.forEach(function(metric) {
  if(metric !== "last_name" && metric !== "first_name" && metric !== "pos_code"){
    list.push(metric);}});
const playerFreqColumns = list;

list = ["year", "month"];
playersShootPercColumns.forEach(function(metric) {
  if(metric !== "last_name" && metric !== "first_name" && metric !== "pos_code"){
    list.push(metric);}});
const playerShootPercColumns = list;

list = ["year", "month"];
playersActualValsColumns.forEach(function(metric) {
  if(metric !== "last_name" && metric !== "first_name" && metric !== "pos_code"){
    list.push(metric);}});
const playerActualValsColumns = list;

list = ["year", "month"];
playersExpectedValsColumns.forEach(function(metric) {
  if(metric !== "last_name" && metric !== "first_name" && metric !== "pos_code"){
    list.push(metric);}});
const playerExpectedValsColumns = list;

list = ["year", "month"];
playersGoalDataColumns.forEach(function(metric) {
  if(metric !== "last_name" && metric !== "first_name" && metric !== "pos_code"){
    list.push(metric);}});
const playerGoalDataColumns = list;

list = ["year", "month"];
playersAllSummariesColumns.forEach(function(metric) {
  if(metric !== "last_name" && metric !== "first_name" && metric !== "pos_code"){
    list.push(metric);}});
const playerAllSummariesColumns = list;


// Options for columns - what is displayed at the top for filtering
const basicOptions = [
  {label: "Year",
    val: "year"},
  {label: "Game Type",
    val: "gametype"},
  {label: "Stats Type",
    val: "statstype"},
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

const basicDefaultOptions = ["year", "gametype", "statstype"];
const basicPlusSituationDefaultOptions = ["year", "gametype", "situation"];

export default {
  goaliesBasicColumns: goaliesBasicColumns,
  goaliesBasicOptions: basicOptions,
  goaliesBasicDefaultOptions: basicDefaultOptions,

  teamsOffensiveBasicColumns: teamsOffensiveBasicColumns,
  teamsOffensiveBasicOptions: basicPlusSituationOptions,
  teamsOffensiveDefaultOptions: basicPlusSituationDefaultOptions,

  teamsDefensiveBasicColumns: teamsDefensiveBasicColumns,
  teamsDefensiveBasicOptions: basicPlusSituationOptions,
  teamsDefensiveDefaultOptions: basicPlusSituationDefaultOptions,


  playersBasicOptions: basicOptions,
  playersBasicDefaultOptions: basicDefaultOptions,
  playersBasicColumns: playersBasicColumns,
  playersFreqColumns: playersFreqColumns,
  playersShootPercColumns: playersShootPercColumns,
  playersActualValsColumns: playersActualValsColumns,
  playersExpectedValsColumns: playersExpectedValsColumns,
  playersGoalDataColumns: playersGoalDataColumns,
  playersAllSummariesColumns: playersAllSummariesColumns,

  playerBasicColumns: playerBasicColumns,
  playerFreqColumns: playerFreqColumns,
  playerShootPercColumns: playerShootPercColumns,
  playerActualValsColumns: playerActualValsColumns,
  playerExpectedValsColumns: playerExpectedValsColumns,
  playerGoalDataColumns: playerGoalDataColumns,
  playerAllSummariesColumns: playerAllSummariesColumns,
}
