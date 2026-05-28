import { useState, useEffect } from "react";

const CITIES = ["All", "Beijing", "Shanghai", "Shenzhen", "Guangzhou", "Hangzhou", "Chengdu"];
const STATUSES = ["Not contacted", "Mail sent", "No answer", "Rejected", "Answered", "Interview"];

const S = {
  "Not contacted": { bg: "#1a1f2e", color: "#6b7280", border: "#2d3748" },
  "Mail sent":     { bg: "#0f2447", color: "#60a5fa", border: "#1d4ed8" },
  "No answer":     { bg: "#271f00", color: "#fbbf24", border: "#b45309" },
  "Rejected":      { bg: "#2a0a0a", color: "#f87171", border: "#b91c1c" },
  "Answered":      { bg: "#042f1a", color: "#34d399", border: "#047857" },
  "Interview":     { bg: "#1e1040", color: "#c4b5fd", border: "#6d28d9" },
};

const STAT_ICON = {
  "Not contacted": "○", "Mail sent": "→", "No answer": "…",
  "Rejected": "✕", "Answered": "◎", "Interview": "★"
};

const INITIAL_DATA = [
  { id:1,  company:"Flow Asia",                    city:"Beijing",   position:"",                                          website:"flow.asia",             email:"gontran@flow.asia",            dateSent:"2026-03-12", status:"Answered",     notes:"chepa wa ze wille" },
  { id:2,  company:"Ericsson",                     city:"Beijing",   position:"Intern-Software Developer",                website:"ericsson.com",           email:"",                             dateSent:"2026-03-12", status:"Rejected",     notes:"" },
  { id:3,  company:"axiusSoftware",                city:"Beijing",   position:"",                                          website:"axiussoftware.com",      email:"sales@axiussoftware.com",      dateSent:"2026-03-16", status:"Mail sent",    notes:"" },
  { id:4,  company:"Maples Design",               city:"Beijing",   position:"",                                          website:"",                        email:"hello@maples.design",          dateSent:"2026-03-16", status:"Mail sent",    notes:"" },
  { id:5,  company:"NETK5",                        city:"Beijing",   position:"",                                          website:"netk5.com",              email:"sales@netk5.com.cn",           dateSent:"2026-03-16", status:"Rejected",     notes:"answered, no internships in mind" },
  { id:6,  company:"Beiber Studio",               city:"Beijing",   position:"",                                          website:"",                        email:"",                             dateSent:"",           status:"Not contacted",notes:"" },
  { id:7,  company:"Infocode (蓝畅信息技术)",        city:"Beijing",   position:"",                                          website:"infocodecn.com",         email:"service@infocode.com.cn",      dateSent:"2026-03-18", status:"Mail sent",    notes:"" },
  { id:8,  company:"Tianlu Digital",               city:"Beijing",   position:"",                                          website:"tianlu.tech",            email:"abel@tianlu.com",              dateSent:"2026-03-18", status:"Mail sent",    notes:"" },
  { id:9,  company:"China Gravy",                  city:"Beijing",   position:"",                                          website:"",                        email:"",                             dateSent:"",           status:"Not contacted",notes:"" },
  { id:10, company:"AppInChina",                   city:"Beijing",   position:"",                                          website:"appinchina.co",          email:"",                             dateSent:"",           status:"Not contacted",notes:"" },
  { id:11, company:"JP Morgan Chase",              city:"Shanghai",  position:"CIB Technology, Application Support",       website:"jpmorgan.com",           email:"",                             dateSent:"2026-02-22", status:"No answer",    notes:"" },
  { id:12, company:"iXp Intern",                   city:"Shanghai",  position:"Application Development Engineer",          website:"",                        email:"",                             dateSent:"2026-03-09", status:"Rejected",     notes:"" },
  { id:13, company:"iXp Intern",                   city:"Shanghai",  position:"Full Stack Intern",                         website:"",                        email:"",                             dateSent:"2026-03-07", status:"Rejected",     notes:"" },
  { id:14, company:"Siemens Industry Software",    city:"Shanghai",  position:"Student Intern",                            website:"siemens.com",            email:"",                             dateSent:"2026-03-01", status:"No answer",    notes:"" },
  { id:15, company:"ByBit",                        city:"Shanghai",  position:"Front-end Developer Intern",                website:"bybit.com",              email:"",                             dateSent:"2026-02-24", status:"No answer",    notes:"" },
  { id:16, company:"Research Interns",             city:"Shanghai",  position:"Web UI",                                    website:"",                        email:"",                             dateSent:"2026-02-26", status:"Rejected",     notes:"" },
  { id:17, company:"Negen-dimensionale Turing (九维图灵)", city:"Shanghai", position:"",                                   website:"",                        email:"",                             dateSent:"",           status:"No answer",    notes:"" },
  { id:18, company:"Tonghuashun (同花顺)",           city:"Shanghai",  position:"Front-end Intern",                         website:"10jqka.com.cn",          email:"",                             dateSent:"2026-03-10", status:"No answer",    notes:"" },
  { id:19, company:"得物 App",                      city:"Shanghai",  position:"",                                          website:"dewu.com",               email:"",                             dateSent:"",           status:"No answer",    notes:"" },
  { id:20, company:"Shanda Games",                 city:"Shanghai",  position:"Web UI",                                    website:"shandagames.com",        email:"shandahr@shanda.com",          dateSent:"2026-03-04", status:"No answer",    notes:"" },
  { id:21, company:"Amazon",                       city:"Shanghai",  position:"Web Engineer",                              website:"amazon.jobs",            email:"",                             dateSent:"2026-03-08", status:"No answer",    notes:"" },
  { id:22, company:"Amazon",                       city:"Shanghai",  position:"Software Dev Engineer Intern, OpenSearch 2026", website:"amazon.jobs",       email:"",                             dateSent:"2026-03-08", status:"No answer",    notes:"" },
  { id:23, company:"Flowith",                      city:"Shanghai",  position:"Full-stack Developer Intern",               website:"flowith.io",             email:"",                             dateSent:"2026-03-12", status:"Rejected",     notes:"" },
  { id:24, company:"Sekkei Digital Group",         city:"Shanghai",  position:"",                                          website:"sekkeidigitalgroup.com", email:"contact@sekkeidigitalgroup.com", dateSent:"2026-03-16", status:"Mail sent",  notes:"" },
  { id:25, company:"IT Consultis (ITC)",           city:"Shanghai",  position:"",                                          website:"it-consultis.com",       email:"contact@it-consultis.net",     dateSent:"2026-03-16", status:"Interview",    notes:"Dinsdag 9u | Offer rejected" },
  { id:26, company:"Lantern Digital",              city:"Shanghai",  position:"",                                          website:"lantern.digital",        email:"hello@lantern.digital",        dateSent:"2026-03-16", status:"Mail sent",    notes:"" },
  { id:27, company:"ROOM 1707©",                   city:"Shanghai",  position:"",                                          website:"room1707.com",           email:"hello@room1707.com",           dateSent:"2026-03-16", status:"Mail sent",    notes:"" },
  { id:28, company:"QPSOFTWARE",                   city:"Shanghai",  position:"",                                          website:"qpsoftware.net",         email:"contact@qpsoftware.cn",        dateSent:"2026-03-16", status:"Mail sent",    notes:"" },
  { id:29, company:"Metric Design Studio",         city:"Shanghai",  position:"",                                          website:"metricdesign.net",       email:"career@metricdesign.net",      dateSent:"2026-03-16", status:"Mail sent",    notes:"" },
  { id:30, company:"SEIRIM",                       city:"Shanghai",  position:"",                                          website:"seirim.com",             email:"info@seirim.com",              dateSent:"2026-03-16", status:"Answered",     notes:"Hong Kong based, not Shanghai" },
  { id:31, company:"Digital Creative",             city:"Shanghai",  position:"",                                          website:"digitalcreative.cn",     email:"hello@digitalcreative.asia",   dateSent:"2026-03-16", status:"Mail sent",    notes:"" },
  { id:32, company:"TMO Group",                    city:"Shanghai",  position:"",                                          website:"tmogroup.asia",          email:"info@tmogroup.asia",           dateSent:"2026-03-16", status:"Mail sent",    notes:"" },
  { id:33, company:"Labbrand",                     city:"Shanghai",  position:"",                                          website:"labbrand.com",           email:"",                             dateSent:"",           status:"Not contacted",notes:"" },
  { id:34, company:"553DR",                        city:"Shanghai",  position:"",                                          website:"553dr.com",              email:"",                             dateSent:"2026-03-16", status:"Mail sent",    notes:"" },
  { id:35, company:"Mobile Now Group",             city:"Shanghai",  position:"",                                          website:"mobilenowgroup.com",     email:"BriefUs@mobilenowgroup.com",   dateSent:"2026-03-16", status:"Mail sent",    notes:"" },
  { id:36, company:"Wiredcraft",                   city:"Shanghai",  position:"",                                          website:"wiredcraft.com",         email:"jobs@wiredcraft.com",          dateSent:"2026-03-18", status:"Mail sent",    notes:"" },
  { id:37, company:"ReignDesign",                  city:"Shanghai",  position:"",                                          website:"",                        email:"",                             dateSent:"",           status:"Not contacted",notes:"No mail or WeChat" },
  { id:38, company:"Impulz",                       city:"Shanghai",  position:"",                                          website:"impulzdigital.com",      email:"xuwen@impulzdigital.com",      dateSent:"2026-03-18", status:"Mail sent",    notes:"" },
  { id:39, company:"Next Ren Shanghai",            city:"Shanghai",  position:"",                                          website:"next-ren.com",           email:"contact@next-ren.com",         dateSent:"2026-03-18", status:"Mail sent",    notes:"" },
  { id:40, company:"Ming Labs",                    city:"Shanghai",  position:"",                                          website:"minglabs.com",           email:"hello@minglabs.com",           dateSent:"2026-03-18", status:"Mail sent",    notes:"" },
  { id:41, company:"KRDS / The WeChat Agency",     city:"Shanghai",  position:"",                                          website:"thewechatagency.com",    email:"contact@thewechatagency.com",  dateSent:"2026-03-18", status:"Rejected",     notes:"" },
  { id:42, company:"Ekohe",                        city:"Shanghai",  position:"",                                          website:"ekohe.com",              email:"",                             dateSent:"2026-03-18", status:"Mail sent",    notes:"" },
  { id:43, company:"WalktheChat",                  city:"Shanghai",  position:"",                                          website:"walkthechat.com",        email:"",                             dateSent:"",           status:"Mail sent",    notes:"via linkedin" },
  { id:44, company:"Augmentum",                    city:"Shanghai",  position:"",                                          website:"augmentum.com.cn",       email:"marketing@augmentum.com",      dateSent:"2026-03-18", status:"Mail sent",    notes:"" },
  { id:45, company:"TMO Group (follow-up)",        city:"Shanghai",  position:"",                                          website:"",                        email:"",                             dateSent:"2026-05-06", status:"Mail sent",    notes:"via linkedin" },
  { id:46, company:"Naturality Digital",           city:"Shenzhen",  position:"",                                          website:"naturality.io",          email:"only WeChat",                  dateSent:"2026-04-15", status:"Answered",     notes:"WeChat moet nog contacteren voor offer" },
  { id:47, company:"Lapis Bureau",                 city:"Shenzhen",  position:"",                                          website:"lapisbureau.com",        email:"lapisbureau@icloud.com",       dateSent:"2026-03-17", status:"Mail sent",    notes:"" },
  { id:48, company:"OctoPlus Media",               city:"Shenzhen",  position:"",                                          website:"octoplusmedia.com",      email:"",                             dateSent:"",           status:"Not contacted",notes:"" },
  { id:49, company:"Hypers",                       city:"Shenzhen",  position:"",                                          website:"",                        email:"",                             dateSent:"",           status:"Not contacted",notes:"" },
  { id:50, company:"wechatagency.com",             city:"Shenzhen",  position:"",                                          website:"wechatagency.com",       email:"",                             dateSent:"",           status:"Not contacted",notes:"" },
  { id:51, company:"DSIGN",                        city:"Shenzhen",  position:"",                                          website:"dsignhk.com",            email:"info@dsignhk.com",             dateSent:"",           status:"Not contacted",notes:"" },
  { id:52, company:"Beansmile",                    city:"Guangzhou", position:"",                                          website:"beansmile.com",          email:"hi@beansmile.com",             dateSent:"2026-03-17", status:"Mail sent",    notes:"" },
  { id:53, company:"YUSHANGWEB",                   city:"Hangzhou",  position:"",                                          website:"yushangweb.com",         email:"hello@yushangweb.com",         dateSent:"2026-03-17", status:"Mail sent",    notes:"Beautiful website" },
  { id:54, company:"Mobile Now Group (Hangzhou)",  city:"Hangzhou",  position:"",                                          website:"mobilenowgroup.com",     email:"",                             dateSent:"",           status:"Not contacted",notes:"" },
  { id:55, company:"Upside Digital",               city:"Chengdu",   position:"",                                          website:"",                        email:"",                             dateSent:"",           status:"Not contacted",notes:"" },
  { id:56, company:"ChinaNetCloud",                city:"Chengdu",   position:"",                                          website:"chinanetcloud.com",      email:"",                             dateSent:"",           status:"Not contacted",notes:"" },
];

