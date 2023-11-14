import BracketColumn from 'components/bracket-challenge/bracket-column/bracket-column';
import styles from './bracket-challenge.module.scss';
import { useMatchups } from 'context/matchup-context/matchup-context';
import { split } from 'utils/utils';
import Loader from 'components/shared/loader/loader';
import Button from 'components/shared/button/button';
import { updateUserBracket } from '@/lib/airtable';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ROUND_NAMES, ROUND_SUFFIXES } from '@/utils/constants';
import clsx from 'clsx';

const { DUELS } = ROUND_NAMES;

export default function BracketChallenge({ currentRound }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { matchups } = useMatchups();
  const router = useRouter();

  const {
    roundOneMatchups = [],
    quarterFinalMatchups = [],
    semiFinalMatchups = [],
    finalsMatchup = [],
    winner,
  } = matchups;

  if (!matchups.roundOneMatchups.length) {
    return <Loader isDotted />;
  }

  const [firstHalfRoundOne, secondHalfRoundOne] = split(roundOneMatchups);
  const [firstHalfQuarterFinal, secondHalfQuarterFinal] =
    split(quarterFinalMatchups);
  const [firstHalfSemiFinal, secondHalfSemiFinal] = split(semiFinalMatchups);
  const [firstHalfFinal, secondHalfFinal] = split(
    finalsMatchup.length ? finalsMatchup[0].snowboarders : []
  );

  // This can be cleaned up. Final only has one matchup, and we need to show them on different sides
  const updatedFirstHalfFinal = [
    {
      matchupId: 'R4_M1',
      snowboarders: firstHalfFinal,
    },
  ];

  const updatedSecondHalfFinal = [
    {
      matchupId: 'R4_M1',
      snowboarders: secondHalfFinal,
    },
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const matchupsAsArray = Object.entries(matchups);
    const rounds = matchupsAsArray.reduce((acc, curr) => {
      const [_, roundMatchups] = curr;
      for (let matchup of roundMatchups) {
        const suffix = ROUND_SUFFIXES[currentRound];
        const key = `${suffix}${matchup.matchupId}`;
        acc[key] = matchup.winner?.id;
      }
      return acc;
    }, {});
    await updateUserBracket({ rounds, id: router.query.bracketId });
    setIsSubmitting(false);
  };
  return (
    <div className={styles.bracketChallengeContainer}>
      <Button
        classNames={styles.submitButton}
        handleClick={() => handleSubmit()}
        isLoading={isSubmitting}
      >
        Submit
      </Button>
      {currentRound !== DUELS ? (
        <div className={styles.row}>
          <div className={styles.row}>
            <BracketColumn matchups={firstHalfRoundOne} round={1} />
            <BracketColumn matchups={firstHalfQuarterFinal} round={2} />
            <BracketColumn matchups={firstHalfSemiFinal} round={3} />
            <BracketColumn
              matchups={updatedFirstHalfFinal}
              round={4}
              isChampion={currentRound !== DUELS}
            />
          </div>
        </div>
      ) : (
        <div className={styles.row}>
          <div className={clsx(styles.row, styles.left)}>
            <BracketColumn
              matchups={firstHalfRoundOne}
              round={1}
              bracketClassNames={styles.duelsBracket}
            />
            <BracketColumn
              matchups={firstHalfQuarterFinal}
              round={2}
              bracketClassNames={styles.duelsBracket}
            />
          </div>
          <div className={styles.row}>
            <BracketColumn
              matchups={secondHalfQuarterFinal}
              round={2}
              bracketClassNames={styles.duelsBracket}
            />
            <BracketColumn
              matchups={secondHalfRoundOne}
              round={1}
              bracketClassNames={styles.duelsBracket}
            />
          </div>
        </div>
      )}
      {/* {currentRound === REVELSTOKE && winner.length ? (
          <div className={styles.winnerContainer}>
            <BracketColumn
              matchups={winner}
              round={5}
              bracketClassNames={styles.winnersBracket}
              isChampion
            />
          </div>
        ) : (
          ''
        )} */}
    </div>
  );
}
