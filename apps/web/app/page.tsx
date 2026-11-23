
'use client';

import { useMemo, useState } from 'react';

const roles = [
  'Patient',
  'Receptionist',
  'Doctor',
  'Nurse',
  'Laboratory Technician',
  'Billing Officer',
  'Hospital Administrator'
];

const modules = [
  ['Patients', 'Registration, demographic details and patient lookup', '/patients'],
  ['Appointments', 'Provider schedules, booking and cancellations', '/appointments'],
  ['Encounters', 'Clinical visit lifecycle and diagnoses', '/encounters'],
  ['Prescriptions', 'Clinician-entered medication orders', '/clinical'],
  ['Laboratory', 'Orders, results and turnaround workflow', '/laboratory'],
  ['Billing', 'Invoices and payment status (synthetic only)', '/billing'],
  ['Consent & Audit', 'Consent decisions and access history', '/governance'],
  ['FHIR Exchange', 'Sandbox interoperability for synthetic resources', '/integrations']
];

type DashboardStat = {
  label: string;
  value: string;
  helper: string;
};

type DashboardConfig = {
  heading: string;
  welcome: string;
  description: string;
  stats: DashboardStat[];
  sectionTitle: string;
  focusTitle: string;
  focusItems: string[];
  availableModules: string[];
};

const dashboardByRole: Record<string, DashboardConfig> = {
  'Patient': {
    heading: 'My Health Dashboard',
    welcome: 'Welcome to your patient portal',
    description: 'View your appointments and explore your patient information in this educational demo.',
    stats: [
      { label: 'My appointments', value: '2', helper: 'Illustrative upcoming visits' },
      { label: 'Completed visits', value: '5', helper: 'Sample records' },
      { label: 'Pending actions', value: '1', helper: 'Demo reminder' }
    ],
    sectionTitle: 'My healthcare services',
    focusTitle: 'Patient activities',
    focusItems: [
      'View patient information',
      'Check appointment schedules',
      'Review consent information'
    ],
    availableModules: ['Patients', 'Appointments', 'Consent & Audit']
  },

  'Receptionist': {
    heading: 'Reception Dashboard',
    welcome: 'Welcome to the front desk',
    description: 'Manage patient registration and coordinate hospital appointments.',
    stats: [
      { label: 'Registered patients', value: '128', helper: 'Synthetic demo records' },
      { label: 'Appointments today', value: '24', helper: 'Sample schedule' },
      { label: 'New registrations', value: '8', helper: 'Illustrative daily count' }
    ],
    sectionTitle: 'Reception workspace',
    focusTitle: 'Front desk tasks',
    focusItems: [
      'Register new patients',
      'Search existing patient records',
      'Schedule and manage appointments'
    ],
    availableModules: ['Patients', 'Appointments']
  },

  'Doctor': {
    heading: 'Doctor Dashboard',
    welcome: 'Welcome to your clinical workspace',
    description: 'Review patient information, manage clinical encounters and access prescription workflows.',
    stats: [
      { label: 'My patients', value: '32', helper: 'Illustrative assigned patients' },
      { label: "Today's appointments", value: '8', helper: 'Sample schedule' },
      { label: 'Pending encounters', value: '4', helper: 'Demo workflow' },
      { label: 'Lab results', value: '6', helper: 'Illustrative pending reviews' }
    ],
    sectionTitle: 'Clinical workspace',
    focusTitle: 'Clinical activities',
    focusItems: [
      'Review patient information',
      'Manage clinical encounters',
      'Record diagnoses',
      'Create clinician-entered prescription orders',
      'Review laboratory results'
    ],
    availableModules: ['Patients', 'Appointments', 'Encounters', 'Prescriptions', 'Laboratory']
  },

  'Nurse': {
    heading: 'Nursing Dashboard',
    welcome: 'Welcome to the patient care workspace',
    description: 'Coordinate patient care activities, appointments and laboratory workflows.',
    stats: [
      { label: 'Assigned patients', value: '18', helper: 'Illustrative assignments' },
      { label: 'Care tasks', value: '12', helper: 'Sample task count' },
      { label: 'Pending lab orders', value: '9', helper: 'Demo workflow' }
    ],
    sectionTitle: 'Patient care workspace',
    focusTitle: 'Nursing activities',
    focusItems: [
      'Review assigned patient information',
      'Coordinate patient appointments',
      'Update care workflow information',
      'Coordinate laboratory orders and results'
    ],
    availableModules: ['Patients', 'Appointments', 'Encounters', 'Laboratory']
  },

  'Laboratory Technician': {
    heading: 'Laboratory Dashboard',
    welcome: 'Welcome to the laboratory workspace',
    description: 'Coordinate laboratory orders, record sample progress and manage result workflows.',
    stats: [
      { label: 'New lab orders', value: '9', helper: 'Sample incoming orders' },
      { label: 'Samples processing', value: '6', helper: 'Illustrative workload' },
      { label: 'Results pending', value: '3', helper: 'Demo workflow' }
    ],
    sectionTitle: 'Laboratory workspace',
    focusTitle: 'Laboratory activities',
    focusItems: [
      'Review incoming laboratory orders',
      'Track sample processing',
      'Record laboratory results',
      'Update order status'
    ],
    availableModules: ['Laboratory']
  },

  'Billing Officer': {
    heading: 'Billing Dashboard',
    welcome: 'Welcome to the billing workspace',
    description: 'Review synthetic invoices and payment statuses in the educational platform.',
    stats: [
      { label: 'Total invoices', value: '42', helper: 'Illustrative records' },
      { label: 'Outstanding amount', value: '₹42,500', helper: 'Synthetic billing only' },
      { label: 'Pending payments', value: '12', helper: 'Sample records' }
    ],
    sectionTitle: 'Finance workspace',
    focusTitle: 'Billing activities',
    focusItems: [
      'Review generated invoices',
      'Check outstanding balances',
      'Track payment statuses',
      'Review billing records'
    ],
    availableModules: ['Billing']
  },

  'Hospital Administrator': {
    heading: 'Hospital Administration Dashboard',
    welcome: 'Welcome to the hospital operations workspace',
    description: 'Monitor hospital workflows, patient administration and operational activities.',
    stats: [
      { label: 'Registered patients', value: '128', helper: 'Synthetic demo records' },
      { label: 'Appointments today', value: '24', helper: 'Sample schedule' },
      { label: 'Pending lab orders', value: '9', helper: 'Demo workflow' },
      { label: 'Outstanding invoices', value: '₹42,500', helper: 'Synthetic billing' }
    ],
    sectionTitle: 'All hospital modules',
    focusTitle: 'Hospital operations',
    focusItems: [
      'Monitor hospital operations',
      'Review patient administration',
      'Coordinate clinical workflows',
      'Monitor billing and laboratory activities',
      'Review consent and audit information',
      'Manage interoperability sandbox workflows'
    ],
    availableModules: modules.map(m => m[0])
  }
};

