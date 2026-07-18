/* ==========================================================================
   Coup de Main — logique applicative (100 % côté navigateur)
   Stockage : localStorage si disponible, sinon mémoire de session.
   ========================================================================== */

/* ---------- Stockage sécurisé ---------- */
const memoire = {};
const stock = {
  lire(cle, defaut) {
    try {
      const v = localStorage.getItem("cdm_" + cle);
      return v !== null ? JSON.parse(v) : defaut;
    } catch (e) {
      return cle in memoire ? memoire[cle] : defaut;
    }
  },
  ecrire(cle, valeur) {
    memoire[cle] = valeur;
    try { localStorage.setItem("cdm_" + cle, JSON.stringify(valeur)); } catch (e) { /* mode mémoire */ }
  }
};

/* ---------- État ---------- */
let etat = {
  utilisateur: stock.lire("utilisateur", null),      // { prenom, email, ville, lat, lng }
  favoris: stock.lire("favoris", []),                 // [assoId]
  participations: stock.lire("participations", []),   // [{ evtId, assoId, titre, date, points }]
  inscriptionsSupp: stock.lire("inscriptionsSupp", {}),// { evtId: nb en plus du compteur de base }
  propositions: stock.lire("propositions", []),
  donMensuel: stock.lire("donMensuel", null),          // { montant, repartition: {assoId: part}, depuis: ISO } — simulation
  donsPonctuels: stock.lire("donsPonctuels", []),      // [{ assoId, montant, date }] — déclaratif (démo)
  filtres: { action: "tout", date: "", lieu: "marseille", rayon: 25, cause: null, texte: "" },
  modeResultats: "assos" // "assos" | "evenements"
};

let carte = null;
let calqueMarqueurs = null;
let posUtilisateur = null; // géolocalisation éventuelle

/* ---------- Utilitaires ---------- */
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function echap(t) {
  return String(t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function distanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371, rad = Math.PI / 180;
  const dLat = (lat2 - lat1) * rad, dLng = (lng2 - lng1) * rad;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function centreRecherche() {
  if (etat.filtres.lieu === "moi" && posUtilisateur) return posUtilisateur;
  if (etat.filtres.lieu === "aix") return VILLES.aix;
  return VILLES.marseille;
}

function causeDe(id) { return CAUSES.find(c => c.id === id); }
function assoDe(id) { return ASSOCIATIONS.find(a => a.id === id); }

function formatDate(iso) {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
}
function jourDe(iso) { return new Date(iso + "T12:00:00").getDate(); }
function moisDe(iso) { return new Date(iso + "T12:00:00").toLocaleDateString("fr-FR", { month: "short" }).replace(".", ""); }

function inscritsDe(evt) {
  return evt.inscrits + (etat.inscriptionsSupp[evt.id] || 0);
}
function dejaInscrit(evtId) {
  return etat.participations.some(p => p.evtId === evtId);
}

function tousEvenements() {
  const liste = [];
  ASSOCIATIONS.forEach(a => a.evenements.forEach(e => liste.push({ ...e, asso: a })));
  return liste.sort((x, y) => x.date.localeCompare(y.date));
}

/* ---------- Photos & dons ---------- */
function photoCarteDe(a) {
  return (PHOTOS_ASSO[a.id] && PHOTOS_ASSO[a.id].carte) || PHOTOS_CAUSE[a.cause].carte;
}
function galerieDe(a) {
  return (PHOTOS_ASSO[a.id] && PHOTOS_ASSO[a.id].galerie) || PHOTOS_CAUSE[a.cause].galerie;
}
function lienDonDe(a) { return LIENS_DON[a.id] || null; }

// Durée (en heures) d'un événement à partir de son champ heure "09:00 – 12:00"
function dureeEvt(evt) {
  const m = /(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})/.exec(evt.heure || "");
  if (!m) return 3;
  const h = (Number(m[3]) * 60 + Number(m[4]) - Number(m[1]) * 60 - Number(m[2])) / 60;
  return h > 0 ? Math.round(h * 10) / 10 : 3;
}
function heuresDonnees() {
  const tous = tousEvenements();
  return Math.round(etat.participations.reduce((s, p) => {
    const evt = tous.find(e => e.id === p.evtId);
    return s + (evt ? dureeEvt(evt) : 3);
  }, 0) * 10) / 10;
}

// Nombre de mois écoulés (au moins 1) depuis le début du don mensuel
function moisDeDon() {
  const d = etat.donMensuel;
  if (!d || !d.depuis) return 0;
  const debut = new Date(d.depuis), maintenant = new Date();
  return Math.max(1, (maintenant.getFullYear() - debut.getFullYear()) * 12 + (maintenant.getMonth() - debut.getMonth()) + 1);
}
function totalDonne() {
  const ponctuels = etat.donsPonctuels.reduce((s, x) => s + x.montant, 0);
  const mensuel = etat.donMensuel ? etat.donMensuel.montant * moisDeDon() : 0;
  return ponctuels + mensuel;
}

/* ---------- Gamification ---------- */
function pointsTotaux() { return etat.participations.reduce((s, p) => s + p.points, 0); }
function niveauActuel() {
  const pts = pointsTotaux();
  let n = NIVEAUX[0], suivant = null;
  for (let i = 0; i < NIVEAUX.length; i++) {
    if (pts >= NIVEAUX[i].seuil) { n = NIVEAUX[i]; suivant = NIVEAUX[i + 1] || null; }
  }
  return { ...n, index: NIVEAUX.indexOf(n) + 1, suivant, pts };
}

/* ---------- Toast ---------- */
let minuteurToast = null;
function toast(html, duree = 4200) {
  const t = $("#toast");
  t.innerHTML = html;
  t.classList.remove("hidden");
  clearTimeout(minuteurToast);
  minuteurToast = setTimeout(() => t.classList.add("hidden"), duree);
}

/* ---------- Modale ---------- */
function ouvrirModale(html) {
  $("#modale-contenu").innerHTML = html;
  $("#voile").classList.remove("hidden");
  const premier = $("#modale-contenu input, #modale-contenu select, #modale-contenu button");
  if (premier) premier.focus();
}
function fermerModale() { $("#voile").classList.add("hidden"); }

/* ==========================================================================
   FILTRAGE
   ========================================================================== */
function assosFiltrees() {
  const centre = centreRecherche();
  const f = etat.filtres;
  return ASSOCIATIONS
    .map(a => ({ ...a, distance: distanceKm(centre.lat, centre.lng, a.lat, a.lng) }))
    .filter(a => a.distance <= f.rayon)
    .filter(a => !f.cause || a.cause === f.cause)
    .filter(a => f.action === "tout" || a.engagements.includes(f.action))
    .filter(a => {
      if (!f.texte) return true;
      const t = f.texte.toLowerCase();
      return a.nom.toLowerCase().includes(t)
        || a.ville.toLowerCase().includes(t)
        || a.actions.join(" ").toLowerCase().includes(t)
        || causeDe(a.cause).nom.toLowerCase().includes(t);
    })
    .sort((x, y) => x.distance - y.distance);
}

function evenementsFiltres() {
  const centre = centreRecherche();
  const f = etat.filtres;
  return tousEvenements()
    .map(e => ({ ...e, distance: distanceKm(centre.lat, centre.lng, e.lat, e.lng) }))
    .filter(e => e.distance <= f.rayon)
    .filter(e => !f.date || e.date === f.date)
    .filter(e => !f.cause || e.asso.cause === f.cause)
    .filter(e => f.action === "tout" || f.action === "temps") // les événements = donner du temps
    .filter(e => {
      if (!f.texte) return true;
      const t = f.texte.toLowerCase();
      return e.titre.toLowerCase().includes(t) || e.type.toLowerCase().includes(t) || e.asso.nom.toLowerCase().includes(t);
    });
}

/* ==========================================================================
   CARTE
   ========================================================================== */
function initCarte() {
  if (carte) return;
  const c = centreRecherche();
  carte = L.map("carte", { scrollWheelZoom: true }).setView([c.lat, c.lng], 12);
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 19
  }).addTo(carte);
  calqueMarqueurs = L.layerGroup().addTo(carte);
}

