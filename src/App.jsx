import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, MessageSquare, Settings, LayoutDashboard, Save, CreditCard, 
  LogOut, User, CheckCircle2, BrainCircuit, Smartphone, QrCode, 
  PhoneCall, Calendar, DollarSign, Upload, ShieldAlert, RefreshCw, 
  Minus, Plus, MapPin, Trash2, Mic, Users, Image as ImageIcon, 
  ExternalLink, HelpCircle, History, Instagram, Wifi, Eye, EyeOff, Power,
  LayoutList, ShoppingCart
} from 'lucide-react';

// ==========================================
// ⚠️ CONFIGURAÇÃO OBRIGATÓRIA
// ==========================================
const SUPABASE_URL = "https://wjyrinydwrazuzjczhbw.supabase.co"; // Cole sua URL aqui
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqeXJpbnlkd3JhenV6amN6aGJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0OTA3MTAsImV4cCI6MjA3OTA2NjcxMH0.lx5gKNPJLBfBouwH99MFFYHtjvxDZeohwoJr9JlSblg"; // Cole sua Anon Key aqui
const SUPER_ADMIN_EMAIL = "noreply@monarcahub.com"; 

// ==========================================
// CARREGADOR DO SUPABASE
// ==========================================
let supabaseClient = null;

const loadSupabaseAndInit = () => {
  return new Promise((resolve, reject) => {
    if (window.supabase) {
        if (!supabaseClient) supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        resolve(true);
        return;
    }
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
    script.async = true;
    script.onload = () => {
        try {
            supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
            resolve(true);
        } catch(e) { reject(new Error("Falha ao iniciar cliente Supabase.")); }
    };
    script.onerror = () => reject(new Error("Falha ao carregar Supabase SDK"));
    document.head.appendChild(script);
  });
};

// ==========================================
// COMPONENTES VISUAIS
// ==========================================
const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, type = "button" }) => {
  const variants = {
    primary: "bg-orange-400 hover:bg-orange-500 text-white shadow-md shadow-orange-500/20 border-b-2 border-orange-600 active:border-b-0 active:translate-y-0.5",
    secondary: "bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700",
    success: "bg-green-500 hover:bg-green-600 text-white shadow-md shadow-green-500/20",
    outline: "border border-gray-600 text-gray-400 hover:text-white hover:border-gray-400",
    danger: "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20",
    admin: "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border border-purple-500/30"
  };
  return <button type={type} onClick={onClick} disabled={disabled} className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}>{children}</button>;
};

