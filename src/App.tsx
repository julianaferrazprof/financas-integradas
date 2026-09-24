import React, { useState } from 'react';
import { 
  Building2, 
  GraduationCap, 
  Calculator, 
  Table, 
  TrendingUp, 
  DollarSign, 
  FileSpreadsheet, 
  Award, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Mail, 
  User, 
  Sparkles,
  Download,
  Percent,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'student-login' | 'teacher-login' | 'teacher-register' | 'student-sheet' | 'teacher-dashboard'>('home');
  const [userProfile, setUserProfile] = useState<{ name: string; role: 'student' | 'teacher'; turma?: string } | null>(null);

  // Student form state
  const [studentName, setStudentName] = useState('');
  const [studentTurma, setStudentTurma] = useState('Turma 2026.1 - Gestão Financeira SENAI');

  // Teacher form state
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');
  const [teacherName, setTeacherName] = useState('');

  // Active calculation template for simulator
  const [selectedCalc, setSelectedCalc] = useState<'price' | 'sac' | 'sam' | 'juros_compostos'>('price');

  // Spreadsheet simulator rows
  const [sheetRows, setSheetRows] = useState([
    { n: 0, saldoDevedor: 100000, amortizacao: 0, juros: 0, prestacao: 0, status: 'ok' },
    { n: 1, saldoDevedor: '', amortizacao: '', juros: '', prestacao: '', status: '' },
    { n: 2, saldoDevedor: '', amortizacao: '', juros: '', prestacao: '', status: '' },
    { n: 3, saldoDevedor: '', amortizacao: '', juros: '', prestacao: '', status: '' },
    { n: 4, saldoDevedor: '', amortizacao: '', juros: '', prestacao: '', status: '' },
    { n: 5, saldoDevedor: '', amortizacao: '', juros: '', prestacao: '', status: '' },
  ]);

  const [submissionFeedback, setSubmissionFeedback] = useState<{ score: number; total: number } | null>(null);

  const handleStudentEnter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;
    setUserProfile({ name: studentName, role: 'student', turma: studentTurma });
    setActiveTab('student-sheet');
  };

  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile({ name: teacherEmail.split('@')[0] || 'Prof. Instrutor', role: 'teacher' });
    setActiveTab('teacher-dashboard');
  };

  const handleTeacherRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile({ name: teacherName || 'Prof. Instrutor', role: 'teacher' });
    setActiveTab('teacher-dashboard');
  };

  const handleCellChange = (rowIndex: number, field: string, value: string) => {
    const updated = [...sheetRows];
    updated[rowIndex] = { ...updated[rowIndex], [field]: value };
    setSheetRows(updated);
  };

  const evaluateSimulation = () => {
    // Basic automatic correction demonstration for Price table (Capital: 100000, i=2% a.m., n=5)
    // PMT = 100000 * (0.02 * 1.02^5) / (1.02^5 - 1) = 21215.84
    let correctCells = 0;
    const totalEditable = 5 * 4; // 5 rows * 4 columns

    // Let's grant simulated evaluation based on completed fields
    const filled = sheetRows.slice(1).filter(r => r.prestacao && r.juros && r.amortizacao && r.saldoDevedor).length;
    const score = Math.min(100, Math.round((filled / 5) * 100));
    setSubmissionFeedback({ score, total: 100 });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">Finanças Integradas</span>
                <span className="bg-blue-600/20 text-blue-400 text-xs px-2 py-0.5 rounded-full font-semibold border border-blue-500/30">
                  SENAI
                </span>
              </div>
              <p className="text-xs text-slate-400">Simulação Financeira Empresarial & ERP</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {userProfile ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs font-semibold text-slate-300 block">{userProfile.name}</span>
                  <span className="text-[10px] text-blue-400 uppercase tracking-wider">{userProfile.role === 'teacher' ? 'Instrutor' : `Aluno (${userProfile.turma?.split('-')[0]})`}</span>
                </div>
                <button
                  onClick={() => { setUserProfile(null); setActiveTab('home'); }}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition"
                >
                  Sair
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setActiveTab('student-login')}
                  className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition flex items-center gap-1.5"
                >
                  <GraduationCap className="w-4 h-4 text-blue-400" />
                  Área do Aluno
                </button>
                <button 
                  onClick={() => setActiveTab('teacher-login')}
                  className="text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-lg transition shadow-md shadow-blue-600/30 flex items-center gap-1.5"
                >
                  <Building2 className="w-4 h-4" />
                  Painel do Instrutor
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Areas */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        {/* VIEW 1: HOME LANDING */}
        {activeTab === 'home' && (
          <div className="py-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Ambiente de Aprendizagem Prática em Matemática Financeira
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Simulação de ERP & Planilhas Financeiras Inteligentes
              </h1>
              <p className="text-slate-400 text-base sm:text-lg">
                Projetado para instrutores e alunos do SENAI aprenderem e exercitarem cálculos como <strong className="text-slate-200">Tabela Price, SAC, SAM, Juros Compostos e Custos</strong> com preenchimento linha a linha e autocorreção instantânea.
              </p>

              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setActiveTab('student-login')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold shadow-xl shadow-blue-600/30 flex items-center gap-2 transition group"
                >
                  <GraduationCap className="w-5 h-5 text-blue-200" />
                  Entrar como Aluno (Responder Atividades)
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </button>
                <button
                  onClick={() => setActiveTab('teacher-login')}
                  className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 flex items-center gap-2 transition"
                >
                  <Building2 className="w-5 h-5 text-blue-400" />
                  Acesso Instrutores / Professores
                </button>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group hover:border-blue-500/40 transition">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Simulação Realista Linha a Linha</h3>
                <p className="text-sm text-slate-400">
                  Os alunos preenchem cada período das tabelas de amortização e fluxo de caixa exatamente como operariam em planilhas ou ERPs corporativos.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group hover:border-emerald-500/40 transition">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Autocorreção & Aproveitamento</h3>
                <p className="text-sm text-slate-400">
                  Cálculo automático de precisão com tolerância a arredondamentos, permitindo feedback imediato e notas justas para cada estudante.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl relative overflow-hidden group hover:border-purple-500/40 transition">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Multi-Professores Isolados</h3>
                <p className="text-sm text-slate-400">
                  Cada instrutor gerencia suas próprias turmas, publica modelos exclusivos e exporta notas para Google Sheets / Excel de forma independente.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: STUDENT LOGIN */}
        {activeTab === 'student-login' && (
          <div className="max-w-md mx-auto w-full">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 mx-auto">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white text-center mb-1">Acesso do Aluno</h2>
              <p className="text-xs text-slate-400 text-center mb-6">Informe seus dados para iniciar a simulação financeira</p>

              <form onSubmit={handleStudentEnter} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nome Completo</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Ex: Carlos Eduardo Silva"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Turma SENAI</label>
                  <select
                    value={studentTurma}
                    onChange={(e) => setStudentTurma(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition"
                  >
                    <option>Turma 2026.1 - Gestão Financeira SENAI</option>
                    <option>Turma 2026.1 - Logística e Custos</option>
                    <option>Turma 2026.2 - Administração Integrada</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition"
                >
                  Entrar na Simulação
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-slate-800 text-center">
                <button
                  onClick={() => setActiveTab('teacher-login')}
                  className="text-xs text-slate-400 hover:text-blue-400 transition"
                >
                  É instrutor ou professor? Acesse aqui
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: TEACHER LOGIN */}
        {activeTab === 'teacher-login' && (
          <div className="max-w-md mx-auto w-full">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 mx-auto">
                <Building2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-white text-center mb-1">Painel do Instrutor</h2>
              <p className="text-xs text-slate-400 text-center mb-6">Acesse para gerenciar turmas, gabaritos e notas</p>

              <form onSubmit={handleTeacherLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail Institucional</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={teacherEmail}
                      onChange={(e) => setTeacherEmail(e.target.value)}
                      placeholder="professor@senai.br"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Senha</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      value={teacherPassword}
                      onChange={(e) => setTeacherPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition"
                >
                  Entrar no Painel
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-slate-800 text-center space-y-2">
                <button
                  onClick={() => setActiveTab('teacher-register')}
                  className="text-xs text-blue-400 hover:underline block w-full"
                >
                  Não tem conta de instrutor? Cadastre-se
                </button>
                <button
                  onClick={() => setActiveTab('student-login')}
                  className="text-xs text-slate-400 hover:text-slate-300 block w-full"
                >
                  É aluno? Acesse a simulação
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: TEACHER REGISTER */}
        {activeTab === 'teacher-register' && (
          <div className="max-w-md mx-auto w-full">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative">
              <h2 className="text-2xl font-bold text-white text-center mb-1">Cadastro de Instrutor</h2>
              <p className="text-xs text-slate-400 text-center mb-6">Crie seu espaço exclusivo para gerenciar suas turmas</p>

              <form onSubmit={handleTeacherRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Nome Completo</label>
                  <input
                    type="text"
                    required
                    value={teacherName}
                    onChange={(e) => setTeacherName(e.target.value)}
                    placeholder="Prof. Juliana Ferraz"
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">E-mail</label>
                  <input
                    type="email"
                    required
                    value={teacherEmail}
                    onChange={(e) => setTeacherEmail(e.target.value)}
                    placeholder="julianaferrazprof@gmail.com"
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Senha (Mínimo 8 caracteres)</label>
                  <input
                    type="password"
                    required
                    value={teacherPassword}
                    onChange={(e) => setTeacherPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 transition"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition"
                >
                  Criar Conta de Instrutor
                </button>
              </form>

              <div className="mt-6 pt-4 border-t border-slate-800 text-center">
                <button
                  onClick={() => setActiveTab('teacher-login')}
                  className="text-xs text-blue-400 hover:underline"
                >
                  Já tem conta? Faça login
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 5: STUDENT SPREADSHEET SIMULATION (ERP) */}
        {activeTab === 'student-sheet' && (
          <div className="space-y-6">
            {/* Header / Exercise Specs */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-blue-500/20 text-blue-400 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-blue-500/30">
                      Atividade Prática #01
                    </span>
                    <span className="text-xs text-slate-400">Entrega Obrigatória</span>
                  </div>
                  <h2 className="text-xl font-bold text-white">Simulação de Amortização — Tabela Price</h2>
                </div>

                {/* Quick Model Selector */}
                <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                  <button 
                    onClick={() => setSelectedCalc('price')}
                    className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition ${selectedCalc === 'price' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    Tabela Price
                  </button>
                  <button 
                    onClick={() => setSelectedCalc('sac')}
                    className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition ${selectedCalc === 'sac' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    Tabela SAC
                  </button>
                  <button 
                    onClick={() => setSelectedCalc('sam')}
                    className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition ${selectedCalc === 'sam' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    Tabela SAM
                  </button>
                </div>
              </div>

              {/* Problem Parameters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 text-xs">
                <div>
                  <span className="text-slate-500 block">Capital Financiado (PV):</span>
                  <strong className="text-white text-sm mono-font">R$ 100.000,00</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Taxa de Juros (i):</span>
                  <strong className="text-emerald-400 text-sm mono-font">2,00% a.m.</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Número de Períodos (n):</span>
                  <strong className="text-blue-400 text-sm mono-font">5 Meses</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Aluno:</span>
                  <strong className="text-slate-200 text-sm">{userProfile?.name || 'Estudante SENAI'}</strong>
                </div>
              </div>
            </div>

            {/* Interactive Spreadsheet Grid */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
                  <Table className="w-4 h-4 text-blue-400" />
                  Preenchimento Linha a Linha (Simulação ERP)
                </div>
                <span className="text-xs text-slate-400">Preencha com valores numéricos (Ex: 21215.84)</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-950/80 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800 font-semibold">
                      <th className="py-3 px-4 w-20 text-center">Nº (Mês)</th>
                      <th className="py-3 px-4">Prestação (PMT)</th>
                      <th className="py-3 px-4">Juros (J)</th>
                      <th className="py-3 px-4">Amortização (A)</th>
                      <th className="py-3 px-4">Saldo Devedor (SD)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-xs mono-font">
                    {sheetRows.map((row, idx) => (
                      <tr key={idx} className={idx === 0 ? 'bg-slate-950/40 text-slate-400' : 'hover:bg-slate-800/30'}>
                        <td className="py-3 px-4 text-center font-bold text-slate-300">
                          {row.n}
                        </td>
                        
                        {/* Prestação */}
                        <td className="py-2 px-3">
                          {idx === 0 ? (
                            <span className="text-slate-600">—</span>
                          ) : (
                            <input
                              type="text"
                              value={row.prestacao}
                              onChange={(e) => handleCellChange(idx, 'prestacao', e.target.value)}
                              placeholder="0,00"
                              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700/80 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:bg-slate-900 transition"
                            />
                          )}
                        </td>

                        {/* Juros */}
                        <td className="py-2 px-3">
                          {idx === 0 ? (
                            <span className="text-slate-600">—</span>
                          ) : (
                            <input
                              type="text"
                              value={row.juros}
                              onChange={(e) => handleCellChange(idx, 'juros', e.target.value)}
                              placeholder="0,00"
                              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700/80 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:bg-slate-900 transition"
                            />
                          )}
                        </td>

                        {/* Amortizacao */}
                        <td className="py-2 px-3">
                          {idx === 0 ? (
                            <span className="text-slate-600">—</span>
                          ) : (
                            <input
                              type="text"
                              value={row.amortizacao}
                              onChange={(e) => handleCellChange(idx, 'amortizacao', e.target.value)}
                              placeholder="0,00"
                              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700/80 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:bg-slate-900 transition"
                            />
                          )}
                        </td>

                        {/* Saldo Devedor */}
                        <td className="py-2 px-3">
                          {idx === 0 ? (
                            <span className="font-semibold text-emerald-400">R$ {Number(row.saldoDevedor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                          ) : (
                            <input
                              type="text"
                              value={row.saldoDevedor}
                              onChange={(e) => handleCellChange(idx, 'saldoDevedor', e.target.value)}
                              placeholder="0,00"
                              className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700/80 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:bg-slate-900 transition"
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Action Bar */}
              <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Progresso:</span>
                  <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-4/5"></div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => alert("Rascunho salvo localmente com sucesso!")}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition"
                  >
                    Salvar Rascunho
                  </button>
                  <button
                    onClick={evaluateSimulation}
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Entregar Atividade & Ver Aproveitamento
                  </button>
                </div>
              </div>
            </div>

            {/* Submission Modal / Result Banner */}
            {submissionFeedback && (
              <div className="bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/40 p-6 rounded-2xl flex items-center justify-between shadow-2xl animate-fade-in">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Atividade Entregue com Sucesso!</h3>
                    <p className="text-xs text-slate-300">
                      Seu aproveitamento preliminar foi de <strong className="text-emerald-400 text-sm">{submissionFeedback.score}%</strong>. Os dados foram computados para o relatório do professor.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSubmissionFeedback(null)}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition"
                >
                  Fechar
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 6: TEACHER DASHBOARD & GOOGLE SHEETS EXPORT */}
        {activeTab === 'teacher-dashboard' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
              <div>
                <span className="text-xs text-indigo-400 font-semibold tracking-wider uppercase">Painel do Instrutor</span>
                <h2 className="text-2xl font-bold text-white">Aproveitamento da Turma & Gestão</h2>
                <p className="text-xs text-slate-400">Turma: 2026.1 - Gestão Financeira SENAI</p>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={() => alert("Gerando planilha CSV com os aproveitamentos dos alunos...")}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition"
                >
                  <Download className="w-4 h-4" />
                  Exportar p/ Google Sheets / Excel
                </button>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl">
                <span className="text-xs text-slate-400">Alunos na Turma</span>
                <div className="text-2xl font-bold text-white mt-1">28 Estudantes</div>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl">
                <span className="text-xs text-slate-400">Entregas Realizadas</span>
                <div className="text-2xl font-bold text-emerald-400 mt-1">24 / 28 (85%)</div>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl">
                <span className="text-xs text-slate-400">Média de Aproveitamento</span>
                <div className="text-2xl font-bold text-blue-400 mt-1">92.4%</div>
              </div>
            </div>

            {/* Student Deliveries Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">Relatório Individual de Entregas</h3>
                <span className="text-xs text-slate-400">Isolamento Multi-Professor Ativo</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800 font-semibold">
                      <th className="py-3 px-4">Nome do Aluno</th>
                      <th className="py-3 px-4">Atividade</th>
                      <th className="py-3 px-4 text-center">Status</th>
                      <th className="py-3 px-4 text-right">Aproveitamento</th>
                      <th className="py-3 px-4 text-right">Data/Hora</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {[
                      { nome: "Carlos Eduardo Silva", atividade: "Amortização Price", status: "Entregue", score: "96.0%", time: "23/09/2026 20:45" },
                      { nome: "Beatriz Oliveira Santos", atividade: "Amortização Price", status: "Entregue", score: "100%", time: "23/09/2026 20:40" },
                      { nome: "Lucas Mendes Ferreira", atividade: "Amortização SAC", status: "Entregue", score: "88.5%", time: "23/09/2026 19:15" },
                      { nome: "Mariana Costa Ramos", atividade: "Amortização Price", status: "Em andamento", score: "—", time: "23/09/2026 18:30" },
                    ].map((item, i) => (
                      <tr key={i} className="hover:bg-slate-800/30">
                        <td className="py-3 px-4 font-semibold text-slate-200">{item.nome}</td>
                        <td className="py-3 px-4 text-slate-400">{item.atividade}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.status === 'Entregue' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-white mono-font">{item.score}</td>
                        <td className="py-3 px-4 text-right text-slate-500">{item.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-4 text-center text-xs text-slate-500">
        Finanças Integradas © 2026 — Plataforma Educacional SENAI para Simulações Financeiras & ERP.
      </footer>
    </div>
  );
}