function pinAsso(couleurVar) {
  return L.divIcon({
    className: "",
    html: `<div class="pin"><svg viewBox="0 0 30 38"><path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 23 15 23s15-12.5 15-23C30 6.7 23.3 0 15 0z" fill="${couleurVar}"/><circle cx="15" cy="14.5" r="6" fill="#fff"/></svg></div>`,
    iconSize: [30, 38],
    iconAnchor: [15, 38],
    popupAnchor: [0, -34]
  });
}

function pinEvenement(texte) {
  return L.divIcon({
    className: "",
    html: `<div class="pin-evt">${echap(texte)}</div>`,
    iconSize: null,
    iconAnchor: [30, 14]
  });
}

function majCarte() {
  if (!carte) return;
  calqueMarqueurs.clearLayers();
  const bornes = [];

  if (etat.modeResultats === "assos") {
    assosFiltrees().forEach(a => {
      const cause = causeDe(a.cause);
      const couleur = getComputedStyle(document.documentElement).getPropertyValue(cause.couleur.slice(4, -1)) || "#2c6e5b";
      const m = L.marker([a.lat, a.lng], { icon: pinAsso(couleur.trim() || "#2c6e5b") });
      m.bindPopup(`
        <div class="popup-nom">${echap(a.nom)}</div>
        <div style="font-size:12px;color:#5a6478;">${echap(cause.nom)} · ${echap(a.ville)}</div>
        <ul class="popup-bullets">${a.bullets.map(b => `<li>${echap(b)}</li>`).join("")}</ul>
        <div class="popup-actions">${a.actions.slice(0, 3).map(x => `<span class="chip">${echap(x)}</span>`).join("")}</div>
        <a href="#/asso/${a.id}" class="popup-lien">Voir la fiche</a>
      `);
      calqueMarqueurs.addLayer(m);
      bornes.push([a.lat, a.lng]);
    });
  } else {
    evenementsFiltres().forEach(e => {
      const m = L.marker([e.lat, e.lng], { icon: pinEvenement(`${jourDe(e.date)} ${moisDe(e.date)} · ${inscritsDe(e)} inscrits`) });
      m.bindPopup(`
        <div class="popup-nom">${echap(e.titre)}</div>
        <div style="font-size:12px;color:#5a6478;">${echap(formatDate(e.date))} · ${echap(e.heure)}<br>${echap(e.lieu)}</div>
        <div class="popup-actions"><span class="chip">${echap(e.type)}</span></div>
        <a href="#/asso/${e.asso.id}?onglet=evenements" class="popup-lien">Voir et participer</a>
      `);
      calqueMarqueurs.addLayer(m);
      bornes.push([e.lat, e.lng]);
    });
  }

  if (bornes.length) carte.fitBounds(bornes, { padding: [40, 40], maxZoom: 14 });
}

/* ==========================================================================
   RENDUS
   ========================================================================== */
function svgCoeur() {
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.9-10-9.3C.4 8.5 2.3 4.5 6 4.1c2.1-.2 4 .9 6 3.2 2-2.3 3.9-3.4 6-3.2 3.7.4 5.6 4.4 4 7.6C19.5 16.1 12 21 12 21z"/></svg>';
}

