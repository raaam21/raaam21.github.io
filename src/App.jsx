import { useEffect, useRef, useState } from 'react'
import { profile, impact, experience, projects, skills, logos, achievements, education } from './data'

const ext = { target: '_blank', rel: 'noopener' }
const sections = ['about', 'github', 'impact', 'experience', 'projects', 'skills', 'education']

const Rich = ({ text }) => text.split('**').map((s, i) => (i % 2 ? <b key={i}>{s}</b> : s))

const List = ({ items, className }) => (
  <ul className={className}>{items.map(t => <li key={t}><Rich text={t} /></li>)}</ul>
)

const Socials = () => <>
  {profile.links.map(l => <a key={l.label} href={l.url} {...ext}>{l.label}</a>)}
  <a href={profile.resume} {...ext}>resume.pdf</a>
</>

const Tags = ({ tags }) => (
  <div className="tags">{tags.map(t => <span className="tag" key={t}>{t}</span>)}</div>
)

function Reveal({ id, title, children }) {
  const ref = useRef()
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setShown(true), io.disconnect()), { threshold: 0.15 })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])
  return (
    <section id={id} ref={ref} className={'reveal' + (shown ? ' in' : '')}>
      <h2>{title}</h2>
      {typeof children === 'function' ? children(shown) : children}
    </section>
  )
}

function CountUp({ n, run }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf, t0 = performance.now()
    const tick = t => {
      const p = Math.min((t - t0) / 1000, 1)
      setV(Math.round(n * p))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [n, run])
  return v
}

function Typed({ text }) {
  const [i, setI] = useState(0)
  useEffect(() => {
    if (i < text.length) {
      const t = setTimeout(() => setI(i + 1), 35)
      return () => clearTimeout(t)
    }
  }, [i, text])
  return <p>{text.slice(0, i)}<span className="cursor">&nbsp;</span></p>
}

function Terminal({ toggleTheme }) {
  const [lines, setLines] = useState([{ text: "welcome! type 'help' to see commands, or just scroll ↓" }])
  const [input, setInput] = useState('')
  const out = useRef()
  useEffect(() => { out.current.scrollTop = out.current.scrollHeight }, [lines])

  const go = id => { document.getElementById(id).scrollIntoView(); return `→ scrolled to #${id}` }
  const commands = {
    help: () => `commands: whoami, ${sections.slice(1).join(', ')}, contact, resume, theme, ls, clear`,
    whoami: () => `${profile.name}: ${experience[0].role} at ${experience[0].company} (${experience[0].dates}).`,
    ls: () => sections.map(s => s + '/').join('  '),
    contact: () => [`email: ${profile.email}`, ...profile.links.map(l => `${l.label}: ${l.url.replace('https://', '')}`)].join('\n'),
    resume: () => { window.open(profile.resume); return `opening ${profile.resume}…` },
    theme: () => `theme: ${toggleTheme()}`,
    sudo: () => 'nice try 🙂',
    ...Object.fromEntries(sections.slice(1).map(s => [s, () => go(s)])),
  }

  const submit = e => {
    e.preventDefault()
    const c = input.trim().toLowerCase()
    setInput('')
    if (!c) return
    if (c === 'clear') return setLines([])
    const reply = commands[c] ? commands[c]() : `command not found: ${c}. try 'help'`
    setLines(l => [...l, { text: '$ ' + c, cls: 'prompt' }, { text: reply }])
  }

  return (
    <div className="term" aria-label="Interactive terminal">
      <div className="term-bar"><i /><i /><i /></div>
      <div className="out" ref={out} aria-live="polite">
        {lines.map((l, i) => <div key={i} className={l.cls}>{l.text}</div>)}
      </div>
      <form onSubmit={submit}>
        <label className="prompt" htmlFor="cmd">guest@bramharishi:~$</label>
        <input id="cmd" value={input} onChange={e => setInput(e.target.value)} autoComplete="off" spellCheck="false" placeholder="type 'help'" />
      </form>
    </div>
  )
}

