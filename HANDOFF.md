# Loopp — Handoff do Projeto

**Tagline:** Feche o ciclo do seu evento.  
**Última atualização:** 2026-06-08  
**Status:** Protótipo funcional — localhost + produção no Vercel  
**URL de produção:** https://loopp-eight.vercel.app

---

## O que é

Loopp é uma plataforma de planejamento sustentável para eventos. Clientes descrevem seu evento e recebem um plano personalizado montado por um time interno (admin) usando um banco de fornecedores sustentáveis cadastrados. O site também tem páginas públicas de descoberta: vitrine de materiais, portfólio de cases e calculadora de impacto ambiental.

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
                    Status: "Aprovado" → card de impacto estimado aparece
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
| Deploy | Vercel (GitHub: `sitesiforma/loopp`) |

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
│   ├── login/page.tsx
│   ├── cadastro/page.tsx
│   ├── dashboard/
│   │   ├── page.tsx             # Painel do cliente — lista de pedidos
│   │   └── loading.tsx
│   ├── novo-pedido/page.tsx
│   ├── pedido/[id]/page.tsx     # Detalhe do pedido (cliente) + card de impacto
│   ├── vitrine/
│   │   ├── page.tsx             # Vitrine pública de materiais (filtros + grid)
│   │   └── loading.tsx
│   ├── cases/
│   │   ├── page.tsx             # Portfólio de cases
│   │   ├── loading.tsx
│   │   └── [slug]/
│   │       ├── page.tsx         # Detalhe editorial do case
│   │       └── loading.tsx
│   ├── calculadora/
│   │   ├── page.tsx             # Calculadora de impacto reativa (2 colunas)
│   │   └── loading.tsx
│   └── admin/
│       ├── page.tsx             # Painel admin — tabela de pedidos
│       ├── loading.tsx
│       ├── pedido/[id]/page.tsx # Detalhe do pedido (admin) + editor
│       └── fornecedores/
│           └── page.tsx         # CRUD de fornecedores + gestão de materiais
│
├── components/
│   ├── Logo.tsx
│   ├── Header.tsx               # Header com logout e nome do usuário
│   ├── StatusBadge.tsx          # Badge colorido por status do pedido
│   ├── Stepper.tsx              # Timeline de progresso do pedido
│   └── ui/                      # Componentes shadcn/ui gerados
│
├── lib/
│   ├── types.ts                 # Todos os tipos TypeScript do domínio
│   ├── mock-data.ts             # Dados mock + funções de localStorage
│   ├── impact-calculator.ts     # Lógica da calculadora de impacto
│   └── utils.ts                 # cn() helper (shadcn padrão)
│
├── package.json
├── next.config.ts
└── components.json
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

interface Pedido { ... }

// Material disponível na vitrine — vinculado a um Fornecedor
interface Material {
  id, nome, fornecedorId, fornecedorNome
  categoria: CategoriaVitrine   // Figurino | Resíduos Têxteis | Cenografia | ...
  tiposEvento: TipoEvento[]
  descricao, cor                // cor usada no placeholder visual do card
}

// Fornecedor agora inclui materiais gerenciados pelo admin
interface Fornecedor {
  id, nome, categoria, descricao, contato, tags
  materiais?: Material[]        // editável no painel admin/fornecedores
}

// Case do portfólio
interface EventoCase {
  slug, evento, tipo, cliente, ano
  desafio, solucao
  fornecedores: string[]
  impacto: { kgReaproveitado, co2Evitado, arvores, itensResgatados }
  depoimento, autorDepoimento
  corCard, fraseImpacto
}
```

---

## Calculadora de impacto (`lib/impact-calculator.ts`)

```typescript
calcularImpacto({ tipoEvento, convidados, fantasias, cenografia, decoracao })
// → { kgReaproveitado, co2Evitado, arvores, itensResgatados }

