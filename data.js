/* ==========================================================================
   Coup de Main — données de démonstration
   Les associations sont réelles (antennes Marseille / Aix-en-Provence).
   Les ÉVÉNEMENTS, ÉQUIPES et CHIFFRES sont FICTIFS : à remplacer par les
   vraies données au fil des partenariats.
   Les dates d'événements sont générées par rapport à aujourd'hui pour que
   la démo reste toujours vivante.
   ========================================================================== */

// Renvoie une date ISO (AAAA-MM-JJ) à +n jours d'aujourd'hui
function dansNJours(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

const CAUSES = [
  { id: "alimentaire",  nom: "Aide alimentaire",        couleur: "var(--c-alimentaire)" },
  { id: "hebergement",  nom: "Hébergement & rue",       couleur: "var(--c-hebergement)" },
  { id: "sante",        nom: "Santé & soins",           couleur: "var(--c-sante)" },
  { id: "isolement",    nom: "Personnes âgées & isolement", couleur: "var(--c-isolement)" },
  { id: "jeunes",       nom: "Jeunes & familles",       couleur: "var(--c-jeunes)" },
  { id: "animaux",      nom: "Animaux",                 couleur: "var(--c-animaux)" },
  { id: "ecoute",       nom: "Écoute & soutien",        couleur: "var(--c-ecoute)" }
];

// Types d'engagement possibles : temps / argent / materiel
const ASSOCIATIONS = [
  {
    id: "restos-marseille",
    nom: "Les Restos du Cœur — Bouches-du-Rhône",
    ville: "Marseille",
    adresse: "Délégation départementale, Marseille 14e",
    lat: 43.3421, lng: 5.3782,
    cause: "alimentaire",
    bullets: [
      "Distribution de repas et de paniers alimentaires toute l'année",
      "Aide à la personne : vestiaire, coiffure, accompagnement administratif",
      "Plus de 20 centres d'activité dans les Bouches-du-Rhône"
    ],
    engagements: ["temps", "argent", "materiel"],
    actions: ["Distribution alimentaire", "Collecte en magasin", "Accompagnement", "Tri de denrées"],
    site: "https://www.restosducoeur.org",
    histoire: "Fondés par Coluche en 1985, les Restos du Cœur sont devenus l'un des plus grands réseaux d'aide alimentaire de France. Dans les Bouches-du-Rhône, l'association distribue chaque hiver plusieurs millions de repas et accompagne les personnes accueillies bien au-delà de l'assiette : accès aux droits, vestiaire, ateliers de français, soutien à la recherche d'emploi. L'antenne départementale coordonne des dizaines de centres, dont plusieurs à Marseille et à Aix-en-Provence.",
    equipe: [
      { role: "Bénévoles de centre", desc: "Accueil, distribution et lien avec les personnes accueillies" },
      { role: "Équipe logistique", desc: "Réception, tri et acheminement des denrées vers les centres" },
      { role: "Référents accompagnement", desc: "Aide administrative, accès aux droits, ateliers" }
    ],
    don: "Vos dons financent directement les repas : quelques euros suffisent pour plusieurs repas complets. Les dons ouvrent droit à une réduction d'impôt de 75 % dans la limite du plafond « Coluche ».",
    realisations: [
      { quand: "Campagne 2024-2025", quoi: "Des millions de repas distribués dans le département", detail: "Grâce aux collectes en magasin et aux dons, la campagne d'hiver a permis de servir les personnes accueillies dans l'ensemble des centres du 13." },
      { quand: "2023", quoi: "Ouverture d'ateliers d'aide numérique", detail: "Des bénévoles accompagnent les personnes accueillies dans leurs démarches en ligne (CAF, Pôle emploi, préfecture)." },
      { quand: "Depuis 1985", quoi: "Le réseau fondé par Coluche", detail: "Une aide alimentaire devenue accompagnement global : logement, emploi, culture, vacances pour les familles." }
    ],
    evenements: [
      { id: "restos-e1", titre: "Collecte nationale en supermarché", date: dansNJours(2), heure: "09:00 – 18:00", lieu: "Hypermarché, Marseille 14e", lat: 43.348, lng: 5.379, type: "Collecte en magasin", inscrits: 14, places: 30, desc: "Proposez aux clients de donner un produit à la sortie des caisses. Créneaux de 2 h, ambiance conviviale garantie." },
      { id: "restos-e2", titre: "Tri des denrées à l'entrepôt", date: dansNJours(6), heure: "14:00 – 17:00", lieu: "Entrepôt départemental, Marseille 15e", lat: 43.355, lng: 5.365, type: "Tri de denrées", inscrits: 8, places: 15, desc: "Tri et mise en caisse des produits collectés avant redistribution vers les centres." },
      { id: "restos-e3", titre: "Service du repas chaud du soir", date: dansNJours(9), heure: "18:30 – 21:00", lieu: "Centre de distribution, Marseille 3e", lat: 43.312, lng: 5.377, type: "Distribution alimentaire", inscrits: 11, places: 12, desc: "Service en salle, plonge et surtout : un moment d'échange avec les personnes accueillies." }
    ]
  },
  {
    id: "secours-pop-13",
    nom: "Secours Populaire Français — Fédération 13",
    ville: "Marseille",
    adresse: "Marseille 4e",
    lat: 43.3065, lng: 5.4003,
    cause: "alimentaire",
    bullets: [
      "Solidarité alimentaire, vestimentaire et accès aux vacances",
      "Le « Père Noël vert » pour les enfants des familles en difficulté",
      "Antennes dans tout le département, animées par des bénévoles"
    ],
    engagements: ["temps", "argent", "materiel"],
    actions: ["Distribution alimentaire", "Collecte", "Animation enfants", "Vestiaire solidaire"],
    site: "https://www.secourspopulaire.fr",
    histoire: "Né en 1945, le Secours Populaire Français agit contre la pauvreté et l'exclusion en France et dans le monde. La fédération des Bouches-du-Rhône anime un réseau d'antennes locales : libre-service alimentaire, vestiaire, accompagnement scolaire, départs en vacances pour les enfants qui ne partent jamais, et la campagne des « Pères Noël verts » en fin d'année.",
    equipe: [
      { role: "Bénévoles d'antenne", desc: "Accueil des familles et libre-service alimentaire" },
      { role: "Équipe « Copain du Monde »", desc: "Animations et solidarité par et pour les enfants" },
      { role: "Collecteurs", desc: "Braderies, collectes et événements solidaires" }
    ],
    don: "Les dons financent l'aide alimentaire, les campagnes de vacances et la solidarité d'urgence. Réduction d'impôt de 75 % dans la limite du plafond légal.",
    realisations: [
      { quand: "Été 2025", quoi: "Journée des oubliés des vacances", detail: "Des centaines d'enfants du département emmenés à la mer pour une journée de jeux et de baignade." },
      { quand: "Décembre 2024", quoi: "Campagne des Pères Noël verts", detail: "Jouets, repas de fête et sorties offerts aux familles accompagnées." },
      { quand: "Depuis 1945", quoi: "80 ans de solidarité populaire", detail: "Une aide inconditionnelle, portée par des bénévoles de tous horizons." }
    ],
    evenements: [
      { id: "spop-e1", titre: "Braderie solidaire de printemps", date: dansNJours(3), heure: "10:00 – 17:00", lieu: "Antenne du 4e, Marseille", lat: 43.307, lng: 5.401, type: "Vestiaire solidaire", inscrits: 6, places: 10, desc: "Tenir un stand, conseiller les visiteurs et encaisser les ventes à petits prix au profit des actions locales." },
      { id: "spop-e2", titre: "Accompagnement scolaire — soutien lecture", date: dansNJours(11), heure: "17:00 – 18:30", lieu: "Antenne du 4e, Marseille", lat: 43.307, lng: 5.401, type: "Animation enfants", inscrits: 4, places: 8, desc: "Lecture et aide aux devoirs avec des enfants de primaire. Engagement régulier bienvenu, séance découverte possible." }
    ]
  },
  {
    id: "croix-rouge-marseille",
    nom: "Croix-Rouge française — Unité locale de Marseille",
    ville: "Marseille",
    adresse: "Marseille 6e",
    lat: 43.2892, lng: 5.3821,
    cause: "hebergement",
    bullets: [
      "Maraudes auprès des personnes sans abri, toute l'année",
      "Postes de secours, formations aux premiers gestes",
      "Vestiboutiques et aide d'urgence aux familles"
    ],
    engagements: ["temps", "argent", "materiel"],
    actions: ["Maraude", "Premiers secours", "Vestiaire solidaire", "Distribution alimentaire"],
    site: "https://www.croix-rouge.fr",
    histoire: "Présente à Marseille depuis plus d'un siècle, la Croix-Rouge française y mène des actions d'urgence et de solidarité : maraudes de nuit auprès des personnes à la rue, postes de secours lors des grands événements, formations PSC1 ouvertes à tous, et vestiboutiques où chacun peut s'habiller à petit prix. L'unité locale repose entièrement sur l'engagement de ses bénévoles.",
    equipe: [
      { role: "Équipes de maraude", desc: "Aller vers les personnes sans abri : boissons chaudes, écoute, orientation" },
      { role: "Secouristes", desc: "Postes de secours et formations grand public" },
      { role: "Bénévoles vestiboutique", desc: "Tri des dons et vente solidaire" }
    ],
    don: "Les dons financent les maraudes, l'aide d'urgence et l'équipement des secouristes. Réduction d'impôt de 66 %.",
    realisations: [
      { quand: "Hiver 2025-2026", quoi: "Renfort du plan grand froid", detail: "Maraudes quotidiennes et distribution de couvertures et duvets dans le centre-ville." },
      { quand: "2025", quoi: "Des centaines de Marseillais formés au PSC1", detail: "Les gestes qui sauvent enseignés au grand public, dès 10 ans." },
      { quand: "Depuis 1864", quoi: "L'humanitaire de proximité", detail: "Urgence, secourisme, action sociale : sept principes, un même mouvement mondial." }
    ],
    evenements: [
      { id: "cr-e1", titre: "Maraude de soirée — centre-ville", date: dansNJours(1), heure: "19:30 – 23:00", lieu: "Départ local Croix-Rouge, Marseille 6e", lat: 43.289, lng: 5.382, type: "Maraude", inscrits: 5, places: 6, desc: "En binôme avec des bénévoles expérimentés : boissons chaudes, écoute et orientation des personnes rencontrées." },
      { id: "cr-e2", titre: "Initiation aux gestes qui sauvent", date: dansNJours(8), heure: "09:00 – 12:00", lieu: "Local de formation, Marseille 6e", lat: 43.290, lng: 5.383, type: "Premiers secours", inscrits: 9, places: 12, desc: "Découverte gratuite des gestes de premiers secours. Aucun prérequis." },
      { id: "cr-e3", titre: "Tri des dons à la vestiboutique", date: dansNJours(13), heure: "14:00 – 17:00", lieu: "Vestiboutique, Marseille 6e", lat: 43.288, lng: 5.380, type: "Vestiaire solidaire", inscrits: 3, places: 8, desc: "Trier, étiqueter et mettre en rayon les vêtements donnés." }
    ]
  },
  {
    id: "emmaus-pointe-rouge",
    nom: "Emmaüs Pointe-Rouge",
    ville: "Marseille",
    adresse: "Marseille 8e, quartier de la Pointe-Rouge",
    lat: 43.2452, lng: 5.3705,
    cause: "hebergement",
    bullets: [
      "Communauté de compagnes et compagnons : accueil, travail, dignité",
      "Collecte et revente d'objets de seconde main",
      "Le don d'objets finance l'accueil des personnes"
    ],
    engagements: ["temps", "materiel", "argent"],
    actions: ["Tri et manutention", "Vente solidaire", "Collecte d'objets"],
    site: "https://emmaus-france.org",
    histoire: "Fondé dans l'esprit de l'abbé Pierre, Emmaüs accueille des personnes cabossées par la vie au sein de communautés où l'on retrouve un toit, une activité et une place. À la Pointe-Rouge, les compagnes et compagnons collectent, réparent et revendent meubles, vêtements et objets : chaque achat et chaque don d'objet finance directement la vie de la communauté et sa solidarité vers l'extérieur.",
    equipe: [
      { role: "Compagnes et compagnons", desc: "Le cœur de la communauté : collecte, tri, vente" },
      { role: "Amis bénévoles", desc: "Coup de main sur les ventes, les espaces et les événements" },
      { role: "Équipe d'accompagnement", desc: "Accueil et suivi des personnes de la communauté" }
    ],
    don: "Le meilleur don, c'est souvent un objet : meubles, livres, vaisselle, électroménager en état de marche. Les dons financiers soutiennent l'accueil de nouvelles personnes.",
    realisations: [
      { quand: "2025", quoi: "Grande vente annuelle", detail: "Un week-end exceptionnel qui a attiré des milliers de visiteurs et financé plusieurs mois de fonctionnement." },
      { quand: "2024", quoi: "Atelier de réparation de vélos", detail: "Des vélos remis en état et revendus à prix solidaire." },
      { quand: "Depuis 1949", quoi: "L'héritage de l'abbé Pierre", detail: "« Servir premier le plus souffrant » : la seconde main au service de la seconde chance." }
    ],
    evenements: [
      { id: "emm-e1", titre: "Coup de main sur la grande vente", date: dansNJours(4), heure: "09:00 – 13:00", lieu: "Communauté Emmaüs, Pointe-Rouge", lat: 43.245, lng: 5.370, type: "Vente solidaire", inscrits: 7, places: 12, desc: "Accueil des visiteurs, réassort des étals et bonne humeur au milieu des trouvailles." },
      { id: "emm-e2", titre: "Tri de la collecte du week-end", date: dansNJours(10), heure: "14:00 – 17:00", lieu: "Communauté Emmaüs, Pointe-Rouge", lat: 43.245, lng: 5.370, type: "Tri et manutention", inscrits: 2, places: 10, desc: "Déballer, tester, trier : donner une seconde vie aux objets collectés." }
    ]
  },
  {
    id: "banque-alimentaire-13",
    nom: "Banque Alimentaire des Bouches-du-Rhône",
    ville: "Marseille",
    adresse: "Marseille 14e, zone des Arnavaux",
    lat: 43.3358, lng: 5.3752,
    cause: "alimentaire",
    bullets: [
      "Collecte et redistribution de denrées à un réseau d'associations partenaires",
      "Lutte contre le gaspillage : ramasse quotidienne en grandes surfaces",
      "Un entrepôt logistique au service de tout le département"
    ],
    engagements: ["temps", "argent"],
    actions: ["Tri de denrées", "Collecte en magasin", "Logistique"],
    site: "https://ba13.banquealimentaire.org",
    histoire: "Créées en 1984, les Banques Alimentaires collectent des denrées auprès de la grande distribution, des industriels et du grand public, puis les redistribuent à des associations et épiceries solidaires. Celle des Bouches-du-Rhône alimente un vaste réseau de partenaires : chaque heure de bénévolat à l'entrepôt se transforme en repas servis partout dans le département.",
    equipe: [
      { role: "Bénévoles d'entrepôt", desc: "Ramasse, tri, préparation des commandes des associations" },
      { role: "Chauffeurs bénévoles", desc: "Tournées de ramasse en grandes surfaces" },
      { role: "Équipe hygiène & qualité", desc: "Sécurité alimentaire et chaîne du froid" }
    ],
    don: "Un euro donné permet de redistribuer plusieurs repas grâce à l'effet levier de la collecte. Réduction d'impôt de 75 % dans la limite du plafond légal.",
    realisations: [
      { quand: "Novembre 2025", quoi: "Collecte nationale record", detail: "Des tonnes de denrées collectées en un week-end dans les magasins du département." },
      { quand: "2025", quoi: "Anti-gaspi", detail: "Des centaines de tonnes de produits sauvées de la destruction et transformées en repas." },
      { quand: "Depuis 1984", quoi: "Le maillon logistique de la solidarité", detail: "Derrière chaque colis distribué par une association locale, il y a souvent une Banque Alimentaire." }
    ],
    evenements: [
      { id: "ba-e1", titre: "Matinée tri à l'entrepôt des Arnavaux", date: dansNJours(5), heure: "08:30 – 12:00", lieu: "Entrepôt BA13, Marseille 14e", lat: 43.336, lng: 5.375, type: "Tri de denrées", inscrits: 10, places: 20, desc: "Tri des fruits et légumes de la ramasse du matin. Prévoir des chaussures fermées." },
      { id: "ba-e2", titre: "Préparation des commandes associations", date: dansNJours(12), heure: "13:30 – 17:00", lieu: "Entrepôt BA13, Marseille 14e", lat: 43.336, lng: 5.375, type: "Logistique", inscrits: 6, places: 14, desc: "Constituer les palettes destinées aux associations partenaires du département." }
    ]
  },
  {
    id: "sara-logisol",
    nom: "SARA LOGISOL",
    ville: "Marseille",
    adresse: "Marseille 10e",
    lat: 43.2837, lng: 5.4102,
    cause: "hebergement",
    bullets: [
      "Hébergement d'urgence et accompagnement vers le logement",
      "Accueils de jour pour les personnes à la rue",
      "Accompagnement social global : santé, droits, insertion"
    ],
    engagements: ["temps", "argent", "materiel"],
    actions: ["Accueil de jour", "Accompagnement", "Collecte de produits d'hygiène"],
    site: "https://saralogisol.fr",
    histoire: "Association marseillaise née du rapprochement de SARA et de LOGISOL, SARA LOGISOL héberge et accompagne chaque année des milliers de personnes en situation de précarité : familles à l'hôtel, personnes isolées en centre d'hébergement, ménages en voie de relogement. Son principe : le logement d'abord, et un accompagnement qui prend la personne dans sa globalité.",
    equipe: [
      { role: "Travailleurs sociaux", desc: "Accompagnement des ménages hébergés vers le logement" },
      { role: "Équipes d'accueil de jour", desc: "Café, douches, laverie, domiciliation" },
      { role: "Bénévoles", desc: "Ateliers, sorties, soutien scolaire des enfants hébergés" }
    ],
    don: "Les dons financent les kits d'hygiène, l'équipement des logements et les activités pour les enfants hébergés.",
    realisations: [
      { quand: "2025", quoi: "Des centaines de ménages relogés", detail: "Sorties positives d'hébergement vers un logement durable, avec un accompagnement dans la durée." },
      { quand: "2024", quoi: "Extension des accueils de jour", detail: "Horaires élargis et nouveaux services (laverie, bagagerie) pour les personnes à la rue." }
    ],
    evenements: [
      { id: "sara-e1", titre: "Collecte de produits d'hygiène", date: dansNJours(7), heure: "10:00 – 16:00", lieu: "Parvis d'un supermarché, Marseille 10e", lat: 43.284, lng: 5.411, type: "Collecte de produits d'hygiène", inscrits: 4, places: 8, desc: "Inviter les clients à offrir savon, dentifrice, protections périodiques pour composer des kits d'hygiène." },
      { id: "sara-e2", titre: "Goûter-jeux avec les enfants hébergés", date: dansNJours(14), heure: "15:30 – 17:30", lieu: "Centre d'hébergement, Marseille 10e", lat: 43.283, lng: 5.410, type: "Accompagnement", inscrits: 5, places: 6, desc: "Jeux de société, dessins et goûter avec les enfants des familles hébergées." }
    ]
  },
  {
    id: "medecins-du-monde-paca",
    nom: "Médecins du Monde — Délégation PACA",
    ville: "Marseille",
    adresse: "Marseille 1er",
    lat: 43.2996, lng: 5.3811,
    cause: "sante",
    bullets: [
      "Accès aux soins pour les personnes éloignées du système de santé",
      "Centre d'accueil, de soins et d'orientation (CASO) à Marseille",
      "Actions mobiles auprès des publics précaires"
    ],
    engagements: ["temps", "argent"],
    actions: ["Accueil au CASO", "Maraude santé", "Accompagnement", "Traduction"],
    site: "https://www.medecinsdumonde.org",
    histoire: "À Marseille, Médecins du Monde soigne celles et ceux que le système de santé laisse au bord du chemin : personnes sans couverture maladie, à la rue, exilées. Le CASO offre consultations médicales, accompagnement social et orientation vers le droit commun. Des équipes mobiles vont aussi au-devant des personnes dans les squats, bidonvilles et lieux de vie précaires.",
    equipe: [
      { role: "Médecins et soignants bénévoles", desc: "Consultations au CASO et actions mobiles" },
      { role: "Accueillants", desc: "Premier contact, écoute et orientation — pas besoin d'être soignant" },
      { role: "Interprètes bénévoles", desc: "Faciliter la relation de soin dans toutes les langues" }
    ],
    don: "Vos dons financent consultations, médicaments et actions mobiles auprès des plus exclus. Réduction d'impôt de 75 % dans la limite du plafond légal.",
    realisations: [
      { quand: "2025", quoi: "Des milliers de consultations au CASO", detail: "Soins, ouverture de droits et orientation pour des personnes sans couverture maladie." },
      { quand: "2024", quoi: "Renfort des actions « aller vers »", detail: "Équipes mobiles santé dans les lieux de vie informels de la métropole." }
    ],
    evenements: [
      { id: "mdm-e1", titre: "Accueil des patients au CASO", date: dansNJours(3), heure: "13:30 – 17:30", lieu: "CASO, Marseille 1er", lat: 43.300, lng: 5.381, type: "Accueil au CASO", inscrits: 2, places: 4, desc: "Accueillir, rassurer, orienter. Une formation courte est assurée sur place. Ouvert aux non-soignants." },
      { id: "mdm-e2", titre: "Maraude santé de soirée", date: dansNJours(9), heure: "18:00 – 22:00", lieu: "Départ local MdM, Marseille 1er", lat: 43.300, lng: 5.381, type: "Maraude santé", inscrits: 3, places: 5, desc: "Aller vers les personnes à la rue avec un binôme soignant : premiers soins, orientation, écoute." }
    ]
  },
  {
    id: "petits-freres-pauvres",
    nom: "Les Petits Frères des Pauvres — Marseille",
    ville: "Marseille",
    adresse: "Marseille 6e",
    lat: 43.2861, lng: 5.3889,
    cause: "isolement",
    bullets: [
      "Accompagnement des personnes âgées isolées, en priorité les plus démunies",
      "Visites de convivialité à domicile et en institution",
      "Sorties, fêtes et vacances pour recréer du lien"
    ],
    engagements: ["temps", "argent"],
    actions: ["Visite de convivialité", "Animation", "Accompagnement sorties", "Appels téléphoniques"],
    site: "https://www.petitsfreresdespauvres.fr",
    histoire: "Depuis 1946, les Petits Frères des Pauvres luttent contre l'isolement des personnes âgées. À Marseille, des équipes de bénévoles rendent visite chaque semaine à des aînés seuls, organisent des sorties, des fêtes d'anniversaire, des séjours de vacances, et une présence renforcée pendant les fêtes de fin d'année — le moment où la solitude pèse le plus.",
    equipe: [
      { role: "Bénévoles visiteurs", desc: "Une visite régulière, un lien qui compte dans la semaine" },
      { role: "Équipe animation", desc: "Fêtes, sorties, séjours et moments collectifs" },
      { role: "Écoutants « Solitud'écoute »", desc: "Ligne d'écoute dédiée aux plus de 50 ans" }
    ],
    don: "Les dons financent visites, sorties et séjours de vacances pour des aînés qui ne partiraient jamais autrement. Réduction d'impôt de 66 %.",
    realisations: [
      { quand: "Décembre 2025", quoi: "Réveillons partagés", detail: "Des dizaines d'aînés isolés entourés pour Noël et le nouvel an à Marseille." },
      { quand: "Été 2025", quoi: "Séjours de vacances accompagnés", detail: "Partir quelques jours au bord de la mer, parfois pour la première fois depuis des années." },
      { quand: "Depuis 1946", quoi: "« Les fleurs avant le pain »", detail: "La dignité et le lien humain au cœur de l'accompagnement." }
    ],
    evenements: [
      { id: "pfp-e1", titre: "Après-midi jeux à la résidence", date: dansNJours(4), heure: "14:30 – 17:00", lieu: "Résidence autonomie, Marseille 6e", lat: 43.286, lng: 5.389, type: "Animation", inscrits: 6, places: 10, desc: "Jeux de cartes, loto et goûter avec les résidents. Le rire est fourni." },
      { id: "pfp-e2", titre: "Sortie calanque avec les aînés", date: dansNJours(11), heure: "10:00 – 16:00", lieu: "Départ Marseille 6e — Callelongue", lat: 43.286, lng: 5.389, type: "Accompagnement sorties", inscrits: 8, places: 12, desc: "Accompagner une sortie au bord de mer : bras solides et conversation bienvenus." }
    ]
  },
  {
    id: "le-refuge-marseille",
    nom: "Fondation Le Refuge — Délégation Marseille",
    ville: "Marseille",
    adresse: "Marseille 1er",
    lat: 43.2977, lng: 5.3859,
    cause: "jeunes",
    bullets: [
      "Hébergement et accompagnement de jeunes LGBT+ rejetés par leur famille",
      "Accueil de jour, soutien psychologique et social",
      "Ligne d'urgence disponible 24 h/24"
    ],
    engagements: ["temps", "argent", "materiel"],
    actions: ["Accueil de jour", "Accompagnement", "Collecte", "Sensibilisation"],
    site: "https://le-refuge.org",
    histoire: "Le Refuge héberge et accompagne des jeunes de 14 à 25 ans victimes d'homophobie ou de transphobie familiale, souvent mis à la porte du jour au lendemain. La délégation marseillaise propose un accueil de jour, des hébergements temporaires et un accompagnement global — santé, emploi, reconstruction — pour permettre à chaque jeune de repartir sur des bases solides.",
    equipe: [
      { role: "Travailleurs sociaux", desc: "Accompagnement individualisé des jeunes accueillis" },
      { role: "Bénévoles d'accueil", desc: "Présence, écoute et vie du local d'accueil de jour" },
      { role: "Intervenants en milieu scolaire", desc: "Sensibilisation contre les LGBTphobies" }
    ],
    don: "Un don finance des nuitées d'hébergement, des kits d'urgence et l'accompagnement psychologique des jeunes accueillis. Réduction d'impôt de 66 %.",
    realisations: [
      { quand: "2025", quoi: "Des dizaines de jeunes hébergés à Marseille", detail: "Mise à l'abri, accompagnement et sorties positives vers le logement autonome." },
      { quand: "2024", quoi: "Interventions en collèges et lycées", detail: "Sensibilisation de milliers d'élèves de l'académie contre le harcèlement LGBTphobe." }
    ],
    evenements: [
      { id: "ref-e1", titre: "Atelier cuisine au local d'accueil", date: dansNJours(6), heure: "18:00 – 21:00", lieu: "Local Le Refuge, Marseille 1er", lat: 43.298, lng: 5.386, type: "Accueil de jour", inscrits: 3, places: 6, desc: "Préparer et partager un repas avec les jeunes accueillis. Tabliers fournis, recettes débattues." },
      { id: "ref-e2", titre: "Collecte de produits de première nécessité", date: dansNJours(13), heure: "11:00 – 17:00", lieu: "Centre-ville, Marseille 1er", lat: 43.297, lng: 5.383, type: "Collecte", inscrits: 5, places: 10, desc: "Constituer des kits d'urgence (hygiène, sous-vêtements neufs, cartes de transport) pour les jeunes mis à l'abri." }
    ]
  },
  {
    id: "apres-m",
    nom: "L'Après M",
    ville: "Marseille",
    adresse: "Marseille 14e, Saint-Barthélémy",
    lat: 43.3316, lng: 5.3843,
    cause: "alimentaire",
    bullets: [
      "Fast-food solidaire installé dans un ancien McDonald's des quartiers nord",
      "Distributions alimentaires et plateforme d'entraide de quartier",
      "Insertion par l'emploi des habitants du quartier"
    ],
    engagements: ["temps", "argent", "materiel"],
    actions: ["Distribution alimentaire", "Logistique", "Animation de quartier"],
    site: "https://www.apresm.org",
    histoire: "Symbole marseillais né pendant la crise sanitaire : l'ancien McDonald's de Saint-Barthélémy, occupé par ses salariés, est devenu une plateforme d'entraide qui a distribué des centaines de milliers de colis alimentaires, puis un fast-food solidaire et coopératif. L'Après M, c'est l'histoire d'un quartier qui a transformé un lieu de restauration rapide en outil d'insertion et de dignité.",
    equipe: [
      { role: "Salariés en insertion", desc: "Cuisine et service du fast-food solidaire" },
      { role: "Bénévoles distribution", desc: "Préparation et remise des colis alimentaires" },
      { role: "Collectif de quartier", desc: "Habitants et soutiens qui font vivre le lieu" }
    ],
    don: "Les dons soutiennent les distributions alimentaires et le modèle solidaire du restaurant (repas suspendus).",
    realisations: [
      { quand: "2020-2022", quoi: "Des centaines de milliers de colis distribués", detail: "Pendant la crise sanitaire, le drive solidaire a nourri les quartiers nord." },
      { quand: "2022", quoi: "Ouverture du fast-food solidaire", detail: "Un burger acheté peut en offrir un : le principe du repas suspendu appliqué au fast-food." }
    ],
    evenements: [
      { id: "apm-e1", titre: "Préparation des colis du samedi", date: dansNJours(2), heure: "08:00 – 12:00", lieu: "L'Après M, Marseille 14e", lat: 43.332, lng: 5.384, type: "Distribution alimentaire", inscrits: 12, places: 20, desc: "Constitution et remise des colis alimentaires aux familles du quartier." },
      { id: "apm-e2", titre: "Fête de quartier solidaire", date: dansNJours(16), heure: "12:00 – 18:00", lieu: "Parvis de L'Après M, Marseille 14e", lat: 43.332, lng: 5.384, type: "Animation de quartier", inscrits: 9, places: 25, desc: "Stands, jeux pour enfants et repas partagé : un coup de main pour l'installation et l'animation." }
    ]
  },
  {
    id: "sos-amitie-marseille",
    nom: "SOS Amitié — Région Marseille Provence",
    ville: "Marseille",
    adresse: "Marseille (lieu d'écoute confidentiel)",
    lat: 43.2951, lng: 5.3708,
    cause: "ecoute",
    bullets: [
      "Écoute anonyme des personnes en détresse ou en solitude, 24 h/24",
      "Prévention du suicide par la parole et le lien",
      "Formation complète des bénévoles écoutants"
    ],
    engagements: ["temps", "argent"],
    actions: ["Écoute téléphonique", "Sensibilisation"],
    site: "https://www.sos-amitie.com",
    histoire: "Depuis 1960, SOS Amitié offre une écoute anonyme et sans jugement à toute personne qui traverse un moment difficile. Le poste régional de Marseille assure des permanences jour et nuit. Devenir écoutant demande un vrai parcours de formation et de supervision — un engagement exigeant et profondément utile.",
    equipe: [
      { role: "Écoutants bénévoles", desc: "Permanences d'écoute anonymes, de jour comme de nuit" },
      { role: "Formateurs et superviseurs", desc: "Sélection, formation et soutien des écoutants" }
    ],
    don: "Les dons financent la formation des écoutants et le fonctionnement des postes d'écoute.",
    realisations: [
      { quand: "2025", quoi: "Des dizaines de milliers d'appels écoutés", detail: "Une présence de nuit comme de jour, quand la solitude devient trop lourde." },
      { quand: "Depuis 1960", quoi: "L'écoute qui sauve", detail: "Un maillon reconnu de la prévention du suicide en France." }
    ],
    evenements: [
      { id: "sos-e1", titre: "Réunion d'information futurs écoutants", date: dansNJours(8), heure: "18:30 – 20:00", lieu: "En visioconférence (lien après inscription)", lat: 43.295, lng: 5.371, type: "Sensibilisation", inscrits: 7, places: 20, desc: "Découvrir l'engagement d'écoutant : parcours de formation, permanences, témoignages de bénévoles." }
    ]
  },
  {
    id: "spa-marseille",
    nom: "SPA de Marseille-Provence",
    ville: "Marseille",
    adresse: "Refuge, Marseille 11e",
    lat: 43.2894, lng: 5.4728,
    cause: "animaux",
    bullets: [
      "Refuge pour chiens et chats abandonnés ou maltraités",
      "Adoptions responsables et stérilisation",
      "Familles d'accueil et bénévolat au refuge"
    ],
    engagements: ["temps", "argent", "materiel"],
    actions: ["Promenade de chiens", "Câlins aux chats", "Famille d'accueil", "Collecte de croquettes"],
    site: "https://www.spa-marseille.com",
    histoire: "Le refuge marseillais accueille chaque année des centaines de chiens et de chats abandonnés, les soigne et leur cherche une nouvelle famille. Les bénévoles sont essentiels à la vie du refuge : promenades quotidiennes des chiens, socialisation des chats, coups de main sur les collectes et les journées d'adoption.",
    equipe: [
      { role: "Soigneurs", desc: "Soins quotidiens, nourrissage et suivi des animaux" },
      { role: "Bénévoles promeneurs", desc: "Sorties des chiens et socialisation" },
      { role: "Familles d'accueil", desc: "Héberger temporairement chatons, chiens convalescents…" }
    ],
    don: "Les dons financent soins vétérinaires, nourriture et aménagement des box. Les dons de croquettes, couvertures et jouets sont aussi très attendus.",
    realisations: [
      { quand: "2025", quoi: "Des centaines d'adoptions", detail: "Autant d'animaux sortis du refuge vers une famille pour de bon." },
      { quand: "2024", quoi: "Campagne de stérilisation des chats libres", detail: "Limiter durablement la misère animale en ville." }
    ],
    evenements: [
      { id: "spa-e1", titre: "Matinée promenade des chiens", date: dansNJours(2), heure: "09:00 – 12:00", lieu: "Refuge SPA, Marseille 11e", lat: 43.289, lng: 5.473, type: "Promenade de chiens", inscrits: 15, places: 20, desc: "Sortir les pensionnaires dans les collines voisines. Baskets obligatoires, câlins garantis." },
      { id: "spa-e2", titre: "Journée portes ouvertes adoption", date: dansNJours(9), heure: "10:00 – 17:00", lieu: "Refuge SPA, Marseille 11e", lat: 43.289, lng: 5.473, type: "Collecte de croquettes", inscrits: 6, places: 12, desc: "Accueillir les visiteurs, présenter les animaux et tenir le stand de collecte." }
    ]
  },
  {
    id: "secours-catholique-aix",
    nom: "Secours Catholique — Délégation d'Aix-en-Provence",
    ville: "Aix-en-Provence",
    adresse: "Centre-ville d'Aix-en-Provence",
    lat: 43.5263, lng: 5.4454,
    cause: "alimentaire",
    bullets: [
      "Accueil, écoute et aide d'urgence aux personnes en précarité",
      "Épiceries solidaires et groupes conviviaux",
      "Accompagnement vers les droits, ouvert à tous sans condition"
    ],
    engagements: ["temps", "argent", "materiel"],
    actions: ["Accueil et écoute", "Épicerie solidaire", "Accompagnement", "Cours de français"],
    site: "https://www.secours-catholique.org",
    histoire: "Le Secours Catholique-Caritas France agit depuis 1946 auprès des personnes en situation de pauvreté, sans distinction d'origine ou de religion. À Aix-en-Provence, les équipes locales animent accueils conviviaux, épiceries solidaires, cours de français et accompagnement dans les démarches — avec une conviction : personne ne s'en sort seul.",
    equipe: [
      { role: "Bénévoles d'accueil", desc: "Café, écoute et orientation dans les locaux du centre-ville" },
      { role: "Animateurs d'ateliers", desc: "Français, cuisine, ateliers parents-enfants" },
      { role: "Accompagnants", desc: "Démarches administratives et accès aux droits" }
    ],
    don: "Les dons financent les aides d'urgence (alimentation, énergie, mobilité) des familles accompagnées à Aix et dans le pays d'Aix. Réduction d'impôt de 75 % dans la limite du plafond légal.",
    realisations: [
      { quand: "2025", quoi: "Ouverture d'un nouvel accueil convivial", detail: "Un lieu chaleureux au centre-ville pour rompre l'isolement et créer du lien." },
      { quand: "2024", quoi: "Renfort des cours de français", detail: "De nouveaux créneaux pour répondre à une demande croissante." }
    ],
    evenements: [
      { id: "sca-e1", titre: "Permanence accueil-café du mardi", date: dansNJours(5), heure: "09:30 – 12:00", lieu: "Local Secours Catholique, Aix centre", lat: 43.526, lng: 5.445, type: "Accueil et écoute", inscrits: 3, places: 6, desc: "Servir le café, discuter, jouer aux cartes : un moment simple qui change une matinée." },
      { id: "sca-e2", titre: "Atelier conversation en français", date: dansNJours(12), heure: "14:00 – 16:00", lieu: "Local Secours Catholique, Aix centre", lat: 43.526, lng: 5.445, type: "Cours de français", inscrits: 4, places: 8, desc: "Animer un petit groupe de conversation. Pas besoin d'être prof, juste d'aimer discuter." }
    ]
  },
  {
    id: "restos-aix",
    nom: "Les Restos du Cœur — Centre d'Aix-en-Provence",
    ville: "Aix-en-Provence",
    adresse: "Aix-en-Provence, quartier Jas de Bouffan",
    lat: 43.5231, lng: 5.4211,
    cause: "alimentaire",
    bullets: [
      "Distribution alimentaire hebdomadaire aux familles inscrites",
      "Aide aux bébés : lait, couches, matériel de puériculture",
      "Ateliers et accompagnement vers l'autonomie"
    ],
    engagements: ["temps", "argent", "materiel"],
    actions: ["Distribution alimentaire", "Collecte en magasin", "Aide bébés"],
    site: "https://www.restosducoeur.org",
    histoire: "Le centre aixois des Restos du Cœur accueille chaque semaine des familles du pays d'Aix pour la distribution alimentaire, avec une attention particulière aux tout-petits via les « Restos Bébés ». Comme partout dans le réseau fondé par Coluche, l'aide alimentaire est une porte d'entrée vers un accompagnement plus large.",
    equipe: [
      { role: "Bénévoles de distribution", desc: "Accueil des familles et remise des paniers" },
      { role: "Équipe Restos Bébés", desc: "Lait infantile, couches et conseils aux jeunes parents" }
    ],
    don: "Chaque don finance des repas et l'aide aux bébés des familles du pays d'Aix. Réduction d'impôt de 75 % dans la limite du plafond « Coluche ».",
    realisations: [
      { quand: "Campagne 2024-2025", quoi: "Des centaines de familles aixoises accompagnées", detail: "Distribution hebdomadaire et accompagnement des situations les plus fragiles." },
      { quand: "2024", quoi: "Développement des Restos Bébés", detail: "Un espace dédié aux parents de jeunes enfants au sein du centre." }
    ],
    evenements: [
      { id: "raix-e1", titre: "Distribution du jeudi matin", date: dansNJours(4), heure: "08:30 – 12:30", lieu: "Centre Restos du Cœur, Jas de Bouffan", lat: 43.523, lng: 5.421, type: "Distribution alimentaire", inscrits: 7, places: 10, desc: "Accueil des familles, remise des paniers et réassort des rayons." },
      { id: "raix-e2", titre: "Collecte en supermarché — pays d'Aix", date: dansNJours(10), heure: "09:00 – 18:00", lieu: "Supermarché, Aix-en-Provence ouest", lat: 43.520, lng: 5.418, type: "Collecte en magasin", inscrits: 11, places: 24, desc: "Créneaux de 2 h pour proposer aux clients de donner un produit à la caisse." }
    ]
  },
  {
    id: "croix-rouge-aix",
    nom: "Croix-Rouge française — Unité locale du Pays d'Aix",
    ville: "Aix-en-Provence",
    adresse: "Aix-en-Provence",
    lat: 43.5312, lng: 5.4512,
    cause: "hebergement",
    bullets: [
      "Maraudes et aide alimentaire sur le pays d'Aix",
      "Vestiboutique ouverte à tous",
      "Postes de secours et formations aux premiers gestes"
    ],
    engagements: ["temps", "argent", "materiel"],
    actions: ["Maraude", "Premiers secours", "Vestiaire solidaire"],
    site: "https://www.croix-rouge.fr",
    histoire: "L'unité locale du Pays d'Aix décline les missions de la Croix-Rouge à l'échelle du bassin aixois : maraudes auprès des personnes isolées, aide alimentaire et vestimentaire, postes de secours sur les événements locaux et formations aux gestes qui sauvent, portées par une équipe de bénévoles engagés.",
    equipe: [
      { role: "Équipes de maraude", desc: "Tournées du soir auprès des personnes à la rue" },
      { role: "Secouristes", desc: "Dispositifs de secours des événements du pays d'Aix" },
      { role: "Bénévoles vestiboutique", desc: "Tri des dons et accueil en boutique" }
    ],
    don: "Les dons soutiennent l'action locale : maraudes, aide d'urgence, matériel de secours. Réduction d'impôt de 66 %.",
    realisations: [
      { quand: "Hiver 2025-2026", quoi: "Maraudes renforcées sur Aix", detail: "Distribution de boissons chaudes, duvets et orientation vers les hébergements d'urgence." },
      { quand: "2025", quoi: "Formations PSC1 mensuelles", detail: "Les gestes qui sauvent enseignés aux habitants du pays d'Aix." }
    ],
    evenements: [
      { id: "craix-e1", titre: "Maraude du vendredi soir", date: dansNJours(6), heure: "19:00 – 22:30", lieu: "Départ local Croix-Rouge, Aix", lat: 43.531, lng: 5.451, type: "Maraude", inscrits: 4, places: 6, desc: "Tournée en équipe dans le centre d'Aix : boissons chaudes, écoute et orientation." },
      { id: "craix-e2", titre: "Vente solidaire à la vestiboutique", date: dansNJours(15), heure: "10:00 – 17:00", lieu: "Vestiboutique, Aix-en-Provence", lat: 43.530, lng: 5.450, type: "Vestiaire solidaire", inscrits: 2, places: 6, desc: "Accueil, conseil et encaissement à la boutique solidaire ouverte à tous." }
    ]
  },
  {
    id: "spa-aix",
    nom: "SPA — Refuge du Pays d'Aix",
    ville: "Aix-en-Provence",
    adresse: "Périphérie d'Aix-en-Provence",
    lat: 43.4915, lng: 5.3902,
    cause: "animaux",
    bullets: [
      "Accueil des chiens et chats abandonnés du pays d'Aix",
      "Programme de promenades et de socialisation par des bénévoles",
      "Journées d'adoption régulières"
    ],
    engagements: ["temps", "argent", "materiel"],
    actions: ["Promenade de chiens", "Câlins aux chats", "Collecte de croquettes"],
    site: "https://www.la-spa.fr",
    histoire: "Le refuge du pays d'Aix recueille les animaux abandonnés ou saisis, leur offre soins et attention, et organise leur adoption. Les bénévoles promeneurs sont le maillon indispensable du bien-être des chiens en attente d'adoption ; les félins, eux, réclament des caresses et de la patience en chatterie.",
    equipe: [
      { role: "Soigneurs animaliers", desc: "Nourrissage, soins et propreté des box" },
      { role: "Bénévoles promeneurs", desc: "Balades quotidiennes et éducation douce" }
    ],
    don: "Les dons couvrent frais vétérinaires et alimentation. Croquettes, litière et couvertures sont bienvenues toute l'année.",
    realisations: [
      { quand: "2025", quoi: "Un été sans saturation", detail: "Mobilisation record de familles d'accueil pendant la vague d'abandons estivale." },
      { quand: "2024", quoi: "Rénovation de la chatterie", detail: "Des espaces plus calmes pour faciliter l'adoption des chats craintifs." }
    ],
    evenements: [
      { id: "spaa-e1", titre: "Promenades du dimanche matin", date: dansNJours(3), heure: "09:00 – 12:00", lieu: "Refuge SPA, pays d'Aix", lat: 43.491, lng: 5.390, type: "Promenade de chiens", inscrits: 9, places: 15, desc: "Balades dans la garrigue avec les pensionnaires. Inscription obligatoire, briefing sur place." },
      { id: "spaa-e2", titre: "Collecte de croquettes en jardinerie", date: dansNJours(12), heure: "10:00 – 17:00", lieu: "Jardinerie, Aix-en-Provence sud", lat: 43.505, lng: 5.430, type: "Collecte de croquettes", inscrits: 3, places: 8, desc: "Stand de collecte : croquettes, litière et couvertures pour le refuge." }
    ]
  },
  {
    id: "unicite-aix-marseille",
    nom: "Unis-Cité — Antenne Aix-Marseille",
    ville: "Marseille",
    adresse: "Marseille 2e",
    lat: 43.3102, lng: 5.3671,
    cause: "jeunes",
    bullets: [
      "Service civique en équipe pour les 16-25 ans",
      "Missions de solidarité : personnes âgées, environnement, lien social",
      "Un tremplin citoyen et professionnel pour les jeunes"
    ],
    engagements: ["temps", "argent"],
    actions: ["Service civique", "Animation", "Sensibilisation"],
    site: "https://www.uniscite.fr",
    histoire: "Pionnière du service civique en France, Unis-Cité mobilise des jeunes de tous horizons pour des missions de solidarité menées en équipe : visites à des personnes âgées isolées, sensibilisation aux écogestes, soutien aux associations locales. L'antenne Aix-Marseille accueille chaque année des promotions de volontaires qui découvrent l'engagement — et souvent leur voie.",
    equipe: [
      { role: "Volontaires en service civique", desc: "8 mois de missions solidaires en équipe" },
      { role: "Coordinateurs d'équipes", desc: "Encadrement et formation des volontaires" }
    ],
    don: "Les dons permettent d'ouvrir des places de service civique à des jeunes éloignés de l'engagement.",
    realisations: [
      { quand: "Promotion 2025", quoi: "Des dizaines de volontaires mobilisés", detail: "Milliers d'heures de solidarité auprès des aînés et des associations du territoire." },
      { quand: "Depuis 1995", quoi: "Le service civique avant l'heure", detail: "Unis-Cité a inspiré la création du service civique national en 2010." }
    ],
    evenements: [
      { id: "uc-e1", titre: "Réunion découverte du service civique", date: dansNJours(7), heure: "14:00 – 15:30", lieu: "Antenne Unis-Cité, Marseille 2e", lat: 43.310, lng: 5.367, type: "Sensibilisation", inscrits: 5, places: 15, desc: "Tout savoir sur les missions, l'indemnité et le recrutement de la prochaine promotion. 16-25 ans." }
    ]
  },
  {
    id: "la-cloche-sud",
    nom: "La Cloche Sud — Le Carillon Marseille",
    ville: "Marseille",
    adresse: "Marseille 1er, centre-ville",
    lat: 43.2946, lng: 5.3840,
    cause: "hebergement",
    bullets: [
      "Un réseau de commerçants solidaires : café suspendu, recharge de téléphone, toilettes, verre d'eau",
      "Créer du lien social entre habitants, commerçants et personnes sans domicile",
      "ApéRues, chorale et activités ouvertes à tous, avec ou sans domicile"
    ],
    engagements: ["temps", "argent"],
    actions: ["Mobilisation de commerçants", "ApéRue", "Activités partagées", "Sensibilisation"],
    site: "https://www.lacloche.org/sud-marseille",
    histoire: "« Nous avons autant besoin de quoi vivre que de raisons de vivre. » La Cloche lutte contre la grande exclusion en remettant le lien social au même niveau que les besoins vitaux. Son programme phare, Le Carillon, mobilise des commerçants de quartier qui offrent des services simples aux personnes sans domicile — un café suspendu, recharger un téléphone, utiliser les toilettes — et surtout un bonjour et un prénom. À Marseille depuis 2017, l'antenne Sud anime aussi des ApéRues et des activités partagées où l'on se rencontre d'égal à égal.",
    equipe: [
      { role: "Équipe d'antenne", desc: "Animation du réseau de commerçants et des activités du quartier" },
      { role: "Bénévoles avec et sans domicile", desc: "À La Cloche, chacun participe : la solidarité se construit avec tout le monde" },
      { role: "Commerçants solidaires", desc: "Les petits gestes du quotidien qui changent une journée" }
    ],
    don: "Vos dons font grandir le réseau de commerces solidaires et financent les activités qui recréent du lien : ApéRues, chorale, sorties partagées. Réduction d'impôt de 66 %.",
    realisations: [
      { quand: "2024-2025", quoi: "Première campagne nationale de dons du Carillon", detail: "Une mobilisation qui a permis de consolider le réseau marseillais de commerçants solidaires." },
      { quand: "Depuis 2017", quoi: "Le Carillon sonne à Marseille", detail: "Des dizaines de commerces du centre-ville affichent le pictogramme et offrent leurs services aux personnes de la rue." }
    ],
    evenements: [
      { id: "cloche-e1", titre: "ApéRue du 22 — apéro de quartier inclusif", date: dansNJours(5), heure: "18:00 – 21:00", lieu: "Place de quartier, Marseille 1er", lat: 43.295, lng: 5.384, type: "ApéRue", inscrits: 12, places: 25, desc: "Un apéro ouvert à toutes et tous, avec ou sans domicile : on installe, on discute, on partage. Le meilleur moyen de découvrir La Cloche." },
      { id: "cloche-e2", titre: "Tournée des commerçants solidaires", date: dansNJours(11), heure: "10:00 – 12:30", lieu: "Départ centre-ville, Marseille 1er", lat: 43.296, lng: 5.383, type: "Mobilisation de commerçants", inscrits: 4, places: 8, desc: "En binôme, aller à la rencontre des commerçants du quartier pour présenter Le Carillon et renforcer le réseau." }
    ]
  },
  {
    id: "armee-du-salut-marseille",
    nom: "Fondation de l'Armée du Salut — Marseille",
    ville: "Marseille",
    adresse: "Résidence William Booth, Marseille 3e",
    lat: 43.3130, lng: 5.3830,
    cause: "hebergement",
    bullets: [
      "Hébergement et accompagnement des personnes en grande précarité",
      "Aide alimentaire durable et espaces de cuisine partagée",
      "Secourir, accompagner, reconstruire : un suivi jusqu'à l'autonomie"
    ],
    engagements: ["temps", "argent", "materiel"],
    actions: ["Aide alimentaire", "Accompagnement", "Cuisine partagée", "Collecte"],
    site: "https://www.armeedusalut.fr",
    histoire: "Présente en France depuis plus de 140 ans, l'Armée du Salut se bat contre toutes les exclusions. À Marseille, la résidence William Booth accueille et accompagne des personnes fragilisées par la vie : hébergement, aide alimentaire durable, et un dispositif original de cuisine partagée qui permet aux personnes hébergées à l'hôtel — souvent sans accès à une cuisine — de préparer elles-mêmes leurs repas et de retrouver de l'autonomie.",
    equipe: [
      { role: "Travailleurs sociaux", desc: "Accompagnement global des personnes accueillies" },
      { role: "Bénévoles aide alimentaire", desc: "Distribution et animation des espaces de cuisine partagée" },
      { role: "Équipe de la résidence", desc: "Le quotidien d'un lieu qui secourt, accompagne et reconstruit" }
    ],
    don: "Vos dons financent les repas, l'hébergement d'urgence et l'accompagnement vers la réinsertion. Réduction d'impôt de 75 % dans la limite du plafond légal.",
    realisations: [
      { quand: "2025", quoi: "Cuisine mobile pour les familles à l'hôtel", detail: "Un camion-cuisine et des espaces équipés pour permettre aux personnes hébergées de cuisiner leurs propres repas." },
      { quand: "Depuis 1878", quoi: "Secourir, accompagner, reconstruire", detail: "Trois mots qui résument la mission de la fondation, reconnue d'utilité publique." }
    ],
    evenements: [
      { id: "ads-e1", titre: "Atelier cuisine partagée", date: dansNJours(6), heure: "10:00 – 13:30", lieu: "Résidence William Booth, Marseille 3e", lat: 43.313, lng: 5.383, type: "Cuisine partagée", inscrits: 5, places: 8, desc: "Cuisiner et partager un repas avec les personnes accompagnées. On épluche, on discute, on mange ensemble." },
      { id: "ads-e2", titre: "Collecte alimentaire de quartier", date: dansNJours(13), heure: "09:30 – 17:00", lieu: "Supermarché, Marseille 3e", lat: 43.314, lng: 5.381, type: "Collecte", inscrits: 7, places: 14, desc: "Proposer aux clients de donner des produits secs et d'hygiène pour l'aide alimentaire durable." }
    ]
  },
  {
    id: "ordre-de-malte-13",
    nom: "Ordre de Malte France — Délégation des Bouches-du-Rhône",
    ville: "Marseille",
    adresse: "27 cours Gouffé, Marseille 6e",
    lat: 43.2837, lng: 5.3893,
    cause: "alimentaire",
    bullets: [
      "Petits déjeuners solidaires et maraudes auprès des personnes à la rue",
      "Épicerie solidaire au cœur de Marseille, ouverte sur rendez-vous",
      "Un temps de pause, d'attention et de réconfort autour d'un café chaud"
    ],
    engagements: ["temps", "argent", "materiel"],
    actions: ["Petit déjeuner solidaire", "Maraude", "Épicerie solidaire"],
    site: "https://www.ordredemaltefrance.org",
    histoire: "Héritier d'une tradition hospitalière presque millénaire, l'Ordre de Malte France agit auprès des personnes fragilisées. À Marseille, ses bénévoles servent des petits déjeuners aux personnes sans abri le week-end — bien plus qu'un café : un moment d'écoute et de considération — et animent une épicerie solidaire cours Gouffé où les personnes en précarité font leurs courses à petit prix, dans la dignité d'un vrai commerce.",
    equipe: [
      { role: "Bénévoles petits déjeuners", desc: "Le rendez-vous du week-end : boissons chaudes, viennoiseries et conversation" },
      { role: "Équipe épicerie solidaire", desc: "Accueil sur rendez-vous, conseil et mise en rayon" },
      { role: "Maraudeurs Soli'Malte", desc: "Aide alimentaire, kits d'hygiène et lien social dans la rue" }
    ],
    don: "20 € financent un mois de café pour les maraudes, 80 € permettent de servir 50 petits déjeuners aux personnes de la rue. Réduction d'impôt de 75 % dans la limite du plafond légal.",
    realisations: [
      { quand: "2025", quoi: "Ouverture de l'épicerie solidaire de Marseille", detail: "Deux après-midis par semaine, des produits frais, secs et d'hygiène proposés aux personnes en précarité." },
      { quand: "Chaque hiver", quoi: "Petits déjeuners et soupes de rue", detail: "Les tentes de l'Ordre de Malte se dressent le week-end d'octobre à avril." }
    ],
    evenements: [
      { id: "odm-e1", titre: "Petit déjeuner solidaire du dimanche", date: dansNJours(4), heure: "08:00 – 11:00", lieu: "Centre-ville, Marseille", lat: 43.293, lng: 5.377, type: "Petit déjeuner solidaire", inscrits: 8, places: 12, desc: "Installer la tente, servir café et viennoiseries, et surtout prendre le temps de discuter." },
      { id: "odm-e2", titre: "Permanence à l'épicerie solidaire", date: dansNJours(9), heure: "14:30 – 17:00", lieu: "27 cours Gouffé, Marseille 6e", lat: 43.284, lng: 5.389, type: "Épicerie solidaire", inscrits: 2, places: 4, desc: "Accueillir les bénéficiaires, les accompagner dans leurs courses et tenir la caisse solidaire." }
    ]
  },
  {
    id: "atd-quart-monde-marseille",
    nom: "ATD Quart Monde — Groupe de Marseille",
    ville: "Marseille",
    adresse: "Marseille 3e",
    lat: 43.3050, lng: 5.3800,
    cause: "jeunes",
    bullets: [
      "Bibliothèques de rue : des livres et des ateliers au pied des immeubles",
      "Université populaire Quart Monde : la parole aux personnes en précarité",
      "Agir AVEC les familles les plus pauvres, jamais à leur place"
    ],
    engagements: ["temps", "argent"],
    actions: ["Bibliothèque de rue", "Université populaire", "Festival des savoirs", "Accompagnement"],
    site: "https://www.atd-quartmonde.fr",
    histoire: "Fondé en 1957 par Joseph Wresinski dans un bidonville de région parisienne, ATD Quart Monde refuse la misère et construit avec les familles les plus pauvres — jamais à leur place. À Marseille, les bénévoles animent des bibliothèques de rue au pied des immeubles des quartiers populaires, des festivals des savoirs et une université populaire où les personnes en grande précarité prennent la parole et font entendre leur expérience.",
    equipe: [
      { role: "Animateurs bibliothèque de rue", desc: "Lire, créer et rêver avec les enfants, au pied des tours" },
      { role: "Alliés et militants Quart Monde", desc: "Personnes en précarité et citoyens engagés, ensemble" },
      { role: "Volontaires permanents", desc: "Ils font le choix de vivre et d'agir aux côtés des plus pauvres" }
    ],
    don: "Vos dons financent les bibliothèques de rue, les universités populaires et le combat pour l'accès de tous aux droits fondamentaux. Réduction d'impôt de 66 %.",
    realisations: [
      { quand: "17 octobre", quoi: "Journée mondiale du refus de la misère", detail: "Chaque année, une mobilisation publique née d'ATD Quart Monde, reconnue par l'ONU." },
      { quand: "Depuis 1957", quoi: "« Territoires zéro chômeur de longue durée »", detail: "Une idée portée par ATD Quart Monde devenue loi, expérimentée dans toute la France." }
    ],
    evenements: [
      { id: "atd-e1", titre: "Bibliothèque de rue du mercredi", date: dansNJours(5), heure: "16:00 – 18:00", lieu: "Pied d'immeuble, quartiers nord de Marseille", lat: 43.330, lng: 5.380, type: "Bibliothèque de rue", inscrits: 3, places: 6, desc: "Une couverture, des livres, des enfants : la lecture partagée là où les livres ne vont jamais." },
      { id: "atd-e2", titre: "Festival des savoirs et des arts", date: dansNJours(15), heure: "14:00 – 18:00", lieu: "Place publique, Marseille 3e", lat: 43.305, lng: 5.380, type: "Festival des savoirs", inscrits: 6, places: 15, desc: "Ateliers créatifs, sciences et jeux ouverts à tous les enfants du quartier. Coup de main à l'installation et à l'animation." }
    ]
  },
  {
    id: "habitat-humanisme-provence",
    nom: "Habitat et Humanisme Provence",
    ville: "Marseille",
    adresse: "Marseille 6e",
    lat: 43.2880, lng: 5.3800,
    cause: "hebergement",
    bullets: [
      "Loger dignement des familles et personnes seules en difficulté",
      "Un accompagnement de proximité par des bénévoles, jusqu'à l'autonomie",
      "Pensions de famille et habitats partagés pour recréer du lien"
    ],
    engagements: ["temps", "argent"],
    actions: ["Accompagnement de locataires", "Animation en pension de famille", "Aide administrative"],
    site: "https://www.habitat-humanisme.org",
    histoire: "Depuis 40 ans, Habitat et Humanisme agit pour que les personnes en difficulté accèdent à un logement digne — et surtout pour qu'elles s'y reconstruisent. En Provence, l'association loge des familles dans des logements à loyer accessible et anime des pensions de famille où des personnes isolées retrouvent un chez-soi et une vie collective. Chaque ménage logé est accompagné par un binôme de bénévoles : le logement d'abord, le lien toujours.",
    equipe: [
      { role: "Bénévoles accompagnants", desc: "Un binôme aux côtés de chaque ménage logé : visites, écoute, coups de main" },
      { role: "Hôtes de pension de famille", desc: "Animer la vie collective des maisons partagées" },
      { role: "Équipe immobilière", desc: "Trouver, rénover et gérer des logements solidaires" }
    ],
    don: "Vos dons financent le logement et l'accompagnement des personnes fragiles. Réduction d'impôt de 75 % dans la limite du plafond légal ; possibilité d'épargne solidaire.",
    realisations: [
      { quand: "2025", quoi: "De nouveaux logements solidaires en Provence", detail: "Des familles relogées durablement avec un accompagnement de proximité." },
      { quand: "Depuis 1985", quoi: "40 ans de logement très social", detail: "Un mouvement né à Lyon devenu un acteur national de la lutte contre le mal-logement." }
    ],
    evenements: [
      { id: "hh-e1", titre: "Café-rencontre en pension de famille", date: dansNJours(8), heure: "15:00 – 17:30", lieu: "Pension de famille, Marseille", lat: 43.288, lng: 5.380, type: "Animation en pension de famille", inscrits: 4, places: 8, desc: "Goûter, jeux et discussions avec les résidents. Une présence simple qui fait beaucoup." }
    ]
  },
  {
    id: "fondation-logement-paca",
    nom: "Fondation pour le Logement (ex-Fondation Abbé Pierre) — Agence PACA",
    ville: "Marseille",
    adresse: "16-20 rue Loubon, Marseille 3e",
    lat: 43.3145, lng: 5.3860,
    cause: "hebergement",
    bullets: [
      "Boutique Solidarité : accueil de jour pour les personnes à la rue",
      "Accompagnement aux droits liés à l'habitat (logement indigne, expulsions)",
      "Soutien aux associations locales de lutte contre le mal-logement"
    ],
    engagements: ["temps", "argent"],
    actions: ["Accueil de jour", "Accompagnement aux droits", "Sensibilisation"],
    site: "https://www.fondationpourlelogement.fr",
    histoire: "Créée par l'abbé Pierre en 1987 et rebaptisée Fondation pour le Logement des Défavorisés, la fondation combat le mal-logement sous toutes ses formes. Son agence régionale de la rue Loubon abrite aussi la Boutique Solidarité de Marseille : un accueil de jour où les personnes à la rue trouvent un café, une douche, une laverie, une domiciliation — et des visages qui les reconnaissent. Ses permanences aident les ménages face à l'habitat indigne et aux expulsions.",
    equipe: [
      { role: "Accueillants Boutique Solidarité", desc: "Café, écoute et services du quotidien pour les personnes à la rue" },
      { role: "Bénévoles accès aux droits", desc: "Permanences téléphoniques et accompagnement des ménages mal logés" },
      { role: "Équipe régionale", desc: "Soutien aux projets associatifs du territoire" }
    ],
    don: "Vos dons financent les accueils de jour, l'aide aux ménages mal logés et les projets des associations locales. Réduction d'impôt de 75 % dans la limite du plafond légal.",
    realisations: [
      { quand: "Chaque année", quoi: "Rapport sur l'état du mal-logement", detail: "Le document de référence qui met la question du logement au cœur du débat public." },
      { quand: "À Marseille", quoi: "La Boutique Solidarité de la rue Loubon", detail: "Un lieu d'accueil inconditionnel dans le 3e arrondissement, l'un des plus pauvres de France." }
    ],
    evenements: [
      { id: "fpl-e1", titre: "Petit déjeuner à la Boutique Solidarité", date: dansNJours(7), heure: "08:30 – 11:30", lieu: "16-20 rue Loubon, Marseille 3e", lat: 43.3145, lng: 5.386, type: "Accueil de jour", inscrits: 3, places: 6, desc: "Servir le café, discuter et donner un coup de main à l'accueil de jour." }
    ]
  },
  {
    id: "emmaus-saint-marcel",
    nom: "Emmaüs Saint-Marcel",
    ville: "Marseille",
    adresse: "46 boulevard de la Cartonnerie, Marseille 11e",
    lat: 43.2890, lng: 5.4480,
    cause: "hebergement",
    bullets: [
      "Communauté de compagnes et compagnons dans la vallée de l'Huveaune",
      "Grande salle de vente : meubles, vêtements, livres, électroménager",
      "Vos dons d'objets financent directement l'accueil des personnes"
    ],
    engagements: ["temps", "materiel", "argent"],
    actions: ["Tri et manutention", "Vente solidaire", "Collecte d'objets"],
    site: "http://www.emmaus-saintmarcel.com",
    histoire: "Dans la vallée de l'Huveaune, la communauté Emmaüs de Saint-Marcel fait vivre le modèle imaginé par l'abbé Pierre : des personnes cabossées par la vie y retrouvent un toit, une activité et une place, en collectant, réparant et revendant les objets donnés par les habitants. La salle de vente du boulevard de la Cartonnerie est une caverne d'Ali Baba solidaire où chaque achat finance l'accueil de nouvelles personnes.",
    equipe: [
      { role: "Compagnes et compagnons", desc: "Le cœur de la communauté : collecte, tri, réparation, vente" },
      { role: "Amis bénévoles", desc: "Coup de main sur les ventes et les événements" },
      { role: "Équipe d'accompagnement", desc: "Accueil et suivi des personnes de la communauté" }
    ],
    don: "Le meilleur don reste un objet en bon état : meubles, vaisselle, livres, électroménager. Dépôt sur place du mardi au samedi, ramassage à domicile sur rendez-vous dans l'est marseillais.",
    realisations: [
      { quand: "2025", quoi: "Des dizaines de compagnons accueillis", detail: "Un toit, une activité et une communauté pour repartir." },
      { quand: "Depuis 1949", quoi: "La seconde main au service de la seconde chance", detail: "Le principe fondateur d'Emmaüs, toujours vivant à Saint-Marcel." }
    ],
    evenements: [
      { id: "emsm-e1", titre: "Coup de main sur la vente du samedi", date: dansNJours(3), heure: "09:00 – 13:00", lieu: "46 bd de la Cartonnerie, Marseille 11e", lat: 43.289, lng: 5.448, type: "Vente solidaire", inscrits: 5, places: 10, desc: "Réassort, accueil des chineurs et bonne humeur au milieu des trouvailles." },
      { id: "emsm-e2", titre: "Déchargement et tri de la collecte", date: dansNJours(10), heure: "14:00 – 17:00", lieu: "46 bd de la Cartonnerie, Marseille 11e", lat: 43.289, lng: 5.448, type: "Tri et manutention", inscrits: 3, places: 8, desc: "Bras solides bienvenus : décharger les camions de ramassage et trier les objets donnés." }
    ]
  },
  {
    id: "emmaus-cabries",
    nom: "Emmaüs Cabriès — Pays d'Aix",
    ville: "Aix-en-Provence",
    adresse: "Chemin d'Emmaüs, Cabriès (entre Aix et Marseille)",
    lat: 43.4410, lng: 5.3790,
    cause: "hebergement",
    bullets: [
      "Communauté Emmaüs du pays d'Aix : accueil, travail, dignité",
      "Immense bric-à-brac solidaire ouvert aux chineurs du territoire",
      "Donner ses objets, c'est financer l'accueil de compagnons"
    ],
    engagements: ["temps", "materiel", "argent"],
    actions: ["Tri et manutention", "Vente solidaire", "Collecte d'objets"],
    site: "https://emmaus-france.org",
    histoire: "Sur les hauteurs de Cabriès, entre Aix et Marseille, la communauté Emmaüs accueille des compagnes et compagnons qui reconstruisent leur vie autour du réemploi. Meubles, vêtements, vaisselle, livres : tout ce que les habitants du pays d'Aix donnent est trié, réparé et revendu à petit prix — et chaque euro fait vivre la communauté et sa solidarité.",
    equipe: [
      { role: "Compagnes et compagnons", desc: "Collecte, tri et vente : l'activité qui fait vivre la communauté" },
      { role: "Amis bénévoles", desc: "Renfort sur les grandes ventes et les collectes" }
    ],
    don: "Donnez vos meubles, objets et vêtements en bon état directement à la communauté. Les dons financiers soutiennent l'accueil de nouvelles personnes.",
    realisations: [
      { quand: "2025", quoi: "Grandes ventes du pays d'Aix", detail: "Des week-ends exceptionnels qui attirent des chineurs de tout le territoire." },
      { quand: "Depuis 1949", quoi: "L'esprit de l'abbé Pierre", detail: "« Servir premier le plus souffrant », entre Aix et Marseille." }
    ],
    evenements: [
      { id: "emca-e1", titre: "Grande vente mensuelle de Cabriès", date: dansNJours(8), heure: "09:00 – 17:00", lieu: "Communauté Emmaüs, Cabriès", lat: 43.441, lng: 5.379, type: "Vente solidaire", inscrits: 6, places: 12, desc: "Accueillir les visiteurs, réassortir les étals et prêter main forte aux compagnons." }
    ]
  },
  {
    id: "afev-aix-marseille",
    nom: "Afev Aix-Marseille",
    ville: "Marseille",
    adresse: "Marseille 1er",
    lat: 43.2990, lng: 5.3820,
    cause: "jeunes",
    bullets: [
      "Mentorat étudiant : 2 h par semaine aux côtés d'un enfant en fragilité scolaire",
      "Colocations solidaires (Kaps) dans les quartiers populaires",
      "20 ans d'engagement étudiant à Marseille et Aix-en-Provence"
    ],
    engagements: ["temps", "argent"],
    actions: ["Mentorat", "Colocation solidaire", "Animation de quartier"],
    site: "https://afev.org/paca",
    histoire: "Depuis 2006 à Marseille et Aix, l'Afev mobilise des étudiantes et étudiants bénévoles pour accompagner, deux heures par semaine, un enfant ou un adolescent en fragilité scolaire : devoirs, confiance en soi, ouverture culturelle. Avec les colocations solidaires Kaps, des jeunes s'installent au cœur des quartiers populaires et y mènent des projets avec les habitants. Un pont entre les campus et les quartiers.",
    equipe: [
      { role: "Mentors bénévoles", desc: "Étudiants et lycéens engagés 2 h par semaine auprès d'un jeune" },
      { role: "Kapseurs", desc: "Colocataires solidaires investis dans la vie de leur quartier" },
      { role: "Équipe salariée", desc: "Formation, suivi des binômes et lien avec les écoles" }
    ],
    don: "Vos dons permettent de former les mentors et d'accompagner plus d'enfants des quartiers populaires vers la réussite.",
    realisations: [
      { quand: "2026", quoi: "20 ans de l'Afev Aix-Marseille", detail: "Des centaines d'histoires d'engagement entre étudiants et enfants des quartiers." },
      { quand: "2024-2025", quoi: "Mentorat en lycée professionnel", detail: "Près de 200 élèves de la région accompagnés contre le décrochage scolaire." }
    ],
    evenements: [
      { id: "afev-e1", titre: "Soirée découverte du mentorat", date: dansNJours(6), heure: "18:00 – 19:30", lieu: "Antenne Afev, Marseille 1er", lat: 43.299, lng: 5.382, type: "Mentorat", inscrits: 9, places: 20, desc: "Tout comprendre du mentorat en 1 h 30 : témoignages de binômes, modalités d'engagement, questions-réponses." },
      { id: "afev-e2", titre: "Fête de quartier avec les Kaps", date: dansNJours(14), heure: "14:00 – 18:00", lieu: "Quartier populaire, Marseille", lat: 43.320, lng: 5.380, type: "Animation de quartier", inscrits: 5, places: 12, desc: "Jeux, goûter et animations montés par les colocataires solidaires avec les habitants." }
    ]
  },
  {
    id: "sos-mediterranee",
    nom: "SOS MÉDITERRANÉE",
    ville: "Marseille",
    adresse: "Siège de l'association, Marseille 2e",
    lat: 43.3060, lng: 5.3660,
    cause: "sante",
    bullets: [
      "Sauver des vies en mer avec le navire Ocean Viking",
      "Protéger et soigner les personnes rescapées à bord",
      "Une association citoyenne née à Marseille, financée à 90 % par les dons"
    ],
    engagements: ["temps", "argent"],
    actions: ["Sensibilisation", "Antenne bénévole", "Collecte"],
    site: "https://sosmediterranee.fr",
    histoire: "Née à Marseille en 2015, SOS MÉDITERRANÉE affrète l'Ocean Viking pour porter secours aux personnes qui risquent leur vie en mer Méditerranée, la route migratoire la plus meurtrière au monde. Depuis 2016, ses équipes ont secouru plus de 40 000 personnes. À terre, un réseau d'antennes bénévoles — dont celle de Marseille, ville du siège — sensibilise le public et collecte les fonds qui permettent au navire de prendre la mer : une journée d'opérations coûte environ 14 000 €.",
    equipe: [
      { role: "Marins-sauveteurs", desc: "Les équipes de pont qui mènent les sauvetages depuis l'Ocean Viking" },
      { role: "Équipe médicale à bord", desc: "Soigner et protéger les rescapés, en partenariat avec la FICR" },
      { role: "Bénévoles d'antenne", desc: "Sensibilisation, événements et collecte à Marseille et partout en France" }
    ],
    don: "Financée à plus de 90 % par la générosité du public, l'association dépend de vos dons pour maintenir l'Ocean Viking en mer. Réduction d'impôt de 66 %.",
    realisations: [
      { quand: "Depuis 2016", quoi: "Plus de 40 000 personnes secourues", detail: "D'abord avec l'Aquarius, puis avec l'Ocean Viking." },
      { quand: "2023", quoi: "Prix Right Livelihood", detail: "Le « prix Nobel alternatif » décerné à l'association pour ses opérations de sauvetage." }
    ],
    evenements: [
      { id: "sosm-e1", titre: "Soirée témoignage d'un marin-sauveteur", date: dansNJours(9), heure: "19:00 – 21:00", lieu: "Marseille 2e", lat: 43.306, lng: 5.366, type: "Sensibilisation", inscrits: 18, places: 40, desc: "Récit d'une rotation à bord de l'Ocean Viking, suivi d'un échange avec l'antenne marseillaise." },
      { id: "sosm-e2", titre: "Stand de sensibilisation sur le Vieux-Port", date: dansNJours(16), heure: "10:00 – 17:00", lieu: "Vieux-Port, Marseille", lat: 43.295, lng: 5.374, type: "Collecte", inscrits: 4, places: 10, desc: "Tenir le stand de l'antenne : informer les passants et collecter des soutiens." }
    ]
  },
  {
    id: "petites-cantines-marseille",
    nom: "Les Petites Cantines Marseille",
    ville: "Marseille",
    adresse: "36 rue Barbaroux, Marseille 1er (Chez Marthe)",
    lat: 43.2990, lng: 5.3870,
    cause: "isolement",
    bullets: [
      "Une cantine de quartier participative et à prix libre",
      "On cuisine ensemble, on mange ensemble : le lien, une assiette à la fois",
      "Cuisine saine, locale, de saison et anti-gaspi"
    ],
    engagements: ["temps", "argent"],
    actions: ["Atelier cuisine", "Repas partagé", "Animation de quartier"],
    site: "https://marseille.lespetitescantines.org",
    histoire: "Aux Petites Cantines, on ne vient pas seulement manger : on vient rencontrer ses voisins. Dans cette cantine de quartier installée « Chez Marthe », entre les Réformés et la Plaine, chacun peut proposer une recette, éplucher les légumes, servir ou faire la vaisselle — et le repas est à prix libre, pour que personne ne reste à la porte. Un remède simple et joyeux contre l'isolement et l'anonymat des villes.",
    equipe: [
      { role: "Maître·sse de maison", desc: "Veille sur le lieu et accueille les convives" },
      { role: "Convives-cuisiniers", desc: "Ici, tout le monde met la main à la pâte" },
      { role: "Bénévoles du collectif", desc: "Habitants du quartier qui font vivre la cantine depuis ses débuts" }
    ],
    don: "Le repas est à prix libre : donner, c'est permettre à ceux qui ont moins de s'attabler quand même. Vous pouvez aussi offrir un « repas suspendu » en ligne.",
    realisations: [
      { quand: "2026", quoi: "Ouverture Chez Marthe", detail: "Après deux ans de cantines éphémères, un lieu fixe au cœur de Marseille, six services par semaine." },
      { quand: "2024-2025", quoi: "2 000 convives adhérents", detail: "Des milliers de repas partagés entre générations et origines diverses." }
    ],
    evenements: [
      { id: "pc-e1", titre: "Atelier cuisine + repas partagé", date: dansNJours(2), heure: "09:30 – 14:00", lieu: "36 rue Barbaroux, Marseille 1er", lat: 43.299, lng: 5.387, type: "Atelier cuisine", inscrits: 7, places: 10, desc: "On cuisine le menu du jour ensemble, puis on s'attable avec les convives. Prix libre, bonne humeur obligatoire." },
      { id: "pc-e2", titre: "Brunch mensuel du quartier", date: dansNJours(12), heure: "10:30 – 14:30", lieu: "36 rue Barbaroux, Marseille 1er", lat: 43.299, lng: 5.387, type: "Repas partagé", inscrits: 11, places: 18, desc: "Le grand rendez-vous convivial du mois : coup de main au service et à la plonge bienvenu." }
    ]
  },
  {
    id: "secours-pop-aix",
    nom: "Secours Populaire — Comité d'Aix-en-Provence",
    ville: "Aix-en-Provence",
    adresse: "Aix-en-Provence centre",
    lat: 43.5280, lng: 5.4430,
    cause: "alimentaire",
    bullets: [
      "Libre-service alimentaire et vestiaire pour les familles du pays d'Aix",
      "Accompagnement scolaire et départs en vacances pour les enfants",
      "La campagne des « Pères Noël verts » en fin d'année"
    ],
    engagements: ["temps", "argent", "materiel"],
    actions: ["Distribution alimentaire", "Vestiaire solidaire", "Accompagnement scolaire", "Collecte"],
    site: "https://www.secourspopulaire.fr",
    histoire: "Le comité aixois du Secours Populaire décline localement la solidarité inconditionnelle du mouvement : libre-service alimentaire, vestiaire, accompagnement scolaire des enfants et campagnes de vacances pour les familles qui ne partent jamais. Une équipe de bénévoles de tous horizons, au plus près des habitants du pays d'Aix.",
    equipe: [
      { role: "Bénévoles d'accueil", desc: "Libre-service alimentaire et vestiaire du comité" },
      { role: "Accompagnateurs scolaires", desc: "Aide aux devoirs et soutien lecture pour les enfants" },
      { role: "Collecteurs", desc: "Braderies et collectes du pays d'Aix" }
    ],
    don: "Les dons financent l'aide alimentaire locale, les campagnes de vacances et la solidarité d'urgence. Réduction d'impôt de 75 % dans la limite du plafond légal.",
    realisations: [
      { quand: "Été 2025", quoi: "Journée des oubliés des vacances", detail: "Des enfants du pays d'Aix emmenés à la mer pour une journée de jeux." },
      { quand: "Décembre 2025", quoi: "Pères Noël verts aixois", detail: "Jouets et repas de fête pour les familles accompagnées." }
    ],
    evenements: [
      { id: "spaix-e1", titre: "Libre-service alimentaire du mercredi", date: dansNJours(4), heure: "09:00 – 12:30", lieu: "Comité SPF, Aix-en-Provence", lat: 43.528, lng: 5.443, type: "Distribution alimentaire", inscrits: 4, places: 8, desc: "Accueil des familles, réassort des rayons et aide au portage." },
      { id: "spaix-e2", titre: "Collecte de rentrée scolaire", date: dansNJours(13), heure: "10:00 – 17:00", lieu: "Papeterie partenaire, Aix-en-Provence", lat: 43.526, lng: 5.440, type: "Collecte", inscrits: 3, places: 8, desc: "Collecter cahiers, cartables et fournitures pour les enfants des familles accompagnées." }
    ]
  },
  {
    id: "pfp-aix",
    nom: "Les Petits Frères des Pauvres — Équipe d'Aix-en-Provence",
    ville: "Aix-en-Provence",
    adresse: "Aix-en-Provence",
    lat: 43.5250, lng: 5.4480,
    cause: "isolement",
    bullets: [
      "Visites de convivialité auprès des personnes âgées isolées du pays d'Aix",
      "Sorties, fêtes et présence renforcée pendant les fêtes de fin d'année",
      "« Les fleurs avant le pain » : la dignité et le lien d'abord"
    ],
    engagements: ["temps", "argent"],
    actions: ["Visite de convivialité", "Animation", "Accompagnement sorties"],
    site: "https://www.petitsfreresdespauvres.fr",
    histoire: "L'équipe aixoise des Petits Frères des Pauvres accompagne des personnes âgées isolées, en priorité les plus démunies : une visite chaque semaine, un appel, une sortie au marché ou en calanque, une fête d'anniversaire. Autant de rendez-vous qui redonnent une place dans la semaine — et dans le cœur — de personnes que plus personne ne venait voir.",
    equipe: [
      { role: "Bénévoles visiteurs", desc: "Une visite régulière auprès de la même personne : un lien qui compte" },
      { role: "Équipe animation", desc: "Sorties, fêtes et réveillons partagés du pays d'Aix" }
    ],
    don: "Les dons financent visites, sorties et séjours de vacances pour des aînés isolés. Réduction d'impôt de 66 %.",
    realisations: [
      { quand: "Décembre 2025", quoi: "Réveillons partagés à Aix", detail: "Des aînés isolés entourés pour Noël et le nouvel an." },
      { quand: "Depuis 1946", quoi: "« Les fleurs avant le pain »", detail: "La philosophie du fondateur Armand Marquiset, toujours vivante." }
    ],
    evenements: [
      { id: "pfpaix-e1", titre: "Après-midi jeux et goûter avec les aînés", date: dansNJours(7), heure: "14:30 – 17:00", lieu: "Résidence autonomie, Aix-en-Provence", lat: 43.525, lng: 5.448, type: "Animation", inscrits: 4, places: 8, desc: "Cartes, loto et goûter avec les personnes accompagnées. Les histoires d'Aix d'autrefois sont offertes." }
    ]
  }
];

// Niveaux du profil (points cumulés)
const NIVEAUX = [
  { seuil: 0,   nom: "Coup de pouce" },
  { seuil: 40,  nom: "Main tendue" },
  { seuil: 100, nom: "Bras ouverts" },
  { seuil: 200, nom: "Pilier du quartier" },
  { seuil: 350, nom: "Bonne étoile" }
];

// Médailles (débloquées selon l'historique)
const MEDAILLES = [
  { id: "premiere",  nom: "Première action",   condition: (h) => h.length >= 1,  desc: "Participer à un premier événement" },
  { id: "trio",      nom: "Trio solidaire",     condition: (h) => h.length >= 3,  desc: "3 participations" },
  { id: "habitue",   nom: "Habitué·e",          condition: (h) => h.length >= 5,  desc: "5 participations" },
  { id: "fidele",    nom: "Fidèle d'une asso",  condition: (h) => { const c = {}; h.forEach(x => c[x.assoId] = (c[x.assoId] || 0) + 1); return Object.values(c).some(n => n >= 2); }, desc: "2 actions avec la même association" },
  { id: "eclectique",nom: "Cœur éclectique",    condition: (h) => new Set(h.map(x => x.assoId)).size >= 3, desc: "Aider 3 associations différentes" }
];

const VILLES = {
  marseille: { nom: "Marseille", lat: 43.2965, lng: 5.3698 },
  aix:       { nom: "Aix-en-Provence", lat: 43.5297, lng: 5.4474 }
};

/* --------------------------------------------------------------------------
   Liens de don DIRECTS (vérifiés un par un — pages officielles de don).
   Absent de la liste = pas de plateforme de don en ligne identifiée :
   l'onglet Don renvoie alors vers le site officiel (ex. Emmaüs = don d'objets).
   -------------------------------------------------------------------------- */
const LIENS_DON = {
  "restos-marseille":          "https://dons.restosducoeur.org/",
  "restos-aix":                "https://dons.restosducoeur.org/",
  "secours-pop-13":            "https://don.secourspopulaire.fr/",
  "secours-pop-aix":           "https://don.secourspopulaire.fr/",
  "croix-rouge-marseille":     "https://donner.croix-rouge.fr/",
  "croix-rouge-aix":           "https://donner.croix-rouge.fr/",
  "banque-alimentaire-13":     "https://www.helloasso.com/associations/banque-alimentaire-des-bouches-du-rhone/formulaires/1",
  "medecins-du-monde-paca":    "https://www.medecinsdumonde.org/nous-soutenir/donner-ponctuellement/",
  "petits-freres-pauvres":     "https://faireundon.petitsfreresdespauvres.fr/",
  "pfp-aix":                   "https://faireundon.petitsfreresdespauvres.fr/",
  "le-refuge-marseille":       "https://soutien.le-refuge.org/",
  "apres-m":                   "https://www.apresm.org/en/soutien",
  "sos-amitie-marseille":      "https://www.sos-amitie.com/je-fais-un-don/",
  "spa-marseille":             "https://www.helloasso.com/associations/spa-marseille-provence",
  "spa-aix":                   "https://soutenir.la-spa.fr/",
  "secours-catholique-aix":    "https://don.secours-catholique.org/",
  "la-cloche-sud":             "https://www.helloasso.com/associations/la-cloche/formulaires/1",
  "armee-du-salut-marseille":  "https://donner.armeedusalut.fr/",
  "ordre-de-malte-13":         "https://www.ordredemaltefrance.org/faire-un-don-mensuel/",
  "atd-quart-monde-marseille": "https://www.atd-quartmonde.fr/nous-soutenir/faire-un-don-2/",
  "habitat-humanisme-provence":"https://soutien.habitat-humanisme.org/",
  "fondation-logement-paca":   "https://www.fondation-abbe-pierre.fr/contact/faire-un-don",
  "sos-mediterranee":          "https://don.sosmediterranee.org/",
  "petites-cantines-marseille":"https://www.helloasso.com/associations/les-petites-cantines-marseille"
};

/* --------------------------------------------------------------------------
   Photos d'illustration par cause (banque d'images libres Unsplash).
   Elles montrent des personnes et l'esprit de chaque cause ; chaque
   association pourra les remplacer par ses vraies photos (champ PHOTOS_ASSO).
   Un repli automatique masque l'image si elle ne charge pas.
   -------------------------------------------------------------------------- */
function _u(id) { return "https://images.unsplash.com/photo-" + id + "?auto=format&fit=crop&w=1000&q=60"; }
const PHOTOS_CAUSE = {
  alimentaire: { carte: _u("1593113598332-cd288d649433"), galerie: [_u("1593113598332-cd288d649433"), _u("1593113630400-ea4288922497"), _u("1488521787991-ed7bbaae773c")] },
  hebergement: { carte: _u("1559027615-cd4628902d4a"),    galerie: [_u("1559027615-cd4628902d4a"),    _u("1521737604893-d14cc237f11d"), _u("1488521787991-ed7bbaae773c")] },
  sante:       { carte: _u("1576091160399-112ba8d25d1d"), galerie: [_u("1576091160399-112ba8d25d1d"), _u("1521737604893-d14cc237f11d")] },
  isolement:   { carte: _u("1544027993-37dbfe43562a"),    galerie: [_u("1544027993-37dbfe43562a"),    _u("1529156069898-49953e39b3ac")] },
  jeunes:      { carte: _u("1509062522246-3755977927d7"), galerie: [_u("1509062522246-3755977927d7"), _u("1529156069898-49953e39b3ac")] },
  animaux:     { carte: _u("1548199973-03cce0bbc87b"),    galerie: [_u("1548199973-03cce0bbc87b"),    _u("1450778869180-41d0601e046e")] },
  ecoute:      { carte: _u("1521737604893-d14cc237f11d"), galerie: [_u("1521737604893-d14cc237f11d"), _u("1529156069898-49953e39b3ac")] }
};
/* --------------------------------------------------------------------------
   Photos spécifiques par association (PRIORITAIRES sur les photos de cause).
   MODE D'EMPLOI pour en ajouter une :
     "id-de-lasso": {
       carte:   "URL de la photo affichée sur la carte (liste des résultats)",
       galerie: ["URL 1 (grande, à gauche)", "URL 2", "URL 3"]   // 1 à 3 photos pour la fiche
     }
   → l'id est celui du champ `id` de l'association dans ASSOCIATIONS ci-dessus.
   → collez l'URL directe de l'image (clic droit sur la photo du site de
     l'asso → « Copier l'adresse de l'image »). Idéalement des photos avec
     des personnes, en largeur ~1000 px.
   → la 2e photo de la galerie sert aussi de photo d'équipe (Qui sommes-nous).
   -------------------------------------------------------------------------- */
const PHOTOS_ASSO = {
  // Exemple 1 — photos du carrousel de l'antenne sur lacloche.org/sud-marseille
  "la-cloche-sud": {
    carte: "https://static.wixstatic.com/media/e42397_4020c75f46234e1888641174b4209323~mv2.jpg/v1/fill/w_1000,h_620,al_c,q_80/e42397_4020c75f46234e1888641174b4209323~mv2.jpg",
    galerie: [
      "https://static.wixstatic.com/media/e42397_4020c75f46234e1888641174b4209323~mv2.jpg/v1/fill/w_1000,h_620,al_c,q_80/e42397_4020c75f46234e1888641174b4209323~mv2.jpg",
      "https://static.wixstatic.com/media/e42397_217b10546b2f43f8b6f485fa3d236eeb~mv2.jpg/v1/fill/w_800,h_540,al_c,q_80/e42397_217b10546b2f43f8b6f485fa3d236eeb~mv2.jpg",
      "https://static.wixstatic.com/media/e42397_eb6520719279498484dc1f14012d3301~mv2.jpg/v1/fill/w_800,h_540,al_c,q_80/e42397_eb6520719279498484dc1f14012d3301~mv2.jpg"
    ]
  },
  // Exemple 2 — photo de couverture du site apresm.org
  "apres-m": {
    carte: "https://static.wixstatic.com/media/de9f31_c71476c6b029425c8578087a041e576b~mv2.jpg/v1/fit/w_1200,h_640,al_c/de9f31_c71476c6b029425c8578087a041e576b~mv2.jpg",
    galerie: [
      "https://static.wixstatic.com/media/de9f31_c71476c6b029425c8578087a041e576b~mv2.jpg/v1/fit/w_1200,h_640,al_c/de9f31_c71476c6b029425c8578087a041e576b~mv2.jpg"
    ]
  }
};

/* --------------------------------------------------------------------------
   Équivalences d'impact (« Grâce à vous ») — ordres de grandeur indicatifs,
   inspirés des communications publiques des associations.
   -------------------------------------------------------------------------- */
const IMPACTS = {
  euro: [
    { parEuro: 1 / 3.5, icone: "🍽", texte: "repas financés" },            // ~3,5 € le repas complet
    { parEuro: 1 / 15,  icone: "🛏", texte: "nuitées à l'abri soutenues" } // ~15 € la nuitée d'urgence
  ],
  heure: [
    { parHeure: 1, icone: "🤝", texte: "heures de lien humain offertes" },
    { parHeure: 2, icone: "☕", texte: "personnes rencontrées ou servies (estimation)" }
  ]
};
