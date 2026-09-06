# Mobile Flashcards

A cross-platform (iOS / Android) flashcards app: create decks of cards, add
question/answer cards to a deck, and quiz yourself, scoring each card as
correct or incorrect. A daily local notification reminds you to study.

Originally built as a Udacity *React Nanodegree* project on Expo SDK 30 /
React 16 / React Navigation 2. This branch keeps the same functionality but
lifts the project onto a current stack:

| Area          | Was                              | Now                                            |
| ------------- | -------------------------------- | ---------------------------------------------- |
| Expo SDK      | 30                               | 57                                             |
| React Native  | 0.55 (Expo fork)                 | 0.86                                           |
| React         | 16.3                             | 19                                             |
| Navigation    | react-navigation 2               | @react-navigation/native 7 (native-stack + bottom-tabs) |
| State         | redux + react-redux 5 + thunk    | Redux Toolkit + react-redux 9                  |
| Storage       | `AsyncStorage` from react-native | `@react-native-async-storage/async-storage`    |
| Notifications | `expo` `Notifications`/`Permissions` | `expo-notifications` (daily trigger)       |
| IDs           | `uuid`                           | `expo-crypto` `randomUUID()`                   |
| Components    | class components                 | function components + hooks                    |
| Client        | Expo Go + QR code                | custom dev client (`expo run:*`)               |

## Prerequisites

- **Node.js 20+** and npm.
- **Watchman** (`brew install watchman`) — recommended on macOS.
- **iOS** (macOS only): Xcode 16+ with a simulator runtime, and CocoaPods
  (`brew install cocoapods`).
- **Android**: Android Studio with the Android SDK, an emulator (AVD), and
  `adb` on your `PATH`. JDK 17.

This app uses native modules (async-storage, expo-notifications), so it runs
in a **custom dev client**, not Expo Go.

## Get the code

```bash
git clone https://github.com/niroshpg/mobile-flashcards.git
cd mobile-flashcards
npm install
```

The `ios/` and `android/` folders are generated and git-ignored; `expo run:*`
creates them via `expo prebuild` on first run. To regenerate them by hand:
`npm run prebuild`.

## Run on a simulator / emulator

```bash
# iOS simulator
npm run ios
npx expo run:ios --device "iPhone 16 Pro"   # a specific simulator

# Android emulator (boot an AVD from Android Studio first, or it will start one)
npm run android
```

Each command compiles the native app, installs the dev client, and starts the
Metro bundler. Leave Metro running; press `r` to reload. To re-attach Metro
later without rebuilding: `npm start`.

## Run on a physical device

**iOS**

1. Connect the iPhone via USB and trust the computer.
2. Open `ios/mobileflashcards.xcworkspace` in Xcode once, pick your Team under
   Signing & Capabilities (a free Apple ID works), and change the bundle
   identifier if `com.niroshpg.mobileflashcards` is taken.
3. `npx expo run:ios --device` and choose your device.
4. On the device, approve the developer profile under
   Settings → General → VPN & Device Management the first time.

**Android**

1. Enable Developer options + USB debugging and connect the phone; confirm it
   shows in `adb devices`.
2. `npx expo run:android --device` and choose your device.

If Metro can't reach the device over USB: `adb reverse tcp:8081 tcp:8081`.

## Release builds

```bash
npx expo run:ios --configuration Release
npx expo run:android --variant release
```

## Project layout

```
App.js                 Providers (redux, safe-area, navigation) + notification bootstrap
index.js               Entry point (registerRootComponent)
navigation/            Bottom tabs (Decks stack + New Deck) — React Navigation 7
screens/               Decks, DeckDetails, AddCard, NewDeck, StartQuiz
components/             DeckSummary, DeckDetails presentational components
actions/, reducers/    Redux action creators (incl. thunks) and the decks reducer
src/store.js           configureStore (Redux Toolkit)
utils/api.js           AsyncStorage-backed deck persistence
utils/helpers.js       Daily study reminder (expo-notifications)
```

## Troubleshooting

- **`pod install` fails with `spawn pod ENOENT`** — the CocoaPods gem's bin
  directory isn't on your `PATH`:

  ```bash
  export PATH="/opt/homebrew/lib/ruby/gems/4.0.0/bin:$PATH"
  ```

- **Stale native build after changing `app.json` / plugins** —
  `npm run prebuild` then rebuild.
- **Metro cache issues** — `npx expo start --clear`.
- **Android build can't find the SDK** — create `android/local.properties`
  with `sdk.dir=/Users/<you>/Library/Android/sdk`.
