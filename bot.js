const { Client, GatewayIntentBits, EmbedBuilder, REST, Routes, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ActivityType } = require('discord.js');
const axios = require('axios');
const config = require('./config.json');

// Kolory dla konsoli
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    cyan: '\x1b[36m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    magenta: '\x1b[35m',
    blue: '\x1b[34m'
};

// Funkcja do wyświetlania ładnych logów
function printBanner() {
    console.clear();
    console.log(colors.cyan + colors.bright);
    console.log(`
    ███╗   ███╗██╗██╗  ██╗██╗   ██╗██████╗  ██████╗ ████████╗
    ████╗ ████║██║██║ ██╔╝██║   ██║██╔══██╗██╔═══██╗╚══██╔══╝
    ██╔████╔██║██║█████╔╝ ██║   ██║██████╔╝██║   ██║   ██║   
    ██║╚██╔╝██║██║██╔═██╗ ██║   ██║██╔══██╗██║   ██║   ██║   
    ██║ ╚═╝ ██║██║██║  ██╗╚██████╔╝██████╔╝╚██████╔╝   ██║   
    ╚═╝     ╚═╝╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝  ╚═════╝    ╚═╝   
    ` + colors.reset);
    console.log(colors.magenta + '    ═══════════════════════════════════════════════════════════' + colors.reset);
    console.log(colors.cyan + '              Discord Bot z Anime Klimatem v1.0.0' + colors.reset);
    console.log(colors.magenta + '    ═══════════════════════════════════════════════════════════' + colors.reset);
    console.log(colors.yellow + '              Author: UhcWolfe | Veyra Development' + colors.reset);
    console.log(colors.magenta + '    ═══════════════════════════════════════════════════════════\n' + colors.reset);
}

function log(type, message) {
    const timestamp = new Date().toLocaleTimeString('pl-PL');
    const prefix = `[${timestamp}]`;

    switch (type) {
        case 'success':
            console.log(colors.green + '✅ ' + prefix + colors.reset, message);
            break;
        case 'error':
            console.log(colors.red + '❌ ' + prefix + colors.reset, message);
            break;
        case 'info':
            console.log(colors.cyan + 'ℹ️  ' + prefix + colors.reset, message);
            break;
        case 'warning':
            console.log(colors.yellow + '⚠️  ' + prefix + colors.reset, message);
            break;
        case 'loading':
            console.log(colors.blue + '🔄 ' + prefix + colors.reset, message);
            break;
        default:
            console.log(prefix, message);
    }
}

// Wyświetl banner przy starcie
printBanner();

// Konfiguracja klienta
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ]
});

// Kolor główny bota (turkusowy jak włosy Miku)
const MIKU_COLOR = 0x00CED1;

// Mapa do przechowywania URL-i mediów dla przycisków
const mediaUrlsMap = new Map();

// Definicja komendy slash
const commands = [
    new SlashCommandBuilder()
        .setName('nsfw')
        .setDescription('Pobiera losowy obraz anime z konachan.com')
        .addStringOption(option =>
            option
                .setName('category')
                .setDescription('Wybierz kategorię')
                .setRequired(true)
                .addChoices(
                    { name: '🍑 Ass', value: 'ass' },
                    { name: '💕 Pussy', value: 'pussy' },
                    { name: '🍆 Anal', value: 'anus' },
                    { name: '❤️ Sex', value: 'sex' },
                    { name: '💦 Cum', value: 'cum' },
                    { name: '⛓️ Bondage', value: 'bondage' },
                    { name: '🎄 Christmas', value: 'christmas' },
                    { name: '🐙 Tentacles', value: 'tentacles' },
                    { name: '🎮 Genshin Impact', value: 'genshin_impact' },
                    { name: '💜 Futanari', value: 'futanari' },
                    { name: '🗡️ Arknights', value: 'arknights' },
                    { name: '🍌 Dildo', value: 'dildo' },
                    { name: '✋ Masturbation', value: 'masturbation' },
                    { name: '🥒 Penis', value: 'penis' }
                ))
        .toJSON()
];

// Rejestracja komend slash
const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
    try {
        log('loading', 'Rejestrowanie komend slash...');
        await rest.put(
            Routes.applicationCommands(config.clientId),
            { body: commands }
        );
        log('success', `Zarejestrowano ${commands.length} komend slash!`);
    } catch (error) {
        log('error', 'Błąd podczas rejestracji komend:');
        console.error(error);
    }
})();

