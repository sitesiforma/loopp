# Loopp — Handoff do Projeto

**Tagline:** Feche o ciclo do seu evento.  
**Data:** 2026-06-04  
**Status:** Protótipo funcional rodando em localhost

---

## O que é

Loopp é uma plataforma de planejamento sustentável para eventos. Clientes descrevem seu evento e recebem um plano personalizado montado por um time interno (admin) usando um banco de fornecedores sustentáveis cadastrados.

### Fluxo principal

```
Landing → Cadastro → Dashboard do Cliente
                          ↓
                    Novo Pedido (formulário)
                          ↓
                    Status: "Aguardando análise"
                          ↓
             [ADMIN] vê o pedido, seleciona fornecedores,
                    escreve o planejamento
                          ↓
                    Admin envia → "Planejamento enviado"
                          ↓
             [CLIENTE] vê o planejamento, aprova ou pede ajuste
                          ↓
                    Status: "Aprovado" ou "Ajuste solicitado"
```

---

## Como rodar

```bash
cd C:\Users\lucca\projetos\loopp
npm run dev
# Abre em http://localhost:3000
```

> **Nota:** `npm run dev` já está configurado com `--webpack`. Turbopack não funciona neste ambiente Windows com bindings WASM. Se der erro de porta ocupada, abre em `:3001`.

### Credenciais de teste

| Papel | Email | Senha |
|---|---|---|
| Admin | `admin@loopp.com` | `admin123` |
| Cliente | qualquer email | qualquer senha |

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16.2.7 (App Router) |
| Estilos | Tailwind CSS v4 |
| Componentes UI | shadcn/ui — variante **base-ui** (`@base-ui/react`) |
| Animações | framer-motion v12 |
| Ícones | lucide-react |
| Toasts | sonner |
| Persistência | `localStorage` (protótipo — sem banco de dados) |
| Tipagem | TypeScript 5 |

### Atenção: shadcn usa base-ui, não Radix

O shadcn instalado aqui usa `@base-ui/react` em vez de Radix UI. Isso tem uma diferença importante no `Button`:

```tsx
// ❌ NÃO funciona (Radix pattern)
<Button asChild>
  <Link href="/rota">Texto</Link>
</Button>

// ✅ Correto (base-ui pattern)
<Button render={<Link href="/rota" />}>
  Texto
</Button>
```

---

## Estrutura de arquivos

```
loopp/
├── app/
│   ├── layout.tsx               # Root layout — fontes, Toaster
│   ├── page.tsx                 # Landing page (pública)
│   ├── globals.css              # Variáveis de cor, tipografia base
│   ├── login/
│   │   └── page.tsx             # Formulário de login
│   ├── cadastro/
│   │   └── page.tsx             # Formulário de cadastro (PF/PJ)
│   ├── dashboard/
│   │   ├── page.tsx             # Painel do cliente — lista de pedidos
│   │   └── loading.tsx          # Skeleton de carregamento
│   ├── novo-pedido/
│   │   └── page.tsx             # Formulário de criação de pedido
│   ├── pedido/[id]/
│   │   └── page.tsx             # Detalhe do pedido (visão do cliente)
│   └── admin/
│       ├── page.tsx             # Painel admin — tabela de pedidos
│       ├── loading.tsx          # Skeleton de carregamento
│       ├── pedido/[id]/
│       │   └── page.tsx         # Detalhe do pedido (visão admin)
│       └── fornecedores/
│           └── page.tsx         # CRUD de fornecedores
│
├── components/
│   ├── Logo.tsx                 # Logo "Loopp" com SVG inline
│   ├── Header.tsx               # Header com logout e nome do usuário
│   ├── StatusBadge.tsx          # Badge colorido por status do pedido
│   ├── Stepper.tsx              # Timeline de progresso do pedido
│   └── ui/                      # Componentes shadcn/ui gerados
│       ├── button.tsx
│       ├── input.tsx
│       ├── select.tsx
│       ├── textarea.tsx
│       ├── badge.tsx
│       ├── card.tsx
│       ├── label.tsx
│       ├── dialog.tsx
│       ├── checkbox.tsx
│       ├── separator.tsx
│       └── sonner.tsx
│
├── lib/
│   ├── types.ts                 # Todos os tipos TypeScript do domínio
│   ├── mock-data.ts             # Dados mock + funções de localStorage
│   └── utils.ts                 # cn() helper (shadcn padrão)
│
├── package.json
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── components.json              # Config do shadcn/ui
```

---

## Tipos de dados (`lib/types.ts`)

```typescript
// Os dois papéis da plataforma
type UserType = "cliente" | "admin"

// Ciclo de vida de um pedido
type StatusPedido =
  | "aguardando"           // recém criado
  | "em_planejamento"      // admin está montando
  | "planejamento_enviado" // admin enviou, cliente não respondeu
  | "aprovado"             // cliente aprovou
  | "ajuste_solicitado"    // cliente pediu mudança

// Entidade principal
interface Pedido {
  id: string
  clienteId: string
  clienteNome: string
  nomeEvento: string
  tipoEvento: TipoEvento
  dataEvento: string          // ISO date
  localizacao: string
  tamanho: TamanhoEvento
  orcamento: string
  descricao: string
  status: StatusPedido
  planejamento?: string       // texto escrito pelo admin
  fornecedoresSelecionados?: string[]
  historico: HistoricoStatus[]
  criadoEm: string
}

interface Fornecedor {
  id: string
  nome: string
  categoria: CategoriaFornecedor
  descricao: string
  contato: string
  tags: string[]
}
```

