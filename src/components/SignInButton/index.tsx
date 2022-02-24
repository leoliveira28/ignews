import { FaGithub} from 'react-icons/fa';
import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss';
import { signIn, useSession, signOut } from 'next-auth/react';

export function SignInButton() {
    const { data: session } = useSession()
    
    
    return session ? (
        <button type="button"
        className={styles.signInButton}
        onClick={() => signOut()}>
            <FaGithub color='#04d361' />
            {session.user.name}
            <img src={session.user.image} width='30px' height='30px'/>
            <FiX color='#737380' className={styles.closeIcon} />
        </button>
       
    ) : (
        <button type="button"
        className={styles.signInButton}
        onClick={() => signIn('github')}>
            <FaGithub color='#eba417' />
            Sign in with Github
        </button>
    )
}