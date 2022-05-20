# pineberry-arbetsprov

Applikationen kör en NodeJS backend med NextJS som hanterar frontend. Lösningen är en simpel API där domare kan skapa en tävling för att spara och publicera poäng i en tiokamp.

Det är en del som jag skulle velat implementerat som inte kom med pga av tidsbrist. Landingpage:en är ganska ful och simpel så jag hade velat göra det snyggare. Jag gjorde valet att skapa ett konto när applikationen som fungerar som en “huvuddomare”. Tanken är att huvuddomaren ska kunna skapa fler domare som har tillgång till tävlingen. Jag hann implementera det på backend men inte på frontend.
I kommande versioner vill jag förbättra designen på frontend och samt skapa ett navigationssystem för domare att ta sig tillbaka till landingpage. Jag vill även att det ska vara smärtfritt för domare att lägga in poäng, det är nämligen lite förvirrande hur det fungerar.
Jag vill också ha en lista över gamla tävlingar så gamla resultat inte försvinner, även detta finns på backend men inte frontend. Domare ska kunna avsluta en tävling och/eller ha flera aktiva på samma gång. Också bra att implementera en logger på backend.

Routes:
Landing page: "http://38.242.239.247:3003/"<br>
Login page = "http://38.242.239.247:3003/login"<br>
Admin page = "http://38.242.239.247:3003/admin"<br>
