// import compareByAlph from "../functions/helpers";
// import React from "react";
// import styled, { withTheme } from "styled-components";
// import "react-typist/dist/Typist.css";
// import { Input, Button, Icon, Select, Layout } from "antd";
// import {Link} from "react-router-dom";
//
// const StyledLink = styled(Link)`
//   color: ${props => props.theme.colors.linkColor}
// `;
//
// const fixedColWidth = 100;
// const colWidth = 100;
//
// export default {
//   last_name: {
//       title: "Last",
//       dataIndex: "last_name",
//       defaultSortOrder: "descend",
//       filterDropdown: ({
//                          setSelectedKeys,
//                          selectedKeys,
//                          confirm,
//                          clearFilters
//                        }) => (
//         <div className="custom-filter-dropdown">
//           <Input
//             ref={ele => (this.searchInput = ele)}
//             placeholder="Search name"
//             value={selectedKeys[0]}
//             onChange={e =>
//               setSelectedKeys(e.target.value ? [e.target.value] : [])
//             }
//             onPressEnter={this.handleSearch(selectedKeys, confirm)}
//           />
//           <Button
//             type="primary"
//             onClick={this.handleSearch(selectedKeys, confirm)}
//           >
//             Search
//           </Button>
//           <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
//         </div>
//       ),
//       filterIcon: filtered => (
//         <Icon
//           type="filter"
//           style={{ color: filtered ? "#f76600" : "#aaa" }}
//         />
//       ),
//       onFilter: (value, record) =>
//         record.last_name.toLowerCase().includes(value.toLowerCase()),
//       onFilterDropdownVisibleChange: visible => {
//         if (visible) {
//           setTimeout(() => {
//             this.searchInput.focus();
//           });
//         }
//       },
//       render: (text, record) => {
//         const { searchText } = this.state;
//         return searchText ? (
//           <span>
//                 {text
//                   .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, "i"))
//                   .map(
//                     (fragment, i) =>
//                       fragment.toLowerCase() === searchText.toLowerCase() ? (
//                         <StyledLink to={`/players/${record.id}`}>
//                           <span key={i} className="highlight">
//                           {fragment}
//                           </span>
//                         </StyledLink>
//                       ) : (
//                         fragment
//                       ) // eslint-disable-line
//                   )}
//               </span>
//         ) : (
//           <StyledLink to={`/players/${record.id}`}>{text}</StyledLink>
//         );
//       },
//       sorter: (a, b) => compareByAlph(a.last_name, b.last_name),
//
//       width: fixedColWidth,
//       fixed: 'left',
//   },
//   name: {
//       title: "Name",
//       dataIndex: "name",
//       defaultSortOrder: "descend",
//       filterDropdown: ({
//                          setSelectedKeys,
//                          selectedKeys,
//                          confirm,
//                          clearFilters
//                        }) => (
//         <div className="custom-filter-dropdown">
//           <Input
//             ref={ele => (this.searchInput = ele)}
//             placeholder="Search name"
//             value={selectedKeys[0]}
//             onChange={e =>
//               setSelectedKeys(e.target.value ? [e.target.value] : [])
//             }
//             onPressEnter={this.handleSearch(selectedKeys, confirm)}
//           />
//           <Button
//             type="primary"
//             onClick={this.handleSearch(selectedKeys, confirm)}
//           >
//             Search
//           </Button>
//           <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
//         </div>
//       ),
//       filterIcon: filtered => (
//         <Icon
//           type="filter"
//           style={{ color: filtered ? "#f76600" : "#aaa" }}
//         />
//       ),
//       onFilter: (value, record) =>
//         record.name.toLowerCase().includes(value.toLowerCase()),
//       onFilterDropdownVisibleChange: visible => {
//         if (visible) {
//           setTimeout(() => {
//             this.searchInput.focus();
//           });
//         }
//       },
//       render: (text, record) => {
//         const { searchText } = this.state;
//         return searchText ? (
//           <span>
//                 {text
//                   .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, "i"))
//                   .map(
//                     (fragment, i) =>
//                       fragment.toLowerCase() === searchText.toLowerCase() ? (
//                         <span key={i} className="highlight">
//                           <StyledLink to={`/teams/${record.id}`}>{fragment}</StyledLink>
//                         </span>
//                       ) : (
//                         fragment
//                       ) // eslint-disable-line
//                   )}
//               </span>
//         ) : (
//           <StyledLink to={`/teams/${record.id}`}>{text}</StyledLink>
//         );
//       },
//       sorter: (a, b) => compareByAlph(a.name, b.name),
//
//       width: fixedColWidth,
//       fixed: 'left'
//   },
//
//   // Not fixed
//   first_name: {
//       title: "First",
//       dataIndex: "first_name",
//       filterDropdown: ({
//                          setSelectedKeys,
//                          selectedKeys,
//                          confirm,
//                          clearFilters
//                        }) => (
//         <div className="custom-filter-dropdown">
//           <Input
//             ref={ele => (this.searchInput = ele)}
//             placeholder="Search name"
//             value={selectedKeys[0]}
//             onChange={e =>
//               setSelectedKeys(e.target.value ? [e.target.value] : [])
//             }
//             onPressEnter={this.handleSearch(selectedKeys, confirm)}
//           />
//           <Button
//             type="primary"
//             onClick={this.handleSearch(selectedKeys, confirm)}
//           >
//             Search
//           </Button>
//           <Button onClick={this.handleReset(clearFilters)}>Reset</Button>
//         </div>
//       ),
//       filterIcon: filtered => (
//         <Icon
//           type="filter"
//           style={{ color: filtered ? "#f76600" : "#aaa" }}
//         />
//       ),
//       onFilter: (value, record) =>
//         record.first_name.toLowerCase().includes(value.toLowerCase()),
//       onFilterDropdownVisibleChange: visible => {
//         if (visible) {
//           setTimeout(() => {
//             this.searchInput.focus();
//           });
//         }
//       },
//       render: (text, record) => {
//         const { searchText } = this.state;
//         return searchText ? (
//           <span>
//                     {text
//                       .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, "i"))
//                       .map(
//                         (fragment, i) =>
//                           fragment.toLowerCase() === searchText.toLowerCase() ? (
//                             <span key={i} className="highlight">
//                               <StyledLink to={`/players/${record.id}`}>{fragment}</StyledLink>
//                             </span>
//                           ) : (
//                             fragment
//                           ) // eslint-disable-line
//                       )}
//                   </span>
//         ) : (
//           <StyledLink to={`/players/${record.id}`}>{text}</StyledLink>
//         );
//       },
//       sorter: (a, b) => compareByAlph(a.first_name, b.first_name),
//       width: colWidth,
//       // fixed: 'left'
//   },
//   pos_code: {
//       title: "Pos",
//       dataIndex: "pos_code",
//       filters: [
//         {
//           text: "C",
//           value: "C"
//         },
//         {
//           text: "R",
//           value: "R"
//         },
//         {
//           text: "L",
//           value: "L"
//         },
//         {
//           text: "D",
//           value: "D"
//         }
//       ],
//       filterIcon: filtered => (
//         <Icon
//           type="filter"
//           style={{ color: filtered ? "#108ee9" : "#aaa" }}
//         />
//       ),
//       onFilter: (value, record) => record.pos_code.indexOf(value) === 0,
//       defaultSortOrder: "descend",
//       sorter: (a, b) => compareByAlph(a.pos_code, b.pos_code),
//       width: colWidth
//   },
//   num_shots: {
//       title: "Shots",
//       dataIndex: "num_shots",
//       defaultSortOrder: "descend",
//       sorter: (a, b) => a.num_shots - b.num_shots,
//       width: colWidth
//   },
//   num_goals: {
//       title: "Goals",
//       dataIndex: "num_goals",
//       defaultSortOrder: "descend",
//       sorter: (a, b) => a.num_goals - b.num_goals,
//       width: colWidth
//   },
//   sum_xgoals:{
//       title: "xGoals",
//       dataIndex: "sum_xgoals",
//       defaultSortOrder: "descend",
//       sorter: (a, b) => a.sum_xgoals - b.sum_xgoals,
//       width: colWidth
//   },
//
//   // SHOOTER STATS
//   avg_shoot_perc:  {
//       title: "S%",
//       dataIndex: "avg_shoot_perc",
//       defaultSortOrder: "descend",
//       sorter: (a, b) => a.avg_shoot_perc - b.avg_shoot_perc,
//       width: colWidth
//   },
//   avg_xgoals: {
//       title: "xS%",
//       dataIndex: "avg_xgoals",
//       defaultSortOrder: "descend",
//       sorter: (a, b) => a.avg_xgoals - b.avg_xgoals,
//       width: colWidth
//   },
//   goals_aa_per_shot: {
//       title: "goalsAA/s",
//       dataIndex: "goals_aa_per_shot",
//       defaultSortOrder: "descend",
//       sorter: (a, b) => a.goals_aa_per_shot - b.goals_aa_per_shot,
//       width: colWidth
//   },
//
//   // GOALIE STATS
//   save_perc:  {
//       title: "Save %",
//       dataIndex: "save_perc",
//       sorter: (a, b) => a.save_perc - b.save_perc,
//       width: colWidth
//   },
//   xsave_perc: {
//       title: "xSave %",
//       dataIndex: "xsave_perc",
//       sorter: (a, b) => a.xsave_perc - b.xsave_perc,
//       width: colWidth
//   },
//   saves_aa_per_shot: {
//       title: "SavesAA/s",
//       dataIndex: "saves_aa_per_shot",
//       sorter: (a, b) => a.saves_aa_per_shot - b.saves_aa_per_shot,
//       width: colWidth
//   },
//
//   // Distance and Angle stats
//   mean_dist: {
//       title: "Avg Dist",
//       dataIndex: "mean_dist",
//       sorter: (a, b) => a.mean_dist - b.mean_dist,
//       width: colWidth
//   },
//   mean_ang: {
//       title: "Avg Angle",
//       dataIndex: "mean_ang",
//       sorter: (a, b) => a.mean_ang - b.mean_ang,
//       width: colWidth
//   },
//
//   // All
//   shot_quality: {
//     title: "Shot Quality",
//     dataIndex: "shot_quality",
//     sorter: (a, b) => a.shot_quality - b.shot_quality,
//     // width: colWidth
//   }
// };