function carteAssoHTML(a) {
  const cause = causeDe(a.cause);
  const fav = etat.favoris.includes(a.id);
  const dist = a.distance !== undefined ? ` · à ${a.distance.toFixed(1)} km` : "";
  return `
    <article class="carte-asso" data-asso="${a.id}" tabindex="0" role="link" aria-label="${echap(a.nom)}">
      <div class="carte-asso-photo">
        <img src="${echap(photoCarteDe(a))}" alt="" loading="lazy" onerror="this.closest('.carte-asso-photo').classList.add('sans-image')">
        <span class="chip chip-illustration">Photo d'illustration</span>
      </div>
      <div class="carte-asso-corps">
      <div class="carte-asso-haut">
        <div>
          <h3>${echap(a.nom)}</h3>
          <div class="carte-asso-ville">${echap(a.ville)}${dist}</div>
          <span class="etiquette-cause" style="background:color-mix(in srgb, ${cause.couleur} 14%, white); color:${cause.couleur};">
            <span class="cause-point" style="background:${cause.couleur}"></span>${echap(cause.nom)}
          </span>
        </div>
        <button class="coeur ${fav ? "actif" : ""}" data-fav="${a.id}" aria-label="${fav ? "Retirer des favoris" : "Ajouter aux favoris"}" aria-pressed="${fav}">${svgCoeur()}</button>
      </div>
      <ul>${a.bullets.map(b => `<li>${echap(b)}</li>`).join("")}</ul>
      <div class="chips">
        ${a.engagements.includes("argent") ? '<span class="chip chip-don">Don possible</span>' : ""}
        ${a.actions.slice(0, 4).map(x => `<span class="chip">${echap(x)}</span>`).join("")}
      </div>
      </div>
    </article>`;
}

function carteEvtHTML(e, avecAsso = true) {
  const n = inscritsDe(e);
  const complet = n >= e.places;
  const inscrit = dejaInscrit(e.id);
  return `
    <article class="carte-evt">
      <div class="evt-date"><span class="jour">${jourDe(e.date)}</span><span class="mois">${echap(moisDe(e.date))}</span></div>
      <div>
        <h4>${echap(e.titre)}</h4>
        <div class="evt-meta">
          ${avecAsso ? `${echap(e.asso.nom)} · ` : ""}${echap(e.heure)}<br>
          ${echap(e.lieu)}${e.distance !== undefined ? ` · à ${e.distance.toFixed(1)} km` : ""}
        </div>
        <span class="evt-inscrits">● ${n} ${n > 1 ? "personnes inscrites" : "personne inscrite"} / ${e.places} places</span>
      </div>
      <div class="evt-droite">
        ${inscrit
          ? '<span class="chip chip-don">Vous participez ✓</span>'
          : complet
            ? '<span class="evt-complet">Complet</span>'
            : `<button class="btn btn-accent" data-participer="${e.id}">Je participe</button>`}
        ${avecAsso ? `<a href="#/asso/${e.asso.id}?onglet=evenements" style="font-size:13px;color:var(--ink-soft);">Voir l'asso</a>` : ""}
      </div>
    </article>`;
}

function majBarreCauses() {
  $("#barre-causes").innerHTML = [
    `<button class="cause-pilule ${etat.filtres.cause === null ? "actif" : ""}" data-cause="">Toutes les causes</button>`,
    ...CAUSES.map(c => `
      <button class="cause-pilule ${etat.filtres.cause === c.id ? "actif" : ""}" data-cause="${c.id}">
        <span class="cause-point" style="background:${c.couleur}"></span>${echap(c.nom)}
      </button>`)
  ].join("");
}

function majResultats() {
  const conteneur = $("#liste-resultats");
  if (etat.modeResultats === "evenements") {
    const evts = evenementsFiltres();
    $("#compteur-resultats").textContent = `${evts.length} événement${evts.length > 1 ? "s" : ""}`;
    conteneur.innerHTML = evts.length
      ? evts.map(e => carteEvtHTML(e)).join("")
      : `<div class="vide"><p>Aucun événement ne correspond à cette date dans ce rayon.</p><button class="btn btn-clair" id="btn-reset-date">Voir toutes les dates</button></div>`;
  } else {
    const assos = assosFiltrees();
    $("#compteur-resultats").textContent = `${assos.length} association${assos.length > 1 ? "s" : ""}`;
    conteneur.innerHTML = assos.length
      ? assos.map(a => carteAssoHTML(a)).join("")
      : `<div class="vide"><p>Aucune association dans ce périmètre avec ces filtres.</p><button class="btn btn-clair" id="btn-elargir">Élargir le rayon à 60 km</button></div>`;
  }
  majCarte();
}

/* ==========================================================================
   FICHE ASSOCIATION
   ========================================================================== */
function afficherFiche(id, ongletDemande) {
  const a = assoDe(id);
  const vue = $("#vue-asso");
  if (!a) { vue.innerHTML = '<div class="page-simple"><h1>Association introuvable</h1></div>'; return; }
  const cause = causeDe(a.cause);
  const fav = etat.favoris.includes(a.id);

  const onglets = [
    { id: "histoire", nom: "Histoire" },
    { id: "equipe", nom: "Qui sommes-nous" },
    { id: "don", nom: "Faire un don" },
    { id: "evenements", nom: `Événements (${a.evenements.length})` },
    { id: "realisations", nom: "Actions réalisées" }
  ];
  const actif = ongletDemande || "histoire";

  vue.innerHTML = `
    <div class="fiche">
      <button class="fiche-retour" id="fiche-retour">← Retour aux résultats</button>
      <div class="fiche-entete">
        <div>
          <span class="etiquette-cause" style="background:color-mix(in srgb, ${cause.couleur} 14%, white); color:${cause.couleur};">
            <span class="cause-point" style="background:${cause.couleur}"></span>${echap(cause.nom)}
          </span>
          <h1>${echap(a.nom)}</h1>
          <p class="fiche-sous">${echap(a.adresse)} — ${echap(a.ville)}</p>
        </div>
        <button class="coeur ${fav ? "actif" : ""}" data-fav="${a.id}" aria-label="Favori" aria-pressed="${fav}">${svgCoeur()}</button>
      </div>

      <div class="fiche-galerie" aria-hidden="true">
        ${galerieDe(a).slice(0, 3).map((p, i) => `
          <figure class="fiche-photo ${i === 0 ? "grande" : ""}">
            <img src="${echap(p)}" alt="" loading="lazy" onerror="this.closest('.fiche-photo').classList.add('sans-image')">
          </figure>`).join("")}
        <span class="chip chip-illustration">Photos d'illustration</span>
      </div>

      <div class="onglets" role="tablist">
        ${onglets.map(o => `<button class="onglet ${o.id === actif ? "actif" : ""}" role="tab" aria-selected="${o.id === actif}" data-onglet="${o.id}">${o.nom}</button>`).join("")}
      </div>
      <div class="onglet-contenu" id="onglet-contenu"></div>
    </div>`;

  function rendreOnglet(oid) {
    const zone = $("#onglet-contenu");
    if (oid === "histoire") {
      zone.className = "onglet-contenu";
      zone.innerHTML = `<p>${echap(a.histoire)}</p>
        <h3>Comment aider</h3>
        <div class="chips">${a.actions.map(x => `<span class="chip">${echap(x)}</span>`).join("")}</div>`;
    }
    if (oid === "equipe") {
      zone.className = "onglet-contenu pleine";
      zone.innerHTML = `
        <figure class="equipe-photo">
          <img src="${echap(galerieDe(a)[1] || galerieDe(a)[0])}" alt="" loading="lazy" onerror="this.closest('.equipe-photo').classList.add('sans-image')">
          <figcaption><span class="chip chip-illustration">Photo d'illustration</span> En attendant la vraie photo de l'équipe et des bénévoles.</figcaption>
        </figure>
        <p>Les personnes qui font vivre l'association au quotidien :</p>
        <div class="equipe-grille">
          ${a.equipe.map(m => `<div class="equipe-carte"><div class="equipe-role">${echap(m.role)}</div><div class="equipe-desc">${echap(m.desc)}</div></div>`).join("")}
        </div>
        <p class="note-demo">Version démo : les descriptions d'équipe sont indicatives. Chaque association pourra présenter ses vrais visages ici.</p>`;
    }
    if (oid === "don") {
      const lienDon = lienDonDe(a);
      zone.className = "onglet-contenu";
      zone.innerHTML = `
        <div class="don-cadre">
          <h3 style="margin-top:0;">Soutenir ${echap(a.nom)}</h3>
          <p>${echap(a.don)}</p>
          <div class="don-boutons">
            ${lienDon
              ? `<a class="btn btn-accent" href="${echap(lienDon)}" target="_blank" rel="noopener">Faire un don maintenant ↗</a>
                 <a class="btn btn-clair" href="${echap(a.site)}" target="_blank" rel="noopener">Visiter le site officiel ↗</a>`
              : `<a class="btn btn-accent" href="${echap(a.site)}" target="_blank" rel="noopener">Donner via le site officiel ↗</a>`}
          </div>
          ${lienDon ? `<p class="don-lien-verif">Lien direct vers la page de don officielle — pas besoin de chercher.</p>` : `<p class="don-lien-verif">Cette association ne propose pas de plateforme de don en ligne : le don passe par son site ou un dépôt sur place (objets, matériel…).</p>`}
        </div>
        <p class="note-demo">Coup de Main ne collecte aucun paiement : les dons se font directement et en toute sécurité sur la plateforme officielle de l'association.</p>`;
    }
    if (oid === "evenements") {
      zone.className = "onglet-contenu pleine";
      const evts = [...a.evenements].sort((x, y) => x.date.localeCompare(y.date));
      zone.innerHTML = evts.length
        ? `<p>Prochaines actions — inscrivez-vous en un clic, l'association vous attend :</p>
           <div class="grille-cartes" style="grid-template-columns:1fr;">${evts.map(e => carteEvtHTML({ ...e, asso: a }, false)).join("")}</div>`
        : `<div class="vide"><p>Aucun événement programmé pour le moment.</p></div>`;
    }
    if (oid === "realisations") {
      zone.className = "onglet-contenu";
      zone.innerHTML = `
        <p>Ce que vos dons et vos heures ont permis :</p>
        <ul class="frise">
          ${a.realisations.map(r => `<li><div class="frise-quand">${echap(r.quand)}</div><div class="frise-quoi">${echap(r.quoi)}</div><p>${echap(r.detail)}</p></li>`).join("")}
        </ul>`;
    }
  }

  rendreOnglet(actif);

  vue.querySelectorAll(".onglet").forEach(b => b.addEventListener("click", () => {
    vue.querySelectorAll(".onglet").forEach(x => { x.classList.remove("actif"); x.setAttribute("aria-selected", "false"); });
    b.classList.add("actif");
    b.setAttribute("aria-selected", "true");
    rendreOnglet(b.dataset.onglet);
  }));
  $("#fiche-retour").addEventListener("click", () => { location.hash = "#/"; });
}

