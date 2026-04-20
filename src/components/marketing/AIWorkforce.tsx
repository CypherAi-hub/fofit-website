type StaffEmployee = {
  slug: "cypher" | "casey" | "avery" | "jordan" | "riley";
  avatarInitial: string;
  name: string;
  title: string;
  titleSecondary?: string;
  employeeNo: string;
  cadence: string;
  status: "on-duty" | "active" | "onboarding";
  statusLabel: string;
  email: string;
  idTag: string;
  footerLeft: string;
  directReports?: string[];
};

const cypher: StaffEmployee = {
  slug: "cypher",
  avatarInitial: "C",
  name: "Cypher",
  title: "Chief of Staff",
  titleSecondary: "Head of AI Operations",
  employeeNo: "#CY-000",
  cadence: "Daily · 7:00 AM CT",
  status: "on-duty",
  statusLabel: "On duty",
  email: "cypher@contact.fofit.app",
  idTag: "ID · 351ef71c",
  footerLeft: "FoFit · C-Suite",
  directReports: ["Casey", "Avery", "Jordan", "Riley"],
};

const staff: StaffEmployee[] = [
  {
    slug: "casey",
    avatarInitial: "C",
    name: "Casey",
    title: "Onboarding Concierge",
    employeeNo: "#CS-001",
    cadence: "On new signup",
    status: "active",
    statusLabel: "Active",
    email: "casey@contact.fofit.app",
    idTag: "ID · cs001a24",
    footerLeft: "FoFit · AI Workforce",
  },
  {
    slug: "avery",
    avatarInitial: "A",
    name: "Avery",
    title: "Waitlist Concierge",
    employeeNo: "#AV-002",
    cadence: "On waitlist join",
    status: "active",
    statusLabel: "Active",
    email: "avery@contact.fofit.app",
    idTag: "ID · 766ac797",
    footerLeft: "FoFit · AI Workforce",
  },
  {
    slug: "jordan",
    avatarInitial: "J",
    name: "Jordan",
    title: "Retention Specialist",
    employeeNo: "#JO-003",
    cadence: "Weekly · Dormant scan",
    status: "onboarding",
    statusLabel: "Onboarding",
    email: "jordan@contact.fofit.app",
    idTag: "ID · pending",
    footerLeft: "FoFit · AI Workforce",
  },
  {
    slug: "riley",
    avatarInitial: "R",
    name: "Riley",
    title: "Content Editor",
    employeeNo: "#RI-004",
    cadence: "Weekly · Fresh drops",
    status: "onboarding",
    statusLabel: "Onboarding",
    email: "riley@contact.fofit.app",
    idTag: "ID · pending",
    footerLeft: "FoFit · AI Workforce",
  },
];

function StaffCard({ employee }: { employee: StaffEmployee }) {
  return (
    <article className={`staff-id-card staff-id-card--${employee.slug}`}>
      <div className="staff-id-card__bar" />
      <div className="staff-id-card__inner">
        <header className="staff-id-card__header">
          <div className="staff-id-card__logo">
            <div className="staff-id-card__logo-mark">F</div>
            <span className="staff-id-card__logo-text">FoFit</span>
          </div>
          <span className="staff-id-card__header-label">
            {employee.slug === "cypher" ? "Executive ID" : "Employee ID"}
          </span>
        </header>

        <div className="staff-id-card__profile">
          <div className="staff-id-card__avatar">{employee.avatarInitial}</div>
          <div className="staff-id-card__profile-info">
            <div className="staff-id-card__name">{employee.name}</div>
            {employee.titleSecondary ? (
              <div className="staff-id-card__title staff-id-card__title--dual">
                {employee.title}
                <span className="staff-id-card__title-secondary">
                  {employee.titleSecondary}
                </span>
              </div>
            ) : (
              <div className="staff-id-card__title">{employee.title}</div>
            )}
          </div>
        </div>

        <dl className="staff-id-card__details">
          <dt>Employee</dt>
          <dd>{employee.employeeNo}</dd>
          <dt>Cadence</dt>
          <dd>{employee.cadence}</dd>
          <dt>Runtime</dt>
          <dd>Supabase + OpenAI</dd>
          <dt>Status</dt>
          <dd>
            <span className={`staff-id-card__dot staff-id-card__dot--${employee.status}`} />
            {employee.statusLabel}
          </dd>
        </dl>

        <div className="staff-id-card__divider" />

        {employee.directReports ? (
          <div className="staff-id-card__reports">
            <div className="staff-id-card__reports-label">Direct reports</div>
            <div className="staff-id-card__reports-list">
              {employee.directReports.map((report) => (
                <span key={report}>{report}</span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="staff-id-card__email">
          <div className="staff-id-card__email-label">
            {employee.slug === "cypher" ? "Executive email" : "Work email"}
          </div>
          <div className="staff-id-card__email-addr">{employee.email}</div>
        </div>

        <footer className="staff-id-card__footer">
          <span className="staff-id-card__footer-left">{employee.footerLeft}</span>
          <span className="staff-id-card__footer-right">{employee.idTag}</span>
        </footer>
      </div>
    </article>
  );
}

export function AIWorkforce() {
  return (
    <section className="ai-workforce">
      <div className="ai-workforce__intro">
        <span className="eyebrow">Staff · 001 / 005</span>
        <h2 className="ai-workforce__headline">
          Five of our employees are <em>AI</em>. Here they are.
        </h2>
        <p className="ai-workforce__sub">
          FoFit runs on a small team and a working AI workforce. Each one
          sends real emails, from real addresses, every day.
        </p>
      </div>

      <div className="ai-workforce__exec">
        <StaffCard employee={cypher} />
      </div>

      <div className="ai-workforce__grid">
        {staff.map((employee) => (
          <StaffCard employee={employee} key={employee.slug} />
        ))}
      </div>

      <div className="ai-workforce__founder">
        <span>
          Built in St. Louis. <em>Trained at Maryville.</em> — Kenan
        </span>
      </div>
    </section>
  );
}
