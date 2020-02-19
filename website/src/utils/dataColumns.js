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
function GetPlayerCols(playerscols) {
  let list = ["year", "month"];
  playerscols.forEach(function(metric) {
    if(metric !== "last_name" && metric !== "first_name" && metric !== "pos_code"){
      list.push(metric);}});
  return(list);
}

const playerBasicColumns = GetPlayerCols(playersBasicColumns);
const playerFreqColumns = GetPlayerCols(playersFreqColumns);
const playerShootPercColumns = GetPlayerCols(playersShootPercColumns);
const playerActualValsColumns = GetPlayerCols(playersActualValsColumns);
const playerExpectedValsColumns = GetPlayerCols(playersExpectedValsColumns);
const playerGoalDataColumns = GetPlayerCols(playersGoalDataColumns);
const playerAllSummariesColumns = GetPlayerCols(playersAllSummariesColumns);





// Get goalie column data from players and player - just replace shoot_perc with save_perc, etc...
function GetGoalieCols(playerscols) {
  let list = [];
  playerscols.forEach(function(metric) {
    if(metric.includes("avg_shoot")){
      list.push(metric.replace("avg_shoot", "save"))
    } else if(metric.includes("avg_xgoals")){
      list.push(metric.replace("avg_xgoals", "xsave_perc"))
    } else if(metric.includes("shooting_perc")){
      list.push(metric.replace("shooting_perc", "save_perc"))
    } else if(metric.includes("goals_aa_per_shot")){
      list.push(metric.replace("goals_aa_per_shot", "saves_aa_per_shot"))
    } else{
      list.push(metric);
    }
  });
  return(list);
}

const goaliesBasicColumns = GetGoalieCols(playersBasicColumns);
const goaliesFreqColumns = GetGoalieCols(playersFreqColumns);
const goaliesShootPercColumns = GetGoalieCols(playersShootPercColumns);
const goaliesActualValsColumns = GetGoalieCols(playersActualValsColumns);
const goaliesExpectedValsColumns = GetGoalieCols(playersExpectedValsColumns);
const goaliesGoalDataColumns = GetGoalieCols(playersGoalDataColumns);
const goaliesAllSummariesColumns = GetGoalieCols(playersAllSummariesColumns);

const goalieBasicColumns = GetGoalieCols(playerBasicColumns);
const goalieFreqColumns = GetGoalieCols(playerFreqColumns);
const goalieShootPercColumns = GetGoalieCols(playerShootPercColumns);
const goalieActualValsColumns = GetGoalieCols(playerActualValsColumns);
const goalieExpectedValsColumns = GetGoalieCols(playerExpectedValsColumns);
const goalieGoalDataColumns = GetGoalieCols(playerGoalDataColumns);
const goalieAllSummariesColumns = GetGoalieCols(playerAllSummariesColumns);




// Get Team column data from players, goalies, palayer, and goalie - just replace first name and last name and pos to name, etc...
function GetTeamCols(regCols) {
  let list = ["name"];
  regCols.forEach(function(metric) {
    if(!metric.includes("last_name") && !metric.includes("first_name") && !metric.includes("pos_code")){
      list.push(metric)
    }
  });
  return(list);
}

const teamsOffensiveBasicColumns = GetTeamCols(playersBasicColumns);
const teamsOffensiveFreqColumns = GetTeamCols(playersFreqColumns);
const teamsOffensiveShootPercColumns = GetTeamCols(playersShootPercColumns);
const teamsOffensiveActualValsColumns = GetTeamCols(playersActualValsColumns);
const teamsOffensiveExpectedValsColumns = GetTeamCols(playersExpectedValsColumns);
const teamsOffensiveGoalDataColumns = GetTeamCols(playersGoalDataColumns);
const teamsOffensiveAllSummariesColumns = GetTeamCols(playersAllSummariesColumns);

const teamOffensiveBasicColumns = GetTeamCols(playerBasicColumns);
const teamOffensiveFreqColumns = GetTeamCols(playerFreqColumns);
const teamOffensiveShootPercColumns = GetTeamCols(playerShootPercColumns);
const teamOffensiveActualValsColumns = GetTeamCols(playerActualValsColumns);
const teamOffensiveExpectedValsColumns = GetTeamCols(playerExpectedValsColumns);
const teamOffensiveGoalDataColumns = GetTeamCols(playerGoalDataColumns);
const teamOffensiveAllSummariesColumns = GetTeamCols(playerAllSummariesColumns);