// Funkcja aktualizująca status bota
function updateBotStatus() {
    const guildCount = client.guilds.cache.size;
    const totalMembers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);

    client.user.setActivity(`${guildCount} serwerów | ${totalMembers} użytkowników`, {
        type: ActivityType.Watching
    });
}

// Event: bot gotowy
client.once('ready', () => {
    console.log('\n' + colors.magenta + '    ═══════════════════════════════════════════════════════════' + colors.reset);
    log('success', `Bot zalogowany jako ${colors.cyan}${client.user.tag}${colors.reset}`);
    log('info', `Serwery: ${colors.cyan}${client.guilds.cache.size}${colors.reset}`);

    const totalMembers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
    log('info', `Użytkownicy: ${colors.cyan}${totalMembers}${colors.reset}`);
    log('info', `Status: ${colors.green}${client.guilds.cache.size} serwerów | ${totalMembers} użytkowników${colors.reset}`);
    console.log(colors.magenta + '    ═══════════════════════════════════════════════════════════' + colors.reset);
    log('success', 'MikuBot jest online i gotowy do działania! ✨\n');

    // Ustawienie statusu z licznikami
    updateBotStatus();

    // Aktualizacja statusu co 5 minut, aby był zawsze aktualny
    setInterval(updateBotStatus, 5 * 60 * 1000);
});

// Event: interakcje (komendy slash i przyciski)
client.on('interactionCreate', async (interaction) => {
    // Obsługa komend slash
    if (interaction.isChatInputCommand()) {
        const { commandName } = interaction;

        if (commandName === 'nsfw') {
            await handleNsfwCommand(interaction);
        }
    }

    // Obsługa przycisków
    if (interaction.isButton()) {
        if (interaction.customId.startsWith('save_media_')) {
            await handleSaveButton(interaction);
        }
    }
});

