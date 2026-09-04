/**
 * Conteúdo do site, extraído de envolviver.pt (setembro 2026).
 * Fonte completa: ~/Desktop/envolviver-site/site-data.json
 */

export type Activity = {
  slug: string;
  name: string;
  color: string;
  photo: string;
  summary: string;
  bullets?: string[];
  paragraphs?: string[];
};

export const brand = {
  name: "Envolviver",
  tagline: "atividades pedagógicas e apoio à família",
  rainbow: [
    "#e72a25", "#f58221", "#fcd805", "#c9cc2c", "#7abc5d",
    "#13a89e", "#93d7e9", "#6e7ca6", "#cd3293",
  ],
};

export const contacts = {
  org: "Envolviver",
  address: [
    "Centro Empresarial de Algés",
    "Av. Bombeiros Voluntários de Algés 52, loja 8, Sala D",
    "1495-022 Algés",
  ],
  phone: "+351 96 153 50 77",
  phoneHref: "+351961535077",
  email: "geral@envolviver.pt",
  gps: { lat: 38.7057594, lng: -9.2266063 },
  mapsUrl:
    "https://www.google.com/maps/search/Centro+Empresarial+de+Alg%C3%A9s,+Av.+Bombeiros+Volunt%C3%A1rios+de+Alg%C3%A9s+52,+loja+8,+Sala+D,+1495-022+Alg%C3%A9s/@38.7057594,-9.2266063,21z",
  transport: [
    { mode: "Comboio", detail: "CP — Linha de Cascais, estação de Algés" },
    { mode: "Autocarro", detail: "Carris — 50, 51" },
    { mode: "Elétrico", detail: "Carris — 15" },
  ],
};

export const external = {
  recrutamento: "http://educa.espalhaideias.pt/recrutamento.aspx",
  areaReservada: "http://educa.espalhaideias.pt/educa-aec/login.aspx",
  areaEncEducacao: "https://envolviver.pt/areareservada_enceducacao/",
};

export const nav = [
  { label: "A Envolviver", href: "/a-envolviver" },
  { label: "Enriquecimento Curricular", href: "/enriquecimento-curricular" },
  { label: "Apoio à Família", href: "/apoio-a-familia" },
  { label: "Férias e Interrupções", href: "/ferias-e-interrupcoes" },
  { label: "Notícias", href: "/noticias" },
  { label: "Contactos", href: "/contactos" },
];

export const services = [
  {
    key: "aec",
    href: "/enriquecimento-curricular",
    eyebrow: "AEC",
    title: "Enriquecimento Curricular",
    blurb: "Cinco atividades que alargam o currículo do 1.º ciclo, gratuitas para todos os alunos.",
    color: "#f58221",
    count: 5,
  },
  {
    key: "caf",
    href: "/apoio-a-familia",
    eyebrow: "CAF",
    title: "Apoio à Família",
    blurb: "Acolhimento matinal e prolongamento de horário, ajustados ao horário real dos pais.",
    color: "#fcd805",
    count: 5,
  },
  {
    key: "ferias",
    href: "/ferias-e-interrupcoes",
    eyebrow: "Férias",
    title: "Férias e Interrupções Letivas",
    blurb: "Programas próprios para os períodos em que a escola para, mas a vida das famílias não.",
    color: "#c9cc2c",
    count: 0,
  },
];

export type AboutSection = {
  slug: string;
  title: string;
  body: string[];
  list?: string[];
};

export const about: { intro: string; sections: AboutSection[] } = {
  intro:
    "A Envolviver é uma associação que desenvolve atividades de animação e de tempos livres para crianças e jovens, com uma equipa técnico-pedagógica de vasta experiência.",
  sections: [
    {
      slug: "quem-somos",
      title: "Quem somos",
      body: [
        "A Envolviver é uma Associação que desenvolve atividades na área da animação e de tempos livres para crianças e jovens.",
        "É constituída por uma equipa técnico-pedagógica que possui vasta experiência na gestão de atividades de enriquecimento curricular, prolongamento de horário e na componente de apoio à família.",
      ],
    },
    {
      slug: "objetivos",
      title: "Os nossos objetivos",
      body: [
        "Desde o início da nossa atividade que nos preocupamos em proporcionar, dia a dia, um tempo livre de qualidade.",
        "Somos um importante parceiro para a implementação do conceito de escola a tempo inteiro.",
      ],
    },
    {
      slug: "como-fazemos",
      title: "Como fazemos",
      body: [
        "Através de soluções integradas de prolongamento escolar, utilizando recursos próprios e integrando recursos locais, estabelecemos acordos com autarquias, associações de pais, agrupamentos escolares e escolas.",
      ],
      list: [
        "Planificação anual com supervisão dos intervenientes da comunidade educativa",
        "Organização e desenvolvimento de atividades multidisciplinares que sejam do maior interesse na formação integral da criança",
        "Inovação permanente, flexibilidade de organização, procura de novas soluções",
      ],
    },
  ],
};

