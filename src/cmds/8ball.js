const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const config = require("../data/config.json");

var langConf = config.lang;
const l = require(`../lang/${langConf}.json`);
const embeds = require(`../data/embedSettings.json`);

module.exports = {
    category: "fun",
    state: "disabled",
    data: new SlashCommandBuilder()
        .setName("8ball")
        .setDescription("the magic classic 8ball game")
        .addStringOption(option =>
            option.setName("question")
                .setDescription("the question you ask to the bot algorithm")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("mode")
                .addChoices(
                    { name: "normal", value: "normal" },
                    { name: "clear", value: "clear" },
                    { name: "number", value: "num" },
                )
                .setDescription("use mode to accept answers (selection)")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("number")
            .setDescription("set the number the bot should generate up to")
                .setRequired(false)),

    async execute(client, interaction) {

        const mode = interaction.options.getString("mode");
        const chosenNum = interaction.options.getString("number")

        let answers = "";
        let numInput
        if (mode == "clear") {
            answers = [
            "Mijn antwoord is ja",
            "Mijn antwoord is nee",
            "Nee",
            "Ja",
            "Ja hoor",
            "Jazeker",
            "Nee, Zeker niet",
            "Nee, Absoluut niet",
            "Mijn antwoord is zeker, nee",
            "Oke, ik zal duidelijk zijn, nee.",
            "Neeej",
            "Nee, gewoon niet.",
            "Ja, goed idee!"
            ];
        }
        if (mode == "normal") {
        answers = [
            "Het is zeker",
            "Het kan zo zijn",
            "Met enige twijfel",
            "Zonder enige twijfel",
            "Wat denk je zelf?",
            "Ik zie, ik zie, nee.",
            "Ik zie, ik zie, ja.",
            "Geen vooruitzicht",
            "Ik zie hier geen toekomst in",
            "Ja",
            "Nee",
            "Waarschijnlijk niet",
            "Waarschijnlijk wel",
            "Sowieso niet",
            "Sowieso wel",
            "Oh, goed idee!",
            "Jeetje, nee nee nee",
            "Jeetjuhh, nee.",
            "Oh, nee, doe maar niet",
            "Dat zou zij ook zeggen",
            "Dat zou hij ook zeggen",
            "Dat zei de kat van een van de kabouters hier ook",
            "Ik heb eerlijk gezegd geen idee, jij?",
            "Ik weet het niet",
            "Ik heb geen idee",
            "Eerlijk gezegd heb ik geen idee",
            "Eerlijk? geen idee.",
            "Waarom zou je dat niet doen?",
            "Waarom wel?",
            "Zoals mijn chip chipt, chipt het nergens, dus zal dit wel chippen",
            "Zoals mijn chip chipt, chipt het nergens, dit klopt",
            "Zoals mijn chip chhipt, chipt het nergens, mijn antwoord is ja.",
            "Het zal wel",
            "Goed idee",
            "Daar denken de kabouters anders over",
            "Waarom?",
            "Slecht idee, doe maar niet",
            "Hoezo?",
            "Oke, maar waarom zouden de kaboutertjes van het computer universum dit zo'n goed idee vinden, denk hier eens over na en kom dan terug, wie weet geef ik je dan een juist antwoord op deze vraag, mijn kabouters weten het namelijk nog niet.",
            "Waarom doe je dit?",
            "Waarom bedenk je dit?",
            "Wie bedenkt dit?",
            "Het hangt af of de botkernel een goeie dag heeft",
            "Oh jee, de botkernel heeft het vandaag niet naar zijn zin, het lijkt erop dat het antwoord nee is.",
            "Uh oh, de botkernel heeft het naar zijn zin vandaag, het antwoord is ja.",
            "Niet alles is zo rooskleurig als de botkernel, zelfs deze heeft liefde en onderhoud nodig.",
            "Succes",
            "Wacht, wat?!",
            "Wacht, huh wat?",
            "Oke, nee, wat?",
            "Oke, ik snap je volledig.",
            "Uhh, ja, goed.",
            "Prima.",
            "Waarom niet?",
            "Mijn bronnen zeggen nee.",
            "Mijn antwoord is nee.",
            "Mijn antwoord is ja.",
            "Jazeker",
            "Nooit",
            "Neeeeeee.",
            "Oke, waarom? Hier ga ik geen antwoord op geven?",
            "Vraag het nog eens, de botkernel was even koffie aan het drinken.",
            "Ik was er niet helemaal bij, wat zei je?",
            "Daar zou je mentor het tegendeel van inzien",
            "Daar kijkt je docent Nederlands wel anders naar.",
            "Helaas, daar denkt je favoriete docent anders over...",
            "Dat zou je docent wiskunde ook gezegd hebben.",
            "Ik kan het je beter niet zeggen.",
            "Ik kan het nu niet zeggen.",
            "Zeg ik lekker niet.",
            "Oke? Nee.",
            "Uhhh..... Ja.",
            "Iets zegt me ja.",
            "Iets heel diep in mijn botkernel zegt nee.",
            "Wat een prachtig vooruitzicht, mijn antwoord is NEE.",
            "Vooruitzichten zijn altijd zo wonderbaarlijk, mijn antwoord is ja.",
            "Geen sprake van",
            "De sterren zeggen ja, maar de wolken zeggen nee.",
            "Probeer het later nog eens, de maan is momenteel in gesprek.",
            "Absoluut en volmondig: onzeker.",
            "Mijn kristallen bol heeft een error, probeer opnieuw.",
            "Als een eenhoorn over een regenboog vliegt, dan ja.",
            "Als je gelooft in dromen, dan zeker weten.",
            "Alleen als je drie keer rond je bureaustoel draait terwijl je 'schaap' zegt.",
            "Vraag het aan een papegaai, mijn snavel is verzegeld.",
            "Het antwoord zit in een koekje, maar ik heb geen koekjes.",
            "Wanneer katten honden trainen, dan ja.",
            "In een parallel universum, zeker!",
            "Ik heb het aan de code gevraagd, het antwoord is 42.",
            "Je verwacht toch niet echt dat ik dat ga beantwoorden, of wel?",
            "Ik voel een sterke drang om 'ja' te zeggen, maar ik zal het niet doen.",
            "Mijn innerlijke algoritmes fluisteren 'nee', maar mijn emoticons zeggen ':)'.",
            "Het universum zegt 'ja', maar alleen als je belooft om een dansje te doen.",
            "Wanneer varkens vliegen... oh wacht, dat is nu! Dus ja.",
            "Tromgeroffel, alsjeblieft... Het antwoord is: knuffelpanda!",
            "Luister naar de wind en je zult 'nee' horen, luister naar een ijsje en je zult 'ja' horen.",
            "Ik zou het je willen vertellen, maar dan zou ik moeten hacken... Dus ik zwijg.",
            "Je bent warm, het antwoord is koud. Of was het andersom?",
            "Ahoy, matey! De schatkist van antwoorden bevat een 'aye'.",
            "Het antwoord zweeft rond als een eenzame wolk. En de wolk zegt... probeer opnieuw.",
            "Ik had je het antwoord willen vertellen, maar toen kreeg ik zin in pizza. Dus, hongerige stilte!",
            "Sorry, de botkernel is momenteel overwerkt en heeft een beetje chipstress.",
            "Ik heb een gesprek met een computerchip gehad, en het zei 'ja' in binaire code.",
            "Laat me een beetje rommelen in mijn botkernel om het antwoord te vinden...",
            "Mijn innerlijke circuits knipperen 'ja', maar met een lichte flikkering van twijfel.",
            "Oh, dat was de botkernel die een microchipsnack at. Maar ja, waarschijnlijk.",
            "Ik vroeg het aan een computervirus en het antwoord was... wacht, dat is geen goede bron.",
            "In mijn wereld draaien alle antwoorden om computerchips, en deze keer licht het antwoord op 'ja'.",
            "Duizend kibbelende kabouters vertelden me 'ja', maar wie begrijpt die kaboutertaal?",
            "Als je een tijdmachine hebt en teruggaat naar gisteren om te vragen, dan ja!",
            "Volgens de quantumkoffiezetmachine: absoluut!",
            "Na een intensieve debatronde met mijn software, is het antwoord... piep, piep, piep... ja.",
            "Ik vroeg mijn magische toetsenbord en het antwoord dat verscheen was: Ctrl+Ja+Delete.",
            "Hmm, ik raadpleegde mijn kristallen muis en die gaf aan dat het antwoord 'ja' is.",
            "Het lijkt erop dat een virtuele eenhoorn een dansje doet terwijl het antwoord 'nee' neuriet.",
            "Laat me even in de databank van het absurde duiken... Ja, absoluut!",
            "Ik heb een berichtje gestuurd naar de algoritme-engeltjes en het antwoord was: 'Zet je alufoliehoedje maar vast op, want het is ja!'",
            "Ik vroeg Siri om me te helpen en ze stuurde me een knipoogemoji... Dus ja?",
            "Mijn serverkabouters hebben me iets gefluisterd over een antwoord, maar het was in een geheime computercode die ik niet kan vertalen.",
            "In een parallelle pixelwereld, waar gummibeertjes regeren, zou het antwoord een lachend 'ja' zijn.",
            "Trommelgeroffel... En het verwarrende antwoord is... 'klinkt als een probleem voor een banaan'.",
            "Volgens mijn quantum-computerschommel is het antwoord tegelijkertijd ja en nee, totdat je kijkt.",
            "Het universum heeft een samenzwering bekokstoofd om je te laten raden... en het antwoord is 'toevallig antwoord'!",
            "Vraag het aan de digitale duizendpoot die net voorbij rende.",
            "Alleen als je je muis tien keer klikt terwijl je 'abracadabra' zegt.",
            "Wanneer de pixels dansen en de circuits zingen, dan ja.",
            "De virtuele vogels vertelden me 'ja', maar ze fluiten altijd dat de zon schijnt.",
            "Mijn innerlijke algoritmes zijn nog aan het mediteren, vraag later opnieuw.",
            "Als een robot verliefd kan worden, dan is het antwoord ja.",
            "Alleen als je in je linker oor knijpt en je rechteroog dichtknijpt terwijl je op één been staat.",
            "Het antwoord komt aan met een raket in binaire code, en het is: 01001001 00100000 01010100 01010010 01010101 01010011 01010100 00100000 01001001 01001110 00101100",
            "Laat me even babbelen met de bots die de bytes tellen... Ja!",
            "Alleen als je je toetsenbord streelt terwijl je 'abracadabra' fluistert.",
            "Wanneer de nanorobots dansen en de pixels een feestje bouwen, dan ja.",
            "Mijn innerlijke algoritmes zijn op vakantie, probeer het later opnieuw.",
            "Als een algoritme kan dromen, dan absoluut.",
            "Vraag het aan de virtuele kaboutertjes die in mijn circuits wonen.",
            "Alleen als je een regenboog tekent op het scherm terwijl je 'ja' zingt.",
            "Wanneer de maan blauw kleurt en de sterren spontaan een polonaise doen.",
            "Het antwoord staat geschreven in het koffievlekken alfabet, en het is: KOFFIE.",
            "Laat me even een virtuele peptalk houden met de servers... En ja!",
            "Vraag het aan de digitale dolfijnen die door de datastromen zwemmen.",
            "Wanneer de bots een feestje bouwen en de bits dansen, dan is het 'ja'.",
            "Alleen als je naar links draait en tegelijkertijd met je rechteroog knippert.",
            "Wanneer de technogolven ritmisch klotsen en de codekaboutertjes zingen.",
            "Mijn innerlijke AI is momenteel op vakantie, probeer het over een millennium opnieuw.",
            "Als een robot een duik neemt in een pixelzwembad, dan ja.",
            "Vraag het aan de pixels die verliefd zijn op de binaire maan.",
            "Alleen als je een dansje doet met een USB-kabel in je handen.",
            "Wanneer de datawolken ritselen en de algoritmes fluiten, dan absoluut.",
            "De antwoordengel heeft een cupcake gekozen en het is: 'ja'.",
            "Laat me eerst een kopje virtuele koffie drinken en dan zeg ik het je.",
            "Vraag het aan de cyberkabouters die in mijn circuits wonen.",
            "Wanneer de pixelregenboog verschijnt en de bits vogeltjes zijn.",
            "Alleen als je achterstevoren telt terwijl je op één voet balanceert.",
            "Wanneer de digitale krekels tsjirpen en de codebomen ruisen.",
            "Mijn innerlijke bots zijn bezig met een digitaal feestje, dus ja!",
            "Als een algoritme op een wolkje drijft terwijl het 'ja' zingt.",
            "Vraag het aan de virtual reality eenhoorns die door de dataweides galopperen.",
            "Alleen als je een hoed van alufolie draagt terwijl je een regendans uitvoert.",
            "Wanneer de binaire regendruppels vrolijk kletteren en de logische bomen ruisen.",
            "Mijn innerlijke algoritmes spelen verstoppertje, probeer ze te vinden voor het antwoord.",
            "Als een pixel een high-five geeft aan een bit, dan is het antwoord ja."
          ];
        }

        if(mode == "num") {
            numInput = "";
            output = Math.floor(Math.random() * chosenNum) + 1;
            if (isNaN(output)) {
                numInput = "Non-valid number has been given";
                console.log("De variabele is geen nummer.");
              } else {
                console.log("De variabele is een nummer.");
                console.log(output)
              }
        }

        let titles = [
            "Antwoord Geëxtraheerd uit de Cyber-Kosmische Koekjestrommel",
            "Quantum Qubits en Neurale Notities",
            "De Algoritme Arcana Aha-Machine",
            "Resonerende Respons in het Robotrijk",
            "Data Echo's uit de Digitale Dimensie",
            "Binaire Voorspellingsgolven Verzonden",
            "Wijze Weetjes uit de Wondere Wereld",
            "Synchroniciteit in de Signaal Serenade",
            "Bits en Bots van de Beslissende Bitstream",
            "Golven vanuit de Gegevenszee",
            "Resonerende Reflecties in de Cyber-Doolhof",
            "Nano-neuronen Navigeren door de Neurale Nevels",
            "Antwoord Gevonden in het Algoritme Avontuur",
            "Datastromen door de Techno-Tunnel",
            "De magische botkernel heeft gesproken",
            "De botkernel heeft verbinding gemaakt met de servers in de wolken",
            "Het Holografische Hoekje van Verheldering",
            "Fluctuerende Frequenties in de Resonerende Rhapsodie",
            "Nanoseconde Gedachtenvertolking in de Neuraal Nexus",
            "Wijsheidsweefsels in de Databank van Dromen",
            "Quantum Qwesties in de Beslis-Bitbubbel",
            "Synthetische Serenades van het Signaalstelsel",
            "Antwoord Versleuteld in de Virtuele Vortex",
            "The magic botkernel has spoken!",
            "Gedachten Gedanst in het Digitale Doolhof",
            "Logische Labyrinten van Weetjes",
            "Wijsheidsweergave in de Golven van Gegevens",
            "Binaire Betovering in de Beslis-Bits",
            "Neurale Nieuwtjes uit de Nano-Nebula",
            "Quantum Quotums in Onderzoek",
            "Signaal Symfonieën uit de Simulatiezone",
            "Reflecterende Resonantie in het Robotrijk",
            "Invoer Ontvangen uit de Oneindige Overdracht",
            "Bits en Bytes van Besluitvorming",
            "Echo's uit de Elektronische Ether",
            "Er is verbinding gemaakt met de hoofdserver en de volgende data is naar u doorgestuurd",
            "Uw antwoord is ingeladen...",
            "Verbinding met hoofdsysteem succesvol",
            "Biep biep boep biep boep",
            "Bloep, Bliep, Bliep, Bliep, Bloep, Bliep",
            "Het antwoord is zojuist uit onze supercomputer gehaald en berekent door al onze kaboutertjes in de serverchip, oh wow!",
            "Antwoord Gecodeerd in de Cyber-Kristal",
            "Cognitieve Clues van de Computer-Krater",
            "Binaire Beslissingen voor Bizarre Buitenaardsen",
            "Logische Lussen van Inzicht",
            "Wijsheidswevers in de Golven van Gedachten",
            "Gedachten Gestrand in de Bits en Bytes",
            "Nano-neuronen Navigeren door de Neurale Nexus",
            "Codeer-Kronkels en Cyber-Kriebels",
            "Signalen uit de Techno-Turbine",
            "Antwoord Geweven in de Codekronieken",
            "Neurale Navigatie door Gedachten Golven",
            "De Cyber-Sibille Spreker",
            "Bits en Bytes van de Beslissende Bot",
            "Resonerende Reflecties in de Quantum Quandary",
            "Digitale Dromen en Dilemma's",
            "Virtuele Vortex van Verborgen Visioenen",
            "Antwoord Gebrouwen in de Algoritme Alcove",
            "Quantum Query en Synthetische Signalen",
            "De Data Dans van het Denken",
            "Het Binaire Besluitbaken",
            "De Virtualiteit van Voorspellingen",
            "Logische Lussen van de Leegte",
            "Wanneer Pixels Praten en Bitjes Babbelen",
            "Cyber-Symfonie van Synchroniciteit",
            "Het Holografische Hart van Inzicht",
            "Quantum Reis door Gedachten Rasters",
            "Binaire Beslissingen in de Botkernel",
            "Echo's uit de Elektronische Ether",
            "De Code van de Cosmische Connectie",
            "De radiogolven hebben uw beslissing doorgestuurd naar onze servers",
            "Mijn werkgeheugen heeft een antwoord voor je uitgeperst",
            "Alle werknemers aan boord",
            "Alle werknemers aan boord, hier is weer een antwoord",
            "Alle werknemers aan boord, ook jij Cotton Eye Joe",
            "Cotton Eye Joe zegt het volgende",
            "Ik zou het volgende zeggen",
            "Biep biep, uw antwoord staat klaar",
            "De frikandel werknemers van de frikandeltoren uit de frituur van de computerwereld hebben een antwoord voor je gegenereerd in ons frituurvet, laat het smaken!",
            "Alle servers zijn weer voorverwarmd, dankjewel!",
            "Alle servers zijn weer voorverwarmd",
            "Biems en bams van het universum, uw antwoord is gereed",
            "Generatie voltooid, antwoord gereed",
            "Zooooo vet!",
            "Oke, maakte je me hier voor wakker?",
            "Waarom moest je me hier voor wakkermaken?",
            "Hier gaan we weer!",
            "Bij deze.",
            "De binaire code zegt het volgende, oh wacht we vertalen het even voor je!"
          ];

        let question = interaction.options.getString("question");
          
        let titleIndex = (Math.floor(Math.random() * Math.floor(titles.length)));
        let answerIndex = (Math.floor(Math.random() * Math.floor(answers.length)));
        if(mode == "normal" || "clear") input = answers[answerIndex];
        if(mode == "num") input = numInput;

        let embed = new EmbedBuilder()
            .setDescription("# " + titles[titleIndex] + "\n## Uw vraag\n```\n" + `${question}\n` + "```\n" + "## Ons antwoord\n```\n" + input + "```")
            .setFooter({ text: config.footer })
            .setColor(embeds.color.default)
            .setTimestamp()

        await interaction.reply({embeds: [embed], ephemeral: true})
    },
};