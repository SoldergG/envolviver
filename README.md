# Envolviver — versão redesenhada

**Em produção:** https://envolviver.vercel.app · **Repo:** https://github.com/SoldergG/envolviver

Reconstrução de [envolviver.pt](https://envolviver.pt) com linguagem visual Apple,
seguindo os princípios das Human Interface Guidelines adaptados a web.

Conteúdo e assets extraídos do site original — a extração completa está em
`~/Desktop/envolviver-site/`.

```bash
npm run dev     # http://localhost:3000
npm run build   # 26 páginas estáticas
npm start
```

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4
· Vercel Blob (conteúdo e imagens) · Clerk (login do painel).

## Painel de administração — `/admin`

Edita textos e imagens do site sem tocar em código.

O conteúdo original vive em `lib/content.ts` e serve de base. O painel grava
um documento JSON no Vercel Blob que sobrepõe o que foi editado — se o Blob
falhar ou ainda não existir, o site serve os valores originais e nunca fica
em branco. O botão "Repor tudo" apaga as edições e volta ao original.

Oito separadores: Início, Serviços, AEC, CAF, A Envolviver, Férias, Notícias
e Contactos. Cada um grava a sua secção. As imagens sobem direto para o Blob
(JPEG, PNG, WebP, AVIF ou GIF, até 8 MB) e a página revalida na hora.

### Segurança

`/admin` e `/api/admin` exigem sessão Clerk, verificada no `proxy.ts` **e**
outra vez nas server actions — o middleware sozinho não chega.

Sem as chaves do Clerk, o painel **fecha-se**: mostra o que falta configurar
e recusa gravar (`503`). O `proxy.ts` deixa passar nesse estado para não
derrubar o site público, já que o matcher cobre todas as rotas.

## Estrutura

```
app/
├── layout.tsx                        nav + rodapé + metadata + OG
├── page.tsx                          home
├── a-envolviver/                     quem somos, objetivos, como fazemos
├── enriquecimento-curricular/        AEC (índice + 5 atividades)
├── apoio-a-familia/                  CAF (índice + 5 atividades)
├── ferias-e-interrupcoes/            + PDFs para descarregar
├── noticias/                         listagem + 4 artigos
├── contactos/                        formulário + morada + mapa
├── sitemap.ts · robots.ts · not-found.tsx
└── globals.css                       ⭐ o design system inteiro

components/
├── Nav.tsx              barra translúcida, menu móvel a full screen
├── Footer.tsx           sitemap em 4 colunas
├── Logo.tsx             o anel de 9 cores, agora em SVG
├── Reveal.tsx           entrada ao scroll (progressive enhancement)
├── ActivityCard.tsx · ActivityDetail.tsx · ProgrammePage.tsx
├── ContactForm.tsx      formulário acessível, sem CAPTCHA
└── Section.tsx · Arrow.tsx

lib/
├── content.ts           ⭐ todo o texto do site, tipado
└── color.ts             contraste WCAG + variantes de acento por tema
```

Para editar textos, mexe só em `lib/content.ts`.

## Decisões de design

**Tipografia.** SF Pro nativa nos dispositivos Apple (`-apple-system`), Inter como
reserva. Corpo a 17px — o default da HIG, contra os 11px do original. Títulos com
tracking apertado (-0.035em) e `clamp()` para escalarem sem media queries.

**Cor.** O arco-íris de 9 cores da marca é a assinatura, mas entra contido: uma
régua de 3px sob a navegação, uma cor por atividade, pontos de acento. O resto é
a escala neutra da Apple (`#1d1d1f` / `#f5f5f7`).

**Contraste.** O amarelo `#fcd805` e o lima `#c9cc2c` desaparecem sobre branco;
o índigo `#6e7ca6` desaparece sobre preto. `lib/color.ts` escurece ou clareia cada
acento até 3:1 contra o fundo do tema, mantendo a matiz. Os badges de serviço usam
`onColor()` para escolher texto claro ou escuro pela luminância — todos passam AA.

O vermelho `#e72a25` (4.42:1 com branco) e o índigo `#6e7ca6` (4.08:1 com preto)
não chegam a 4.5:1 com nenhuma cor de texto. Por isso **nunca suportam texto** —
só aparecem como pontos e barras decorativas, e a informação está sempre também
no texto ao lado.

**Materiais.** A navegação usa `backdrop-blur-xl` + `backdrop-saturate-150` sobre
um véu a 72%, com fallback opaco via `@supports`. Escrito com os utilitários do
Tailwind de propósito: à mão, o Lightning CSS descartava a versão sem prefixo.

**Movimento.** Entrada ao scroll via IntersectionObserver. Respeita
`prefers-reduced-motion`. O conteúdo está visível no HTML estático — a animação só
liga depois de o `<script>` inline marcar `html.js`, por isso sem JS nada desaparece.

**Tema escuro.** Automático, pelo `prefers-color-scheme`. Todos os tokens têm par.

## Acessibilidade

- `lang="pt-PT"` (o original dizia `en`)
- Link "saltar para o conteúdo"
- Hierarquia h1 → h2 → h3 correta em todas as páginas
- Alvos de toque ≥44px, incluindo os links do rodapé em ecrãs pequenos
- Foco visível com `:focus-visible`
- Todas as imagens com `alt`; as decorativas com `aria-hidden`
- Sem overflow horizontal em nenhuma largura

## O que falta ligar

1. **Clerk** — o painel está fechado até os termos do Marketplace serem aceites
   na conta Vercel. Depois: `vercel integration add clerk`, `vercel env pull`,
   e novo deploy. As variáveis estão em `.env.example`.
2. **Formulário de contactos** — compõe uma mensagem e abre o cliente de email.
   Funciona sem backend, mas para envio no servidor liga a um endpoint (Resend,
   Supabase). O original usava um CAPTCHA Telerik que não é reproduzível.
3. **Imagens** — as fotos das atividades vêm do original a 290×208. São pequenas
   para hero ou full-bleed; o layout mantém-nas em cartões contidos. Fotografia
   nova em alta resolução é a maior melhoria visual disponível.
4. **Conteúdo desatualizado** — a última notícia é de fevereiro de 2022. As páginas
   `/ferias-e-interrupcoes` e a antiga `/links` estavam vazias no original.
5. **Área reservada** — aponta para `educa.espalhaideias.pt`, fora deste projeto.
6. **OG image** — as tags Open Graph estão postas, falta a imagem.