export const aec = {
  title: "Atividades de Enriquecimento Curricular",
  short: "Enriquecimento Curricular",
  lead: "Um conjunto de aprendizagens que alarga o currículo do 1.º ciclo — gratuito para todos os alunos.",
  body: [
    "O Programa das Atividades de Enriquecimento Curricular no 1.º ciclo do ensino básico encontra-se regulamentado pelo Despacho n.º 14460/2008, de 26 de maio, e pretende cumprir o duplo objetivo de garantir a todos os alunos do 1.º ciclo, de forma gratuita, a oferta de um conjunto de aprendizagens enriquecedoras do currículo, ao mesmo tempo que concretiza a articulação entre o funcionamento da escola e a organização de respostas sociais no domínio do apoio às famílias, consolidando o conceito de escola a tempo inteiro.",
    "Elaboramos propostas de implementação e dinamização das Atividades de Enriquecimento Curricular que vão ao encontro das necessidades da escola dos seus filhos.",
  ],
  activities: [
    {
      slug: "ensino-de-ingles",
      name: "Ensino de Inglês",
      color: "#e72a25",
      photo: "/fotos/aec-ftList_EnsinoIngles.jpg",
      summary: "A língua inglesa através de atividades lúdico-didáticas, adaptadas a cada grau de ensino.",
      bullets: [
        "Promoção da aquisição e desenvolvimento da língua inglesa através de atividades lúdico-didáticas com carácter totalmente adaptado a cada grau de ensino",
        "Tornar a aprendizagem da língua inglesa num enriquecedor momento de comunicação",
        "Promover um ambiente de aprendizagem divertido, através da utilização de um conjunto vasto de materiais pedagógicos que otimizam e estimulam a aprendizagem das crianças",
      ],
    },
    {
      slug: "atividade-fisica-e-desportiva",
      name: "Atividade Física e Desportiva",
      color: "#f58221",
      photo: "/fotos/aec-ftList_AFisicaDesportiva.jpg",
      summary: "Resistência, equilíbrio, ritmo e agilidade — a par do trabalho de equipa e das regras.",
      bullets: [
        "Desenvolvimento funcional das capacidades de resistência, velocidade de execução, velocidade de reação, flexibilidade, controlo da postura, equilíbrio, ritmo e agilidade",
        "Estimulação da capacidade de cooperação com os companheiros, conhecimento e aplicação de regras, valorização dos princípios de cordialidade e respeito na relação com os colegas e professor",
        "Empenho no aperfeiçoamento das habilidades e procura das ações adequadas com correção e oportunidade",
      ],
    },
    {
      slug: "expressao-musical",
      name: "Expressão Musical",
      color: "#fcd805",
      photo: "/fotos/aec-ftList_ExpMusical.jpg",
      summary: "Ritmo, melodia e harmonia, do ouvido à voz e ao património musical da região.",
      bullets: [
        "Aquisição dos conceitos de ritmo, melodia e harmonia",
        "Desenvolvimento da acuidade e da memória auditivas",
        "Estimulação da criatividade ao nível da produção sonora",
        "Promoção da expressão vocal e da afinação",
        "Promoção do conhecimento de alguns instrumentos e respetivos tipos de som",
        "Reconhecimento e valorização do património musical da região",
      ],
    },
    {
      slug: "artes-plasticas",
      name: "Artes Plásticas",
      color: "#c9cc2c",
      photo: "/fotos/aec-ftList_ArtesPlasticas.jpg",
      summary: "Expressão, criatividade e sentido estético, com as artes plásticas como linguagem.",
      bullets: [
        "Desenvolvimento da expressão e da criatividade",
        "Reconhecimento da importância das artes plásticas",
        "Contribuição para a criação de um sentido estético e de crítica artística",
        "Promoção das artes plásticas como meio de comunicação e de simbolismo",
      ],
    },
    {
      slug: "expressao-dramatica",
      name: "Expressão Dramática",
      color: "#7abc5d",
      photo: "/fotos/aec-ftList_ExpDramatica.jpg",
      summary: "O potencial expressivo de cada criança, pela voz, pelo corpo e pela personagem.",
      bullets: [
        "Desenvolvimento do potencial expressivo de cada criança",
        "Promoção da expressão verbal e corporal",
        "Trabalho de integração da criança — interpretação de papéis, comunicação através de diferentes personagens",
      ],
    },
  ] as Activity[],
};