function Contributions({ users }) {
  const [days, setDays] = useState()
  useEffect(() => {
    Promise.all(users.map(u =>
      fetch(`https://github-contributions-api.jogruber.de/v4/${u}?y=last`).then(r => (r.ok ? r.json() : Promise.reject()))
    )).then(all => {
      const sum = {}
      all.forEach(d => d.contributions.forEach(c => { sum[c.date] = (sum[c.date] || 0) + c.count }))
      setDays(Object.entries(sum).sort().map(([date, count]) => ({ date, count })))
    }, () => setDays(null))
  }, [users])
  const total = days?.reduce((n, d) => n + d.count, 0)
  const max = days ? Math.max(1, ...days.map(d => d.count)) : 1
  return (
    <div className="card">
      <div className="row">
        <span>{users.map(u => <a key={u} href={'https://github.com/' + u} {...ext} style={{ marginRight: 12 }}>@{u} ↗</a>)}</span>
        <span className="dim">{days ? `${total} contributions in the last year` : days === null ? "couldn't load" : 'loading…'}</span>
      </div>
      {days?.length > 0 && <>
        <div className="graph">
          {Array.from({ length: new Date(days[0].date).getUTCDay() }, (_, i) => <i key={'p' + i} className="pad" />)}
          {days.map(d => <i key={d.date} className={'l' + Math.ceil((4 * d.count) / max)} title={`${d.count} on ${d.date}`} />)}
        </div>
        <div className="legend dim">less {[0, 1, 2, 3, 4].map(l => <i key={l} className={'l' + l} />)} more</div>
      </>}
    </div>
  )
}

function useTheme() {
  const [theme, setTheme] = useState(() => { try { return localStorage.theme || 'dark' } catch { return 'dark' } })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.theme = theme } catch {}
  }, [theme])
  const toggle = () => { const next = theme === 'light' ? 'dark' : 'light'; setTheme(next); return next }
  return toggle
}

function useActive() {
  const [active, setActive] = useState(() => location.hash.slice(1) || 'about')
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    sections.forEach(s => io.observe(document.getElementById(s)))
    return () => io.disconnect()
  }, [])
  useEffect(() => { history.replaceState(null, '', '#' + active) }, [active])
  return active
}

export default function App() {
  const toggleTheme = useTheme()
  const active = useActive()
  return (
    <>
      <nav>
        {sections.map(s => <a key={s} href={'#' + s} className={s === active ? 'active' : undefined} aria-current={s === active || undefined}>{s}</a>)}
        <a href={profile.resume} {...ext}>resume ↗</a>
        <button onClick={toggleTheme} aria-label="Toggle light or dark theme">theme</button>
      </nav>

      <main>
        <section id="about" style={{ paddingTop: 48 }}>
          <p className="dim">$ whoami</p>
          <h1>{profile.name}</h1>
          <Typed text={profile.tagline} />
          <p className="dim">{profile.about}</p>
          <div className="links">
            <a href={'mailto:' + profile.email}>email</a>
            <Socials />
          </div>
          <Terminal toggleTheme={toggleTheme} />
        </section>

        <Reveal id="github" title="github">
          <Contributions users={profile.github} />
        </Reveal>

        <Reveal id="impact" title="impact">
          {shown => (
            <div className="stats">
              {impact.map(s => (
                <div className="stat" key={s.label}>
                  <b>{s.before}<CountUp n={s.n} run={shown} />{s.after}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </Reveal>

        <Reveal id="experience" title="experience">
          {experience.map((job, i) => (
            <details key={job.company} open={i === 0}>
              <summary>
                <span className="row"><h3>{job.role} · {job.company}</h3><span className="dim">{job.dates}</span></span>
              </summary>
              <List items={job.points} />
              <Tags tags={job.tags} />
              {job.link && <p><a href={job.link.url} {...ext}>{job.link.label} ↗</a></p>}
            </details>
          ))}
        </Reveal>

        <Reveal id="projects" title="projects">
          {projects.map(p => (
            <div className="card" key={p.name}>
              <div className="row"><h3>{p.name}</h3>{p.url && <a href={p.url} {...ext}>github ↗</a>}</div>
              <p className="dim tight">{p.summary}</p>
              <List items={p.points} />
              <Tags tags={p.tags} />
            </div>
          ))}
        </Reveal>

        <Reveal id="skills" title="skills">
          <dl className="skills">
            {skills.map(s => [
              <dt key={s.group}>{s.group}</dt>,
              <dd key={s.group + '-d'} className="skill-list">
                {s.items.map(i => (
                  <span key={i}>
                    {logos[i] && <img src={'https://cdn.simpleicons.org/' + logos[i]} alt="" width="16" height="16" loading="lazy" />}
                    {i}
                  </span>
                ))}
              </dd>,
            ])}
          </dl>
          <div className="card">
            <List items={achievements} className="flush" />
          </div>
        </Reveal>

        <Reveal id="education" title="education">
          {education.map(e => (
            <div className="card" key={e.degree}>
              <div className="row"><h3>{e.degree}</h3><span className="dim">{e.dates}</span></div>
              <p className="tight">{e.school} · <b>{e.score}</b></p>
              <p className="dim tight">{e.coursework}</p>
            </div>
          ))}
        </Reveal>

        <footer className="dim footer">
          <p>$ echo "thanks for visiting" · <a href={'mailto:' + profile.email}>say hi</a></p>
          <div className="links">
            <Socials />
            <a href="#about">back to top ↑</a>
          </div>
        </footer>
      </main>
    </>
  )
}
