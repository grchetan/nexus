import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { authAPI } from "../../services/api";

function PasswordStrength({ value }) {
  let score = 0;
  if (value.length >= 6) score++;
  if (value.length >= 10) score++;
  if (/[A-Z]/.test(value) && /[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  const colors = ["#EF4444","#F59E0B","#3B82F6","#10B981"];
  const labels = ["Weak","Fair","Good","Strong"];
  const color  = score > 0 ? colors[score-1] : "#E2E8F0";
  return (
    <>
      <div className="pw-strength">
        {[0,1,2,3].map((i)=>(
          <div key={i} className="pw-bar" style={{ background: i < score ? color : "#E2E8F0" }}/>
        ))}
      </div>
      {value.length > 0 && <div className="pw-label" style={{ color }}>{labels[score-1]||"Weak"}</div>}
    </>
  );
}

function LoginForm({ onSwitch }) {
  const { login, showToast } = useApp();
  const [email,setPw_e]  = useState("");
  const [pw,setPw]       = useState("");
  const [showPw,setShowPw] = useState(false);
  const [loading,setLoading] = useState(false);

  const handle = async () => {
    if (!email.trim()) { showToast("⚠️ Please enter your email","error"); return; }
    if (!pw)           { showToast("⚠️ Please enter your password","error"); return; }
    setLoading(true);
    try {
      const { token, user } = await authAPI.login({ email, password: pw });
      showToast(`✅ Welcome back, ${user.firstName}! 👋`,"success");
      login(token, user);
    } catch(err) {
      showToast(`❌ ${err.message}`,"error");
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-form active">
      <h3>Welcome back! 👋</h3>
      <p>Sign in to continue to Nexus</p>
      <div className="form-group">
        <label className="form-label">Email Address</label>
        <div className="form-input-wrap">
          <input className="form-input" type="email" value={email}
            onChange={e=>setPw_e(e.target.value)} placeholder="you@example.com"
            onKeyDown={e=>e.key==="Enter"&&handle()} />
          <i className="form-input-icon fa-solid fa-envelope"></i>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Password</label>
        <div className="form-input-wrap">
          <input className="form-input" type={showPw?"text":"password"}
            value={pw} onChange={e=>setPw(e.target.value)} placeholder="Enter your password"
            onKeyDown={e=>e.key==="Enter"&&handle()} />
          <i className={`form-input-icon form-input-toggle fa-solid ${showPw?"fa-eye-slash":"fa-eye"}`}
            onClick={()=>setShowPw(!showPw)}></i>
        </div>
      </div>
      <div className="form-remember">
        <label className="form-check"><input type="checkbox" defaultChecked/> Remember me</label>
        <span className="form-forgot">Forgot password?</span>
      </div>
      <button className="btn-auth" onClick={handle} disabled={loading}>
        {loading?<><i className="fa-solid fa-spinner fa-spin"></i> &nbsp;Signing in...</>
               :<><i className="fa-solid fa-arrow-right-to-bracket"></i> &nbsp;Sign In</>}
      </button>
      <div className="auth-divider">or</div>
      <div className="auth-switch">New to Nexus? <a onClick={onSwitch}>Create account →</a></div>
    </div>
  );
}

function SignupForm({ onSwitch }) {
  const { login, showToast } = useApp();
  const [f,setF] = useState({ firstName:"",lastName:"",email:"",password:"",role:"" });
  const [showPw,setShowPw] = useState(false);
  const [loading,setLoading] = useState(false);
  const set = k => e => setF(p=>({...p,[k]:e.target.value}));

  const handle = async () => {
    if (!f.firstName||!f.lastName) { showToast("⚠️ Enter your full name","error"); return; }
    if (!f.email)    { showToast("⚠️ Enter your email","error"); return; }
    if (!f.password||f.password.length<6) { showToast("⚠️ Password min 6 characters","error"); return; }
    setLoading(true);
    try {
      const { token, user } = await authAPI.signup(f);
      showToast(`🎉 Welcome to Nexus, ${user.firstName}!`,"success");
      login(token, user);
    } catch(err) {
      showToast(`❌ ${err.message}`,"error");
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-form active">
      <h3>Join Nexus today 🌟</h3>
      <p>Create your free professional profile</p>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">First Name</label>
          <div className="form-input-wrap">
            <input className="form-input" type="text" placeholder="First name" value={f.firstName} onChange={set("firstName")}/>
            <i className="form-input-icon fa-solid fa-user"></i>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Last Name</label>
          <div className="form-input-wrap">
            <input className="form-input" type="text" placeholder="Last name" value={f.lastName} onChange={set("lastName")}/>
            <i className="form-input-icon fa-solid fa-user"></i>
          </div>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Email Address</label>
        <div className="form-input-wrap">
          <input className="form-input" type="email" placeholder="you@example.com" value={f.email} onChange={set("email")}/>
          <i className="form-input-icon fa-solid fa-envelope"></i>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Password</label>
        <div className="form-input-wrap">
          <input className="form-input" type={showPw?"text":"password"} placeholder="Min 6 characters"
            value={f.password} onChange={set("password")}/>
          <i className={`form-input-icon form-input-toggle fa-solid ${showPw?"fa-eye-slash":"fa-eye"}`}
            onClick={()=>setShowPw(!showPw)}></i>
        </div>
        <PasswordStrength value={f.password}/>
      </div>
      <div className="form-group">
        <label className="form-label">Job Title / Role</label>
        <div className="form-input-wrap">
          <input className="form-input" type="text" placeholder="e.g. Software Engineer" value={f.role} onChange={set("role")}/>
          <i className="form-input-icon fa-solid fa-briefcase"></i>
        </div>
      </div>
      <button className="btn-auth" onClick={handle} disabled={loading}>
        {loading?<><i className="fa-solid fa-spinner fa-spin"></i> &nbsp;Creating...</>
               :<><i className="fa-solid fa-user-plus"></i> &nbsp;Create Account</>}
      </button>
      <div className="auth-switch">Already have an account? <a onClick={onSwitch}>Sign in →</a></div>
    </div>
  );
}

export default function AuthPage() {
  const [tab,setTab] = useState("login");
  return (
    <div className="page active" id="auth-page">
      <div className="auth-wrapper">
        <div className="auth-left">
          <div className="auth-logo"><div className="auth-logo-icon">N</div>Nex<span style={{color:"rgba(255,255,255,0.6)"}}>us</span></div>
          <div className="auth-hero-text"><h2>Your Professional<br/>World Awaits</h2><p>Connect with industry leaders, discover dream jobs, and grow your career.</p></div>
          <div className="auth-float-cards">
            <div className="auth-float-card"><span>🚀</span><span>New connection!</span></div>
            <div className="auth-float-card"><span>💼</span><span>Job match 94%</span></div>
            <div className="auth-float-card"><span>🔔</span><span>Profile viewed</span></div>
          </div>
          <div className="auth-stats">
            <div className="auth-stat"><div className="auth-stat-num">12M+</div><div className="auth-stat-label">Professionals</div></div>
            <div className="auth-stat"><div className="auth-stat-num">800K+</div><div className="auth-stat-label">Companies</div></div>
            <div className="auth-stat"><div className="auth-stat-num">2.4M+</div><div className="auth-stat-label">Jobs Posted</div></div>
          </div>
        </div>
        <div className="auth-right">
          <div className="auth-tabs">
            <div className={`auth-tab ${tab==="login"?"active":""}`} onClick={()=>setTab("login")}>Sign In</div>
            <div className={`auth-tab ${tab==="signup"?"active":""}`} onClick={()=>setTab("signup")}>Create Account</div>
          </div>
          {tab==="login"?<LoginForm onSwitch={()=>setTab("signup")}/>:<SignupForm onSwitch={()=>setTab("login")}/>}
        </div>
      </div>
    </div>
  );
}
