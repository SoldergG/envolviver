/**
 * O Clerk só fica ativo quando as duas chaves existem.
 *
 * Sem elas, o `clerkMiddleware` rebenta em todos os pedidos — e como o
 * matcher do proxy cobre o site inteiro, isso derrubaria também as
 * páginas públicas. Por isso o proxy deixa passar, e a administração
 * fecha-se: sem autenticação configurada não se escreve nada.
 */
export const clerkConfigured = Boolean(
  process.env.CLERK_SECRET_KEY &&
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
);