/* ==========================================================================
   FAVORIS & PROFIL
   ========================================================================== */
function afficherFavoris() {
  const vue = $("#vue-favoris");
  const assos = ASSOCIATIONS.filter(a => etat.favoris.includes(a.id));
  vue.innerHTML = `
    <div class="page-simple">
      <h1>Mes favoris</h1>
      <p class="sous">Les associations que vous gardez sous le coude.</p>
      ${assos.length
        ? `<div class="grille-cartes">${assos.map(a => carteAssoHTML(a)).join("")}</div>`
        : `<div class="vide"><p>Aucun favori pour l'instant. Touchez le cœur d'une association pour la retrouver ici.</p><a class="btn btn-accent" href="#/">Explorer les associations</a></div>`}
    </div>`;
}

function euro(n) {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 0, maximumFractionDigits: 2 }) + " €";
}

function afficherProfil() {
  const vue = $("#vue-profil");
  if (!etat.utilisateur) {
    vue.innerHTML = `<div class="page-simple"><div class="vide"><p>Créez un profil pour suivre vos bonnes actions, vos dons, gagner des niveaux et être alerté des événements près de chez vous.</p><button class="btn btn-accent" id="profil-creer">Créer mon profil</button></div></div>`;
    $("#profil-creer").addEventListener("click", ouvrirConnexion);
    return;
  }
  const u = etat.utilisateur;
  const niv = niveauActuel();
  const progression = niv.suivant ? Math.min(100, Math.round((niv.pts - niv.seuil) / (niv.suivant.seuil - niv.seuil) * 100)) : 100;
  const heures = heuresDonnees();
  const donne = totalDonne();
  const nbActions = etat.participations.length;

  // Équivalences d'impact (« Grâce à vous »)
  const impacts = [];
  if (donne > 0) IMPACTS.euro.forEach(i => { const n = Math.floor(donne * i.parEuro); if (n >= 1) impacts.push(`${i.icone} <strong>${n}</strong> ${i.texte}`); });
  if (heures > 0) IMPACTS.heure.forEach(i => { const n = Math.floor(heures * i.parHeure); if (n >= 1) impacts.push(`${i.icone} <strong>${n}</strong> ${i.texte}`); });

  vue.innerHTML = `
    <div class="page-simple">
      <div class="profil-entete">
        <div class="profil-rond">${echap(u.prenom[0].toUpperCase())}</div>
        <div>
          <h1>${echap(u.prenom)}</h1>
          <p class="sous" style="margin:0;">${echap(u.email)}${u.ville ? " · " + echap(u.ville) : ""}</p>
        </div>
        <button class="btn btn-ghost" id="btn-deconnexion" style="margin-left:auto;">Se déconnecter</button>
      </div>

      <div class="stats-grille">
        <div class="stat-carte"><span class="stat-chiffre">${euro(donne)}</span><span class="stat-legende">donnés au total${etat.donMensuel ? " (don mensuel inclus)" : ""}</span></div>
        <div class="stat-carte"><span class="stat-chiffre">${heures.toLocaleString("fr-FR")} h</span><span class="stat-legende">de temps donné</span></div>
        <div class="stat-carte"><span class="stat-chiffre">${nbActions}</span><span class="stat-legende">bonne${nbActions > 1 ? "s" : ""} action${nbActions > 1 ? "s" : ""}</span></div>
      </div>

      ${impacts.length ? `
      <div class="niveau-cadre impact-cadre">
        <h3 style="margin:0 0 4px;">Grâce à vous</h3>
        <p class="sous" style="margin:0 0 10px;">Ce que vos dons et vos heures ont rendu possible (ordres de grandeur) :</p>
        <div class="impact-liste">${impacts.map(x => `<span class="impact-item">${x}</span>`).join("")}</div>
      </div>` : ""}

      <div class="niveau-cadre">
        <div class="niveau-ligne">
          <span class="niveau-nom">Niveau ${niv.index} — ${echap(niv.nom)}</span>
          <span class="niveau-pts">${niv.pts} points d'expérience</span>
        </div>
        <div class="jauge"><div class="jauge-remplie" style="width:${progression}%"></div></div>
        <div class="jauge-legende">${niv.suivant ? `Encore ${niv.suivant.seuil - niv.pts} XP avant le niveau « ${echap(niv.suivant.nom)} »` : "Niveau maximum atteint — chapeau bas."}</div>
        <div class="medailles">
          ${MEDAILLES.map(m => {
            const ok = m.condition(etat.participations);
            return `<span class="medaille ${ok ? "" : "verrouillee"}" title="${echap(m.desc)}">${ok ? "🏅" : "○"} ${echap(m.nom)}</span>`;
          }).join("")}
        </div>
      </div>

      <div class="niveau-cadre" id="bloc-don-mensuel"></div>

      <div class="niveau-cadre">
        <h3 style="margin:0 0 4px;">Historique de mes bonnes actions</h3>
        ${etat.participations.length
          ? `<ul class="histo">${[...etat.participations].reverse().map(p => `
              <li><span class="histo-date">${echap(formatDate(p.date))}</span>
              <span>${echap(p.titre)} — <a href="#/asso/${p.assoId}" style="color:var(--accent-fonce);">${echap(assoDe(p.assoId)?.nom || "")}</a></span>
              <span class="histo-pts">+${p.points} pts</span></li>`).join("")}</ul>`
          : `<p class="sous" style="margin:8px 0 0;">Aucune participation pour l'instant — votre première action vous attend dans <a href="#/evenements">les événements</a>.</p>`}
      </div>
    </div>`;

  rendreDonMensuel();

  $("#btn-deconnexion").addEventListener("click", () => {
    etat.utilisateur = null;
    stock.ecrire("utilisateur", null);
    majEnTete();
    location.hash = "#/";
    toast("À bientôt ! Vos favoris, dons et historique restent enregistrés sur cet appareil.");
  });
}

/* ---------- Don mensuel (simulation) ---------- */
function rendreDonMensuel() {
  const bloc = $("#bloc-don-mensuel");
  if (!bloc) return;
  const favoris = ASSOCIATIONS.filter(a => etat.favoris.includes(a.id));
  const d = etat.donMensuel;

  if (!favoris.length && !d) {
    bloc.innerHTML = `
      <h3 style="margin:0 0 4px;">Mon don mensuel</h3>
      <p class="sous" style="margin:0 0 12px;">Mettez en place un don automatique chaque mois, réparti comme vous le souhaitez entre vos associations favorites. Commencez par ajouter des associations en favoris (le cœur sur chaque fiche).</p>
      <a class="btn btn-clair" href="#/">Explorer les associations</a>`;
    return;
  }

  // Montant et répartition de travail (état en cours d'édition)
  const montant = d ? d.montant : 20;
  const reparation = {};
  favoris.forEach(a => {
    reparation[a.id] = d && d.repartition && d.repartition[a.id] !== undefined ? d.repartition[a.id] : 50;
  });
  const partPlateforme = 1;

  function totalParts() { return Object.values(reparation).reduce((s, x) => s + x, 0); }
  function montantPour(assoId) {
    const t = totalParts();
    if (!t) return 0;
    return Math.round((montant - partPlateforme) * (reparation[assoId] / t) * 100) / 100;
  }

  bloc.innerHTML = `
    <div class="don-mensuel-entete">
      <h3 style="margin:0;">Mon don mensuel</h3>
      ${d ? `<span class="chip chip-don">Actif — ${euro(d.montant)} / mois depuis ${echap(formatDate(d.depuis.slice(0, 10)))}</span>` : ""}
    </div>
    <p class="sous" style="margin:6px 0 14px;">Un montant fixe chaque mois, réparti entre vos associations favorites avec les curseurs. Vous pouvez tout modifier ou arrêter à n'importe quel moment${d ? "" : " — chaque mois, la répartition suit vos favoris du moment"}.</p>

    <div class="don-montants" role="radiogroup" aria-label="Montant mensuel">
      ${[10, 20, 50].map(m => `<button class="montant-pilule ${montant === m ? "actif" : ""}" data-montant="${m}">${m} €</button>`).join("")}
      <label class="montant-libre">Autre <input type="number" id="montant-libre" min="2" max="1000" step="1" value="${[10, 20, 50].includes(montant) ? "" : montant}" placeholder="€"></label>
      <span class="sous" style="margin-left:auto;">par mois</span>
    </div>

    ${favoris.length ? `
    <div class="curseurs" id="curseurs-repartition">
      ${favoris.map(a => `
        <div class="curseur-ligne" data-asso="${a.id}">
          <span class="curseur-nom"><a href="#/asso/${a.id}">${echap(a.nom)}</a></span>
          <input type="range" min="0" max="100" step="5" value="${reparation[a.id]}" aria-label="Part pour ${echap(a.nom)}">
          <span class="curseur-part" id="part-${a.id}">${euro(montantPour(a.id))}</span>
        </div>`).join("")}
    </div>` : `<p class="sous">Vos favoris ont été retirés : ajoutez des associations en favoris pour répartir votre don.</p>`}

    <div class="don-recap">
      <span id="recap-repartition">${euro(Math.max(0, montant - partPlateforme))} répartis entre vos ${favoris.length} favori${favoris.length > 1 ? "s" : ""}</span>
      <span class="sous">+ ${euro(partPlateforme)} reversé à Coup de Main pour la gestion de la plateforme</span>
    </div>

    <div class="don-actions">
      ${d
        ? `<button class="btn btn-accent" id="don-enregistrer">Enregistrer mes modifications</button>
           <button class="btn btn-ghost" id="don-arreter">Arrêter mon don mensuel</button>`
        : `<button class="btn btn-accent" id="don-activer">Activer mon don mensuel</button>`}
    </div>
    <p class="note-demo">Version démo : aucun prélèvement réel n'est effectué. En version finale, le paiement sera opéré par un prestataire agréé et chaque association recevra sa part directement.</p>`;

  // --- Interactions ---
  let montantCourant = montant;

  function montantPourCourant(assoId) {
    const t = totalParts();
    if (!t) return 0;
    return Math.round((montantCourant - partPlateforme) * (reparation[assoId] / t) * 100) / 100;
  }

  function majAffichage() {
    favoris.forEach(a => { const el = $("#part-" + a.id); if (el) el.textContent = euro(montantPourCourant(a.id)); });
    const recap = $("#recap-repartition");
    if (recap) recap.textContent = `${euro(Math.max(0, montantCourant - partPlateforme))} répartis entre vos ${favoris.length} favori${favoris.length > 1 ? "s" : ""}`;
  }

  bloc.querySelectorAll(".montant-pilule").forEach(b => b.addEventListener("click", () => {
    montantCourant = Number(b.dataset.montant);
    bloc.querySelectorAll(".montant-pilule").forEach(x => x.classList.toggle("actif", x === b));
    $("#montant-libre").value = "";
    majAffichage();
  }));
  $("#montant-libre").addEventListener("input", () => {
    const v = Number($("#montant-libre").value);
    if (v >= 2) {
      montantCourant = v;
      bloc.querySelectorAll(".montant-pilule").forEach(x => x.classList.remove("actif"));
      majAffichage();
    }
  });

  bloc.querySelectorAll(".curseur-ligne input[type=range]").forEach(r => r.addEventListener("input", () => {
    const id = r.closest(".curseur-ligne").dataset.asso;
    reparation[id] = Number(r.value);
    majAffichage();
  }));

  function sauver(actif) {
    if (!actif) {
      etat.donMensuel = null;
    } else {
      if (totalParts() === 0) { toast("Répartissez au moins une part avec les curseurs avant de valider."); return false; }
      etat.donMensuel = {
        montant: montantCourant,
        repartition: { ...reparation },
        depuis: d ? d.depuis : new Date().toISOString()
      };
    }
    stock.ecrire("donMensuel", etat.donMensuel);
    afficherProfil();
    return true;
  }

  const btnActiver = $("#don-activer");
  if (btnActiver) btnActiver.addEventListener("click", () => {
    if (sauver(true)) toast(`Don mensuel activé (démo) : ${euro(etat.donMensuel.montant)} / mois répartis entre vos favoris. Merci pour eux !`, 6000);
  });
  const btnEnregistrer = $("#don-enregistrer");
  if (btnEnregistrer) btnEnregistrer.addEventListener("click", () => {
    if (sauver(true)) toast("Répartition mise à jour — elle s'appliquera dès le prochain mois (démo).");
  });
  const btnArreter = $("#don-arreter");
  if (btnArreter) btnArreter.addEventListener("click", () => {
    sauver(false);
    toast("Don mensuel arrêté. Vos totaux restent dans votre historique.");
  });
}