export default function Home() {
  const [role, setRole] = useState('Hospital Administrator');
  const [query, setQuery] = useState('');

  const dashboard = dashboardByRole[role];

  const filtered = useMemo(() => {
    return modules.filter(m =>
      dashboard.availableModules.includes(m[0]) &&
      m.join(' ').toLowerCase().includes(query.toLowerCase())
    );
  }, [role, query, dashboard]);

  return (
    <main className="shell">
      <header className="top">
        <div>
          <div className="brand">✚ MediCore</div>
          <div className="muted">
            Hospital, Appointment & Patient Care Management
          </div>
        </div>
        <span className="tag">SYNTHETIC DATA · DEMO</span>
      </header>

      <section className="card">
        <div className="muted">{dashboard.welcome}</div>

        <h1 style={{ fontSize: 30, margin: '8px 0' }}>
          {dashboard.heading}
        </h1>

        <p className="muted">{dashboard.description}</p>

        <label htmlFor="role">Preview experience as</label>

        <select
          id="role"
          className="field"
          value={role}
          onChange={e => {
            setRole(e.target.value);
            setQuery('');
          }}
        >
          {roles.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <span className="tag">{role} workspace preview</span>
      </section>

      <h2 className="section">Overview</h2>

      <div className="grid" style={{ marginTop: 18 }}>
        {dashboard.stats.map(stat => (
          <div className="card" key={stat.label}>
            <div className="muted">{stat.label}</div>
            <div className="stat">{stat.value}</div>
            <div className="muted">{stat.helper}</div>
          </div>
        ))}
      </div>

      <h2 className="section">{dashboard.focusTitle}</h2>

      <div className="card">
        {dashboard.focusItems.map(item => (
          <p key={item}>✓ {item}</p>
        ))}
      </div>

      <h2 className="section">{dashboard.sectionTitle}</h2>

      <input
        className="field"
        placeholder="Search available modules..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <div className="grid">
        {filtered.map(m => (
          <a
            className="card"
            href={m[2]}
            key={m[0]}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <span className="tag">MODULE</span>
            <h3>{m[0]}</h3>
            <p className="muted">{m[1]}</p>
            <span style={{ color: '#1456a0', fontWeight: 700 }}>
              Open module →
            </span>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="muted">No modules found.</p>
      )}

      <h2 className="section">Operational safeguards</h2>

      <div className="grid">
        <div className="card">
          <b>Access control</b>
          <p className="muted">
            Backend role and record authorization must protect all restricted APIs.
          </p>
        </div>

        <div className="card">
          <b>Auditability</b>
          <p className="muted">
            Sensitive actions should produce audit records with actor and request context.
          </p>
        </div>

        <div className="card">
          <b>Responsible use</b>
          <p className="muted">
            No real patient information, clinical decision support, real prescriptions or real payments.
          </p>
        </div>
      </div>

      <p className="muted" style={{ marginTop: 30, fontSize: 12 }}>
        MediCore educational assessment build · All dashboard figures are illustrative demo data.
        The role selector is a UI preview, not an authentication or security control.
      </p>
    </main>
  );
}
