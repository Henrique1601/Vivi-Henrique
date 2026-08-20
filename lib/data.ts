// Dados centrais do casal — edite aqui conforme mais informações chegarem

export const couple = {
  him: "Henrique",
  her: "Vivian",
  fullHim: "Henrique Bezerra dos Santos",
  fullHer: "Vivian Evelyn da Silva de Almeida",
};

// Data "oficial" de início do namoro — usada no contador ao vivo
export const relationshipStart = new Date("2025-12-20T00:00:00-03:00");

export type Milestone = {
  date: string;
  isoDate: string;
  title: string;
  description: string;
  photo: string | null; // null = ainda não temos a foto desse momento
};

export const milestones: Milestone[] = [
  {
    date: "16 de outubro de 2025",
    isoDate: "2025-10-16",
    title: "O churrasco",
    description:
      "O dia em que nos vimos pela primeira vez. Nem imaginávamos o que estava começando ali.",
    photo: null,
  },
  {
    date: "6 de dezembro de 2025",
    isoDate: "2025-12-06",
    title: "Eu te amo",
    description:
      "A primeira vez que dissemos isso um ao outro — e falamos sério.",
    photo: "/photos/13.jpg",
  },
  {
    date: "20 de dezembro de 2025",
    isoDate: "2025-12-20",
    title: "Início do namoro",
    description: "Oficializamos o que já sentíamos. O primeiro dia de muitos.",
    photo: "/photos/aliancas.jpg",
  },
];

// fotos usadas na timeline: 13, aliancas — as demais ficam livres para o mural
export const galleryPhotos = [
  "/photos/01.jpg",
  "/photos/02.jpg",
  "/photos/03.jpg",
  "/photos/04.jpg",
  "/photos/05.jpg",
  "/photos/06.jpg",
  "/photos/07.jpg",
  "/photos/08.webp",
  "/photos/09.jpg",
  "/photos/10.webp",
  "/photos/11.webp",
  "/photos/12.webp",
  "/photos/14.jpg",
  "/photos/15.jpg",
  "/photos/16.jpg",
  "/photos/17.jpg",
  "/photos/18.jpg",
  "/photos/19.jpg",
  "/photos/20.jpg",
  "/photos/21.jpg",
  "/photos/22.jpg",
  "/photos/23.jpg",
  "/photos/24.jpg",
  "/photos/25.jpg",
  "/photos/26.jpg",
];

export type Place = {
  label: string;
  note: string;
  lat: number;
  lng: number;
};

export const places: Place[] = [
  {
    label: "Orquidário Municipal de Santos",
    note: "Um dos nossos lugares favoritos em Santos",
    lat: -23.9654495,
    lng: -46.3491281,
  },
  {
    label: "Praia do Gonzaga",
    note: "Caminhadas na orla, sempre juntos",
    lat: -23.9702282,
    lng: -46.3366831,
  },
  {
    label: "Sesc Santos",
    note: "Programas culturais e momentos de lazer",
    lat: -23.9757311,
    lng: -46.3117249,
  },
  {
    label: "Casamento da irmã dela",
    note: "Uma festa em família que marcou a gente — Nabarca, São Vicente",
    lat: -23.9729434,
    lng: -46.3904129,
  },
  {
    label: "Cabalera Burguer",
    note: "O restaurante favorito dela",
    lat: -23.9590184,
    lng: -46.341648,
  },
  {
    label: "Nossa casa",
    note: "Onde a rotina do dia a dia vira memória",
    lat: -23.9454251,
    lng: -46.3314629,
  },
  {
    label: "Açaí da Barra",
    note: "Aquele açaí de sempre, no Gonzaga",
    lat: -23.967306,
    lng: -46.3319435,
  },
  {
    label: "Don Sushi",
    note: "Jantar japonês especial",
    lat: -23.9763295,
    lng: -46.298916,
  },
  {
    label: "D'Boa Quiosque",
    note: "Um programa gostoso à beira-mar",
    lat: -23.9913286,
    lng: -46.304722,
  },
  {
    label: "Vixe Bar Pompéia",
    note: "Um dos nossos points pra sair",
    lat: -23.9646342,
    lng: -46.3452955,
  },
  {
    label: "Assaí Atacadista",
    note: "Até compras do dia a dia viram memória juntos",
    lat: -23.9584962,
    lng: -46.3338042,
  },
];

// músicas reais confirmadas via Spotify
export const songs = [
  {
    title: "Meu Menino (Minha Menina) - Ao Vivo",
    artist: "Luan Santana, Belinda",
    spotifyId: "2NLJfVCpdjTXVvs1fUXn0W",
  },
  {
    title: "Orbiter",
    artist: "Noah Kahan",
    spotifyId: "4W6yulge3h7FSy0zGFrNKs",
  },
  {
    title: "A Thousand Years",
    artist: "Christina Perri",
    spotifyId: "6lanRgr6wXibZr8KgzXxBl",
  },
  {
    title: "Turning Page",
    artist: "Sleeping At Last",
    spotifyId: "2kfGoV9a5dbSKCNmUWH2ZF",
  },
  {
    title: "Escreve Aí - Ao Vivo",
    artist: "Luan Santana",
    spotifyId: "69uKYDeTWn1wFssqP6OZjb",
  },
  {
    title: "Acabou - Ao Vivo",
    artist: "Projota",
    spotifyId: "29yVwAhJ5G9lVwiAYzPOi3",
  },
];

export const letterText = `Meu amor, eu te amo muito. Estou muito feliz por continuarmos
juntos e por estar ao seu lado. Você faz meus olhos brilharem
todos os dias.

Agradeço por todos os conselhos, críticas e até mesmo pelas
nossas brigas. Você é uma pessoa muito especial para mim.

Obrigado por tudo, meu amor, eu te amo. ❤️❤️❤️`;
