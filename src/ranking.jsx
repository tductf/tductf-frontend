import React from 'react';
import Api from './api'

export class Ranking extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			teams: []
		};
	}
	componentWillMount() {
		// Tap tap API server
		Api.teamlist((json) => {
			json = json.sort((current, next) => {
				if (current.points < next.points)
					return 1;
				if (current.points > next.points)
					return -1;
				if (new Date(current.last_score_time) > new Date(next.last_score_time))
					return 1;
				return -1;
			})
			this.setState({
				teams: json,
				updated: Date()
			});
		}, (err, res) => {
			// TODO: error notification
		})
	}
	render() {
		var teamlist = this.state.teams.map((team, index) => {
			return (
							<tr className={this.props.query.teamid == team.id ? 'active' : ''} key={team.id}>
								<td>{index + 1}</td>
								<td>{team.name}</td>
								<td>{team.points}</td>
							</tr>
				   );
		});
		return (
				<div className="ui container">
					<div>Last updated: <span>{this.state.updated}</span></div>
					<table className="ui striped very compact table">
						<thead>
							<tr>
								<th className="two wide">Rank</th>
								<th className="twelve wide">Team</th>
								<th className="two wide">Points</th>
							</tr>
						</thead>
						<tbody>
							{teamlist}
						</tbody>
					</table>
					<div className="ui divider">
					</div>
				</div>
			   );
	}
};