const teamsDefensiveBasicColumns = GetTeamCols(goaliesBasicColumns);
const teamsDefensiveFreqColumns = GetTeamCols(goaliesFreqColumns);
const teamsDefensiveShootPercColumns = GetTeamCols(goaliesShootPercColumns);
const teamsDefensiveActualValsColumns = GetTeamCols(goaliesActualValsColumns);
const teamsDefensiveExpectedValsColumns = GetTeamCols(goaliesExpectedValsColumns);
const teamsDefensiveGoalDataColumns = GetTeamCols(goaliesGoalDataColumns);
const teamsDefensiveAllSummariesColumns = GetTeamCols(goaliesAllSummariesColumns);

const teamDefensiveBasicColumns = GetTeamCols(goalieBasicColumns);
const teamDefensiveFreqColumns = GetTeamCols(goalieFreqColumns);
const teamDefensiveShootPercColumns = GetTeamCols(goalieShootPercColumns);
const teamDefensiveActualValsColumns = GetTeamCols(goalieActualValsColumns);
const teamDefensiveExpectedValsColumns = GetTeamCols(goalieExpectedValsColumns);
const teamDefensiveGoalDataColumns = GetTeamCols(goalieGoalDataColumns);
const teamDefensiveAllSummariesColumns = GetTeamCols(goalieAllSummariesColumns);


// Options for columns - what is displayed at the top for filtering
const basicOptions = [
  {label: "Year", val: "year"},
  {label: "Game Type", val: "gametype"},
  {label: "Stats Type", val: "statstype"},
  {label: "Min Shots", val: "minshots"},
  {label: "Items Per Page", val: "pagenum"}
];

const basicOptionsGraph = [
  {label: "Year", val: "year"},
  {label: "Game Type", val: "gametype"},
  {label: "Min Shots", val: "minshots"},
  {label: "X Axis Metric", val: "xaxisplayers"},
  {label: "Y Axis Metric", val: "yaxisplayers"}
];

const basicOptionsGraphGoalies = [
  {label: "Year", val: "year"},
  {label: "Game Type", val: "gametype"},
  {label: "Min Shots", val: "minshots"},
  {label: "X Axis Metric", val: "xaxisgoalies"},
  {label: "Y Axis Metric", val: "yaxisgoalies"}
];

const basicPlusSituationOptions = [
  {label: "Year", val: "year"},
  {label: "Game Type", val: "gametype"},
  {label: "Situation", val: "situation"},
  {label: "Stats Type", val: "statstype"},
  {label: "Items Per Page", val: "pagenum"}
];

const basicDefaultOptions = ["year", "gametype", "statstype", "minshots", "pagenum"];
const basicDefaultOptionsGraph =["year", "gametype", "minshots", "xaxisplayers", "yaxisplayers"];
const basicDefaultOptionsGraphGoalies =["year", "gametype", "minshots", "xaxisgoalies", "yaxisgoalies"];
const basicPlusSituationDefaultOptions = ["year", "gametype", "situation", "statstype", "pagenum"];

