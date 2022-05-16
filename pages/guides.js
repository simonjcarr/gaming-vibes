import styles from '../styles/Guides.module.css'
import { useEffect, useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../stores/authContext';

export default function Guides() {
  const [guides, setGuides] = useState(null)
  const [error, setError] = useState(null)

  const { user, authReady } = useContext(AuthContext)
  useEffect(() => {
    if(authReady) {
      fetch('.netlify/functions/guides', user && {
        headers: {
          Authorization: `Bearer ${user.token.access_token}`
        }
      })
      .then(res => {
        if(!res.ok) {
          throw new Error("You must be logged to view this page")
        }
        setError(null)
        return res.json()
      })
      .then(data => setGuides(data))
      .catch(err => {
        setError(err.message)
        setGuides(null)
      })
    }
  },[user, authReady])
  
  return (
    <div className={styles.guides}>
      <h2>All Guides</h2>
      {!authReady && <div>Loading...</div>}
      {error && (
        <div className={styles.error}>
          <p>{ error }</p>
        </div>
      )}
      {guides && guides.map(guide => (
        <div key={guide.title} className={styles.card}>
          <h3>{guide.title}</h3>
          <h4>Written by {guide.author}</h4>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim totam recusandae voluptates odit ad, dolore odio adipisci cum harum earum consequatur soluta ipsam veniam assumenda? Voluptatibus debitis labore atque deleniti.</p>
        </div>
      ))}
    </div> 
  )
}