---

## Persistência (`lib/mock-data.ts`)

Todas as funções de leitura/escrita usam `localStorage`. As chaves são:

| Chave | Conteúdo |
|---|---|
| `loopp_pedidos` | `Pedido[]` — todos os pedidos |
| `loopp_fornecedores` | `Fornecedor[]` — banco de fornecedores |
| `loopp_user` | `User` — usuário logado atualmente |

```typescript
// Padrão de uso em qualquer página
import { getPedidos, savePedidos, getUser, setUser } from "@/lib/mock-data"
```

Na primeira visita, o `localStorage` é populado com 3 pedidos mock e 5 fornecedores pré-cadastrados.

---

## Identidade visual

### Cores

```css
--background:  #F5EDD8  /* bege — fundo de todas as páginas */
--primary:     #2D6A4F  /* verde escuro — botões, títulos, CTA */
--accent:      #4A90D9  /* azul médio — destaques, badges info */
--secondary:   #F9E784  /* amarelo pastel — tags, badge "aguardando" */
--foreground:  #1A1A1A  /* texto principal */
--muted-foreground: #6B7280  /* texto secundário */
--card:        #FFFFFF  /* fundo dos cards */
```

### Tipografia

| Uso | Fonte | Peso |
|---|---|---|
| Títulos (h1, h2, h3) | **Fraunces** (Google Fonts) | 400–900 |
| Corpo, UI, labels | **DM Sans** (Google Fonts) | 400–700 |

Aplicar via CSS variable:
```css
font-family: var(--font-fraunces);  /* títulos */
font-family: var(--font-dm-sans);   /* corpo */
```

### Raio e sombra padrão dos cards

```css
border-radius: 16px;  /* rounded-2xl */
box-shadow: 0 2px 16px rgba(0,0,0,0.07);
```

---

## Status badges — cores

| Status | Cor |
|---|---|
| Aguardando análise | Amarelo `#F9E784` / texto `#7A6800` |
| Em planejamento | Azul claro `#4A90D9/15` / texto `#1A5FA8` |
| Planejamento enviado | Verde claro `#2D6A4F/15` / texto `#2D6A4F` |
| Aprovado | Verde sólido `#2D6A4F` / texto branco |
| Ajuste solicitado | Laranja suave |

---

## Rotas e proteção de acesso

Toda proteção é feita no `useEffect` de cada página via `getUser()`. Não há middleware real.

| Rota | Acesso |
|---|---|
| `/` | Pública |
| `/login` | Pública |
| `/cadastro` | Pública |
| `/dashboard` | Apenas clientes |
| `/novo-pedido` | Apenas clientes |
| `/pedido/[id]` | Apenas clientes |
| `/admin` | Apenas admin |
| `/admin/pedido/[id]` | Apenas admin |
| `/admin/fornecedores` | Apenas admin |

Redirecionamentos:
- Não logado → `/login`
- Cliente tenta acessar `/admin` → `/dashboard`
- Admin tenta acessar `/dashboard` → `/admin`

---

## Fornecedores pré-cadastrados

| Nome | Categoria |
|---|---|
| Sustenta Carnaval | Resíduos Têxteis |
| Mulheres do Sul Global | Confecção Sustentável |
| EcoFest Energia | Energia Renovável |
| Verde Cena | Cenografia Sustentável |
| Ciclo Logística | Logística Verde |

---

## Pedidos mock de exemplo

| Evento | Cliente | Status |
|---|---|---|
| Casamento Sustentável — Marina & Pedro | Marina Costa | Em planejamento |
| Pulse Summit 2026 | Agência Pulse Creative | Planejamento enviado |
| Festa de 15 Anos — Isabela | João Alves | Aguardando análise |

O pedido "Pulse Summit 2026" já tem planejamento escrito — útil para testar o fluxo de aprovação.

---

## Problemas conhecidos / limitações do protótipo

1. **Sem autenticação real** — qualquer email/senha cria conta. A sessão fica só no `localStorage` da aba.
2. **Sem banco de dados** — todos os dados somem se o `localStorage` for limpo.
3. **Admin único** — hardcoded como `admin@loopp.com`. Não há sistema de convite.
4. **Pedidos mock globais** — os 3 pedidos mock aparecem para qualquer cliente novo (IDs de cliente não coincidem). Em produção, o filtro por `clienteId` resolveria isso.
5. **Sem upload de arquivos** — o planejamento é texto puro (markdown não renderizado).
6. **lightningcss nativo** — em Windows via Git Bash, o binário `lightningcss-win32-x64-msvc` precisa ser instalado via PowerShell. Já resolvido no projeto atual.

---

## Próximos passos sugeridos (produção)

- [ ] Substituir `localStorage` por Supabase (banco + auth)
- [ ] Implementar Row-Level Security no Supabase para isolamento por cliente
- [ ] Adicionar upload de anexos ao pedido (imagens de referência)
- [ ] Renderizar markdown no planejamento enviado ao cliente
- [ ] Notificações por email (Resend) quando status muda
- [ ] Painel de métricas no admin (pedidos por status, por tipo, por mês)
- [ ] Sistema de comentários/mensagens dentro do pedido
- [ ] Multi-admin com controle de acesso por papel
