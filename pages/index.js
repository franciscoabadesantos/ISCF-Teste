import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import {app} from "../firebaseConfig";
import { useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, } from 'firebase/auth'
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const auth = getAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // quando se carrega no botão o programa vai pegar nos dados e enviar para o firebase. Se receber resposta continua o programa
  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
        .then((response) => {
            router.push('graficos')
        })
        .catch(err => {
            alert('Cannot Log in')
        })
}

  return (
    <div className={styles.container}>
      <Head>
        <title>ISCF</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main> 
        <h1 className={styles.title} style = {{ marginBottom: '70px', marginTop: '0 px'}}  >
          <Link href="" id="myLink">Trabalho de ISCF </Link>
        </h1>

        <div className="login">
			    <h1 style = {{ marginLeft: '0px', marginBottom: '30px'}}>Login System: </h1>
          <div>
            <input type="email" 
              style={{fontSize: '1rem', fontWeight: 'bold'}}
              name="email" placeholder="Email do Utilizador" id="email" required  className={styles.card}
              onChange={(event) => setEmail(event.target.value)}
              value={email}
            />
            <input type="password"               
              style={{fontSize: '1rem', fontWeight: 'bold'}}
              name="password" placeholder="Password" id="password" required  className={styles.card}
              onChange={(event) => setPassword(event.target.value)}
              value={password}
            />
          </div>
          <div>
            <button style={{fontSize: '1rem', fontWeight: 'bold'}} onClick={signIn}
              className={styles.card} >Entrar</button>

            <button className={styles.card} >
              <Link href="/register" id="myLink" style={{ color: "gray", textDecorationLine: 'none'}} >REGISTAR CONTA NOVA </Link>
            </button>
          </div>
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel" className={styles.logo} />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

        
      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