export default {
  // Players
  playersBasicOptions: basicOptions,
  playersBasicOptionsGraph: basicOptionsGraph,
  playersBasicDefaultOptions: basicDefaultOptions,
  playersBasicDefaultOptionsGraph: basicDefaultOptionsGraph,
  playersBasicColumns: playersBasicColumns,
  playersFreqColumns: playersFreqColumns,
  playersShootPercColumns: playersShootPercColumns,
  playersActualValsColumns: playersActualValsColumns,
  playersExpectedValsColumns: playersExpectedValsColumns,
  playersGoalDataColumns: playersGoalDataColumns,
  playersAllSummariesColumns: playersAllSummariesColumns,
  // Player (individual)
  playerBasicColumns: playerBasicColumns,
  playerFreqColumns: playerFreqColumns,
  playerShootPercColumns: playerShootPercColumns,
  playerActualValsColumns: playerActualValsColumns,
  playerExpectedValsColumns: playerExpectedValsColumns,
  playerGoalDataColumns: playerGoalDataColumns,
  playerAllSummariesColumns: playerAllSummariesColumns,

  // Goalies
  goaliesBasicOptions: basicOptions,
  goaliesBasicOptionsGraph: basicOptionsGraphGoalies,
  goaliesBasicDefaultOptions: basicDefaultOptions,
  goaliesBasicDefaultOptionsGraph: basicDefaultOptionsGraphGoalies,
  goaliesBasicColumns: goaliesBasicColumns,
  goaliesFreqColumns: goaliesFreqColumns,
  goaliesShootPercColumns: goaliesShootPercColumns,
  goaliesActualValsColumns: goaliesActualValsColumns,
  goaliesExpectedValsColumns: goaliesExpectedValsColumns,
  goaliesGoalDataColumns: goaliesGoalDataColumns,
  goaliesAllSummariesColumns: goaliesAllSummariesColumns,
  // Goalie (individual)
  goalieBasicColumns: goalieBasicColumns,
  goalieFreqColumns: goalieFreqColumns,
  goalieShootPercColumns: goalieShootPercColumns,
  goalieActualValsColumns: goalieActualValsColumns,
  goalieExpectedValsColumns: goalieExpectedValsColumns,
  goalieGoalDataColumns: goalieGoalDataColumns,
  goalieAllSummariesColumns: goalieAllSummariesColumns,



  // Teams Offensive
  teamsOffensiveOptions: basicPlusSituationOptions,
  teamsOffensiveDefaultOptions: basicPlusSituationDefaultOptions,
  teamsOffensiveBasicColumns: teamsOffensiveBasicColumns,
  teamsOffensiveFreqColumns: teamsOffensiveFreqColumns,
  teamsOffensiveShootPercColumns: teamsOffensiveShootPercColumns,
  teamsOffensiveActualValsColumns: teamsOffensiveActualValsColumns,
  teamsOffensiveExpectedValsColumns: teamsOffensiveExpectedValsColumns,
  teamsOffensiveGoalDataColumns: teamsOffensiveGoalDataColumns,
  teamsOffensiveAllSummariesColumns: teamsOffensiveAllSummariesColumns,
  // Team Offensive (individual)
  teamOffensiveBasicColumns: teamOffensiveBasicColumns,
  teamOffensiveFreqColumns: teamOffensiveFreqColumns,
  teamOffensiveShootPercColumns: teamOffensiveShootPercColumns,
  teamOffensiveActualValsColumns: teamOffensiveActualValsColumns,
  teamOffensiveExpectedValsColumns: teamOffensiveExpectedValsColumns,
  teamOffensiveGoalDataColumns: teamOffensiveGoalDataColumns,
  teamOffensiveAllSummariesColumns: teamOffensiveAllSummariesColumns,



  // Teams Defensive
  teamsDefensiveOptions: basicPlusSituationOptions,
  teamsDefensiveDefaultOptions: basicPlusSituationDefaultOptions,
  teamsDefensiveBasicColumns: teamsDefensiveBasicColumns,
  teamsDefensiveFreqColumns: teamsDefensiveFreqColumns,
  teamsDefensiveShootPercColumns: teamsDefensiveShootPercColumns,
  teamsDefensiveActualValsColumns: teamsDefensiveActualValsColumns,
  teamsDefensiveExpectedValsColumns: teamsDefensiveExpectedValsColumns,
  teamsDefensiveGoalDataColumns: teamsDefensiveGoalDataColumns,
  teamsDefensiveAllSummariesColumns: teamsDefensiveAllSummariesColumns,
  // Team Defensive (individual)
  teamDefensiveBasicColumns: teamDefensiveBasicColumns,
  teamDefensiveFreqColumns: teamDefensiveFreqColumns,
  teamDefensiveShootPercColumns: teamDefensiveShootPercColumns,
  teamDefensiveActualValsColumns: teamDefensiveActualValsColumns,
  teamDefensiveExpectedValsColumns: teamDefensiveExpectedValsColumns,
  teamDefensiveGoalDataColumns: teamDefensiveGoalDataColumns,
  teamDefensiveAllSummariesColumns: teamDefensiveAllSummariesColumns,
}
