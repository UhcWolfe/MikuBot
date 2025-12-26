<div align="center">

# 💙 MikuBot

### Discord Bot z Anime Klimatem

[![Discord.js](https://img.shields.io/badge/discord.js-v14-blue.svg)](https://discord.js.org/)
[![Node.js](https://img.shields.io/badge/node.js-16.9.0+-brightgreen.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

*Bot Discord dostarczający wysokiej jakości treści anime z konachan.com*

</div>

---

## ✨ Funkcje

- 🎨 **11 kategorii NSFW** - Różnorodne treści anime
- 🖼️ **Wiele formatów** - Obrazy (JPG, PNG, WEBP), GIF-y i wideo (WEBM, MP4)
- 💾 **Funkcja zapisywania** - Wysyłanie treści na prywatną wiadomość
- 🎲 **Prawdziwa losowość** - Tysiące unikalnych grafik
- 🔒 **Bezpieczeństwo** - Automatyczna weryfikacja kanałów NSFW

---

## 📦 Instalacja

### Wymagania
- Node.js 16.9.0 lub nowszy
- npm (instaluje się z Node.js)

### Kroki

```bash
# 1. Sklonuj repozytorium
git clone https://github.com/twoj-username/MikuBot.git
cd MikuBot

# 2. Zainstaluj zależności
npm install

# 3. Skonfiguruj bota (patrz poniżej)
```

---

## ⚙️ Konfiguracja

### 1. Utwórz Discord Bot

1. Odwiedź [Discord Developer Portal](https://discord.com/developers/applications)
2. Kliknij **"New Application"** → **"Bot"** → **"Add Bot"**
3. Skopiuj **Token** i **Application ID**

### 2. Utwórz config.json

```json
{
  "token": "TWÓJ_TOKEN_BOTA",
  "clientId": "TWOJE_CLIENT_ID"
}
```

> ⚠️ **Nie udostępniaj tokena publicznie!**

### 3. Zaproś bota na serwer

W Discord Developer Portal → **OAuth2** → **URL Generator**:

**Scopes:** `bot`, `applications.commands`  
**Permissions:** `Send Messages`, `Embed Links`, `Use Slash Commands`

Użyj wygenerowanego URL, aby dodać bota na serwer.

---

## 🚀 Uruchomienie

```bash
npm start
```

Powinieneś zobaczyć:
```
✅ Komendy slash zarejestrowane!
✨ MikuBot#1234 jest online!
```

---

## 📝 Komendy

### `/nsfw <category>`

Pobiera losową grafikę anime z wybranej kategorii.

#### Dostępne kategorie (11):

| Emoji | Kategoria | Opis |
|-------|-----------|------|
| 🍑 | **Ass** | Grafiki skupione na pośladkach |
| 💕 | **Pussy** | Treści erotyczne |
| 🍆 | **Anal** | Sceny analne |
| ❤️ | **Sex** | Sceny seksualne |
| 💦 | **Cum** | Grafiki z wytryskimi |
| ⛓️ | **Bondage** | Treści BDSM i krępowania |
| 🎄 | **Christmas** | Treści świąteczne |
| 🐙 | **Tentacles** | Grafiki z mackami |
| 🎮 | **Genshin Impact** | Postacie z gry (5000+ grafik) |
| 💜 | **Futanari** | Postacie futanari |
| 🗡️ | **Arknights** | Postacie z gry (2900+ grafik) |

**Przykład:** `/nsfw category:sex`

---

## 🐛 Rozwiązywanie Problemów

| Problem | Rozwiązanie |
|---------|-------------|
| Bot nie odpowiada | Sprawdź uprawnienia: `Send Messages`, `Embed Links` |
| "Missing Access" | Upewnij się, że bot może pisać w kanale |
| "Invalid Token" | Zregeneruj token w Discord Developer Portal |
| Timeout error | Sprawdź połączenie z internetem, spróbuj ponownie |

---

## 🛠️ Technologie

- **[Node.js](https://nodejs.org/)** - Środowisko uruchomieniowe
- **[Discord.js v14](https://discord.js.org/)** - Biblioteka do botów Discord
- **[Axios](https://axios-http.com/)** - HTTP client
- **[Konachan.com](https://konachan.com/)** - Źródło treści anime

---

## 📁 Struktura Projektu

```
MikuBot/
├── bot.js                # Główny plik bota
├── config.json          # Konfiguracja (token, clientId)
├── package.json         # Zależności projektu
└── README.md            # Dokumentacja
```

---

## 🤝 Współpraca

Chcesz przyczynić się do rozwoju? 

1. Fork projektu
2. Stwórz branch (`git checkout -b feature/NowaFunkcja`)
3. Commit zmian (`git commit -m 'Dodaj nową funkcję'`)
4. Push (`git push origin feature/NowaFunkcja`)
5. Otwórz Pull Request

---

## 📄 Licencja

Projekt jest licencjonowany na licencji **MIT**. Zobacz [LICENSE](LICENSE) dla szczegółów.

---

## 👤 Autor

**UhcWolfe**

- 💬 Discord: [Veyra Development](https://dc.veyradev.com/)

---

## 📞 Wsparcie

- 🐛 [Zgłoś problem](https://github.com/twoj-username/MikuBot/issues)
- 💡 [Zaproponuj funkcję](https://github.com/twoj-username/MikuBot/issues/new)
- 💬 [Dołącz na Discord](https://dc.veyradev.com/)

---

<div align="center">

Made with 💙 by **UhcWolfe** | [Veyra Development](https://dc.veyradev.com/)

*Jeśli projekt Ci się podoba, zostaw ⭐*

</div>
