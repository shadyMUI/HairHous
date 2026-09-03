# Immagini

> **I file attualmente presenti sono foto stock di Unsplash**, messe solo per
> vedere il sito con immagini vere. Non sono Hair House e vanno tutte
> sostituite: sovrascrivi i file mantenendo gli stessi nomi.

Metti qui i file con **esattamente questi nomi**. Il sito li carica da solo:
finché mancano, al loro posto compare un riquadro tratteggiato che dice quale
file manca — così è impossibile dimenticarne uno.

Il sito è costruito sulla fotografia. La grafica non aggiunge colore: tutto
quello che si vede lo danno le foto. **Se le foto sono mediocri, il sito è
mediocre**, non c'è impaginazione che tenga.

---

## Le fasce fotografiche («plate»)

Sono le immagini a tutta larghezza con la parola gigante sopra. Devono essere
**scure o comunque non affollate al centro**, perché ci va del testo bianco.
Formato orizzontale largo, almeno 2400 px di base.

| File | Cosa mostrare | Pagina |
|---|---|---|
| `hero.jpg` | L'ingresso di sera con l'insegna accesa | Home, primo schermo |
| `plate-lavori.jpg` | Una lavorazione in corso, mani e capelli | Home |
| `plate-tecniche.jpg` | Dettaglio di colore o di strumenti | Home |
| `plate-team.jpg` | La sala con le persone al lavoro | Home |
| `plate-spazio.jpg` | La sala principale vuota | Home |
| `plate-dove.jpg` | La via, il corso, l'esterno | Home |
| `plate-listino.jpg` | Un dettaglio del salone | Listino |
| `sposa-hero.jpg` | Un'acconciatura da sposa, inquadratura larga | Sposa |
| `plate-sposa-percorso.jpg` | Preparazione, mani al lavoro | Sposa |
| `plate-sposa-lavori.jpg` | Dettaglio di un raccolto | Sposa |

## I lavori (la galleria in home)

**È la parte più importante del sito.** Sono le foto che convincono a
prenotare: vanno curate più di tutte le altre.

Il carosello si filtra per **donna, uomo, sposa, make-up** — il salone è
unisex, quindi la prima cosa che deve risultare chiara è che si fa entrambi.

| File | Filtro (`data-cat`) | Formato |
|---|---|---|
| `lav-donna-01.jpg` | donna — foto larga | orizzontale 3:2, 1200×800 |
| `lav-donna-02.jpg` … `-06.jpg` | donna | verticali 3:4, 800×1066 |
| `lav-donna-07.jpg` | donna — foto larga | orizzontale 3:2 |
| `lav-donna-08.jpg` | donna | verticale 3:4 |
| `lav-uomo-01.jpg`, `-02.jpg`, `-04.jpg` | uomo | verticali 3:4 |
| `lav-uomo-03.jpg` | uomo — foto larga | orizzontale 3:2 |
| `lav-sposa-01.jpg` … `-03.jpg` | sposa | verticali 3:4 |
| `lav-makeup-01.jpg`, `-02.jpg` | makeup | verticali 3:4 |
| `sposa-01.jpg` … `sposa-08.jpg` | galleria pagina Sposa | verticali 3:4 |

**Tieni l'uomo ben rappresentato.** Con quattro foto su diciassette il
messaggio «facciamo anche uomo» passa appena: appena ci sono scatti buoni,
portale a sei o sette.

### Come fotografare i lavori

1. **Sempre lo stesso sfondo.** Una parete neutra del salone, la stessa per
   tutti gli scatti. Una galleria con dieci sfondi diversi sembra un collage.
2. **Luce di lato, mai il flash frontale.** Il flash appiattisce il colore:
   proprio la cosa che stai cercando di mostrare.
3. **Tre quarti e nuca.** Il fronte da solo non fa vedere né la scalatura né
   come il balayage si muove sulle lunghezze.
4. **Verticale 3:4.** È il formato dei riquadri, e coincide con Instagram.
5. **Prima/dopo solo se il «prima» è onesto** — stessa luce, stessa posa.

## Il locale (fascia SPAZIO in home)

Tre scatti d'ambiente affiancati, sotto la parola SPAZIO. Sono la prova che
il posto è bello: vanno scelti fra i migliori che avete.

| File | Cosa mostrare | Formato |
|---|---|---|
| `salone-01.jpg` | La sala principale, inquadratura ampia | orizzontale 3:2, 1200×800 |
| `salone-02.jpg` | Le postazioni o il piano di lavoro | orizzontale 3:2 |
| `salone-03.jpg` | L'angolo lavaggio o la zona d'attesa | orizzontale 3:2 |

Scattale con le luci accese e il salone in ordine, meglio se senza clienti
riconoscibili: così non serve nessuna liberatoria.

## Il team

| File | Cosa | Formato |
|---|---|---|
| `team-01.jpg` … `team-04.jpg` | Un ritratto per persona | verticali 3:4, 600×800 |

Meglio in salone, alla postazione, che su fondo bianco da studio: si vede il
posto ed è più credibile. Il sito li mostra in bianco e nero e li riporta a
colori al passaggio del mouse, quindi **non serve** che siano già desaturati.

## Anteprime social e icona

| File | Cosa |
|---|---|
| `og.jpg` | Anteprima per WhatsApp e Facebook — **1200×630** |
| `og-barber.jpg` | Anteprima pagina Barber — 1200×630 |
| `og-sposa.jpg` | Anteprima pagina Sposa — 1200×630 |
| `apple-touch-icon.png` | Icona iPhone — 180×180 |

---

## Regole pratiche

1. **Prendi gli originali, non gli screenshot.** Le foto scaricate da Instagram
   sono già compresse due volte: a tutta larghezza si vede.
2. **Comprimi prima di caricare.** Passa ogni foto da
   [squoosh.app](https://squoosh.app): sotto i **250 KB** per i lavori, sotto i
   **400 KB** per le fasce a tutta larghezza. JPEG qualità 75–80.
3. **Ritaglia tu.** Il sito taglia le immagini per riempire il riquadro: se la
   proporzione è molto diversa da quella indicata, perdi pezzi importanti.
4. **Volti riconoscibili = liberatoria.** Per le foto di clienti serve il
   consenso scritto alla pubblicazione, sposa compresa.
5. **Niente foto stock.** Il salone è bello davvero; una foto d'archivio si
   riconosce a colpo d'occhio e fa perdere credibilità a tutto il resto.

## Spostare l'inquadratura

Le fasce fotografiche accettano `style="--focal:50% 40%"` sul contenitore
`.plate__media` o `.hero__media`: è il punto dell'immagine che resta sempre
visibile quando viene tagliata. Se su telefono l'insegna finisce fuori, abbassa
il secondo valore.