tamanhoParaConvidados(tamanho: TamanhoEvento) // → número médio de convidados
pedidoTemFantasias(tipoEvento)                // → boolean (true para Festa, Desfile, etc.)
formatNum(n)                                  // → "1.240" (formato pt-BR)
```

Constantes base: 0,5 kg/pessoa, CO₂ × 3,0, 21 kg CO₂/árvore/ano. Multiplicadores por tipo: Desfile 2,5×, Show 1,8×, Casamento 1,3×, Festa 1,2×, etc.

---

## Persistência (`lib/mock-data.ts`)

Todas as funções de leitura/escrita usam `localStorage`. As chaves são:

| Chave | Conteúdo |
|---|---|
| `loopp_pedidos` | `Pedido[]` — todos os pedidos |
| `loopp_fornecedores` | `Fornecedor[]` — banco de fornecedores (inclui materiais) |
| `loopp_user` | `User` — usuário logado atualmente |

Cases (`CASES_MOCK`) são dados estáticos — não vão para o localStorage.

Na primeira visita, o `localStorage` é populado com 3 pedidos mock e 5 fornecedores com 8 materiais pré-cadastrados.

---

## Identidade visual

### Cores

```css
--background:       #F5EDD8  /* bege — fundo de todas as páginas */
--primary:          #2D6A4F  /* verde escuro — botões, títulos, CTA */
--accent:           #4A90D9  /* azul médio — destaques, badges info */
--secondary:        #F9E784  /* amarelo pastel — tags, badge "aguardando" */
--foreground:       #1A1A1A  /* texto principal */
--muted-foreground: #6B7280  /* texto secundário */
--card:             #FFFFFF  /* fundo dos cards */
```

### Tipografia

| Uso | Fonte | Como aplicar |
|---|---|---|
| Títulos h1–h3 | **Fraunces** | `style={{ fontFamily: "var(--font-fraunces)" }}` |
| Corpo, UI, labels | **DM Sans** | padrão do body (já aplicado no globals.css) |

### Cards

```css
border-radius: 16px;  /* rounded-2xl */
box-shadow: 0 2px 16px rgba(0,0,0,0.07);
```

---

## Rotas e proteção de acesso

Toda proteção é feita no `useEffect` de cada página via `getUser()`. Não há middleware real.

| Rota | Acesso |
|---|---|
| `/` | Pública |
| `/vitrine` | Pública |
| `/cases` | Pública |
| `/cases/[slug]` | Pública |
| `/calculadora` | Pública |
| `/login` `/cadastro` | Pública |
| `/dashboard` `/novo-pedido` `/pedido/[id]` | Apenas clientes |
| `/admin` `/admin/pedido/[id]` `/admin/fornecedores` | Apenas admin |

---

## Dados mock pré-carregados

### Fornecedores (5) com materiais na vitrine (8)

| Fornecedor | Categoria | Materiais |
|---|---|---|
| Sustenta Carnaval | Resíduos Têxteis | Fantasias avulsas, Tecidos por quilo, Adereços de carnaval |
| Mulheres do Sul Global | Confecção Sustentável | Roupas com retalhos |
| EcoFest Energia | Energia Renovável | Geradores solares |
| Verde Cena | Cenografia Sustentável | Painéis cenográficos, Estruturas de isopor |
| Ciclo Logística | Logística Verde | Transporte de grande volume |

### Pedidos mock (3)

| Evento | Status |
|---|---|
| Casamento Sustentável — Marina & Pedro | Em planejamento |
| Pulse Summit 2026 (já tem planejamento escrito) | Planejamento enviado |
| Festa de 15 Anos — Isabela | Aguardando análise |

### Cases (3, estáticos)

| Case | Tipo |
|---|---|
| Desfile Misci — Rio Fashion Week 2024 | Desfile de Moda |
| Afropunk Rio 2024 | Festival Cultural |
| Casamento Fernanda & Rodrigo | Casamento |

---

## Deploy (Vercel)

- **URL:** https://loopp-eight.vercel.app
- **Repositório:** https://github.com/sitesiforma/loopp
- **Branch de produção:** `master`

Para deployar manualmente:
```bash
vercel --prod --yes
```

> **Nota sobre o package.json:** `lightningcss-win32-x64-msvc` está em `optionalDependencies` (não em `dependencies`) para que o Vercel/Linux o ignore. O `package-lock.json` está no `.gitignore` pelo mesmo motivo — gerado localmente no Windows, causaria falha no build do Vercel.

---

## Problemas conhecidos / limitações do protótipo

1. **Sem autenticação real** — qualquer email/senha cria conta. A sessão fica só no `localStorage` da aba.
2. **Sem banco de dados** — todos os dados somem se o `localStorage` for limpo.
3. **Admin único** — hardcoded como `admin@loopp.com`. Não há sistema de convite.
4. **Pedidos mock globais** — os 3 pedidos mock aparecem para qualquer cliente novo (IDs de cliente não coincidem). Em produção, o filtro por `clienteId` resolveria isso.
5. **Sem upload de arquivos** — o planejamento é texto puro (markdown não renderizado).
6. **lightningcss nativo** — em Windows via Git Bash, instalar sempre via PowerShell.

---

## Próximos passos sugeridos (produção)

- [ ] Substituir `localStorage` por Supabase (banco + auth)
- [ ] Implementar Row-Level Security no Supabase para isolamento por cliente
- [ ] Renderizar markdown no planejamento enviado ao cliente
- [ ] Notificações por email (Resend) quando status muda
- [ ] Adicionar upload de anexos ao pedido (imagens de referência)
- [ ] Painel de métricas no admin (pedidos por status, por tipo, por mês)
- [ ] Sistema de comentários/mensagens dentro do pedido
- [ ] Multi-admin com controle de acesso por papel
- [ ] Conectar vitrine ao fluxo de novo pedido (pré-selecionar materiais de interesse)