// Funkcja obsługująca komendę /nsfw
async function handleNsfwCommand(interaction) {
    // Sprawdzenie czy kanał jest NSFW
    if (interaction.channel && !interaction.channel.nsfw && interaction.guildId) {
        return await interaction.reply({
            embeds: [createErrorEmbed('Ta komenda może być używana tylko w kanałach oznaczonych jako NSFW! 🔞')],
            ephemeral: true
        });
    }

    await interaction.deferReply();

    try {
        // Pobranie wybranej kategorii
        const category = interaction.options.getString('category');

        // Mapowanie emoji dla kategorii
        const categoryEmojis = {
            'ass': '🍑',
            'pussy': '💕',
            'anus': '🍆',
            'sex': '❤️',
            'cum': '💦',
            'bondage': '⛓️',
            'christmas': '🎄',
            'tentacles': '🐙',
            'genshin_impact': '🎮',
            'futanari': '💜',
            'arknights': '🗡️',
            'dildo': '🍌',
            'masturbation': '✋',
            'penis': '🥒'
        };

        // Pobieranie losowego obrazu z konachan.com
        const response = await axios.get('https://konachan.com/post.json', {
            params: {
                limit: 100,
                tags: category,
                page: Math.floor(Math.random() * 50) + 1 // Losowa strona dla większej różnorodności
            },
            timeout: 10000
        });

        const posts = response.data;

        if (!posts || posts.length === 0) {
            log('warning', 'Brak postów z API');
            return await interaction.editReply({
                embeds: [createErrorEmbed('Nie znaleziono treści multimedialnych. Spróbuj ponownie!')]
            });
        }

        log('info', `Pobrano ${posts.length} postów z kategorii: ${category}`);

        // Filtrowanie postów, aby zawierały różne typy multimediów (obrazy, GIF-y, video)
        const validPosts = posts.filter(post => {
            const url = post.file_url || post.sample_url || post.preview_url;
            if (!url) return false;

            // Akceptuj obrazy, GIF-y i video
            const urlLower = url.toLowerCase();
            const extension = urlLower.split('.').pop().split('?')[0];
            const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webm', 'mp4', 'webp'];

            return validExtensions.includes(extension);
        });

        log('success', `Znaleziono ${validPosts.length} prawidłowych postów`);

        // Jeśli nie ma prawidłowych postów, użyj wszystkich dostępnych
        const postsToUse = validPosts.length > 0 ? validPosts : posts;

        if (postsToUse.length === 0) {
            log('warning', 'Brak dostępnych postów po filtrowaniu');
            return await interaction.editReply({
                embeds: [createErrorEmbed('Nie znaleziono treści multimedialnych. Spróbuj ponownie!')]
            });
        }

        // Losowy post z wyników
        const randomPost = postsToUse[Math.floor(Math.random() * postsToUse.length)];

        // Wybór najlepszej jakości pliku
        const mediaUrl = randomPost.file_url || randomPost.sample_url || randomPost.preview_url;
        const postUrl = `https://konachan.com/post/show/${randomPost.id}`;

        if (!mediaUrl) {
            log('warning', 'Brak URL multimediów w poście');
            return await interaction.editReply({
                embeds: [createErrorEmbed('Nie udało się pobrać treści. Spróbuj ponownie!')]
            });
        }

        // Określenie typu pliku
        const fileExtension = mediaUrl.toLowerCase().split('.').pop().split('?')[0];
        const isVideo = ['webm', 'mp4'].includes(fileExtension);
        const isGif = fileExtension === 'gif';

        // Określenie ratingu
        const ratingEmojis = {
            's': '✅ Safe',
            'q': '⚠️ Questionable',
            'e': '🔞 Explicit'
        };
        const rating = ratingEmojis[randomPost.rating] || 'Unknown';

        // Określenie typu treści dla embeda
        let mediaTypeEmoji = '🖼️';
        if (isVideo) mediaTypeEmoji = '🎬';
        else if (isGif) mediaTypeEmoji = '🎞️';

        // Tworzenie embeda
        const embed = new EmbedBuilder()
            .setTitle(`${categoryEmojis[category]} MikuBot | ${category.toUpperCase()} ${mediaTypeEmoji}`)
            .setDescription(`[🔗 Zobacz post na konachan.com](${postUrl})`)
            .setColor(MIKU_COLOR)
            .setFooter({
                text: '✨ MikuBot • konachan.com',
                iconURL: client.user.displayAvatarURL()
            })
            .setTimestamp();

        // Dla obrazów i GIF-ów używaj setImage, dla video dodaj jako pole
        if (!isVideo) {
            embed.setImage(mediaUrl);
        }

        // Dodanie ratingu i rozmiaru
        embed.addFields(
            { name: '📊 Rating', value: rating, inline: true },
            { name: '📐 Rozmiar', value: `${randomPost.width}x${randomPost.height}`, inline: true },
            { name: '📁 Typ', value: fileExtension.toUpperCase(), inline: true }
        );

        // Dodanie tagów jeśli są dostępne
        if (randomPost.tags) {
            const tags = randomPost.tags.split(' ').slice(0, 5).join(', ');
            if (tags.length > 0) {
                embed.addFields({
                    name: '🏷️ Tagi',
                    value: tags.substring(0, 1024),
                    inline: false
                });
            }
        }

        // Dla video, dodaj jako osobny załącznik w opisie
        if (isVideo) {
            embed.addFields({
                name: '🎬 Video',
                value: `[📥 Kliknij aby obejrzeć](${mediaUrl})`,
                inline: false
            });
        }


        // Tworzenie unikalnego ID dla przycisku
        const buttonId = `save_media_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Zapisanie URL-a media w mapie
        mediaUrlsMap.set(buttonId, {
            url: mediaUrl,
            category: category,
            type: fileExtension
        });

        // Automatyczne czyszczenie po 24 godzinach
        setTimeout(() => {
            mediaUrlsMap.delete(buttonId);
        }, 24 * 60 * 60 * 1000);

        // Tworzenie przycisku "Zapisz"
        const saveButton = new ButtonBuilder()
            .setCustomId(buttonId)
            .setLabel('💾 Zapisz')
            .setStyle(ButtonStyle.Primary);

        const row = new ActionRowBuilder()
            .addComponents(saveButton);

        // Próba wysłania z embedem i przyciskiem
        try {
            const reply = await interaction.editReply({
                embeds: [embed],
                components: [row]
            });
            log('success', `Wysłano ${fileExtension.toUpperCase()} z kategorii ${category} dla ${interaction.user.tag}`);
        } catch (embedError) {
            log('warning', `Błąd podczas wysyłania embeda, próba alternatywna: ${embedError.message}`);

            // Alternatywnie wyślij jako zwykłą wiadomość z linkiem
            await interaction.editReply({
                content: `${categoryEmojis[category]} **${category.toUpperCase()}** ${mediaTypeEmoji}\n\n${mediaUrl}\n\n[🔗 Zobacz więcej na konachan.com](${postUrl})`,
                components: [row]
            });
        }

    } catch (error) {
        log('error', `Błąd podczas pobierania treści: ${error.message}`);

        // Sprawdź czy to timeout lub błąd sieci
        const errorMessage = error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT'
            ? 'Przekroczono limit czasu połączenia. Spróbuj ponownie!'
            : 'Wystąpił błąd podczas pobierania treści. Spróbuj ponownie później!';

        await interaction.editReply({
            embeds: [createErrorEmbed(errorMessage)]
        });
    }
}

// Funkcja obsługująca przycisk "Zapisz"
async function handleSaveButton(interaction) {
    try {
        await interaction.deferReply({ ephemeral: true });

        // Pobierz dane z mapy
        const mediaData = mediaUrlsMap.get(interaction.customId);

        if (!mediaData) {
            return await interaction.editReply({
                content: '❌ Link do tego media wygasł. Proszę użyć komendy /nsfw ponownie.'
            });
        }

        // Określenie emoji dla kategorii
        const categoryEmojis = {
            'ass': '🍑',
            'pussy': '💕',
            'anus': '🍆',
            'sex': '❤️',
            'cum': '💦',
            'bondage': '⛓️',
            'christmas': '🎄',
            'tentacles': '🐙',
            'genshin_impact': '🎮',
            'futanari': '💜',
            'arknights': '🗡️',
            'dildo': '🍌',
            'masturbation': '✋',
            'penis': '🥒'
        };

        // Tworzenie embeda dla DM
        const dmEmbed = new EmbedBuilder()
            .setTitle(`${categoryEmojis[mediaData.category] || '🖼️'} Zapisane media z MikuBot`)
            .setDescription(`Kategoria: **${mediaData.category.toUpperCase()}**`)
            .setColor(MIKU_COLOR)
            .setImage(mediaData.url)
            .setFooter({
                text: '✨ MikuBot • Zapisano z konachan.com',
                iconURL: client.user.displayAvatarURL()
            })
            .setTimestamp();

        // Próba wysłania wiadomości prywatnej
        try {
            await interaction.user.send({ embeds: [dmEmbed] });

            log('success', `Wysłano media na DM dla ${interaction.user.tag}`);

            await interaction.editReply({
                content: '✅ Media zostały wysłane na twoją prywatną wiadomość!'
            });
        } catch (dmError) {
            log('warning', `Nie można wysłać DM do ${interaction.user.tag}`);

            // Jeśli nie można wysłać DM (np. użytkownik ma wyłączone DM)
            await interaction.editReply({
                content: '❌ Nie mogę wysłać ci prywatnej wiadomości. Upewnij się, że masz włączone wiadomości prywatne od członków serwera!\n\n' +
                    `Link do media: ${mediaData.url}`
            });
        }

    } catch (error) {
        log('error', `Błąd podczas obsługi przycisku zapisz: ${error.message}`);

        try {
            await interaction.editReply({
                content: '❌ Wystąpił błąd podczas zapisywania. Spróbuj ponownie!'
            });
        } catch (e) {
            log('error', `Nie można edytować odpowiedzi: ${e.message}`);
        }
    }
}

// Funkcja tworząca embed błędu
function createErrorEmbed(message) {
    return new EmbedBuilder()
        .setTitle('❌ Ups! Coś poszło nie tak')
        .setDescription(message)
        .setColor(0xFF6B6B)
        .setFooter({
            text: '✨ MikuBot',
            iconURL: client.user?.displayAvatarURL()
        })
        .setTimestamp();
}

// Obsługa błędów
process.on('unhandledRejection', error => {
    log('error', 'Nieobsłużone odrzucenie promisa:');
    console.error(error);
});

process.on('uncaughtException', error => {
    log('error', 'Nieobsłużony wyjątek:');
    console.error(error);
    process.exit(1);
});

// Logowanie bota
log('loading', 'Łączenie z Discord...');
client.login(config.token).catch(error => {
    log('error', 'Nie można zalogować bota! Sprawdź token w config.json');
    console.error(error);
    process.exit(1);
});

