import { getLeagueMembers, joinLeague } from '@/lib/airtable';
import Loader from 'components/shared/loader/loader';
import { useUser } from 'context/user-context/user-context';
import { useState } from 'react';
import styles from './join-league-takeover.module.scss';
import Takeover from '@/components/shared/takeover/takeover';
import Input from '@/components/shared/input/input';
import Button from '@/components/shared/button/button';
import { ROUTES } from '@/utils/constants';

export default function JoinLeagueTakeover({ setShowTakeover }) {
  const [leagueId, setLeagueId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const user = useUser();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    const existingMembers = await getLeagueMembers({ id: leagueId });
    const existingMemberIds = existingMembers.map(({ id }) => id);
    const memberRecordIds = [...existingMemberIds, user.id];

    const response = await joinLeague({
      id: leagueId,
      memberRecordIds,
    });
    setIsLoading(false);
    window.location = ROUTES.DASHBOARD;
  };

  return (
    <Takeover
      handleClose={() => setShowTakeover(false)}
      modalClassNames={styles.container}
    >
      {isLoading ? (
        <Loader color="black" />
      ) : (
        <form
          action="#"
          onSubmit={e => handleSubmit(e)}
          className={styles.form}
        >
          <p className={styles.label}>League ID</p>
          <Input
            type="text"
            id="leagueId"
            value={leagueId}
            handleChange={e => setLeagueId(e.target.value)}
            classNames={styles.input}
          />
          <Button classNames={styles.button}>Join League</Button>
        </form>
      )}
    </Takeover>
  );
}