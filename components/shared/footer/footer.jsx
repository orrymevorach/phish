import styles from './footer.module.scss';
import clsx from 'clsx';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.column}>
        <p className={styles.text}>Natural Selection Bracket Challenge</p>
      </div>
      <div className={styles.column}>
        <p className={styles.text}>Built by Orry Mevorach and Corey Jacobs</p>
        <p className={clsx(styles.contactUs, styles.text)}>Contact Us 🤙</p>
      </div>
    </footer>
  );
}