/* ==========================================================================
   MODALES : connexion, participation, proposition
   ========================================================================== */
function ouvrirConnexion() {
  ouvrirModale(`
    <h2>Se connecter</h2>
    <p class="sous">Deux façons de rejoindre Coup de Main :</p>
    <div class="choix-double">
      <button class="choix-carte" id="choix-aidant">
        <span class="titre">Je veux aider</span>
        <span class="desc">Trouver des associations, participer aux événements, suivre mes bonnes actions.</span>
      </button>
      <button class="choix-carte" disabled title="Bientôt disponible">
        <span class="titre">Je représente une association</span>
        <span class="desc">Gérer ma fiche, publier mes événements et suivre les inscriptions. Bientôt disponible.</span>
      </button>
    </div>`);
  $("#choix-aidant").addEventListener("click", ouvrirFormulaireProfil);
}

function ouvrirFormulaireProfil() {
  ouvrirModale(`
    <h2>Créer mon profil</h2>
    <p class="sous">Gratuit, sans engagement. Votre ville sert uniquement à vous signaler les événements proches.</p>
    <form id="form-profil">
      <label>Prénom <input type="text" name="prenom" required maxlength="40" placeholder="Camille"></label>
      <label>Adresse e-mail <input type="email" name="email" required placeholder="camille@exemple.fr"></label>
      <label>Ma ville
        <select name="ville">
          <option value="">Je préfère ne pas dire</option>
          <option value="marseille">Marseille</option>
          <option value="aix">Aix-en-Provence</option>
        </select>
      </label>
      <button type="submit" class="btn btn-accent">Créer mon profil</button>
    </form>`);
  $("#form-profil").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const d = new FormData(ev.target);
    const villeId = d.get("ville");
    etat.utilisateur = {
      prenom: d.get("prenom").trim(),
      email: d.get("email").trim(),
      ville: villeId ? VILLES[villeId].nom : "",
      lat: villeId ? VILLES[villeId].lat : null,
      lng: villeId ? VILLES[villeId].lng : null
    };
    stock.ecrire("utilisateur", etat.utilisateur);
    fermerModale();
    majEnTete();
    signalerEvenementsProches();
  });
}