export const caf = {
  title: "Componente de Apoio à Família",
  short: "Apoio à Família",
  lead: "O tempo que fica para além das horas letivas — organizado, acompanhado e com rotina própria.",
  body: [
    "São designadas por atividades de componente de apoio à família (CAF) todas as atividades dos Jardins de Infância e das Escolas EB1 que integram os períodos que estejam para além das 25 horas letivas e das 10 horas de atividades de enriquecimento curricular, no caso das Escolas EB1.",
    "Estes períodos dividem-se diariamente em dois momentos específicos: Acolhimento Matinal e Prolongamento de Horário. Os períodos de férias e interrupções letivas também estão contemplados, mantendo-se os horários mas com atividades e rotinas diferenciadas.",
    "Na gestão dos serviços que prestamos utilizamos modernas tecnologias da informação, entre as quais destacamos o nosso portal de gestão de atividades, que permite às escolas e aos encarregados de educação terem acesso a toda a informação de caráter relevante.",
  ],
  activities: [
    {
      slug: "acolhimento-matinal",
      name: "Acolhimento Matinal",
      color: "#13a89e",
      photo: "/fotos/caf-ftList_AcolhiMatinal.jpg",
      summary: "Um espaço de tranquilidade depois da correria da manhã, antes do dia começar.",
      paragraphs: [
        "Os estabelecimentos de educação pré-escolar e do 1.º ciclo necessitam cada vez mais de encontrar condições para que exista um horário de funcionamento de acordo com as reais necessidades dos pais. Este serviço está disponível tanto para Jardins de Infância como para Escolas do 1.º ciclo do ensino básico.",
        "O serviço de Acolhimento Matinal pretende ser um espaço de tranquilidade após a correria matinal dos pais, onde a criança se prepara para um dia de atividades escolares. Um espaço informal, de brincadeira, onde os pais podem transmitir informação importante para ser depois comunicada à respetiva educadora.",
      ],
    },
    {
      slug: "prolongamento-de-horario",
      name: "Prolongamento de Horário",
      color: "#93d7e9",
      photo: "/fotos/caf-ftList_ProlongaHorario.jpg",
      summary: "Convívio e brincadeira acompanhada, até à chegada dos pais.",
      paragraphs: [
        "Um espaço informal de convívio e de brincadeiras acompanhadas até à chegada dos pais.",
      ],
    },
    {
      slug: "ensino-de-ingles",
      name: "Ensino de Inglês",
      color: "#e72a25",
      photo: "/fotos/caf-ftList_EnsinoIngles.jpg",
      summary: "Primeiro contacto com a língua, pela via da curiosidade e não da avaliação.",
      bullets: [
        "Sensibilizar para a diversidade linguística e cultural",
        "Fomentar uma relação positiva com a aprendizagem da língua",
        "Proporcionar experiências de aprendizagem significativas e motivadoras, diversificadas, que promovam a integração e a socialização",
      ],
    },
    {
      slug: "expressao-motora",
      name: "Expressão Motora",
      color: "#6e7ca6",
      photo: "/fotos/caf-ftList_ExpMotora.jpg",
      summary: "Aprender a usar e a dominar o corpo, pelo movimento e pelo jogo.",
      bullets: [
        "Estimulação da motricidade global e da motricidade fina, proporcionando ocasiões de exercício que permitam a cada criança aprender a utilizar e dominar o corpo",
        "Consciencialização dos diferentes segmentos do corpo, suas possibilidades e limitações, através da exploração das diferentes formas de movimento",
        "Desenvolvimento do controlo motor e da socialização, de compreensão de regras e alargamento da linguagem através de jogos de movimento",
      ],
    },
    {
      slug: "expressao-musical",
      name: "Expressão Musical",
      color: "#fcd805",
      photo: "/fotos/caf-ftList_ExpMusical.jpg",
      summary: "Ritmo, melodia e harmonia, do ouvido à voz e ao património musical da região.",
      bullets: [
        "Aquisição dos conceitos de ritmo, melodia e harmonia",
        "Desenvolvimento da acuidade e da memória auditivas",
        "Estimulação da criatividade ao nível da produção sonora",
        "Promoção da expressão vocal e da afinação",
        "Promoção do conhecimento de alguns instrumentos e respetivos tipos de som",
        "Reconhecimento e valorização do património musical da região",
      ],
    },
  ] as Activity[],
};

