from pathlib import Path
import json,hashlib,argparse,shutil
parser=argparse.ArgumentParser(description='Patch the recovered September 6 production design without replacing it with the older source checkout.')
parser.add_argument('--base',required=True,help='Recovered Vercel output directory with static/ and config.json')
parser.add_argument('--output',required=True,help='Destination Vercel output directory')
args=parser.parse_args()
base=Path(args.base).resolve();destination=Path(args.output).resolve()
if base==destination:raise SystemExit('Use a separate output directory to preserve the baseline.')
shutil.copytree(base,destination,dirs_exist_ok=True)
root=destination/'static'
# Retire synthetic UI videos from the deployed output; originals remain in the baseline.
for retired in ['product-devices.mp4','cypher-loop.mp4']:
 (root/retired).unlink(missing_ok=True)
p=root/'assets/index-wXrNSfYp.js';s=p.read_text()
changes={
'Media System':'Life with FoFit',
'A fitness product earns trust by feeling human first.':'Built for the work. And the life around it.',
'Real app screenshots stay the proof. Warmer original media shows the people, meals, recovery, and coach conversations around the product.':'A training plan, a meal you enjoy, a moment to recover. Keep the pieces of your week together.',
'Movement gives the system a pulse.':'Make room for your next session.',
'Video carries pace, effort, and the real reason the product exists.':'Start with a plan that fits your goals and the time you have.',
'The product still has to be the proof.':'Know what to do next.',
'The app-device film keeps the actual FoFit surfaces in motion.':'See your training, nutrition, and coaching together inside FoFit.',
'Real app UI':'Inside the app',
'The product belongs around real training lives.':'Build a routine you can come back to, week after week.',
'Trust needs a visible process.':'Your feedback helps shape FoFit.',
'Product notes, tester feedback, and training context stay close to the build.':'Tell us what helped, what felt confusing, and what you need next.',
'What people actually need a fitness app to handle.':'Your week, with less guesswork.',
'The pattern is clear: make the plan personal, reduce logging friction, show progress, support food choices, and keep motivation social.':'Plan your sessions, log your meals, and see your progress in one place.',
'A system people can picture using before Friday.':'From Monday’s plan to Friday’s progress.',
'The promise gets stronger when the site shows the actual loop: training, recovery, food, Cypher, and community passing context forward through an ordinary week.':'Life changes during the week. Keep your training, fuel, and recovery connected as you go.',
'Real-row standard':'Your progress, your pace',
'Production community code keeps real rows first; demo seed content only fills empty development previews.':'Share what feels useful, ask a question, or keep the focus on your own training.',
'Featured community proof':'Find your people',
'Real product surfaces, not a single poster pretending to do everything.':'Support for the days between milestones.',
'The community story now leans on sharp screenshots first, with real FoFit imagery supporting the atmosphere instead of faking the interface.':'Explore the community preview and see how conversations can fit alongside your training.',
'Food logging, targets, body metrics, and Cypher nutrition insights keep fuel attached to the work you are actually doing. The current seed catalog is shown as a library preview, not a finished promise.':'Keep meals, targets, and nutrition insights connected to your training. Browse a preview of the food library below.',
'The nutrition system has a current seed catalog, country filters, staple food search, photo logging, repeat meals, and grocery flow. The point is to help people find food they will actually eat.':'Find meals you want to eat. Explore recipes by cuisine, search everyday foods, and review photo estimates before logging.',
'The current loggable seed catalog ships locally with athlete-portion macros.':'Browse recipes with ingredients, instructions, and portion-based macros.',
'Coming Spring 2026':'Explore FoFit Teams',
'The website keeps showing Train, Nutrition, Cypher, and Community surfaces instead of hiding behind vague AI language.':'Explore the app before you join, with previews of training, nutrition, and Cypher.',
'Agents help ship the system, people shape it.':'Built with feedback from people like you.',
'FoFit uses AI in the build process and in the product, but the standard is still real training usefulness.':'Every useful suggestion starts with the same question: does this make your next session clearer?',
'Founding access is not just a form. It routes people into the right beta path, keeps device reality clear, and turns useful feedback into product work.':'Tell us your device and how you train. We’ll send early-access details when a place opens for you.'
}
for old,new in changes.items():
 if old not in s: raise SystemExit('Missing copy: '+old)
 s=s.replace(old,new)
