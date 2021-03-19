# CETEMPS
Weather API from CETEMPS made with Node.js + Express
 
### Descrizione
Dato che il [CETEMPS](http://cetemps.aquila.infn.it/) non offre alcun tipo di API, è stato realizzato un back-end server con lo scopo di creare servizi REST con i quali interagire e ricevere i relativi dati.
#### Nightmare.js
Per essere in grado di estrapolare dati meteorologici dalle stazioni meteo del CETEMPS è stata utilizzata una particolare libreria per Node: Nightmare.js.\
Essa è una libreria progettata per automatizzare le attività di navigazione attraverso siti web che non dispongono di API. In altre parole Nightmare funge da web scraper. Questo rende possibile navigare virtualmente il DOM del sito web CETEMPS, trovare i dati necessari tramite tag e classi, lavorarli e, infine, mandarli in risposta al chiamante del servizio (in formato json).

Sono stati creati cinque servizi principali con i rispettivi endpoints:
- /weather/today/città/provincia/lingua/units=unità/api-key=key:\
fornisce le condizioni meteo del giorno corrente, divise per ogni ora del giorno in questione.
- /weather/current/città/provincia/lingua/units=unità/api-key=key:\
fornisce le condizioni meteo attuali, guardando esclusivamente l’ora corrente delgiorno in corso.
- /weather/fivedays/città/provincia/lingua/units=unità/api-key=key:\
fornisce le condizioni meteo per i successivi cinque giorni a venire.
- coords/getCity/latitudine/longitudine/api-key=key:\
fornisce la città che corrisponde alla posizione geografica indicata dalle coordinate date in input. 
- /coords/city/città/provincia/api-key=key:\
fornisce le coordinate geografiche (latitudine, longitudine) di una data città.

### Demo
[Swagger](https://cetemps-weather.herokuapp.com/api-docs/)

 