const InputGroup = ({ label, type = "text", placeholder, value, onChange, multiline = false, helpText, required = false, disabled = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="mb-5">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-1.5">{label} {required && <span className="text-orange-400">*</span>}</label>
      <div className="relative">
        {multiline ? (
          <textarea 
            className={`w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-100 focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 outline-none transition-all min-h-[100px] text-sm leading-relaxed ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
            placeholder={placeholder} 
            value={value || ''} 
            onChange={onChange} 
            required={required} 
            disabled={disabled}
            readOnly={disabled}
          />
        ) : (
          <input 
            type={isPassword ? (showPassword ? 'text' : 'password') : type} 
            className={`w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-gray-100 focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500/50 outline-none transition-all text-sm pr-10 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
            placeholder={placeholder} 
            value={value || ''} 
            onChange={onChange} 
            required={required} 
            disabled={disabled}
            readOnly={disabled}
          />
        )}
        {isPassword && !disabled && (
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-500 hover:text-gray-300">
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {helpText && <div className="flex items-start gap-1.5 mt-2 text-xs text-gray-500 bg-gray-800/50 p-2 rounded border border-gray-700/50"><HelpCircle className="w-3 h-3 mt-0.5 flex-shrink-0 text-orange-400/70" /><span>{helpText}</span></div>}
    </div>
  );
};

const CheckboxGroup = ({ label, subLabel, checked, onChange, icon: Icon, priceTag }) => (
  <div onClick={() => onChange(!checked)} className={`relative flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${checked ? 'bg-orange-500/10 border-orange-500/40' : 'bg-gray-900 border-gray-700 hover:border-gray-600'}`}>
    <div className={`mt-1 w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${checked ? 'bg-orange-500 border-orange-500' : 'border-gray-500'}`}>{checked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}</div>
    <div className="flex-1">
      <div className="flex justify-between items-start">
        <div className="text-sm text-gray-200 font-medium flex items-center gap-2">{Icon && <Icon className="w-4 h-4 text-gray-400" />}{label}</div>
        {priceTag && <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold border ${checked ? 'bg-green-500/20 text-green-400 border-green-500/20' : 'bg-gray-800 text-gray-400 border-gray-600'}`}>{priceTag}</span>}
      </div>
      {subLabel && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{subLabel}</p>}
    </div>
  </div>
);

const Card = ({ title, children, icon: Icon, action, className = '' }) => (
  <div className={`bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl ${className}`}>
    <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-4">
      <div className="flex items-center gap-3">{Icon && <Icon className="w-6 h-6 text-orange-400" />}<h3 className="text-lg font-semibold text-white">{title}</h3></div>
      {action}
    </div>
    {children}
  </div>
);

// ==========================================
// TELA DE LOGIN
// ==========================================
const AuthScreen = ({ onLogin }) => {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [isSignUp, setIsSignUp] = useState(false); const [loading, setLoading] = useState(false); const [error, setError] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault(); setLoading(true); setError('');
    if (!supabaseClient) { setError("Erro: Supabase não iniciado."); setLoading(false); return; }
    try {
      let result;
      if (isSignUp) {
        result = await supabaseClient.auth.signUp({ email, password, options: { data: { full_name: 'Novo Cliente' } } });
      } else {
        result = await supabaseClient.auth.signInWithPassword({ email, password });
      }
      if (result.error) throw result.error;
      if (isSignUp && !result.data.session) setError('Cadastro realizado! Verifique seu email.'); 
      else if (result.data.user) onLogin(result.data.session);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  return ( 
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4"> 
      <div className="max-w-md w-full bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-2xl flex flex-col items-center"> 
        <div className="mb-6 w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700">
          <img src="/favicon.png" alt="Logo IARA" className="w-14 h-14 object-contain" onError={(e) => e.target.style.display='none'} />
        </div>
        <div className="text-center mb-8"> 
          <h1 className="text-2xl font-bold text-white">IARA Gym</h1> 
          <p className="text-gray-400 mt-2">{isSignUp ? 'Crie sua conta e configure sua IA' : 'Acesse o Painel da sua Academia'}</p> 
        </div> 
        {error && <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-4 text-sm text-center border border-red-500/20 w-full">{error}</div>} 
        <form onSubmit={handleAuth} className="w-full"> 
          <InputGroup label="Email" type="email" required value={email} onChange={e => setEmail(e.target.value)} /> 
          <InputGroup label="Senha" type="password" required value={password} onChange={e => setPassword(e.target.value)} /> 
          <Button type="submit" className="w-full mt-4" disabled={loading}>{loading ? 'Processando...' : (isSignUp ? 'Criar Conta' : 'Entrar')}</Button> 
        </form> 
        <div className="mt-6 text-center"> <button onClick={() => {setIsSignUp(!isSignUp); setError('')}} className="text-sm text-orange-400 hover:underline">{isSignUp ? 'Já tem conta? Login' : 'Criar conta grátis'}</button> </div> 
      </div> 
    </div> 
  );
};

// ==========================================
// APP PRINCIPAL
// ==========================================
export default function App() {
  const [session, setSession] = useState(null);
  const [isLibLoaded, setIsLibLoaded] = useState(false);
  const [isConfigured, setIsConfigured] = useState(SUPABASE_URL !== "");

  useEffect(() => { 
    if (!isConfigured) return;
    loadSupabaseAndInit().then(() => setIsLibLoaded(true)).catch(console.error);
  }, [isConfigured]);

  useEffect(() => {
    if (!isLibLoaded || !isConfigured || !supabaseClient) return;
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((_event, session) => setSession(session));
    supabaseClient.auth.getSession().then(({ data: { session } }) => setSession(session));
    return () => subscription.unsubscribe();
  }, [isLibLoaded, isConfigured]);

  if (!isConfigured) return <div className="min-h-screen bg-gray-950 flex items-center justify-center flex-col text-white p-6 text-center"><ShieldAlert className="w-10 h-10 text-red-400 mb-4" /><h1 className="text-xl font-bold mb-2">Configuração Pendente</h1><p className="text-gray-400">Configure as variáveis <code>SUPABASE_URL</code> e <code>KEY</code> no código.</p></div>;
  if (!isLibLoaded) return <div className="min-h-screen bg-gray-950 flex items-center justify-center flex-col text-orange-400"><RefreshCw className="w-10 h-10 animate-spin mb-4" /><p>Conectando...</p></div>;
  if (!session) return <AuthScreen onLogin={(sess) => setSession(sess)} />;

  return <Dashboard session={session} />;
}

// ==========================================
// DASHBOARD
// ==========================================
function Dashboard({ session }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);
  
  // Validação de Admin Insensível a Case
  const isSuperAdmin = session.user.email.trim().toLowerCase() === SUPER_ADMIN_EMAIL.trim().toLowerCase();
  const userId = session.user.id;

  // Estados
  const [connectionStep, setConnectionStep] = useState('disconnected'); 
  const [instanceCode, setInstanceCode] = useState('');
  const [trialInfo, setTrialInfo] = useState({ daysLeft: 7, status: 'active' });
  const [extraChannels, setExtraChannels] = useState(0);
  const [logs, setLogs] = useState([]);
  const [trainingError, setTrainingError] = useState(false); // Estado para aviso de Treino Pendente

  const [gymData, setGymData] = useState({
    gym_name: "", phone: "", pix_key: "", address: "", branches: [], 
    opening_hours: "", pricing_info: "", faq_text: "", tone_of_voice: "Motivador e energético.",
    observations: "", allow_calls: false, reply_groups: false, reply_audio: true, 
    send_images: false, integrate_agenda: false, recognize_payments: false, 
    omnichannel: false, connection_status: 'disconnected', logo_url: null,
    email: session.user.email, password: '', needs_reprocessing: true,
    ai_active: false
  });

  // Calcular dias restantes do Trial
  useEffect(() => {
    if (session.user.created_at) {
      const createdDate = new Date(session.user.created_at);
      const now = new Date();
      const diffTime = Math.abs(now - createdDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      const remaining = 8 - diffDays; 
      setTrialInfo({
        daysLeft: Math.max(0, remaining),
        status: remaining > 0 ? 'active' : 'expired'
      });
    }
  }, [session.user.created_at]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingData(true);
      try {
        // 1. Carregar Configs
        const { data } = await supabaseClient.from('gym_configs').select('*').eq('user_id', userId).maybeSingle();
        if (data) {
           setGymData(prev => ({ ...prev, ...data, branches: data.branches || [], email: session.user.email }));
           if (data.connection_status) setConnectionStep(data.connection_status);
           if (data.extra_channels_count) setExtraChannels(data.extra_channels_count);
        } else {
             await supabaseClient.from('gym_configs').insert({ user_id: userId, email: session.user.email, ai_active: false });
        }
        // 2. Carregar Logs
        const { data: logData } = await supabaseClient.from('interaction_logs').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(10);
        if (logData) setLogs(logData);
      } catch (error) { console.error(error); } finally { setIsLoadingData(false); }
    };
    fetchData();
  }, [userId, session.user.email]);

  const handleSave = async (customData = null) => {
    const isFullSave = !customData; 
    if (isFullSave) setIsSaving(true);

    const dataToSave = {
        user_id: userId,
        ...(customData || gymData),
        updated_at: new Date(),
        needs_reprocessing: true, 
        extra_channels_count: extraChannels
    };
    delete dataToSave.email;
    delete dataToSave.password;

    try {
      const { error } = await supabaseClient.from('gym_configs').upsert([dataToSave], { onConflict: 'user_id' });
      if (error) throw error;
      if (isFullSave) alert("Configurações salvas!");
      if (isFullSave) setTrainingError(false); // Limpa erro se salvar manual
    } catch (error) { alert("Erro: " + error.message); } finally { if (isFullSave) setIsSaving(false); }
  };

  // Toggle AI Switch
  const toggleAI = async () => {
    // Se tentar LIGAR e não tiver dados
    if (!gymData.ai_active) {
        if (!gymData.opening_hours || gymData.opening_hours.length < 5 || !gymData.pricing_info || gymData.pricing_info.length < 5) {
            setTrainingError(true); // Mostra texto vermelho
            setTimeout(() => setTrainingError(false), 5000); // Some depois de 5s
            return;
        }
    }
    setTrainingError(false);
    const newState = !gymData.ai_active;
    setGymData(prev => ({ ...prev, ai_active: newState }));
    await handleSave({ ...gymData, ai_active: newState }); 
  };

  const addBranch = () => setGymData(prev => ({ ...prev, branches: [...prev.branches, { id: Date.now(), address: '' }] }));
  const updateBranch = (id, val) => setGymData(prev => ({ ...prev, branches: prev.branches.map(b => b.id === id ? { ...b, address: val } : b) }));
  const removeBranch = (id) => setGymData(prev => ({ ...prev, branches: prev.branches.filter(b => b.id !== id) }));
  
  // Total Price calc
  const totalPrice = 250 + (gymData.branches.length * 150) + (gymData.omnichannel ? 150 : 0) + (gymData.integrate_agenda ? 50 : 0) + (gymData.recognize_payments ? 50 : 0) + (extraChannels * 50);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setGymData(prev => ({ ...prev, logo_url: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubscribe = () => {
      // Aqui conectaria com o n8n para gerar o link de pagamento
      alert(`Redirecionando para pagamento de R$ ${totalPrice} via MonarcaHub... (Em breve)`);
  };

  const renderContent = () => {
    if (isLoadingData) return <div className="flex items-center justify-center h-64 text-orange-400">Carregando dados...</div>;

    switch(activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            {/* Header Conexão */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5"><Smartphone className="w-32 h-32 text-orange-400" /></div>
              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">Conexão do WhatsApp</h2>
                  <p className="text-gray-400 mb-6">Status: <span className={connectionStep === 'connected' ? "text-green-400 font-bold" : "text-red-400 font-bold"}>{connectionStep === 'connected' ? 'Conectado e Operando' : 'Desconectado'}</span></p>
                  {connectionStep === 'disconnected' && <Button onClick={() => setConnectionStep('input_code')}><QrCode className="w-4 h-4" /> Conectar Novo Número</Button>}
                  {connectionStep === 'input_code' && <div className="flex gap-2 max-w-md"><input className="bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white flex-1 outline-none focus:border-orange-400/50" placeholder="Cód. Instância" value={instanceCode} onChange={e => setInstanceCode(e.target.value)} /><Button onClick={() => setConnectionStep('qr_ready')}>Gerar QR</Button></div>}
                  {connectionStep === 'qr_ready' && <div className="bg-white p-4 rounded-lg inline-block text-center"><div className="w-32 h-32 bg-gray-200 mb-2 flex items-center justify-center text-gray-500 text-[10px]">QR CODE SIMULADO</div><Button variant="success" className="text-xs w-full" onClick={() => {setConnectionStep('connected'); handleSave();}}>Simular Leitura</Button></div>}
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`rounded-xl p-6 text-white shadow-lg border transition-colors ${gymData.ai_active ? 'bg-gradient-to-br from-orange-500/10 to-orange-900/10 border-orange-500/20' : 'bg-gray-800 border-gray-600 opacity-75'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-orange-200 text-sm font-medium">Status da IA</p>
                    <h2 className="text-3xl font-bold mt-1 text-orange-50">{gymData.ai_active ? 'Ligada' : 'Pausada'}</h2>
                  </div>
                  <button onClick={toggleAI} className={`p-2 rounded-full transition-colors ${gymData.ai_active ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}>
                    <Power className="w-6 h-6 text-white" />
                  </button>
                </div>
                <p className="text-xs mt-2 text-gray-400">{gymData.ai_active ? 'A IA está respondendo mensagens.' : 'A IA não responderá ninguém.'}</p>
                {/* Aviso de Erro ao Tentar Ativar */}
                {trainingError && <p className="text-red-400 text-xs mt-2 font-bold animate-pulse">Necessário preencher "Treinar IA" primeiro.</p>}
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-start">
                  <div><p className="text-gray-400 text-sm font-medium">Interações Recentes</p><h2 className="text-3xl font-bold text-white mt-1">{logs.length}</h2></div>
                  <div className="bg-gray-700 p-2 rounded-lg"><MessageSquare className="w-6 h-6 text-orange-400" /></div>
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-start">
                  <div><p className="text-gray-400 text-sm font-medium">Plano Atual</p><h2 className="text-3xl font-bold text-white mt-1">Trial</h2></div>
                  <div className="bg-gray-700 p-2 rounded-lg"><CreditCard className="w-6 h-6 text-orange-400" /></div>
                </div>
                <div className="mt-4 w-full bg-gray-700 rounded-full h-2 overflow-hidden"><div className={`h-2 rounded-full ${trialInfo.status === 'active' ? 'bg-orange-500' : 'bg-red-500'}`} style={{ width: `${(trialInfo.daysLeft/7)*100}%` }}></div></div>
                <p className="text-right text-xs text-orange-400 mt-1 font-bold">{trialInfo.daysLeft} dias restantes</p>
              </div>
            </div>

            {/* Omnichannel Banner */}
            <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <LayoutList className="w-8 h-8 text-blue-400" />
                    <div>
                        <h3 className="font-bold text-white text-sm">Painel Omnichannel Disponível</h3>
                        <p className="text-xs text-gray-300">Veja todas as conversas, relatórios e assuma o controle.</p>
                    </div>
                </div>
                <button onClick={() => setActiveTab('plans')} className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2 rounded-lg font-medium">Ativar (+R$ 150)</button>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-gray-700 flex items-center gap-2"><History className="w-5 h-5 text-orange-400" /><h3 className="font-bold text-white">Últimas conversas registradas</h3></div>
              <div className="p-4 bg-gray-900/50 max-h-[400px] overflow-y-auto">
                {logs.length === 0 ? (
                  <div className="text-center py-10 text-gray-500"><MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-20" /><p>Nenhuma conversa registrada ainda.</p></div>
                ) : (
                  <div className="space-y-4">
                    {logs.map((log, index) => (
                      <div key={index} className={`flex ${log.sender === 'ai' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl ${log.sender === 'ai' ? 'bg-orange-500/20 border border-orange-500/30 text-orange-100 rounded-br-none' : 'bg-gray-700 border border-gray-600 text-gray-200 rounded-bl-none'}`}>
                          <div className="flex items-center gap-2 mb-1 opacity-70 text-[10px] uppercase tracking-wider">
                             {log.sender === 'ai' ? <span>🤖 IARA</span> : <span>👤 Aluno</span>}<span>• {new Date(log.created_at).toLocaleTimeString()}</span>
                          </div>
                          <p className="text-sm">{log.message_content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'training':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in slide-in-from-right-4 duration-300">
            <div className="lg:col-span-2 space-y-6">
              <Card title="Informações Básicas" icon={Dumbbell}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputGroup label="Nome da Academia" placeholder="Ex: Ironberg Matriz" value={gymData.gym_name} onChange={(e) => setGymData({...gymData, gym_name: e.target.value})} helpText="Como a IA deve chamar sua academia." />
                  <InputGroup label="Telefone / WhatsApp" placeholder="(00) 00000-0000" value={gymData.phone} onChange={(e) => setGymData({...gymData, phone: e.target.value})} helpText="O número oficial de contato." />
                </div>
                <InputGroup label="Chave Pix" placeholder="CNPJ, Email ou Celular" value={gymData.pix_key} onChange={(e) => setGymData({...gymData, pix_key: e.target.value})} helpText="A IA enviará essa chave quando solicitada." />
                <div className="pt-4 border-t border-gray-700 mt-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-300">Endereços & Filiais</label>
                    <div className="flex flex-col items-end"><Button variant="outline" onClick={addBranch} className="text-xs px-2 py-1"><Plus className="w-3 h-3" /> Adicionar</Button><span className="text-[10px] text-orange-400 mt-1 max-w-[200px] text-right">*1 telefone diferente pra cada endereço = valor adicional (+R$ 150).</span></div>
                  </div>
                  <div className="space-y-3">
                    <InputGroup label="Endereço Principal" value={gymData.address} onChange={(e) => setGymData({...gymData, address: e.target.value})} helpText="Necessário para a localização no Maps." />
                    {gymData.branches.map((branch) => (
                      <div key={branch.id} className="relative flex gap-2"><MapPin className="absolute left-3 top-10 w-5 h-5 text-orange-500" />
                        <input className="w-full bg-gray-900 border border-orange-500/30 rounded-lg pl-10 p-3 text-gray-100 focus:border-orange-400/50 mt-6" value={branch.address} onChange={(e) => updateBranch(branch.id, e.target.value)} />
                        <button onClick={() => removeBranch(branch.id)} className="p-3 hover:bg-red-500/10 rounded-lg text-red-400 mt-6"><Trash2 className="w-5 h-5" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card title="Cérebro da Operação" icon={BrainCircuit}>
                 <InputGroup label="Horários" multiline placeholder="Seg a Sex: 06h às 23h..." value={gymData.opening_hours} onChange={(e) => setGymData({...gymData, opening_hours: e.target.value})} />
                 <InputGroup label="Preços" multiline placeholder="Mensal: R$ 120..." value={gymData.pricing_info} onChange={(e) => setGymData({...gymData, pricing_info: e.target.value})} />
                 <InputGroup label="FAQ / Regras" multiline placeholder="- Idade mínima 14 anos..." value={gymData.faq_text} onChange={(e) => setGymData({...gymData, faq_text: e.target.value})} />
                 <div className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <CheckboxGroup icon={PhoneCall} label="Aceitar ligações via WhatsApp?" subLabel="aceita mas não atende." checked={gymData.allow_calls} onChange={(val) => setGymData({...gymData, allow_calls: val})} />
                    <CheckboxGroup icon={Users} label="Responder em Grupos?" subLabel="Não recomendado." checked={gymData.reply_groups} onChange={(val) => setGymData({...gymData, reply_groups: val})} />
                    <CheckboxGroup icon={Mic} label="Responder áudio?" subLabel="IA ouve e responde em áudio." checked={gymData.reply_audio} onChange={(val) => setGymData({...gymData, reply_audio: val})} />
                    <CheckboxGroup icon={ImageIcon} label="Enviar imagens?" subLabel="(link no bloco Observações)." checked={gymData.send_images} onChange={(val) => setGymData({...gymData, send_images: val})} />
                    <CheckboxGroup icon={Calendar} label="Integrar Agenda (+R$50)" subLabel="Link Google Calendar." checked={gymData.integrate_agenda} onChange={(val) => setGymData({...gymData, integrate_agenda: val})} />
                    <CheckboxGroup icon={DollarSign} label="Pagamentos (+R$50)" subLabel="Lê comprovantes Pix (OCR)." checked={gymData.recognize_payments} onChange={(val) => setGymData({...gymData, recognize_payments: val})} />
                  </div>
                  <InputGroup label="Observações / Links de Imagens" multiline value={gymData.observations} onChange={(e) => setGymData({...gymData, observations: e.target.value})} helpText="Cole aqui URLs de fotos." />
              </Card>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-white mb-4">Resumo</h3>
                <div className="space-y-3 mb-6 text-sm">
                   <div className="flex justify-between"><span className="text-gray-400">Status Conexão</span><span className={connectionStep === 'connected' ? "text-green-400 font-bold" : "text-red-400 font-bold"}>{connectionStep === 'connected' ? 'Online' : 'Offline'}</span></div>
                   <div className="flex justify-between mt-2 pt-2 border-t border-gray-700"><span className="text-white font-bold">Total Estimado</span><span className="text-orange-400 font-bold">R$ {totalPrice}</span></div>
                </div>
                <Button onClick={() => handleSave()} className="w-full bg-green-600 hover:bg-green-700 text-white border-none shadow-green-900/20">{isSaving ? 'Salvando...' : 'Salvar e Publicar IA'} <Save className="w-4 h-4 ml-2" /></Button>
                <div className="mt-4 text-center text-xs text-orange-300 flex items-center justify-center gap-1"><Wifi className="w-3 h-3"/> Atualiza cérebro da IA</div>
              </div>
            </div>
          </div>
        );

      case 'plans':
        return (
          <div className="max-w-4xl mx-auto animate-in fade-in">
             <div className="text-center mb-10"><h2 className="text-3xl font-bold text-white">Sua Assinatura</h2><p className="text-gray-400 mt-2">Detalhes do seu plano atual.</p></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-gray-800 border border-orange-500/30 rounded-2xl p-8 text-center h-fit">
                  <p className="text-gray-400 text-sm uppercase tracking-wide">Total Mensal Estimado</p>
                  <div className="flex items-center justify-center text-white mt-2"><span className="text-5xl font-bold tracking-tight">R$ {totalPrice}</span></div>
                  <div className="mt-6 space-y-2 text-sm text-left border-t border-gray-700 pt-4">
                     <div className="flex justify-between text-gray-300"><span>Plano Base</span><span>R$ 250</span></div>
                     {gymData.branches.length > 0 && <div className="flex justify-between text-gray-400"><span>+ {gymData.branches.length} Filiais</span><span>R$ {gymData.branches.length * 150}</span></div>}
                     {extraChannels > 0 && <div className="flex justify-between text-gray-400"><span>+ {extraChannels} Canais Extras</span><span>R$ {extraChannels * 50}</span></div>}
                     {gymData.omnichannel && <div className="flex justify-between text-blue-400"><span>+ Painel Omnichannel</span><span>R$ 150</span></div>}
                     {(gymData.integrate_agenda || gymData.recognize_payments) && <div className="flex justify-between text-gray-400"><span>+ Adicionais</span><span>R$ {(gymData.integrate_agenda ? 50 : 0) + (gymData.recognize_payments ? 50 : 0)}</span></div>}
                  </div>
                  <Button onClick={handleSubscribe} className="w-full mt-6 bg-orange-500 hover:bg-orange-600">Assinar / Atualizar Plano <ShoppingCart className="w-4 h-4 ml-2" /></Button>
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8">
                 <h3 className="text-xl font-semibold text-white mb-6">Adicionais</h3>
                 <div className="space-y-4">
                    {/* Omnichannel */}
                    <div className="bg-gray-900 p-4 rounded-xl border border-blue-900/50 flex justify-between items-center">
                       <div>
                         <div className="flex items-center gap-2 text-blue-200 font-medium mb-1"><LayoutList className="w-4 h-4" /> Painel Omnichannel</div>
                         <p className="text-xs text-gray-500">Gestão centralizada de conversas</p>
                       </div>
                       <div className="flex items-center gap-3">
                         <span className="text-xs text-gray-400">R$ 150</span>
                         <input type="checkbox" checked={gymData.omnichannel} onChange={() => setGymData(prev => ({...prev, omnichannel: !prev.omnichannel}))} className="w-5 h-5 accent-blue-500 rounded cursor-pointer" />
                       </div>
                    </div>

                    {/* Canais Extras */}
                    <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 text-gray-200 font-medium"><Instagram className="w-5 h-5 text-pink-500" /><Smartphone className="w-5 h-5 text-green-500" /><span>Instagram / WhatsApp Extra</span></div>
                          <div className="flex items-center gap-3">
                              <button onClick={() => setExtraChannels(Math.max(0, extraChannels - 1))} className="w-8 h-8 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded text-white border border-gray-600">-</button>
                              <span className="text-white font-bold w-4 text-center">{extraChannels}</span>
                              <button onClick={() => setExtraChannels(extraChannels + 1)} className="w-8 h-8 flex items-center justify-center bg-gray-800 hover:bg-gray-700 rounded text-white border border-gray-600">+</button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 text-right mb-4">+ R$ 50/cada</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        );

      case 'account':
        return (
           <div className="max-w-2xl mx-auto text-center pt-10 animate-in fade-in">
             <div className="relative group w-24 h-24 mx-auto mb-6">
                {gymData.logo_url || gymData.gym_name ? (
                   gymData.logo_url ? 
                    <img src={gymData.logo_url} alt="Logo" className="w-full h-full rounded-full object-cover border-2 border-orange-500" /> 
                    : <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center border-2 border-orange-500 text-2xl font-bold text-orange-500">{gymData.gym_name.slice(0,2).toUpperCase()}</div>
                ) : ( <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center border-2 border-dashed border-gray-600 group-hover:border-orange-500 transition-colors cursor-pointer"><Upload className="w-8 h-8 text-gray-500 group-hover:text-orange-500" /></div> )}
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleLogoUpload} accept="image/*" />
                <div className="absolute bottom-0 right-0 bg-orange-500 rounded-full p-1"><Plus className="w-4 h-4 text-white" /></div>
             </div>
             <h2 className="text-2xl font-bold text-white mb-1">Minha Conta</h2>
             <p className="text-gray-400 mb-8 text-sm">ID: <span className="font-mono bg-gray-800 px-2 py-0.5 rounded">{userId.slice(0,8)}...</span></p>
             <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-left mb-8 shadow-lg">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><User className="w-5 h-5 text-orange-400"/> Dados de Acesso</h3>
                <div className="space-y-4">
                   <InputGroup label="Email de Login" value={gymData.email} disabled />
                   <InputGroup label="Alterar Senha" type="password" placeholder="Nova senha..." value={gymData.password} onChange={(e) => setGymData({...gymData, password: e.target.value})} />
                   <div className="bg-red-500/10 border border-red-500/20 p-3 rounded text-xs text-red-200 flex gap-2 items-start">
                      <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-bold block mb-1">Atenção:</span>
                        Mudanças aqui não refletem na conta de pagamentos (MonarcaHub.com).
                      </div>
                   </div>
                   <div className="flex justify-end"><Button variant="secondary" className="text-sm">Atualizar Acesso</Button></div>
                </div>
             </div>
             <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-left mb-8 shadow-lg">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-green-400"/> Financeiro</h3>
                <Button className="w-full py-3" variant="outline" onClick={() => alert("Redirecionando...")}>Acessar Portal PagBank/MonarcaHub.com <ExternalLink className="w-4 h-4" /></Button>
             </div>
             <Button onClick={async () => { await supabaseClient.auth.signOut(); window.location.reload(); }} variant="danger" className="mx-auto">Sair da Conta</Button>
           </div>
        );

      case 'admin':
        return (
          <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <div className="bg-purple-900/20 border border-purple-500/30 p-6 rounded-xl mb-8"><h2 className="text-2xl font-bold text-purple-300 flex items-center gap-2 mb-2"><ShieldAlert className="w-8 h-8" /> Modo Deus (Admin)</h2><p className="text-gray-400">Área restrita da Monarca Hub.</p></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6"><Card title="Controle de Conexão"><div className="flex gap-2"><Button variant="success" onClick={() => setConnectionStep('connected')} className="flex-1">Forçar Online</Button><Button variant="danger" onClick={() => {setConnectionStep('disconnected'); setInstanceCode('')}} className="flex-1">Forçar Logout</Button></div></Card></div>
          </div>
        );
      
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans flex flex-col md:flex-row">
      <aside className="hidden md:flex w-64 flex-col bg-gray-900 border-r border-gray-800 h-screen sticky top-0">
        <div className="p-6 flex items-center gap-2 font-bold text-2xl text-orange-400 tracking-tighter">
            {/* LOGO ATUALIZADA */}
            <img src="/logo-iara.png" alt="IARA Gym" className="h-10 object-contain" onError={(e) => {e.target.style.display='none'; e.target.nextSibling.style.display='block'}} />
            <span className="hidden">IARA Gym</span> 
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-orange-500/10 text-orange-400' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}><LayoutDashboard className="w-5 h-5" /> Visão Geral</button>
          <button onClick={() => setActiveTab('training')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'training' ? 'bg-orange-500/10 text-orange-400' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}><BrainCircuit className="w-5 h-5" /> Treinar IA</button>
          <button onClick={() => setActiveTab('plans')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'plans' ? 'bg-orange-500/10 text-orange-400' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}><CreditCard className="w-5 h-5" /> Assinatura</button>
          <button onClick={() => setActiveTab('account')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'account' ? 'bg-orange-500/10 text-orange-400' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}><User className="w-5 h-5" /> Minha Conta</button>
        </nav>
        {/* BOTÃO ADMIN SÓ APARECE PARA EMAIL ESPECÍFICO */}
        {isSuperAdmin && <div className="px-4 mt-auto pb-2"><button onClick={() => setActiveTab('admin')} className="w-full flex items-center gap-2 px-3 py-2 rounded text-xs uppercase tracking-wider font-bold text-purple-400 hover:bg-purple-900/20"><ShieldAlert className="w-3 h-3" /> Modo Admin</button></div>}
      </aside>
      <div className="md:hidden bg-gray-900 p-4 border-b border-gray-800 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2 font-bold text-xl text-orange-400"><img src="/logo-iara.png" className="h-8" /> IARA Gym</div><button className="text-gray-300"><Settings /></button>
      </div>
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{renderContent()}</div>
        <div className="mt-10 text-center md:hidden"><p className="text-[10px] text-gray-600 uppercase tracking-wider">Desenvolvido por</p><p className="text-xs text-orange-400 font-bold">Monarca Hub</p></div>
      </main>
      <div className="hidden md:block fixed bottom-0 left-0 w-64 p-4 border-t border-gray-800 bg-gray-900 z-10">
           <div className="mb-4 text-center"><p className="text-[10px] text-gray-600 uppercase tracking-wider">Desenvolvido por</p><p className="text-xs text-orange-400 font-bold">Monarca Hub</p></div>
          <button onClick={async () => { await supabaseClient.auth.signOut(); window.location.reload(); }} className="w-full flex items-center justify-center gap-2 text-red-400 hover:bg-red-400/10 py-2 rounded-lg transition-colors text-sm"><LogOut className="w-4 h-4" /> Sair</button>
      </div>
    </div>
  );
}
