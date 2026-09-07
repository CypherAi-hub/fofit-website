import {useEffect} from 'react';
import '../styles/one-shot.css';
const app='http://localhost:3100';
const coach='http://localhost:3200';
const features=[
 ['Today','Know your next move.','One useful mission connects training, fuel, and recovery. Your saved work makes progress visible.'],
 ['Train','Make every session yours.','Follow a plan or log your own. Review the prescription, record the work you actually do, and keep the history.'],
 ['Fuel','A routine you can live with.','Log meals, repeat favorites, and edit portions. Your daily food record stays connected to your training account.'],
 ['Cypher','Coaching with a reason.','See the records behind the guidance. Review proposed changes before applying them. AI requires a configured provider.'],
 ['Discover','Find a session that fits.','Explore strength, sports, mobility, and recovery, with exact exercise demos where available.'],
 ['Coach','Stay connected to the work.','Invite an athlete, assign a session, and review shared results. Athletes control access to their private history.'],
];
export default function OneShotApp(){
 const path=window.location.pathname;
 useEffect(()=>{if(['/login','/signup','/onboarding','/dashboard'].includes(path))window.location.replace(app+path);},[path]);
 if(['/login','/signup','/onboarding','/dashboard'].includes(path))return <main className="os-opening">Opening your FoFit account… <a href={app+path}>Continue</a></main>;
 return <div className="os-marketing">
  <header><a className="os-wordmark" href="/">FoFit<span>ONE SHOT</span></a><nav aria-label="Main"><a href="#product">The product</a><a href="#coach">For coaches</a><a href={app+'/login'}>Sign in</a></nav><a className="os-cta os-small" href={app+'/onboarding'}>Get started</a></header>
  <main id="main"><section className="os-hero"><video autoPlay muted loop playsInline poster="/hero-poster.jpg" aria-hidden="true"><source src="/hero.mp4" type="video/mp4"/></video><div className="os-hero-content"><p className="os-label">TRAIN · FUEL · RECOVER · PROGRESS</p><h1>Stop using four fitness apps.<br/><em>Use FoFit.</em></h1><p>Your plan, your training, and the life around it. Keep the pieces of your week together.</p><div className="os-actions"><a className="os-cta" href={app+'/onboarding'}>Build your routine <span aria-hidden="true">↗</span></a><a href="#product">See how it works ↓</a></div><p className="os-preview">Local build preview. App downloads and payments are unavailable here.</p></div></section>
  <section id="product" className="os-section"><p className="os-label">ONE CONNECTED WEEK</p><h2>Less guesswork.<br/>More showing up.</h2><div className="os-grid">{features.map(([label,title,body],i)=><article key={label}><span className="os-number">{String(i+1).padStart(2,'0')}</span><p className="os-label">{label}</p><h3>{title}</h3><p>{body}</p></article>)}</div></section>
  <section id="coach" className="os-section os-coach"><div><p className="os-label">FOR ATHLETES AND COACHES</p><h2>A shared plan.<br/>A personal journey.</h2><p>Keep assignments, completed sessions, and feedback in one place. Your own training stays yours, even when you work with a coach.</p><a className="os-cta" href={coach+'/login'}>Open Coach Command Room ↗</a></div><div className="os-flow" aria-label="Coach workflow">{['Create a template','Invite your athlete','Assign the session','Review completed work','Approve the next adjustment'].map((step,i)=><p key={step}><span>{i+1}</span>{step}</p>)}</div></section>
  <section className="os-section os-start"><p className="os-label">START WITH WHAT YOU HAVE</p><h2>Your next session<br/>starts here.</h2><p>The experiment keeps its free training core open. No live billing, student verification, or paid-plan promises.</p><a className="os-cta" href={app+'/signup'}>Create your FoFit account ↗</a></section></main>
  <footer><strong>FoFit</strong><p>Training that fits your life.</p><a href={app+'/dashboard/settings'}>Account & privacy</a><a href={app+'/login'}>Personal web</a><a href={coach+'/login'}>Coach web</a></footer>
 </div>;
}
