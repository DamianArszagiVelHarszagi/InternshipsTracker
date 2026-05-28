import { useState, useEffect } from "react";

const CITIES = ["All", "Beijing", "Shanghai", "Shenzhen", "Guangzhou", "Hangzhou", "Chengdu"];
const STATUSES = ["Not contacted", "Mail sent", "No answer", "Rejected", "Answered", "Interview"];

const S = {
  "Not contacted": { bg: "#eef1eb", color: "#66746c", border: "#9aa79c" },
  "Mail sent":     { bg: "#e6f0ef", color: "#2c7a7b", border: "#2f6f63" },
  "No answer":     { bg: "#fff4d7", color: "#8a5d12", border: "#d5a23b" },
  "Rejected":      { bg: "#fdeceb", color: "#a8463f", border: "#dfa29d" },
  "Answered":      { bg: "#e6f4ea", color: "#2f6f43", border: "#85b98c" },
  "Interview":     { bg: "#eeeaf6", color: "#6f579d", border: "#b9acd8" },
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
  { id:21, company:"Amazon",                       city:"Shanghai",  position:"Web Engineer",                             website:"amazon.jobs",            email:"",                             dateSent:"2026-03-08", status:"No answer",    notes:"" },
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
  { id:38, company:"Impulz",                      city:"Shanghai",  position:"",                                          website:"impulzdigital.com",      email:"xuwen@impulzdigital.com",      dateSent:"2026-03-18", status:"Mail sent",    notes:"" },
  { id:39, company:"Next Ren Shanghai",            city:"Shanghai",  position:"",                                          website:"next-ren.com",           email:"contact@next-ren.com",         dateSent:"2026-03-18", status:"Mail sent",    notes:"" },
  { id:40, company:"Ming Labs",                    city:"Shanghai",  position:"",                                          website:"minglabs.com",           email:"hello@minglabs.com",           dateSent:"2026-03-18", status:"Mail sent",    notes:"" },
  { id:41, company:"KRDS / The WeChat Agency",     city:"Shanghai",  position:"",                                          website:"thewechatagency.com",    email:"contact@thewechatagency.com",  dateSent:"2026-03-18", status:"Rejected",     notes:"" },
  { id:42, company:"Ekohe",                        city:"Shanghai",  position:"",                                          website:"ekohe.com",              email:"",                             dateSent:"2026-03-18", status:"Mail sent",    notes:"" },
  { id:43, company:"WalktheChat",                  city:"Shanghai",  position:"",                                          website:"walkthechat.com",        email:"",                             dateSent:"",           status:"Mail sent",    notes:"via linkedin" },
  { id:44, company:"Augmentum",                   city:"Shanghai",  position:"",                                          website:"augmentum.com.cn",       email:"marketing@augmentum.com",      dateSent:"2026-03-18", status:"Mail sent",    notes:"" },
  { id:45, company:"TMO Group (follow-up)",        city:"Shanghai",  position:"",                                          website:"",                        email:"",                             dateSent:"2026-05-06", status:"Mail sent",    notes:"via linkedin" },
  { id:46, company:"Naturality Digital",           city:"Shenzhen",  position:"",                                          website:"naturality.io",          email:"only WeChat",                  dateSent:"2026-04-15", status:"Answered",     notes:"WeChat moet nog contacteren voor offer" },
  { id:47, company:"Lapis Bureau",                 city:"Shenzhen",  position:"",                                          website:"lapisbureau.com",        email:"lapisbureau@icloud.com",       dateSent:"2026-03-17", status:"Mail sent",    notes:"" },
  { id:48, company:"OctoPlus Media",               city:"Shenzhen",  position:"",                                          website:"octoplusmedia.com",      email:"",                             dateSent:"",           status:"Not contacted",notes:"" },
  { id:49, company:"Hypers",                       city:"Shenzhen",  position:"",                                          website:"",                        email:"",                             dateSent:"",           status:"Not contacted",notes:"" },
  { id:50, company:"wechatagency.com",             city:"Shenzhen",  position:"",                                          website:"wechatagency.com",       email:"",                             dateSent:"",           status:"Not contacted",notes:"" },
  { id:51, company:"DSIGN",                        city:"Shenzhen",  position:"",                                          website:"dsignhk.com",            email:"info@dsignhk.com",             dateSent:"",           status:"Not contacted",notes:"" },
  { id:52, company:"Beansmile",                    city:"Guangzhou", position:"",                                          website:"beansmile.com",          email:"hi@beansmile.com",             dateSent:"2026-03-17", status:"Mail sent",    notes:"" },
  { id:53, company:"YUSHANGWEB",                  city:"Hangzhou", position:"",                                          website:"yushangweb.com",         email:"hello@yushangweb.com",         dateSent:"2026-03-17", status:"Mail sent",    notes:"Beautiful website" },
  { id:54, company:"Mobile Now Group (Hangzhou)",  city:"Hangzhou", position:"",                                          website:"mobilenowgroup.com",     email:"",                             dateSent:"",           status:"Not contacted",notes:"" },
  { id:55, company:"Upside Digital",               city:"Chengdu",   position:"",                                          website:"",                        email:"",                             dateSent:"",           status:"Not contacted",notes:"" },
  { id:56, company:"ChinaNetCloud",                city:"Chengdu",   position:"",                                          website:"chinanetcloud.com",      email:"",                             dateSent:"",           status:"Not contacted",notes:"" },
];

