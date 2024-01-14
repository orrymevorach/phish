import styles from './league-settings.module.scss';
import LeaguePageLayout from '../league/league-page-layout/league-page-layout';
import { useLeagueConfig } from '@/context/league-config-context/league-config-context';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faEdit,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../shared/button/button';
import EditLeagueNameTakeover from './edit-league-name-takeover/edit-league-name-takeover';
import { getLeagueMembers } from '@/lib/airtable';
import InviteMemberTakeover from './invite-member-takeover/invite-member-takeover';
import Link from 'next/link';
import { ROUTES } from '@/utils/constants';

export default function LeagueSettings() {
  // const [isLoading, setIsLoading] = useState(false);
  const { name, id } = useLeagueConfig({ getMembers: true });

  const [showEditLeagueNameTakeover, setShowEditLeagueNameTakeover] =
    useState(false);
  const [showInviteMemberTakeover, setShowInviteMemberTakeover] =
    useState(false);

  const [members, setMembers] = useState([]);
  useEffect(() => {
    const getMembersData = async () => {
      const membersData = await getLeagueMembers({ id });
      setMembers(membersData || []);
    };
    if (id && !members.length) {
      getMembersData();
    }
  }, [id, members]);

  return (
    <LeaguePageLayout title="League Settings:">
      <div>
        {showEditLeagueNameTakeover && (
          <EditLeagueNameTakeover
            setShowTakeover={setShowEditLeagueNameTakeover}
            classNames={styles.editLeagueNameTakeover}
            leagueId={id}
          />
        )}
        {showInviteMemberTakeover && (
          <InviteMemberTakeover
            setShowTakeover={setShowInviteMemberTakeover}
            classNames={styles.editLeagueNameTakeover}
            leagueId={id}
          />
        )}
        <Link href={`${ROUTES.LEAGUE}/${id}`} className={styles.backButton}>
          <FontAwesomeIcon icon={faChevronLeft} color="white" />
          <FontAwesomeIcon icon={faChevronLeft} color="white" />
          <p className={styles.backText}>Back to League Page</p>
        </Link>
        <div className={styles.container}>
          <p className={styles.title}>
            League Name: <span className={styles.leagueName}>{name}</span>
          </p>
          <Button
            isSmall
            handleClick={() => setShowEditLeagueNameTakeover(true)}
            classNames={styles.button}
          >
            <FontAwesomeIcon icon={faEdit} color="white" size="sm" />
          </Button>
        </div>
        <div className={styles.container}>
          <p className={styles.title}>League Members</p>
          <Button
            isSmall
            classNames={styles.button}
            handleClick={() => setShowInviteMemberTakeover(true)}
          >
            <p className={styles.addMemberText}>Invite Member</p>
            <FontAwesomeIcon icon={faPlus} size="lg" />
          </Button>
        </div>
        {members.map(({ name }, index) => (
          <p key={name}>
            {index + 1}. {name}
          </p>
        ))}
      </div>
    </LeaguePageLayout>
  );
}