# Remove collection UI entirely; existing waitlist data stays untouched.
start=s.index('function Ij(');end=s.index('const ty=',start);s=s[:start]+'function Ij(){return null}'+s[end:]
old='p=R.useCallback(b=>{u((b==null?void 0:b.initialRole)??null),s(!0)},[])'
assert old in s
s=s.replace(old,'p=R.useCallback(()=>window.location.assign("/beta"),[])')
for old,new in {
'Join founding 250':'Get FoFit',
'Join Founding 250':'Get FoFit',
'Join as a member':'Get FoFit',
'Join as an athlete':'Get FoFit',
'Join as a coach':'Explore coach access',
'Join as a student':'Get FoFit',
'Get Early Access':'Get FoFit',
'Join the waitlist':'Get FoFit',
'Join waitlist':'Get FoFit',
'Early access has a real path.':'Your next step starts here.',
'Tell us your device and how you train. We’ll send early-access details when a place opens for you.':'FoFit is preparing for its iPhone release. Explore the app and check the release page for availability.',
'Choose your path so FoFit can route you as a member, athlete, student, coach, or team contact.':'See how training, nutrition, and Cypher fit into your week.',
'Get routed by device and role':'Check iPhone availability',
'iPhone testers move through TestFlight when seats are open. Android testers stay on the launch waitlist.':'The iPhone release is in preparation. Android availability has not been announced.',
'Join founding 250 and help shape the app becoming your plan, your coach, your food system, and your training community.':'Your training, nutrition, and coaching belong together. Explore FoFit while we prepare the iPhone release.',
'Get early access to the system.':'Meet your next fitness app.',
'After you join':'Getting started',
'See iOS beta':'Check iPhone release',
'iOS Beta':'Get FoFit'
}.items():s=s.replace(old,new)
start=s.index('function Z0(');end=s.index('const e_=',start)
s=s[:start]+'''function Z0(){return o.jsxs("section",{className:"release-page",children:[o.jsx("span",{className:"lp-kicker",children:"FOFIT FOR IPHONE"}),o.jsx("h1",{children:"Your training. Your fuel. One app."}),o.jsx("p",{className:"release-lede",children:"The iPhone release is coming soon. We’re finishing the app before opening downloads."}),o.jsx("p",{children:"You can set up your FoFit account on the web now. Sign in with the same account in the iPhone app when it’s available."}),o.jsxs("div",{className:"release-actions",children:[o.jsx("a",{href:"https://app.fofit.app/onboarding",className:"button button--primary button--lg",children:"Set up your FoFit account"}),o.jsx("a",{href:"/support",className:"button button--ghost",children:"Get support"})]}),o.jsx("p",{className:"release-note",children:"iPhone first. Android availability has not been announced."})]})}'''+s[end:]


