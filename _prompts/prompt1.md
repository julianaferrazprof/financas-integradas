# Prompt 1 — Base do projeto + Neon completo (Finanças Integradas)

Você vai criar o banco de dados PostgreSQL no Neon para o sistema **Finanças Integradas**, uma plataforma educacional para instrutores e alunos do SENAI para simulação de rotinas e cálculos financeiros empresariais (estilo ERP / planilha inteligente linha a linha).

Você tem acesso ao Neon via MCP e o projeto já foi criado no Neon com o nome "Finanças Integradas". Crie toda a estrutura diretamente no Neon via MCP, sem necessidade de copiar SQL manualmente.

---

## Estrutura do Banco de Dados

Crie as seguintes tabelas com todos os campos e tipos especificados:

### 1. Tabela `professores` (Multi-instrutores)
- `id` (uuid, primary key, default gen_random_uuid())
- `nome` (text, not null)
- `email` (text, not null, unique)
- `created_at` (timestamptz, default now())

### 2. Tabela `turmas`
- `id` (uuid, primary key, default gen_random_uuid())
- `professor_id` (uuid, foreign key → professores.id, not null)
- `nome_turma` (text, not null) — Ex: "Turma 2026.1 - Logística / Finanças"
- `codigo_acesso` (text, unique) — Código simples para os alunos entrarem na turma
- `created_at` (timestamptz, default now())

### 3. Tabela `alunos`
- `id` (uuid, primary key, default gen_random_uuid())
- `turma_id` (uuid, foreign key → turmas.id, not null)
- `nome_completo` (text, not null)
- `email` (text, nullable)
- `created_at` (timestamptz, default now())

### 4. Tabela `atividades_financeiras` (Modelos criados pelos professores)
- `id` (uuid, primary key, default gen_random_uuid())
- `professor_id` (uuid, foreign key → professores.id, not null)
- `turma_id` (uuid, foreign key → turmas.id, not null)
- `titulo` (text, not null) — Ex: "Amortização SAC vs Price", "Análise de Custos e Markup"
- `tipo_calculo` (text, not null) — Ex: 'juros_simples', 'juros_compostos', 'porcentagem', 'custos_financeiros', 'tabela_price', 'sac', 'sam', 'pagamento_unico', 'pagamento_variavel', 'outro'
- `descricao_enunciado` (text)
- `parametros_iniciais` (jsonb, not null) — Ex: `{ "capital": 100000, "taxa": 0.02, "periodos": 12, "custos_fixos": 5000 }`
- `estrutura_colunas` (jsonb, not null) — Definição das colunas da planilha (cabeçalhos, tipo de dado esperado)
- `gabarito_esperado` (jsonb) — Linhas com valores corretos para autocorreção/cálculo de aproveitamento
- `data_limite_entrega` (timestamptz)
- `created_at` (timestamptz, default now())

### 5. Tabela `submissoes_alunos` (Entregas e simulação linha a linha)
- `id` (uuid, primary key, default gen_random_uuid())
- `atividade_id` (uuid, foreign key → atividades_financeiras.id, not null)
- `aluno_id` (uuid, foreign key → alunos.id, not null)
- `linhas_preenchidas` (jsonb, not null) — Matriz/array com o preenchimento linha a linha feito pelo aluno
- `status_entrega` (text, default 'em_andamento') — 'em_andamento', 'entregue', 'corrigido'
- `percentual_aproveitamento` (numeric) — De 0.00 a 100.00 calculado com base no gabarito
- `nota_final` (numeric) — Nota atribuída pelo professor (opcional ou automática)
- `feedback_professor` (text)
- `entregue_em` (timestamptz)
- `created_at` (timestamptz, default now())
- `updated_at` (timestamptz, default now())

---

## Regras de Segurança e Isolamento (RLS - Row Level Security)

1. Ative o **Row Level Security (RLS)** em todas as tabelas.
2. Configure as políticas (Policies) para garantir que:
   - Cada professor acesse, visualize, edite e exporte **apenas os seus próprios dados**, turmas, atividades e submissões dos seus respectivos alunos.
   - Os alunos consigam submeter suas respostas nas atividades correspondentes à sua turma.

---

## Finalização

Por fim, confirme que tudo foi criado corretamente listando as tabelas e seus campos.