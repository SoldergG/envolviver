export function SetupNotice() {
  return (
    <div className="shell py-20">
      <div className="max-w-xl">
        <h1 className="text-title">Falta ligar a autenticação</h1>
        <p className="muted text-lead pretty mt-4">
          O painel está fechado porque o Clerk ainda não está configurado.
          Sem login, o conteúdo do site não pode ser editado.
        </p>

        <ol className="mt-8 space-y-4 text-[0.9375rem]">
          <li className="flex gap-3">
            <span className="muted shrink-0 tabular-nums">1.</span>
            <span>
              Aceitar os termos do Clerk no Marketplace da Vercel — é um clique
              na conta, e não pode ser feito por mim.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="muted shrink-0 tabular-nums">2.</span>
            <span>
              Correr <code className="rounded bg-[var(--shell-2)] px-1.5 py-0.5">vercel integration add clerk</code>{" "}
              e depois <code className="rounded bg-[var(--shell-2)] px-1.5 py-0.5">vercel env pull</code>.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="muted shrink-0 tabular-nums">3.</span>
            <span>Voltar a fazer deploy. O painel abre sozinho.</span>
          </li>
        </ol>

        <p className="muted mt-8 text-[0.8125rem]">
          As variáveis necessárias estão listadas em <code>.env.example</code>.
        </p>
      </div>
    </div>
  );
}