for old,new in {
"Founding 250 updates":"Release updates",
"The mobile app is in closed beta. The waitlist is open today, and founding members get access first as TestFlight invites go out.":"The iPhone release is in preparation. Check the Get FoFit page for download availability.",
"Public launch is targeted for summer 2026. Waitlist signups are notified the moment a TestFlight seat opens, well before the wider release.":"The launch date has not been announced. Download details will appear on the Get FoFit page when the app is available.",
"Trial details will be finalized before public launch. Join the beta list to get early access and pricing updates first.":"Trial details will be finalized before public launch. Check the release page for availability.",
"Founding 250, beta, pricing, and students.":"Release information, pricing, and students.",
"FoFit keeps early access, waitlist claims, and account history together so the next invite wave has context.":"Use your FoFit account to keep your training history connected.",
"Sign in to manage your account, keep your waitlist claim attached, and be ready when TestFlight seats open.":"Sign in to manage your existing FoFit account.",
"FoFit is showing the actual training, Cypher, nutrition, and community surfaces instead of hiding behind a generic waitlist.":"Explore training, Cypher, nutrition, and community previews before the iPhone release.",
"FoFit can keep TestFlight access, waitlist claims, and future web account controls connected to this session.":"Your FoFit account keeps your profile and training history connected."
}.items(): s=s.replace(old,new)
# Student verification is currently disabled in the native feature flags.
s=s.replace('name:"Student",price:"$7.99/mo",audience:"Verified students building consistency around a real schedule.",features:["Full FoFit system","Student pricing","Community access"]','name:"Student",price:"Planned",audience:"Student verification is not available yet. Check release information for eligibility and pricing when it opens.",features:["Verification pending","Availability to be announced"]')
s=s.replace('Founding rates are locked while your subscription stays active. Maryville founding access is available for early campus testers.','Explore FoFit’s plans below. The app shows current purchase terms before you subscribe.')
s=s.replace('$6.99/mo is available for early campus testers during the Maryville rollout.','Campus offers and eligibility will be confirmed before activation.')
# September 6 product refresh: actual app captures replace synthetic UI film.
old='type:"video",src:"/product-devices.mp4",poster:"/product-devices-poster.jpg"'
assert old in s
s=s.replace(old,'type:"image",image:A.app.simTrain')
features=[
 ('Outdoor','Take your training outside.','Explore places to move, plan a route, record a session, and come back to your history.'),
 ('Quick Hits','Make the small sessions count.','Create recurring movement commitments and keep your quick sessions together.'),
 ('Body Lab','See your progress over time.','Keep private photo check-ins and compare your own photos side by side.'),
 ('Film Lab','Give your training a second look.','Upload a skill clip or session for a private film review and focused next steps.'),
 ('Guided recovery','Make room to recover.','Follow yoga and mobility sequences, with timed steps and clear cues.'),
 ('Start on the web','Set up once. Pick up on your phone.','Choose your goals, schedule, and equipment online, then use the same FoFit account in the app.'),
]
feature_js='function FoFitCurrentFeatures(){return o.jsxs("section",{className:"current-features",id:"more-in-fofit",children:[o.jsx("span",{className:"lp-kicker",children:"MORE OF YOUR WEEK, TOGETHER"}),o.jsx("h2",{children:"Beyond your next workout."}),o.jsx("p",{children:"The gym is one part of it. FoFit also makes room for outdoor sessions, small daily commitments, private progress, and recovery."}),o.jsx("div",{className:"current-features__grid",children:'+json.dumps(features)+'.map(([name,title,body],index)=>o.jsxs("article",{children:[o.jsx("span",{className:"current-features__number",children:String(index+1).padStart(2,"0")}),o.jsx("p",{className:"lp-kicker",children:name}),o.jsx("h3",{children:title}),o.jsx("p",{children:body})]},name))}),o.jsx("a",{href:"https://app.fofit.app/onboarding",className:"button button--primary",children:"Set up your FoFit account"})]})}'
s=s.replace('function e0(){',feature_js+'function e0(){',1)
needle='className:"container future-live-media__inner",children:['
assert needle in s
s=s.replace(needle,needle+'o.jsx(FoFitCurrentFeatures,{}),',1)
name='index-'+hashlib.sha256(s.encode()).hexdigest()[:10]+'.js';(root/'assets'/name).write_text(s)
index=root/'index.html';html=(base/'static/index.html').read_text().replace('index-wXrNSfYp.js',name)
html=html.replace('</head>','<link rel="stylesheet" href="/website-fixes.css" /></head>');index.write_text(html)
(root/'website-fixes.css').write_text('''.release-page{max-width:1000px;margin:auto;min-height:70vh;padding:clamp(5rem,10vw,9rem) 1.5rem 5rem;}.release-page h1{font-size:clamp(2.6rem,6vw,5.4rem);line-height:1.05;letter-spacing:-.04em;max-width:850px;}.release-page p{max-width:620px;line-height:1.7;}.release-lede{font-size:1.3rem;}.release-actions{display:flex;flex-wrap:wrap;gap:1rem;margin:2rem 0;}.release-note{opacity:.7;font-size:.9rem;}
.release-actions .button{padding:.85rem 1.2rem;}
@media(max-width:1100px){.site-nav{display:none!important;}.nav-toggle{display:inline-flex!important;}}
:focus-visible {outline:2px solid #72b85b;outline-offset:4px;}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto!important;}*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important;}}
''')
config_path=destination/'config.json'
config=json.loads(config_path.read_text())
redirects=[{'src':'/'+route,'status':307,'headers':{'Location':'https://app.fofit.app/'+route}} for route in ['onboarding','login','signup']]
config['routes']=redirects+config.get('routes',[])
config_path.write_text(json.dumps(config,indent=2))
with (root/'website-fixes.css').open('a') as css:
 css.write("\n.current-features{grid-column:1/-1;padding:1rem 0 5rem}.current-features>p{max-width:700px;line-height:1.7}.current-features h2{font-size:clamp(2rem,4vw,3.5rem);line-height:1.1}.current-features__grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem;margin:2.5rem 0}.current-features__grid article{position:relative;padding:1.5rem;border:1px solid rgba(114,184,91,.25);border-radius:20px;background:rgba(114,184,91,.035)}.current-features__grid h3{font-size:1.35rem;line-height:1.2}.current-features__grid p{line-height:1.6}.current-features__number{display:block;color:#72b85b;font:13px monospace;margin-bottom:1.5rem}.future-live-card__media:has(img[src*=sim-train]){background:#090d13}.future-live-card__media img[src*=sim-train]{object-fit:contain;padding:1rem}@media(max-width:850px){.current-features__grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:560px){.current-features__grid{grid-template-columns:1fr}}\n")
(destination/'marketing-fix-manifest.json').write_text(json.dumps({'bundle':name,'copyChanges':changes,'fixes':['waitlist and beta request forms removed','release status page','responsive navigation','visitor copy cleanup']},indent=2))
print('Patched',len(changes),'copy strings; new asset',name)
