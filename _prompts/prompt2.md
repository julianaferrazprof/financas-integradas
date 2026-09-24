# Prompt 2 — Autenticação e Acesso (Finanças Integradas)

Agora vamos criar o sistema de autenticação e controle de acesso da plataforma **Finanças Integradas**. A aplicação atende a dois perfis com experiências distintas:
1. **Professor / Instrutor (SENAI)**: Acesso via conta autenticada (Login / Cadastro) com sessão persistente.
2. **Aluno**: Acesso rápido e simplificado informando **Nome Completo** e selecionando/informando o código da **Turma**.

Use o Neon Auth / PostgreSQL já configurado no projeto **"Finanças Integradas"**.

---

## 1. Portal do Professor (Instrutor)

### Tela de Login (Professor)
- Campo de E-mail
- Campo de Senha
- Botão "Entrar no Painel do Instrutor"
- Link "Não tem conta de instrutor? Cadastre-se"
- Alternador/Link de acesso rápido: "É aluno? Acesse a simulação aqui"

### Tela de Cadastro (Professor)
- Campo de Nome Completo
- Campo de E-mail
- Campo de Senha (mínimo 8 ou 9 caracteres)
- Campo de Confirmar Senha
- Botão "Criar conta de Instrutor"
- Link "Já tem conta? Faça login"

---

## 2. Portal de Acesso do Aluno (Simulação ERP / Planilhas)

### Tela de Entrada do Aluno
- Campo de **Nome Completo**
- Seleção de **Turma** (ou campo de Código da Turma)
- Botão "Acessar Simulações e Atividades"

---

## 3. Regras Importantes de Autenticação e Sessão
- **Professor**:
  - Após o cadastro, registrar o professor na tabela `professores` do Neon.
  - Após o login com sucesso, redirecionar para o painel principal (`/dashboard` ou `/professor`).
  - Se o login falhar, exibir mensagem de erro clara e amigável (ex: "Credenciais inválidas").
  - Manter sessão persistente ativa no navegador.
  - Se já estiver autenticado e tentar acessar a tela de login, redirecionar automaticamente para o painel do professor.
- **Aluno**:
  - Salvar os dados do aluno na tabela `alunos` vinculada à `turma_id` correspondente.
  - Redirecionar o aluno diretamente para o ambiente de atividades/planilhas da turma (`/aluno/atividades`).
  - Manter o estado do aluno ativo na sessão local durante o preenchimento da atividade.

---

## 4. Stack Tecnológica
- React + Vite
- TypeScript
- Tailwind CSS
- Lucide React (Ícones) / Shadcn UI

---

## 5. Design e Identidade Visual
- **Tema**: Estilo ERP Financeiro Moderno / Corporativo SENAI.
- **Paleta de Cores**: Tons profissionais de Azul Marinho / Azul Royal (#1E3A8A / #2563EB), Cinza Escuro Slate e detalhes em Verde Esmeralda/Financeiro (#10B981) para elementos de status positivo e moeda.
- **Header/Branding**: Logo e tipografia com o título **"Finanças Integradas"** e subtítulo/badge **"SENAI - Simulação Financeira Empresarial"**.
- Componentes com cantos arredondados modernos, sombras suaves (cards elevados) e excelente legibilidade de tabelas e formulários.
