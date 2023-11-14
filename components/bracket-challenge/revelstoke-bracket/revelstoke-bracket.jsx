import BracketChallenge from '../bracket-challenge';
import { useSnowboarders } from '@/context/snowboarders-context/snowboarders-context';
import { MatchupDataProvider } from '@/context/matchup-context/matchup-context';
import { ROUND_NAMES } from '@/utils/constants';

export default function RevelstokeBracket() {
  const snowboarders = useSnowboarders();
  return (
    <MatchupDataProvider snowboarders={snowboarders.revelstoke}>
      <BracketChallenge currentRound={ROUND_NAMES.REVELSTOKE} />
    </MatchupDataProvider>
  );
}