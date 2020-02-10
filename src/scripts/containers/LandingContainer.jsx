import React from 'react';
import { Container } from 'flux/utils';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import TeamActions from '../flux/team/TeamActions';
import TeamStore from '../flux/team/TeamStore';

class LandingContainer extends React.Component {
  static getStores() {
    return [TeamStore];
  }
  static calculateState() {
    return {
      ...TeamStore.getState().toJS(),
    };
  }

  componentDidMount() {
    TeamActions.fetchAllTeams();
  }

  render() {
    const teamOpts = this.state.teams.map(team => {
      return {
        key: team.abbreviation,
        text: team.name,
      };
    });
    return (
      <>
        <Stack>
          <Dropdown placeholder='Select a team' options={teamOpts} styles={{ dropdown: { width: 300 } }} />
        </Stack>
      </>
    );
  }
}

export default Container.create(LandingContainer);