export const ferias = {
  title: "Férias e Interrupções Letivas",
  lead: "Programas específicos para os períodos em que a escola para, mas a vida das famílias não.",
  body: [
    "Os períodos de férias e interrupções letivas estão contemplados na componente de apoio à família. Os horários mantêm-se, mas com atividades e rotinas diferenciadas em relação aos períodos letivos.",
    "Elaboramos propostas de implementação destes serviços para qualquer local do país, adaptadas à realidade de cada escola ou Jardim de Infância.",
  ],
  docs: [
    { label: "Ficha de inscrição — D. Dinis", href: "/docs/ficha-inscricao-ddinis.pdf" },
    { label: "Regulamento interno CAF", href: "/docs/regulamento-interno-caf.pdf" },
  ],
};

export type Post = {
  slug: string;
  title: string;
  date: string | null;
  dateLabel: string;
  excerpt: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "recrutamento-caf-aaaf-marvila",
    title: "Recrutamento CAF e AAAF — Marvila",
    date: "2022-02-03",
    dateLabel: "3 de fevereiro de 2022",
    excerpt:
      "Estamos a recrutar animador para a Componente de Apoio à Família (CAF) e Atividades de Animação e Apoio à Família (AAAF) em Marvila.",
    body: [
      "Estamos a recrutar animador para a Componente de Apoio à Família (CAF) e Atividades de Animação e Apoio à Família (AAAF) em Marvila, Lisboa.",
      "As candidaturas são feitas através do portal de recrutamento do grupo.",
    ],
  },
  {
    slug: "aaaf-e-caf-2020-2021",
    title: "AAAF e CAF 2020–2021",
    date: "2020-08-01",
    dateLabel: "1 de agosto de 2020",
    excerpt:
      "Desenvolvemos Atividades de Animação e Apoio à Família no Agrupamento de Escolas D. Dinis, em Marvila, pelo oitavo ano consecutivo.",
    body: [
      "Encontramo-nos a desenvolver Atividades de Animação e Apoio à Família (AAAF) no Agrupamento de Escolas D. Dinis, em Marvila — Lisboa, pelo oitavo ano consecutivo.",
    ],
  },
  {
    slug: "peca-nos-uma-proposta",
    title: "Peça-nos uma proposta",
    date: "2020-02-02",
    dateLabel: "2 de fevereiro de 2020",
    excerpt: "Contacte-nos para lhe apresentarmos uma proposta adaptada à sua escola.",
    body: [
      "Contacte-nos para lhe apresentarmos uma proposta.",
      "Após nos fornecer algumas informações, a nossa equipa realiza um estudo prévio adaptado à realidade em questão. Em poucos dias apresentamos uma proposta com as respostas de que necessita.",
    ],
  },
  {
    slug: "inscricoes-caf-aaaf-d-dinis",
    title: "Inscrições abertas — AAAF e CAF, D. Dinis",
    date: null,
    dateLabel: "Agrupamento de Escolas D. Dinis",
    excerpt:
      "Estão abertas as inscrições para as AAAF e CAF no Agrupamento de Escolas D. Dinis.",
    body: [
      "Estão abertas as inscrições para as Atividades de Animação e Apoio à Família e para a Componente de Apoio à Família no Agrupamento de Escolas D. Dinis.",
      "A ficha de inscrição e o regulamento interno estão disponíveis para descarregar na página de Férias e Interrupções.",
    ],
  },
];

export const allActivities = [
  ...aec.activities.map((a) => ({ ...a, programme: "aec" as const })),
  ...caf.activities.map((a) => ({ ...a, programme: "caf" as const })),
];
