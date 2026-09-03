# Hair House — Asti

Sito del salone **Hair House**, Corso Vittorio Alfieri 165, Asti.
Parrucchiere uomo e donna, barber shop e beauty.

HTML statico. Niente framework, niente build, niente `npm install`.

---

## L'impianto

Il sito è costruito sul modello di [GUM Hair Salon](https://www.gumpvd.com)
(Providence, RI), preso come riferimento: **bande alternate**.

```
┌───────────────────────────────┐
│  FOTO a tutta larghezza       │   una sola parola gigante
│         LAVORI                │   + una riga di sottotitolo minuscola
└───────────────────────────────┘
┌───────────────────────────────┐
│  FASCIA NERA                  │   il contenuto vero
│  (griglia, listino, schede)   │
└───────────────────────────────┘
        …e si ripete
```

Da lì vengono tre scelte che tengono in piedi tutto:

1. **Le foto sono il contenuto.** La grafica non aggiunge colore: nero, bianco
   e un ottone usato col contagocce. Tutto il colore lo danno le fotografie.
2. **Zero racconto.** Le informazioni pratiche stanno in blocchi piatti —
   etichetta, dato, link. Nessun paragrafo sulla «passione per la bellezza».
3. **Le persone hanno una specialità dichiarata.** In un salone si prenota una
   persona, non un logo: il campo «specialità» nelle schede del team è quello
   che fa scegliere.

### Cosa *non* è stato copiato

L'estetica di GUM è street, con graffiti e Futura pesante. Hair House ha
un'identità sua — insegna in grazie, pareti nere opache, cuoio — quindi:

- il **marchio resta in grazie** (Cormorant Garamond), come l'insegna vera;
- tutto il resto è in **Jost**, un geometrico vicino alla Futura del
  riferimento, maiuscolo e molto spaziato;
- il nero è `#0a0a09`, appena caldo, non il nero puro.

---

## Struttura

```
index.html          Home — la pagina lunga con tutte le bande
listino.html        Listino completo, tre aree
sposa.html          Sposa e cerimonia
privacy.html        Informativa (bozza da validare)

assets/css/style.css   Tutto lo stile, in un file solo
assets/js/main.js      Menu, filtri, lightbox, moduli
assets/img/            Le foto — vedi assets/img/README.md
robots.txt · sitemap.xml
```

Le pagine sono file indipendenti: header e footer sono duplicati. È voluto —
a questa scala un motore di template costa più di quanto renda. Se cambi una
voce di menu, cambiala in tutti e quattro i file.

### Le sezioni della home

| # | Fascia foto | Fascia nera |
|---|---|---|
| 1 | **Hero** — marchio gigante tagliato dalla fascia sotto | Indirizzo · Orari · Contatti · In salone |
| 2 | **LAVORI** | Carosello filtrabile + lightbox |
| 3 | **TECNICHE** | Durata, sedute, ogni quanto si rifà |
| 4 | **TEAM** | Ritratto, nome, specialità, due righe |
| 5 | **SPAZIO** | Tre foto del locale + uomo/donna, formazione, voto Google |
| 6 | **DOVE** | Prenotazione + mappa |

---

## Aggiungere un lavoro alla galleria

Copia un blocco `<button class="work">` in `index.html` e cambia quattro cose:

```html
<button class="work" type="button"
        data-cat="colore"                     <!-- filtro di appartenenza -->
        data-file="lav-colore-05.jpg"         <!-- nome file, per il segnaposto -->
        data-tec="Balayage su base castana"   <!-- didascalia nel lightbox -->
        data-by="Nome di chi l'ha fatto">
  <img src="assets/img/lav-colore-05.jpg" alt="…" loading="lazy" width="800" height="1066">
  <span class="work__cap"><span class="work__tec">Balayage</span><span class="work__by">Colore</span></span>
</button>
```

`data-span="2"` rende la foto più larga nel carosello (serve un'immagine
orizzontale): serve a spezzare il ritmo, non mettercene troppe.
I contatori accanto ai filtri si aggiornano da soli e un filtro rimasto senza
foto sparisce. Categorie valide: `donna`, `uomo`, `sposa`, `makeup`. Per aggiungerne una,
copia un bottone in `.filters`.

**Perché donna/uomo e non taglio/colore.** Il salone è unisex e non ha un
barber shop separato: la prima domanda di chi guarda è «fanno anche uomo?»,
non «che tecniche usano». La tecnica resta comunque scritta su ogni foto, in
`data-tec`, e compare nel lightbox.

### Il carosello

Le foto stanno su una riga sola che scorre in orizzontale: occupa circa un
sesto dello spazio verticale di una griglia. Lo scorrimento lo fa il browser
(`overflow-x` + `scroll-snap`), il JavaScript aggiunge solo le frecce e
l'indicatore di posizione. Sul telefono le frecce spariscono — si scorre col
dito — e resta l'indicatore, che è l'unico modo per capire quante foto
mancano. Cambiando filtro il carosello si riavvolge e le foto rientrano con
un'animazione scaglionata.

## Aggiungere una fascia fotografica

```html
<section class="plate">
  <div class="plate__media" data-file="plate-nuova.jpg">
    <img src="assets/img/plate-nuova.jpg" alt="" aria-hidden="true" loading="lazy">
  </div>
  <div class="plate__inner">
    <h2 class="plate__word">Parola</h2>
    <p class="label plate__sub">Sottotitolo breve</p>
  </div>
</section>
```

**Una parola sola, al massimo 8 lettere.** Più lunga non ci sta in larghezza
sui telefoni — è il motivo per cui nella pagina Sposa la fascia si chiama
«Raccolti» e non «Acconciature».

---

## ⚠️ Le foto attuali sono provvisorie

In `assets/img/` ci sono **foto stock di Unsplash**, scaricate solo per vedere
il sito con delle immagini vere al posto dei riquadri vuoti. Non ritraggono
Hair House e **vanno tutte sostituite prima di pubblicare**.

Sono libere da diritti (licenza Unsplash) quindi non c'è un problema legale
immediato, ma un salone che mostra foto di altri saloni perde esattamente la
credibilità che il sito serve a costruire.

Per sostituirle basta sovrascrivere i file mantenendo gli stessi nomi: vedi
[`assets/img/README.md`](assets/img/README.md).

---

## Da fare prima di pubblicare

1. **Foto** — quelle attuali sono stock provvisorie (vedi sopra). Nomi file e
   istruzioni in [`assets/img/README.md`](assets/img/README.md), incluse le
   note su come fotografare i lavori.
2. **Prezzi e durate** — `listino.html` e `barber-shop.html` hanno la struttura
   con i valori a trattino. Anche l'elenco dei servizi va confermato: è
   ricavato da quello che Hair House dichiara pubblicamente, non da un listino
   ufficiale.
3. **Team** — nomi, ritratti e soprattutto **la specialità** di ogni persona.
   È il campo che fa scegliere: non lasciarlo generico. In un salone unisex
   vale la pena che si veda chi segue l'uomo e chi il colore.
4. **Tecniche** — durate, sedute e frequenze nella sezione TECNICHE sono
   riferimenti professionali standard, non i tempi effettivi del salone.
5. **Prezzo sposa** — il «da 200 €» viene da una scheda pubblica (fascia
   200–300 €). Va confermato.
6. ~~**Numero WhatsApp**~~ — fatto: `+39 329 962 2913`.
7. **Privacy** — `privacy.html` è un modello: servono ragione sociale, P. IVA,
   e-mail, e una validazione. Il testo dice già che il sito non raccoglie dati,
   perché non ci sono moduli.
8. **P. IVA nel footer** — presente in tutti i file come «P. IVA da inserire».
9. **Recensioni** — il 4,9 su 380 recensioni è il dato reale di Google, con
   link al profilo. Nessuna citazione è stata inventata.
10. **Dominio** — le pagine usano `https://www.hairhouseasti.it/` nei canonical,
    in Open Graph, nella sitemap e nei dati strutturati:

    ```bash
    grep -rl "hairhouseasti.it" . --include="*.html" --include="*.xml" --include="*.txt" | xargs sed -i 's/www\.hairhouseasti\.it/IL-TUO-DOMINIO.it/g'
    ```

---

## Prenotazione

Due soli modi, nessun modulo:

- **Prenota** → apre WhatsApp con un messaggio già scritto
- **Chiama** → apre l'app telefono con `0141 355651`

### Inserire il numero WhatsApp

Una riga sola, in [`assets/js/main.js`](assets/js/main.js):

```js
var WHATSAPP = '393299622913';   // +39 329 962 2913
```

Prefisso internazionale senza «+» e senza spazi. Il numero attuale è già
quello del salone.

Se un giorno il valore torna a essere un segnaposto (contiene una `X` o non è
un numero valido), **tutti i bottoni «Prenota» chiamano il salone** invece di
aprire WhatsApp: non si finisce mai su un link rotto. Vale anche per chi ha
JavaScript disattivato — l'`href` di partenza nell'HTML è già `tel:`, e il
JavaScript lo sostituisce solo quando il numero è valido.

### Cambiare i messaggi precompilati

Ogni bottone porta il proprio testo nell'attributo `data-wa-text`:

```html
<a class="btn btn--fill" data-wa
   data-wa-text="Ciao Hair House, vorrei prenotare un appuntamento."
   href="tel:+390141355651">Prenota</a>
```

Sono diversi a seconda della pagina: generico in home e listino, barber shop
nella sua pagina, e nella pagina Sposa un messaggio con le righe già pronte
per data, ora e numero di persone.

### Se un giorno serve un'agenda vera

Con i volumi di un salone, il passo successivo è un gestionale (Treatwell,
Fresha, Uala): gestisce agenda, promemoria e disdette. Si sostituisce l'`href`
dei bottoni `[data-wa]` col link del gestionale e si tiene il telefono come
alternativa. Non costruire un sistema di prenotazione su misura.

---

## Telefono

Il traffico di un salone arriva quasi tutto da Instagram, quindi da telefono.
Il sito è tarato su quel caso, non adattato dopo.

**Tipografia** — i minimi della scala valgono sui telefoni: corpo **16px**,
micro-etichette **12px**. I 16px non sono estetici: sotto quella misura iOS
ingrandisce da solo la pagina appena si tocca un campo del modulo, e non la
rimpicciolisce più. La spaziatura delle etichette scende da 0.3em a 0.22em,
perché a 12px 0.3em spezza le parole.

**Bersagli** — tutto ciò che si tocca è alto almeno **44px**: bottoni, filtri,
voci di menu, link del footer, campi del modulo. La casella del consenso è
26px ma il bersaglio è l'intera etichetta. I link dentro un paragrafo restano
inline: è l'eccezione prevista dalle linee guida.

**Niente hover** — sul dito il passaggio del mouse non esiste, quindi sotto
`@media (hover: none)` le didascalie dei lavori sono **sempre visibili**, i
ritratti del team sono **già a colori**, e gli ingrandimenti al passaggio sono
disattivati (sul tocco diventano scatti). Gli stati `:hover` non restano
«incollati» dopo un tocco.

**Gesti** — nel lightbox si scorre col dito: trascinamento orizzontale per
cambiare foto, verticale ignorato (è lo scorrimento della pagina).

**Correzioni Safari/iOS**
- il riempimento automatico non dipinge più i campi di bianco su fondo nero;
- le icone di data e ora sono invertite, altrimenti sarebbero nere su nero;
- `overscroll-behavior: contain` su menu e lightbox: scorrendo dentro non si
  trascina la pagina sotto;
- niente lampeggio azzurro al tocco (`-webkit-tap-highlight-color`);
- la barra azioni rispetta la tacca inferiore (`env(safe-area-inset-bottom)`),
  e i margini laterali rispettano quella laterale in orizzontale.

**Orizzontale** — sotto i 520px di altezza l'hero smette di essere alto quanto
lo schermo (diventa 620px scorrevoli) e il marchio si rimpicciolisce, così
claim e bottoni non finiscono tagliati. Il menu a tutto schermo diventa
scorrevole con le voci più basse.

**Verificato**, non supposto: nessun overflow orizzontale da **320 a 1440px**,
zero bersagli sotto i 44px, zero campi che fanno zoomare iOS, zero testi sotto
i 12px, contrasto AA su tutte le pagine.

---

## Accessibilità

- Tutti i testi passano il contrasto **WCAG AA**, verificato su ogni pagina.
- Navigazione completa da tastiera, `:focus-visible` sempre visibile, link
  «Vai al contenuto» in cima a ogni pagina.
- Il lightbox è un `<dialog>` nativo: Esc, trappola del focus e sfondo li
  gestisce il browser. Frecce ← → per scorrere. Se `<dialog>` non è supportato
  si rimuove da solo invece di lasciare comandi morti.
- Menu, fisarmoniche e filtri hanno `aria-expanded`, `aria-pressed`,
  `aria-controls`, `aria-current`.
- `prefers-reduced-motion` disattiva ogni animazione.
- Senza JavaScript il sito resta leggibile e navigabile, e restano visibili
  tutti i lavori: i filtri sono una comodità, non l'unico accesso ai contenuti.

---

## Anteprima in locale

```bash
node .claude/dev-server.js
```

Poi `http://localhost:4321`. È un server statico di venti righe, serve solo per
lo sviluppo: non fa parte del sito e non va caricato online.

---

## Pubblicazione

Statico: va bene qualunque hosting.

- **GitHub Pages** — Settings → Pages → Deploy from branch → `main` / root.
- **Netlify / Vercel** — trascina la cartella, nessuna configurazione.
- **Hosting tradizionale** — carica tutto via FTP nella root.

### Dopo la messa online

1. Collega il dominio al **profilo Google Business** del salone. Oggi alcune
   schede online puntano a `hairhouse.com.au`, che è una catena australiana
   omonima: va corretto, altrimenti il traffico si disperde.
2. Registra il sito su **Google Search Console** e invia `sitemap.xml`.
3. Metti il link in bio su Instagram e Facebook.
4. Controlla che la scheda Google abbia le categorie giuste: Parrucchiere +
   Barbiere + Centro estetico.