const EMPTY_FORM = { company:"", city:"Shanghai", position:"", website:"", email:"", dateSent:"", status:"Not contacted", notes:"" };

const css = `
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#0b0f1a;color:#e2e8f0;font-family:'Inter',system-ui,sans-serif;min-height:100vh}
  ::-webkit-scrollbar{width:6px;height:6px}
  ::-webkit-scrollbar-track{background:#0b0f1a}
  ::-webkit-scrollbar-thumb{background:#1e3a5f;border-radius:3px}
  input,select,textarea{background:#0f1623;border:1px solid #1e2d45;color:#e2e8f0;border-radius:6px;padding:7px 10px;font-size:13px;outline:none;width:100%}
  input:focus,select:focus,textarea:focus{border-color:#3b82f6;box-shadow:0 0 0 2px rgba(59,130,246,.15)}
  select option{background:#0f1623}
`;

function StatusBadge({ status, onChange, size="sm" }) {
  const st = S[status] || S["Not contacted"];
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position:"relative", display:"inline-block" }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background: st.bg, color: st.color,
          border: `1px solid ${st.border}`,
          borderRadius: 5, padding: size==="sm" ? "3px 8px" : "4px 10px",
          fontSize: size==="sm" ? 11 : 12, fontWeight:500,
          cursor:"pointer", whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:5
        }}
      >
        <span style={{fontSize:9}}>{STAT_ICON[status]}</span>
        {status}
      </button>
      {open && (
        <div style={{
          position:"absolute", top:"110%", left:0, zIndex:100,
          background:"#111827", border:"1px solid #1e2d45",
          borderRadius:7, overflow:"hidden", minWidth:140,
          boxShadow:"0 8px 24px rgba(0,0,0,.5)"
        }}>
          {STATUSES.map(s => {
            const ss = S[s];
            return (
              <div key={s} onClick={() => { onChange(s); setOpen(false); }}
                style={{
                  padding:"7px 12px", cursor:"pointer", fontSize:12, fontWeight:500,
                  color: ss.color, background: s===status ? ss.bg : "transparent",
                  display:"flex", alignItems:"center", gap:6,
                  transition:"background .1s"
                }}
                onMouseEnter={e => e.currentTarget.style.background = ss.bg}
                onMouseLeave={e => e.currentTarget.style.background = s===status ? ss.bg : "transparent"}
              >
                <span style={{fontSize:9}}>{STAT_ICON[s]}</span>{s}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function CityCount({ city, data }) {
  const count = city === "All" ? data.length : data.filter(d => d.city === city).length;
  return (
    <span style={{
      background:"#1a2540", color:"#60a5fa",
      borderRadius:10, padding:"1px 7px", fontSize:10, fontWeight:600, marginLeft:5
    }}>{count}</span>
  );
}

export default function App() {
  const [data, setData] = useState(null);
  const [city, setCity] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [search, setSearch] = useState("");
  const [editNotes, setEditNotes] = useState({});
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("internship-v1");
        if (r?.value) setData(JSON.parse(r.value));
        else { setData(INITIAL_DATA); await window.storage.set("internship-v1", JSON.stringify(INITIAL_DATA)); }
      } catch { setData(INITIAL_DATA); }
    })();
  }, []);

  const save = async (next) => {
    setData(next);
    try { await window.storage.set("internship-v1", JSON.stringify(next)); } catch {}
  };

  const updateStatus = (id, status) => save(data.map(d => d.id===id ? {...d, status} : d));
  const updateNotes  = (id, notes)  => save(data.map(d => d.id===id ? {...d, notes}  : d));
  const deleteRow    = (id)          => save(data.filter(d => d.id !== id));

  const addEntry = () => {
    if (!form.company.trim()) return;
    save([...data, {...form, id: Date.now()}]);
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  if (!data) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"80vh",color:"#3b82f6",fontSize:14}}>
      Laden…
    </div>
  );

  const filtered = data
    .filter(d => city==="All" || d.city===city)
    .filter(d => filterStatus==="All" || d.status===filterStatus)
    .filter(d => !search || d.company.toLowerCase().includes(search.toLowerCase()) || d.city.toLowerCase().includes(search.toLowerCase()));

  const stats = STATUSES.reduce((a, s) => { a[s] = data.filter(d => d.status===s).length; return a; }, {});
  const grouped = CITIES.slice(1).reduce((a, c) => {
    a[c] = data.filter(d => d.city===c).length;
    return a;
  }, {});

  const colStyle = { padding:"10px 14px", textAlign:"left", borderBottom:"1px solid #131c2e", fontSize:12 };
  const hdStyle  = { ...colStyle, color:"#64748b", fontWeight:600, fontSize:11, textTransform:"uppercase", letterSpacing:".06em", background:"#0c1120", padding:"9px 14px" };

  return (
    <>
      <style>{css}</style>
      <div style={{ minHeight:"100vh", background:"#0b0f1a", padding:"0 0 40px" }}>

        {/* Header */}
        <div style={{ background:"#0d1322", borderBottom:"1px solid #1a2540", padding:"20px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:2 }}>
              <span style={{ fontSize:20 }}>🇨🇳</span>
              <h1 style={{ fontSize:20, fontWeight:700, color:"#f0f6ff", letterSpacing:"-0.02em" }}>China Internship Tracker</h1>
            </div>
            <p style={{ fontSize:12, color:"#4b6082" }}>{data.length} bedrijven bijgehouden across {CITIES.length-1} steden</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            style={{
              background:"#1d4ed8", color:"#fff", border:"none",
              borderRadius:8, padding:"9px 18px", fontSize:13, fontWeight:600,
              cursor:"pointer", display:"flex", alignItems:"center", gap:6
            }}
          >
            <span style={{fontSize:16,lineHeight:1}}>+</span> Nieuwe sending
          </button>
        </div>

        {/* Stats bar */}
        <div style={{ background:"#0d1322", borderBottom:"1px solid #131c2e", padding:"12px 28px", display:"flex", gap:6, flexWrap:"wrap" }}>
          {[["All", data.length, "#374151", "#9ca3af", "#1f2937"], ...STATUSES.map(s => [s, stats[s], S[s].border, S[s].color, S[s].bg])].map(([s, count, border, color, bg]) => (
            <button key={s} onClick={() => setFilterStatus(s)}
              style={{
                background: filterStatus===s ? bg : "transparent",
                border: `1px solid ${filterStatus===s ? border : "#1a2540"}`,
                color: filterStatus===s ? color : "#4b6082",
                borderRadius:6, padding:"4px 11px", fontSize:11, fontWeight:600,
                cursor:"pointer", display:"flex", alignItems:"center", gap:5, transition:"all .15s"
              }}
            >
              {s !== "All" && <span style={{fontSize:8}}>{STAT_ICON[s]}</span>}
              {s === "All" ? "Alles" : s}
              <span style={{ background: filterStatus===s ? "rgba(255,255,255,.12)" : "#131c2e", color: filterStatus===s ? color : "#4b6082", borderRadius:8, padding:"0px 5px", fontSize:10 }}>{count}</span>
            </button>
          ))}
        </div>

        {/* City tabs + search */}
        <div style={{ padding:"16px 28px 0", display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
          <div style={{ display:"flex", gap:2, flex:1, flexWrap:"wrap" }}>
            {CITIES.map(c => (
              <button key={c} onClick={() => setCity(c)}
                style={{
                  background: city===c ? "#1d4ed8" : "transparent",
                  color: city===c ? "#fff" : "#64748b",
                  border: `1px solid ${city===c ? "#2563eb" : "#1a2540"}`,
                  borderRadius:7, padding:"6px 14px", fontSize:12, fontWeight:600,
                  cursor:"pointer", transition:"all .15s", display:"flex", alignItems:"center"
                }}
              >
                {c==="Chengdu" ? "Chengdu/Chongqing" : c}
                {c!=="All" && (
                  <span style={{
                    marginLeft:5, background: city===c ? "rgba(255,255,255,.2)" : "#131c2e",
                    color: city===c ? "#fff" : "#3b82f6",
                    borderRadius:8, padding:"0px 5px", fontSize:10
                  }}>{grouped[c]||0}</span>
                )}
                {c==="All" && <CityCount city={c} data={data}/>}
              </button>
            ))}
          </div>
          <input
            placeholder="Zoek bedrijf…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width:180, background:"#0d1322", border:"1px solid #1a2540", borderRadius:7, padding:"7px 12px", fontSize:12, color:"#e2e8f0" }}
          />
        </div>

        {/* Table */}
        <div style={{ margin:"16px 28px 0", borderRadius:10, border:"1px solid #131c2e", overflow:"hidden" }}>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead>
                <tr style={{ background:"#0c1120" }}>
                  <th style={hdStyle}>Bedrijf</th>
                  {city==="All" && <th style={hdStyle}>Stad</th>}
                  <th style={hdStyle}>Positie</th>
                  <th style={hdStyle}>Website</th>
                  <th style={hdStyle}>E-mail</th>
                  <th style={hdStyle}>Datum</th>
                  <th style={hdStyle}>Status</th>
                  <th style={hdStyle}>Notes</th>
                  <th style={{...hdStyle, width:32}}></th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={9} style={{ padding:"32px", textAlign:"center", color:"#4b6082", fontSize:13 }}>
                      Geen resultaten gevonden
                    </td>
                  </tr>
                )}
                {filtered.map((row, i) => {
                  const isEven = i%2===0;
                  const editing = editNotes[row.id] !== undefined;
                  return (
                    <tr key={row.id}
                      style={{ background: isEven ? "#0d1322" : "#0b0f1a", transition:"background .1s" }}
                      onMouseEnter={e => e.currentTarget.style.background="#111827"}
                      onMouseLeave={e => e.currentTarget.style.background=isEven?"#0d1322":"#0b0f1a"}
                    >
                      <td style={{...colStyle, fontWeight:600, color:"#cbd5e1", maxWidth:180}}>
                        {row.company}
                      </td>
                      {city==="All" && (
                        <td style={{...colStyle, color:"#4b6082", whiteSpace:"nowrap"}}>
                          <span style={{
                            background:"#111827", border:"1px solid #1a2540",
                            borderRadius:5, padding:"2px 7px", fontSize:10, fontWeight:600, color:"#60a5fa"
                          }}>{row.city}</span>
                        </td>
                      )}
                      <td style={{...colStyle, color:"#94a3b8", maxWidth:180}}>
                        {row.position || <span style={{color:"#1e2d45"}}>—</span>}
                      </td>
                      <td style={{...colStyle, maxWidth:160}}>
                        {row.website
                          ? <a href={row.website.startsWith("http") ? row.website : "https://"+row.website}
                              target="_blank" rel="noreferrer"
                              style={{color:"#3b82f6", textDecoration:"none", fontSize:11}}
                              onMouseEnter={e=>e.currentTarget.style.textDecoration="underline"}
                              onMouseLeave={e=>e.currentTarget.style.textDecoration="none"}
                            >{row.website.replace(/https?:\/\//,"").replace(/\/$/,"")}</a>
                          : <span style={{color:"#1e2d45"}}>—</span>}
                      </td>
                      <td style={{...colStyle, color:"#94a3b8", fontSize:11, maxWidth:160}}>
                        {row.email || <span style={{color:"#1e2d45"}}>—</span>}
                      </td>
                      <td style={{...colStyle, color:"#64748b", whiteSpace:"nowrap", fontSize:11}}>
                        {row.dateSent ? row.dateSent.replace("2026-","") : <span style={{color:"#1e2d45"}}>—</span>}
                      </td>
                      <td style={{...colStyle, whiteSpace:"nowrap"}}>
                        <StatusBadge status={row.status} onChange={s => updateStatus(row.id, s)} />
                      </td>
                      <td style={{...colStyle, maxWidth:200}}>
                        {editing
                          ? <div style={{display:"flex",gap:4}}>
                              <input
                                value={editNotes[row.id]}
                                onChange={e => setEditNotes(n => ({...n, [row.id]: e.target.value}))}
                                style={{flex:1,fontSize:11,padding:"4px 7px"}}
                                onKeyDown={e => {
                                  if(e.key==="Enter"){updateNotes(row.id, editNotes[row.id]); setEditNotes(n => {const x={...n}; delete x[row.id]; return x;});}
                                  if(e.key==="Escape"){setEditNotes(n => {const x={...n}; delete x[row.id]; return x;});}
                                }}
                                autoFocus
                              />
                              <button onClick={() => { updateNotes(row.id, editNotes[row.id]); setEditNotes(n => {const x={...n}; delete x[row.id]; return x;}); }}
                                style={{background:"#1d4ed8",color:"#fff",border:"none",borderRadius:4,padding:"0 7px",cursor:"pointer",fontSize:11}}>✓</button>
                            </div>
                          : <span
                              onClick={() => setEditNotes(n => ({...n, [row.id]: row.notes || ""}))}
                              style={{ color: row.notes ? "#94a3b8" : "#1e2d45", cursor:"pointer", fontSize:11,
                                display:"block", maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}
                              title={row.notes || "Klik om note te bewerken"}
                            >{row.notes || "+"}</span>
                        }
                      </td>
                      <td style={{...colStyle, padding:"10px 8px"}}>
                        <button onClick={() => deleteRow(row.id)}
                          style={{background:"none",border:"none",color:"#2d3748",cursor:"pointer",fontSize:14,padding:"2px 4px",borderRadius:4,transition:"color .15s"}}
                          onMouseEnter={e=>e.currentTarget.style.color="#f87171"}
                          onMouseLeave={e=>e.currentTarget.style.color="#2d3748"}
                          title="Verwijder"
                        >✕</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ background:"#0c1120", borderTop:"1px solid #131c2e", padding:"8px 14px", fontSize:11, color:"#4b6082" }}>
            {filtered.length} van {data.length} bedrijven
          </div>
        </div>

        {/* Add form modal */}
        {showForm && (
          <div
            style={{ position:"fixed",inset:0,background:"rgba(0,0,0,.7)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}
            onClick={e => { if(e.target===e.currentTarget) setShowForm(false); }}
          >
            <div style={{ background:"#0d1322", border:"1px solid #1e2d45", borderRadius:12, padding:28, width:"100%", maxWidth:520, maxHeight:"90vh", overflowY:"auto" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                <h2 style={{ fontSize:16, fontWeight:700, color:"#f0f6ff" }}>Nieuwe internship sending</h2>
                <button onClick={() => setShowForm(false)}
                  style={{background:"none",border:"none",color:"#4b6082",cursor:"pointer",fontSize:18}}>✕</button>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                {[
                  ["Bedrijf *", "company", "text", null],
                  ["Stad", "city", "select", CITIES.slice(1)],
                  ["Positie", "position", "text", null],
                  ["Website", "website", "text", null],
                  ["E-mail", "email", "text", null],
                  ["Datum verzonden", "dateSent", "date", null],
                  ["Status", "status", "select", STATUSES],
                ].map(([label, key, type, opts]) => (
                  <div key={key} style={{ gridColumn: ["company","notes"].includes(key) ? "1/-1" : "auto" }}>
                    <label style={{ display:"block", fontSize:11, color:"#64748b", marginBottom:5, fontWeight:600, textTransform:"uppercase", letterSpacing:".05em" }}>{label}</label>
                    {type==="select"
                      ? <select value={form[key]} onChange={e => setForm(f => ({...f, [key]: e.target.value}))}>
                          {opts.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      : <input type={type} value={form[key]} onChange={e => setForm(f => ({...f, [key]: e.target.value}))}
                          placeholder={label.replace(" *","")} />
                    }
                  </div>
                ))}
                <div style={{ gridColumn:"1/-1" }}>
                  <label style={{ display:"block", fontSize:11, color:"#64748b", marginBottom:5, fontWeight:600, textTransform:"uppercase", letterSpacing:".05em" }}>Notes</label>
                  <textarea value={form.notes} onChange={e => setForm(f => ({...f, notes: e.target.value}))}
                    rows={2} style={{ resize:"vertical" }} placeholder="Optionele notes…" />
                </div>
              </div>
              <div style={{ display:"flex", gap:10, marginTop:20, justifyContent:"flex-end" }}>
                <button onClick={() => setShowForm(false)}
                  style={{ background:"transparent", border:"1px solid #1e2d45", color:"#64748b", borderRadius:7, padding:"8px 16px", fontSize:13, cursor:"pointer" }}>
                  Annuleren
                </button>
                <button onClick={addEntry}
                  style={{ background:"#1d4ed8", color:"#fff", border:"none", borderRadius:7, padding:"8px 20px", fontSize:13, fontWeight:600, cursor:"pointer" }}>
                  Toevoegen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
