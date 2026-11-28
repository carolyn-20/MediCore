"use client";

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';

const roles = ['Patient','Receptionist','Doctor','Nurse','Laboratory Technician','Billing Officer','Hospital Administrator'];
const modules = [
  ['Patients','Registration, demographic details and patient lookup','/patients'],
  ['Appointments','Provider schedules, booking and cancellations','/appointments'],
  ['Encounters','Clinical visit lifecycle and diagnoses','/encounters'],
  ['Prescriptions','Clinician-entered medication orders','/clinical'],
  ['Laboratory','Orders, results and turnaround workflow','/laboratory'],
  ['Billing','Invoices and payment status (synthetic only)','/billing'],
  ['Consent & Audit','Consent decisions and access history','/governance'],
  ['FHIR Exchange','Sandbox interoperability for synthetic resources','/integrations']
];
type Stat={label:string;value:string;helper:string};
type Dashboard={heading:string;welcome:string;description:string;stats:Stat[];sectionTitle:string;focusTitle:string;focusItems:string[];availableModules:string[]};
const all=modules.map(m=>m[0]);
const config:Record<string,Dashboard>={
'Patient':{heading:'My Health Dashboard',welcome:'Welcome to your patient portal',description:'View appointments and explore patient information in this educational demo.',stats:[{label:'My appointments',value:'2',helper:'Illustrative visits'},{label:'Completed visits',value:'5',helper:'Sample records'},{label:'Pending actions',value:'1',helper:'Demo reminder'}],sectionTitle:'My healthcare services',focusTitle:'Patient activities',focusItems:['View patient information','Check appointment schedules','Review consent information'],availableModules:['Patients','Appointments','Consent & Audit']},
'Receptionist':{heading:'Reception Dashboard',welcome:'Welcome to the front desk',description:'Manage patient registration and coordinate hospital appointments.',stats:[{label:'Registered patients',value:'128',helper:'Synthetic records'},{label:'Appointments today',value:'24',helper:'Sample schedule'},{label:'New registrations',value:'8',helper:'Illustrative count'}],sectionTitle:'Reception workspace',focusTitle:'Front desk tasks',focusItems:['Register new patients','Search patient records','Schedule appointments'],availableModules:['Patients','Appointments']},
'Doctor':{heading:'Doctor Dashboard',welcome:'Welcome to your clinical workspace',description:'Review synthetic patient information and explore clinical workflows.',stats:[{label:'My patients',value:'32',helper:'Illustrative'},{label:'Today appointments',value:'8',helper:'Sample schedule'},{label:'Pending encounters',value:'4',helper:'Demo workflow'},{label:'Lab results',value:'6',helper:'Sample reviews'}],sectionTitle:'Clinical workspace',focusTitle:'Clinical activities',focusItems:['Review patients','Manage encounters','Record diagnoses','Explore prescription workflows','Review laboratory results'],availableModules:['Patients','Appointments','Encounters','Prescriptions','Laboratory']},
'Nurse':{heading:'Nursing Dashboard',welcome:'Welcome to patient care',description:'Coordinate patient care, appointments and laboratory workflows.',stats:[{label:'Assigned patients',value:'18',helper:'Illustrative'},{label:'Care tasks',value:'12',helper:'Sample'},{label:'Pending lab orders',value:'9',helper:'Demo'}],sectionTitle:'Patient care workspace',focusTitle:'Nursing activities',focusItems:['Review patient information','Coordinate appointments','Update care workflow','Coordinate labs'],availableModules:['Patients','Appointments','Encounters','Laboratory']},
'Laboratory Technician':{heading:'Laboratory Dashboard',welcome:'Welcome to the laboratory workspace',description:'Coordinate laboratory orders, sample progress and results.',stats:[{label:'New lab orders',value:'9',helper:'Sample'},{label:'Samples processing',value:'6',helper:'Illustrative'},{label:'Results pending',value:'3',helper:'Demo'}],sectionTitle:'Laboratory workspace',focusTitle:'Lab activities',focusItems:['Review orders','Track samples','Record results','Update status'],availableModules:['Laboratory']},
'Billing Officer':{heading:'Billing Dashboard',welcome:'Welcome to billing',description:'Review synthetic invoices and payment statuses.',stats:[{label:'Invoices',value:'42',helper:'Illustrative'},{label:'Outstanding amount',value:'₹42,500',helper:'Synthetic'},{label:'Pending payments',value:'12',helper:'Sample'}],sectionTitle:'Finance workspace',focusTitle:'Billing activities',focusItems:['Review invoices','Check balances','Track statuses'],availableModules:['Billing']},
'Hospital Administrator':{heading:'Hospital Administration Dashboard',welcome:'Welcome to hospital operations',description:'Monitor hospital workflows and operational activities.',stats:[{label:'Registered patients',value:'128',helper:'Synthetic'},{label:'Appointments today',value:'24',helper:'Sample schedule'},{label:'Pending lab orders',value:'9',helper:'Demo'},{label:'Outstanding invoices',value:'₹42,500',helper:'Synthetic billing'}],sectionTitle:'All hospital modules',focusTitle:'Hospital operations',focusItems:['Monitor operations','Review patient administration','Coordinate clinical workflows','Monitor billing and laboratory','Review consent and audit','Manage sandbox workflows'],availableModules:all}
};
export default function Home(){
 const [role,setRole]=useState('Hospital Administrator');
 const [query,setQuery]=useState('');
 const [session,setSession]=useState<{email:string;role:string;displayName:string}|null>(null);
 useEffect(()=>{try{const raw=localStorage.getItem('medicore-demo-session');if(raw){const s=JSON.parse(raw);setSession(s);if(roles.includes(s.role))setRole(s.role);}}catch{}},[]);
 const dashboard=config[role];
 const filtered=useMemo(()=>modules.filter(m=>dashboard.availableModules.includes(m[0])&&m.join(' ').toLowerCase().includes(query.toLowerCase())),[role,query,dashboard]);
 function signOut(){localStorage.removeItem('medicore-demo-session');setSession(null);window.location.href='/login';}
 if(!session) return <main className="login-shell"><section className="login-card"><div className="login-brand"><span className="brand-mark">✚</span><div><strong>MediCore</strong><small>Hospital operations demo</small></div></div><h1>Sign in to continue</h1><p className="muted">Enter the free demo without a database.</p><Link className="button login-button" href="/login">Sign in →</Link></section></main>;
 return <main className="shell">
 <header className="top"><div><div className="brand">✚ MediCore</div><div className="muted">Hospital, Appointment & Patient Care Management</div></div><div className="top-actions"><span className="tag">SYNTHETIC DATA · DEMO</span><button className="button button-light" onClick={signOut}>Sign out</button></div></header>
 <section className="card"><div className="muted">{dashboard.welcome}</div><h1 style={{fontSize:30,margin:'8px 0'}}>{dashboard.heading}</h1><p className="muted">{dashboard.description}</p><div className="identity">Signed in as <strong>{session.displayName}</strong> <span>({session.email})</span></div><label htmlFor="role">Preview experience as</label><select id="role" className="field" value={role} onChange={e=>{setRole(e.target.value);setQuery('')}}>{roles.map(r=><option key={r}>{r}</option>)}</select><span className="tag">{role} workspace preview</span></section>
 <h2 className="section">Overview</h2><div className="grid" style={{marginTop:18}}>{dashboard.stats.map(s=><div className="card" key={s.label}><div className="muted">{s.label}</div><div className="stat">{s.value}</div><div className="muted">{s.helper}</div></div>)}</div>
 <h2 className="section">{dashboard.focusTitle}</h2><div className="card">{dashboard.focusItems.map(x=><p key={x}>✓ {x}</p>)}</div>
 <h2 className="section">{dashboard.sectionTitle}</h2><input className="field" placeholder="Search available modules..." value={query} onChange={e=>setQuery(e.target.value)}/><div className="grid">{filtered.map(m=><Link className="card module-card" href={m[2]} key={m[0]}><span className="tag">MODULE</span><h3>{m[0]}</h3><p className="muted">{m[1]}</p><span className="module-link">Open module →</span></Link>)}</div>{filtered.length===0&&<p className="muted">No modules found.</p>}
 <h2 className="section">Operational safeguards</h2><div className="grid"><div className="card"><b>Access control</b><p className="muted">Backend authorization must protect restricted APIs.</p></div><div className="card"><b>Auditability</b><p className="muted">Sensitive actions should produce audit records.</p></div><div className="card"><b>Responsible use</b><p className="muted">No real patient records, clinical decisions, real prescriptions or payments.</p></div></div><p className="muted footer-note">Educational assessment build · Demo figures are illustrative. Role selector is only a UI preview.</p>
 </main>;
}