const EMPTY_FORM = { company:"", city:"Shanghai", position:"", website:"", email:"", dateSent:"", status:"Not contacted", notes:"" };
const EMPTY_NOTE = { title:"", body:"" };
const STORAGE_KEY = "internship-v1";
const NOTES_STORAGE_KEY = "internship-notes-v1";

const getStorage = async () => {
  if (window.storage?.get) return window.storage.get(STORAGE_KEY);
  return { value: localStorage.getItem(STORAGE_KEY) };
};

const setStorage = async (value) => {
  if (window.storage?.set) return window.storage.set(STORAGE_KEY, value);
  localStorage.setItem(STORAGE_KEY, value);
};

const getNotesStorage = async () => {
  if (window.storage?.get) return window.storage.get(NOTES_STORAGE_KEY);
  return { value: localStorage.getItem(NOTES_STORAGE_KEY) };
};

const setNotesStorage = async (value) => {
  if (window.storage?.set) return window.storage.set(NOTES_STORAGE_KEY, value);
  localStorage.setItem(NOTES_STORAGE_KEY, value);
};

const css = `
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#eef3ee;color:#23312b;font-family:'Inter',system-ui,sans-serif;min-height:100vh}
  ::-webkit-scrollbar{width:6px;height:6px}
  ::-webkit-scrollbar-track{background:#eef3ee}
  ::-webkit-scrollbar-thumb{background:#8aa89a;border-radius:3px}
  input,select,textarea{background:#ffffff;border:1px solid #c5d2c3;color:#23312b;border-radius:6px;padding:7px 10px;font-size:13px;outline:none;width:100%}
  input:focus,select:focus,textarea:focus{border-color:#2f6f63;box-shadow:0 0 0 2px rgba(47,111,99,.18)}
  select option{background:#ffffff}
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
          background:"#f4f8f4", border:"1px solid #c5d2c3",
          borderRadius:7, overflow:"hidden", minWidth:140,
          boxShadow:"0 8px 24px rgba(56,64,58,.18)"
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
      background:"#cbd9cc", color:"#2c7a7b",
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
  const [view, setView] = useState("tracking");
  const [notes, setNotes] = useState(null);
  const [showNoteForm, setShowNoteForm] = useState(false);
  const [noteEditId, setNoteEditId] = useState(null);
  const [noteForm, setNoteForm] = useState(EMPTY_NOTE);
  const [noteSearch, setNoteSearch] = useState("");

  const resetNoteForm = () => {
    setNoteForm(EMPTY_NOTE);
    setNoteEditId(null);
  };

  useEffect(() => {
    (async () => {
      try {
        const r = await getStorage();
        if (r?.value) setData(JSON.parse(r.value));
        else { setData(INITIAL_DATA); await setStorage(JSON.stringify(INITIAL_DATA)); }

        const rn = await getNotesStorage();
        if (rn?.value) setNotes(JSON.parse(rn.value));
        else { setNotes([]); await setNotesStorage(JSON.stringify([])); }
      } catch {
        setData(INITIAL_DATA);
        setNotes([]);
      }
    })();
  }, []);

  const save = async (next) => {
    setData(next);
    try { await setStorage(JSON.stringify(next)); } catch {}
  };

  const saveNotes = async (next) => {
    setNotes(next);
    try { await setNotesStorage(JSON.stringify(next)); } catch {}
  };

  const updateStatus = (id, status) => save(data.map(d => d.id===id ? {...d, status} : d));
  const updateNotes  = (id, notes)  => save(data.map(d => d.id===id ? {...d, notes}  : d));
  const deleteRow    = (id)          => save(data.filter(d => d.id !== id));
  const deleteNote   = (id)          => saveNotes(notes.filter(n => n.id !== id));

  const addEntry = () => {
    if (!form.company.trim()) return;
    save([...data, {...form, id: Date.now()}]);
    setForm(EMPTY_FORM);
    setShowForm(false);
  };

  const addNote = () => {
    if (!noteForm.title.trim()) return;

    if (noteEditId) {
      saveNotes(notes.map(n => n.id === noteEditId ? { ...n, title: noteForm.title, body: noteForm.body } : n));
    } else {
      saveNotes([...notes, { ...noteForm, id: Date.now(), createdAt: new Date().toISOString() }]);
    }

    resetNoteForm();
    setShowNoteForm(false);
  };

  const editNote = (note) => {
    setNoteForm({ title: note.title, body: note.body });
    setNoteEditId(note.id);
    setShowNoteForm(true);
  };

  const closeNoteForm = () => {
    setShowNoteForm(false);
    resetNoteForm();
  };

  if (!data || notes === null) return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"80vh",color:"#2f6f63",fontSize:14}}>
      Laden…
    </div>
  );

  const filtered = data
    .filter(d => city==="All" || d.city===city)
    .filter(d => filterStatus==="All" || d.status===filterStatus)
    .filter(d => !search || d.company.toLowerCase().includes(search.toLowerCase()) || d.city.toLowerCase().includes(search.toLowerCase()));

  const filteredNotes = notes
    .filter(n => !noteSearch || n.title.toLowerCase().includes(noteSearch.toLowerCase()) || n.body.toLowerCase().includes(noteSearch.toLowerCase()));

  const stats = STATUSES.reduce((a, s) => { a[s] = data.filter(d => d.status===s).length; return a; }, {});
  const grouped = CITIES.slice(1).reduce((a, c) => {
    a[c] = data.filter(d => d.city===c).length;
    return a;
  }, {});

  const colStyle = { padding:"10px 14px", textAlign:"left", borderBottom:"1px solid #d8e2d6", fontSize:12 };
  const hdStyle  = { ...colStyle, color:"#65746b", fontWeight:600, fontSize:11, textTransform:"uppercase", letterSpacing:".06em", background:"#edf4ef", padding:"9px 14px" };

  return (
    <>
      <style>{css}</style>
      <div style={{ minHeight:"100vh", background:"#eef3ee", padding:"0 0 40px" }}>

        {/* Header */}
        <div style={{ background:"#fbfbf6", borderBottom:"1px solid #cbd9cc", padding:"20px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:2 }}>
              <span style={{ fontSize:20 }}>🇨🇳</span>
              <h1 style={{ fontSize:20, fontWeight:700, color:"#1f2d27", letterSpacing:"-0.02em" }}>China Internship Tracker</h1>
            </div>
            <p style={{ fontSize:12, color:"#7b8a80" }}>{data.length} bedrijven bijgehouden across {CITIES.length-1} steden</p>
          </div>
          <button
            onClick={() => view === "tracking" ? setShowForm(true) : (resetNoteForm(), setShowNoteForm(true))}
            style={{
              background:"#2f6f63", color:"#fff", border:"none",
              borderRadius:8, padding:"9px 18px", fontSize:13, fontWeight:600,
              cursor:"pointer", display:"flex", alignItems:"center", gap:6
            }}
          >
            <span style={{fontSize:16,lineHeight:1}}>+</span> {view === "tracking" ? "Nieuwe sending" : "Nieuwe note"}
          </button>
        </div>

        <div style={{ background:"#fbfbf6", borderBottom:"1px solid #d8e2d6", padding:"12px 28px", display:"flex", gap:8, flexWrap:"wrap" }}>
          {[["tracking", "Tracking"], ["notes", "Notes"]].map(([key, label]) => (
            <button key={key} onClick={() => setView(key)}
              style={{
                background: view === key ? "#2f6f63" : "transparent",
                color: view === key ? "#fff" : "#66746c",
                border: `1px solid ${view === key ? "#3f8f7f" : "#cbd9cc"}`,
                borderRadius:7, padding:"8px 16px", fontSize:12, fontWeight:600,
                cursor:"pointer", transition:"all .15s"
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {view === "tracking" ? (
          <>
            {/* Stats bar */}
        <div style={{ background:"#fbfbf6", borderBottom:"1px solid #d8e2d6", padding:"12px 28px", display:"flex", gap:6, flexWrap:"wrap" }}>
          {[["All", data.length, "#aeb8ad", "#66746c", "#e7eee8"], ...STATUSES.map(s => [s, stats[s], S[s].border, S[s].color, S[s].bg])].map(([s, count, border, color, bg]) => (
            <button key={s} onClick={() => setFilterStatus(s)}
              style={{
                background: filterStatus===s ? bg : "transparent",
                border: `1px solid ${filterStatus===s ? border : "#cbd9cc"}`,
                color: filterStatus===s ? color : "#7b8a80",
                borderRadius:6, padding:"4px 11px", fontSize:11, fontWeight:600,
                cursor:"pointer", display:"flex", alignItems:"center", gap:5, transition:"all .15s"
              }}
            >
              {s !== "All" && <span style={{fontSize:8}}>{STAT_ICON[s]}</span>}
              {s === "All" ? "Alles" : s}
              <span style={{ background: filterStatus===s ? "rgba(47,111,99,.14)" : "#d8e2d6", color: filterStatus===s ? color : "#7b8a80", borderRadius:8, padding:"0px 5px", fontSize:10 }}>{count}</span>
            </button>
          ))}
        </div>

        {/* City tabs + search */}
        <div style={{ padding:"16px 28px 0", display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
          <div style={{ display:"flex", gap:2, flex:1, flexWrap:"wrap" }}>
            {CITIES.map(c => (
              <button key={c} onClick={() => setCity(c)}
                style={{
                  background: city===c ? "#2f6f63" : "transparent",
                  color: city===c ? "#fff" : "#65746b",
                  border: `1px solid ${city===c ? "#3f8f7f" : "#cbd9cc"}`,
                  borderRadius:7, padding:"6px 14px", fontSize:12, fontWeight:600,
                  cursor:"pointer", transition:"all .15s", display:"flex", alignItems:"center"
                }}
              >
                {c==="Chengdu" ? "Chengdu/Chongqing" : c}
                {c!=="All" && (
                  <span style={{
                    marginLeft:5, background: city===c ? "rgba(47,111,99,.18)" : "#d8e2d6",
                    color: city===c ? "#fff" : "#2f6f63",
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
            style={{ width:180, background:"#fbfbf6", border:"1px solid #cbd9cc", borderRadius:7, padding:"7px 12px", fontSize:12, color:"#23312b" }}
          />
        </div>

        {/* Table */}
        <div style={{ margin:"16px 28px 0", borderRadius:10, border:"1px solid #d8e2d6", overflow:"hidden" }}>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
              <thead>
                <tr style={{ background:"#edf4ef" }}>
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
                    <td colSpan={9} style={{ padding:"32px", textAlign:"center", color:"#7b8a80", fontSize:13 }}>
                      Geen resultaten gevonden
                    </td>
                  </tr>
                )}
                {filtered.map((row, i) => {
                  const isEven = i%2===0;
                  const editing = editNotes[row.id] !== undefined;
                  return (
                    <tr key={row.id}
                      style={{ background: isEven ? "#fbfbf6" : "#eef3ee", transition:"background .1s" }}
                      onMouseEnter={e => e.currentTarget.style.background="#f4f8f4"}
                      onMouseLeave={e => e.currentTarget.style.background=isEven?"#fbfbf6":"#eef3ee"}
                    >
                      <td style={{...colStyle, fontWeight:600, color:"#27362f", maxWidth:180}}>
                        {row.company}
                      </td>
                      {city==="All" && (
                        <td style={{...colStyle, color:"#7b8a80", whiteSpace:"nowrap"}}>
                          <span style={{
                            background:"#f4f8f4", border:"1px solid #cbd9cc",
                            borderRadius:5, padding:"2px 7px", fontSize:10, fontWeight:600, color:"#2c7a7b"
                          }}>{row.city}</span>
                        </td>
                      )}
                      <td style={{...colStyle, color:"#5d6b63", maxWidth:180}}>
                        {row.position || <span style={{color:"#c5d2c3"}}>—</span>}
                      </td>
                      <td style={{...colStyle, maxWidth:160}}>
                        {row.website
                          ? <a href={row.website.startsWith("http") ? row.website : "https://"+row.website}
                              target="_blank" rel="noreferrer"
                              style={{color:"#2f6f63", textDecoration:"none", fontSize:11}}
                              onMouseEnter={e=>e.currentTarget.style.textDecoration="underline"}
                              onMouseLeave={e=>e.currentTarget.style.textDecoration="none"}
                            >{row.website.replace(/https?:\/\//, "").replace(/\/$/, "")}</a>
                          : <span style={{color:"#c5d2c3"}}>—</span>}
                      </td>
                      <td style={{...colStyle, color:"#5d6b63", fontSize:11, maxWidth:160}}>
                        {row.email || <span style={{color:"#c5d2c3"}}>—</span>}
                      </td>
                      <td style={{...colStyle, color:"#65746b", whiteSpace:"nowrap", fontSize:11}}>
                        {row.dateSent ? row.dateSent.replace("2026-","") : <span style={{color:"#c5d2c3"}}>—</span>}
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
                                style={{background:"#2f6f63",color:"#fff",border:"none",borderRadius:4,padding:"0 7px",cursor:"pointer",fontSize:11}}>✓</button>
                            </div>
                          : <span
                              onClick={() => setEditNotes(n => ({...n, [row.id]: row.notes || ""}))}
                              style={{ color: row.notes ? "#5d6b63" : "#c5d2c3", cursor:"pointer", fontSize:11,
                                display:"block", maxWidth:200, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}
                              title={row.notes || "Klik om note te bewerken"}
                            >{row.notes || "+"}</span>
                        }
                      </td>
                      <td style={{...colStyle, padding:"10px 8px"}}>
                        <button onClick={() => deleteRow(row.id)}
                          style={{background:"none",border:"none",color:"#9aa79c",cursor:"pointer",fontSize:14,padding:"2px 4px",borderRadius:4,transition:"color .15s"}}
                          onMouseEnter={e=>e.currentTarget.style.color="#a8463f"}
                          onMouseLeave={e=>e.currentTarget.style.color="#9aa79c"}
                          title="Verwijder"
                        >✕</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ background:"#edf4ef", borderTop:"1px solid #d8e2d6", padding:"8px 14px", fontSize:11, color:"#7b8a80" }}>
            {filtered.length} van {data.length} bedrijven
          </div>
        </div>
        </>
        ) : (
          <>
            <div style={{ background:"#fbfbf6", borderBottom:"1px solid #d8e2d6", padding:"16px 28px", display:"flex", gap:8, alignItems:"center", flexWrap:"wrap", justifyContent:"space-between" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                <span style={{ color:"#66746c", fontSize:12, fontWeight:600 }}>Notes</span>
                <span style={{ background:"#cbd9cc", color:"#2c7a7b", borderRadius:10, padding:"1px 7px", fontSize:10, fontWeight:600 }}>{notes.length}</span>
              </div>
              <input
                placeholder="Zoek notes…"
                value={noteSearch}
                onChange={e => setNoteSearch(e.target.value)}
                style={{ width:220, background:"#fbfbf6", border:"1px solid #cbd9cc", borderRadius:7, padding:"7px 12px", fontSize:12, color:"#23312b" }}
              />
            </div>

            <div style={{ margin:"16px 28px 0", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:14 }}>
              {filteredNotes.length === 0 ? (
                <div style={{ gridColumn:"1/-1", padding:28, borderRadius:14, background:"#fbfbf6", border:"1px solid #d8e2d6", color:"#7b8a80", textAlign:"center" }}>
                  Geen notes gevonden
                </div>
              ) : filteredNotes.map((note) => (
                <div key={note.id} style={{ background:"#fbfbf6", border:"1px solid #d8e2d6", borderRadius:14, padding:20, display:"flex", flexDirection:"column", gap:12, minHeight:180 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", gap:12, alignItems:"flex-start" }}>
                    <div>
                      <div style={{ fontSize:14, fontWeight:700, color:"#1f2d27", marginBottom:4 }}>{note.title}</div>
                      <div style={{ fontSize:11, color:"#5d6b63" }}>{note.createdAt ? new Date(note.createdAt).toLocaleDateString('nl-NL', { year:'numeric', month:'2-digit', day:'2-digit' }) : ""}</div>
                    </div>
                    <div style={{ display:"flex", gap:6 }}>
                      <button onClick={() => editNote(note)}
                        style={{ background:"#2f6f63", color:"#fff", border:"none", borderRadius:7, padding:"6px 12px", fontSize:11, cursor:"pointer" }}>
                        Bewerk
                      </button>
                      <button onClick={() => deleteNote(note.id)}
                        style={{ background:"transparent", color:"#a8463f", border:"1px solid #c5d2c3", borderRadius:7, padding:"6px 10px", fontSize:11, cursor:"pointer" }}
                        title="Verwijder"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <div style={{ color:"#27362f", fontSize:13, lineHeight:1.6, whiteSpace:"pre-wrap", overflowWrap:"break-word" }}>
                    {note.body || <span style={{ color:"#879287" }}>Geen details</span>}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ margin:"12px 28px 0", padding:"10px 14px", borderRadius:10, background:"#fbfbf6", border:"1px solid #d8e2d6", color:"#7b8a80", fontSize:11 }}>
              {filteredNotes.length} van {notes.length} notes
            </div>
          </>
        )}

        {/* Add form modal */}
        {showForm && (
          <div
            style={{ position:"fixed",inset:0,background:"rgba(31,45,39,.45)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}
            onClick={e => { if(e.target===e.currentTarget) setShowForm(false); }}
          >
            <div style={{ background:"#fbfbf6", border:"1px solid #c5d2c3", borderRadius:12, padding:28, width:"100%", maxWidth:520, maxHeight:"90vh", overflowY:"auto" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                <h2 style={{ fontSize:16, fontWeight:700, color:"#1f2d27" }}>Nieuwe internship sending</h2>
                <button onClick={() => setShowForm(false)}
                  style={{background:"none",border:"none",color:"#7b8a80",cursor:"pointer",fontSize:18}}>✕</button>
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
                    <label style={{ display:"block", fontSize:11, color:"#65746b", marginBottom:5, fontWeight:600, textTransform:"uppercase", letterSpacing:".05em" }}>{label}</label>
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
                  <label style={{ display:"block", fontSize:11, color:"#65746b", marginBottom:5, fontWeight:600, textTransform:"uppercase", letterSpacing:".05em" }}>Notes</label>
                  <textarea value={form.notes} onChange={e => setForm(f => ({...f, notes: e.target.value}))}
                    rows={2} style={{ resize:"vertical" }} placeholder="Optionele notes…" />
                </div>
              </div>
              <div style={{ display:"flex", gap:10, marginTop:20, justifyContent:"flex-end" }}>
                <button onClick={() => setShowForm(false)}
                  style={{ background:"transparent", border:"1px solid #c5d2c3", color:"#65746b", borderRadius:7, padding:"8px 16px", fontSize:13, cursor:"pointer" }}>
                  Annuleren
                </button>
                <button onClick={addEntry}
                  style={{ background:"#2f6f63", color:"#fff", border:"none", borderRadius:7, padding:"8px 20px", fontSize:13, fontWeight:600, cursor:"pointer" }}>
                  Toevoegen
                </button>
              </div>
            </div>
          </div>
        )}

        {showNoteForm && (
          <div
            style={{ position:"fixed",inset:0,background:"rgba(31,45,39,.45)",zIndex:200,display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}
            onClick={e => { if(e.target===e.currentTarget) closeNoteForm(); }}
          >
            <div style={{ background:"#fbfbf6", border:"1px solid #c5d2c3", borderRadius:12, padding:28, width:"100%", maxWidth:520, maxHeight:"90vh", overflowY:"auto" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                <h2 style={{ fontSize:16, fontWeight:700, color:"#1f2d27" }}>{noteEditId ? "Note bewerken" : "Nieuwe note"}</h2>
                <button onClick={closeNoteForm}
                  style={{background:"none",border:"none",color:"#7b8a80",cursor:"pointer",fontSize:18}}>✕</button>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:12 }}>
                <div>
                  <label style={{ display:"block", fontSize:11, color:"#65746b", marginBottom:5, fontWeight:600, textTransform:"uppercase", letterSpacing:'.05em' }}>Naam *</label>
                  <input type="text" value={noteForm.title} onChange={e => setNoteForm(n => ({...n, title: e.target.value}))} placeholder="Naam of titel" />
                </div>
                <div>
                  <label style={{ display:"block", fontSize:11, color:"#65746b", marginBottom:5, fontWeight:600, textTransform:"uppercase", letterSpacing:'.05em' }}>Notes</label>
                  <textarea value={noteForm.body} onChange={e => setNoteForm(n => ({...n, body: e.target.value}))}
                    rows={6} style={{ resize:"vertical" }} placeholder="Schrijf hier je notes, offer details of algemene info." />
                </div>
              </div>
              <div style={{ display:"flex", gap:10, marginTop:20, justifyContent:"flex-end" }}>
                <button onClick={closeNoteForm}
                  style={{ background:"transparent", border:"1px solid #c5d2c3", color:"#65746b", borderRadius:7, padding:"8px 16px", fontSize:13, cursor:"pointer" }}>
                  Annuleren
                </button>
                <button onClick={addNote}
                  style={{ background:"#2f6f63", color:"#fff", border:"none", borderRadius:7, padding:"8px 20px", fontSize:13, fontWeight:600, cursor:"pointer" }}>
                  Opslaan
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