function signalerEvenementsProches() {
  const u = etat.utilisateur;
  if (!u) return;
  let proches = [];
  if (u.lat) {
    proches = tousEvenements()
      .filter(e => distanceKm(u.lat, u.lng, e.lat, e.lng) <= 10 && !dejaInscrit(e.id))
      .slice(0, 3);
  }
  if (proches.length) {
    toast(`Bienvenue ${echap(u.prenom)} ! ${proches.length} événement${proches.length > 1 ? "s" : ""} près de chez vous cette quinzaine — <a href="#/evenements">voir les événements</a>`, 6500);
  } else {
    toast(`Bienvenue ${echap(u.prenom)} ! Explorez la carte pour trouver votre première bonne action.`);
  }
}

function ouvrirParticipation(evtId) {
  const evt = tousEvenements().find(e => e.id === evtId);
  if (!evt) return;
  const n = inscritsDe(evt);
  const u = etat.utilisateur;
  ouvrirModale(`
    <h2>Je participe</h2>
    <p class="sous"><strong>${echap(evt.titre)}</strong><br>${echap(formatDate(evt.date))} · ${echap(evt.heure)}<br>${echap(evt.lieu)}</p>
    <p class="sous">${echap(evt.desc)}</p>
    <p class="sous"><strong>${n}</strong> ${n > 1 ? "personnes sont déjà inscrites" : "personne est déjà inscrite"} — il reste ${evt.places - n} place${evt.places - n > 1 ? "s" : ""}.</p>
    <form id="form-participer">
      <label>Prénom <input type="text" name="prenom" required maxlength="40" value="${u ? echap(u.prenom) : ""}"></label>
      <label>Adresse e-mail <input type="email" name="email" required value="${u ? echap(u.email) : ""}"></label>
      <label>Téléphone <input type="tel" name="tel" required placeholder="06 12 34 56 78" pattern="[0-9+ .-]{8,16}"></label>
      <button type="submit" class="btn btn-accent">Confirmer ma participation</button>
    </form>
    <p class="note-demo">Version démo : l'inscription est enregistrée sur cet appareil. En version finale, l'association recevra directement votre inscription.</p>`);

  $("#form-participer").addEventListener("submit", (ev) => {
    ev.preventDefault();
    etat.inscriptionsSupp[evt.id] = (etat.inscriptionsSupp[evt.id] || 0) + 1;
    etat.participations.push({ evtId: evt.id, assoId: evt.asso.id, titre: evt.titre, date: evt.date, points: 20 });
    stock.ecrire("inscriptionsSupp", etat.inscriptionsSupp);
    stock.ecrire("participations", etat.participations);
    fermerModale();
    const chemin = location.hash.replace(/^#\/?/, "").split("?")[0];
    if (chemin.startsWith("asso/")) afficherFiche(chemin.slice(5), "evenements");
    else majResultats();
    const niv = niveauActuel();
    toast(`Inscription confirmée — +20 points ! Vous êtes niveau ${niv.index} « ${echap(niv.nom)} ». <a href="#/profil">Voir mon profil</a>`, 6000);
    majEnTete();
  });
}

function ouvrirProposition() {
  ouvrirModale(`
    <h2>Référencer une association</h2>
    <p class="sous">Une association manque à l'appel ? Aidez-nous à la référencer : nous vérifions les informations puis publions sa fiche.</p>
    <form id="form-proposer">
      <label>Nom de l'association <input type="text" name="nom" required maxlength="90"></label>
      <label>Ville <input type="text" name="ville" required maxlength="60" placeholder="Marseille, Aix-en-Provence…"></label>
      <label>Cause principale
        <select name="cause" required>${CAUSES.map(c => `<option value="${c.id}">${echap(c.nom)}</option>`).join("")}</select>
      </label>
      <label>Que fait-elle ? <textarea name="desc" rows="3" required maxlength="500" placeholder="En quelques phrases…"></textarea></label>
      <label>Site web ou page (facultatif) <input type="url" name="site" placeholder="https://…"></label>
      <label>Votre e-mail (pour vous tenir au courant) <input type="email" name="email" required></label>
      <button type="submit" class="btn btn-accent">Envoyer la demande de référencement</button>
    </form>`);
  $("#form-proposer").addEventListener("submit", (ev) => {
    ev.preventDefault();
    const d = new FormData(ev.target);
    etat.propositions.push({
      nom: d.get("nom"), ville: d.get("ville"), cause: d.get("cause"),
      desc: d.get("desc"), site: d.get("site"), email: d.get("email"),
      quand: new Date().toISOString()
    });
    stock.ecrire("propositions", etat.propositions);
    fermerModale();
    toast("Merci ! Votre demande de référencement est enregistrée. Nous vérifions les informations avant publication.");
  });
}

/* ==========================================================================
   EN-TÊTE & ROUTEUR
   ========================================================================== */
function majEnTete() {
  const u = etat.utilisateur;
  $("#btn-connexion").classList.toggle("hidden", !!u);
  $("#btn-profil").classList.toggle("hidden", !u);
  if (u) {
    $("#avatar-initiale").textContent = u.prenom[0].toUpperCase();
    $("#avatar-niveau").textContent = niveauActuel().index;
  }
}

function montrerVue(id) {
  $$(".vue").forEach(v => v.classList.add("hidden"));
  $("#" + id).classList.remove("hidden");
  $$("[data-nav]").forEach(a => a.classList.remove("actif"));
  window.scrollTo({ top: 0 });
}

function router() {
  const brut = location.hash.replace(/^#\/?/, "");
  const [chemin, requete] = brut.split("?");
  const params = new URLSearchParams(requete || "");

  if (chemin.startsWith("asso/")) {
    montrerVue("vue-asso");
    afficherFiche(chemin.slice(5), params.get("onglet"));
    return;
  }
  if (chemin === "favoris") {
    montrerVue("vue-favoris");
    $('[data-nav="favoris"]').classList.add("actif");
    afficherFavoris();
    return;
  }
  if (chemin === "profil") {
    montrerVue("vue-profil");
    afficherProfil();
    return;
  }
  if (chemin === "evenements") {
    etat.modeResultats = "evenements";
    document.body.classList.add("mode-evts");
    montrerVue("vue-explorer");
    $('[data-nav="evenements"]').classList.add("actif");
    initCarte();
    majResultats();
    setTimeout(() => carte.invalidateSize(), 60);
    return;
  }
  // Accueil / explorer
  document.body.classList.remove("mode-evts");
  etat.modeResultats = etat.filtres.date ? "evenements" : "assos";
  montrerVue("vue-explorer");
  $('[data-nav="explorer"]').classList.add("actif");
  initCarte();
  majResultats();
  setTimeout(() => carte.invalidateSize(), 60);
}

/* ==========================================================================
   ÉCOUTEURS GLOBAUX
   ========================================================================== */
document.addEventListener("click", (ev) => {
  const fav = ev.target.closest("[data-fav]");
  if (fav) {
    ev.stopPropagation();
    const id = fav.dataset.fav;
    const i = etat.favoris.indexOf(id);
    if (i >= 0) etat.favoris.splice(i, 1); else etat.favoris.push(id);
    stock.ecrire("favoris", etat.favoris);
    fav.classList.toggle("actif", etat.favoris.includes(id));
    fav.setAttribute("aria-pressed", etat.favoris.includes(id));
    if (!$("#vue-favoris").classList.contains("hidden")) afficherFavoris();
    return;
  }
  const part = ev.target.closest("[data-participer]");
  if (part) { ev.stopPropagation(); ouvrirParticipation(part.dataset.participer); return; }

  const cause = ev.target.closest("[data-cause]");
  if (cause) {
    etat.filtres.cause = cause.dataset.cause || null;
    majBarreCauses();
    majResultats();
    return;
  }
  const carteA = ev.target.closest(".carte-asso");
  if (carteA && !ev.target.closest("button")) { location.hash = "#/asso/" + carteA.dataset.asso; return; }

  if (ev.target.id === "btn-elargir") { etat.filtres.rayon = 60; $("#f-rayon").value = "60"; majResultats(); }
  if (ev.target.id === "btn-reset-date") { etat.filtres.date = ""; $("#f-quand").value = ""; $("#f-date").classList.add("hidden"); etat.modeResultats = "assos"; majResultats(); }
});

document.addEventListener("keydown", (ev) => {
  if (ev.key === "Escape") fermerModale();
  const c = ev.target.closest && ev.target.closest(".carte-asso");
  if (c && (ev.key === "Enter" || ev.key === " ")) { ev.preventDefault(); location.hash = "#/asso/" + c.dataset.asso; }
});

function brancherFiltres() {
  $("#phrase-recherche").addEventListener("submit", (ev) => {
    ev.preventDefault();
    etat.filtres.action = $("#f-action").value;
    etat.filtres.lieu = $("#f-lieu").value;
    etat.filtres.rayon = Number($("#f-rayon").value);
    etat.filtres.date = $("#f-quand").value === "date" ? $("#f-date").value : "";
    etat.modeResultats = etat.filtres.date ? "evenements" : "assos";

    if (etat.filtres.lieu === "moi" && !posUtilisateur && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => { posUtilisateur = { lat: pos.coords.latitude, lng: pos.coords.longitude }; majResultats(); },
        () => { toast("Position indisponible — recherche autour de Marseille."); etat.filtres.lieu = "marseille"; $("#f-lieu").value = "marseille"; majResultats(); }
      );
    }
    majResultats();
    $("#liste-resultats").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  $("#f-quand").addEventListener("change", () => {
    const precis = $("#f-quand").value === "date";
    $("#f-date").classList.toggle("hidden", !precis);
    if (precis && !$("#f-date").value) $("#f-date").value = dansNJours(1);
  });

  $("#f-texte").addEventListener("input", () => {
    etat.filtres.texte = $("#f-texte").value.trim();
    majResultats();
  });
}

/* ---------- Bascule liste/carte (mobile) ---------- */
function brancherBascule() {
  const btn = $("#btn-bascule");
  btn.addEventListener("click", () => {
    const col = $(".colonne-carte");
    const visible = col.classList.toggle("visible");
    btn.textContent = visible ? "Voir la liste" : "Voir la carte";
    btn.setAttribute("aria-pressed", visible);
    if (visible) setTimeout(() => { carte.invalidateSize(); majCarte(); }, 80);
  });
}

/* ---------- Démarrage ---------- */
document.addEventListener("DOMContentLoaded", () => {
  majBarreCauses();
  brancherFiltres();
  brancherBascule();
  majEnTete();

  $("#btn-connexion").addEventListener("click", ouvrirConnexion);
  $("#btn-profil").addEventListener("click", () => { location.hash = "#/profil"; });
  $("#btn-proposer").addEventListener("click", ouvrirProposition);
  $("#modale-fermer").addEventListener("click", fermerModale);
  $("#voile").addEventListener("click", (ev) => { if (ev.target.id === "voile") fermerModale(); });

  window.addEventListener("hashchange", router);
  router();
});
