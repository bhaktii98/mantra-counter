# Mantra Counter App

A simple React Native app to help users count mantras or chants with a clean, intuitive interface. Track your chanting progress, set a target, and get sound/vibration feedback when the target is reached, along with a motivational modal.

[![Watch the video](https://img.icons8.com/clouds/100/000000/video-playlist.png)](https://drive.google.com/file/d/1TYn-gXuSwJ6OARFck39qS4gmIryBCqh5/view?usp=sharing)

<p align="center">
  <a href="https://drive.google.com/file/d/1TYn-gXuSwJ6OARFck39qS4gmIryBCqh5/view?usp=sharing">
    <strong>📥Screen-recording Link</strong>
  </a>
</p>

## Screenshots
<p align="center">
  <img src="https://github.com/bhaktii98/mantra-counter/blob/main/mantra1.jpg" width="250">
  <img src="https://github.com/bhaktii98/mantra-counter/blob/main/mantra2.jpg" width="250">
</p>

## Features

- **Large Counter Button**:
  - A prominent, circular button to increment the chant count with a single tap.
  - Shows the current count in bold, white text (like `font-size: 48px; font-weight: bold; color: #FFFFFF;` in CSS).
  - Features a pulse animation (like `animation: pulse 1s infinite;`) to encourage tapping.
  - Styled with a gradient background (like `background: linear-gradient(#D4A5A5, #C68B8B);`) and a circular progress ring around it.
  - On tap, it increments the count, saves to AsyncStorage, and triggers sound/vibration plus a modal if the target is met.

- **Target Setting**:
  - A text input field to set a target number of chants, with a "Set" button (styled like `background: linear-gradient(#D4A5A5, #C68B8B); color: #FFFFFF;` in CSS).
  - The target is saved to AsyncStorage for persistence.

- **AsyncStorage for Persistence**:
  - Uses `AsyncStorage` to save the current count and target, ensuring they persist across app restarts.
  - On app start, loads the saved count and target from AsyncStorage.

- **Sound and Vibration Feedback**:
  - Plays `notification.mp3` and vibrates the device when the target is reached (requires VIBRATE permission on Android).

- **Modal with Religious Quote**:
  - Displays a modal when the target is reached, showing a message like "Target Reached!" and a quote from the Chandogya Upanishad.
  - Includes a "Close" button (styled like `background: linear-gradient(#D4A5A5, #C68B8B); color: #FFFFFF;`).

- **Reset Functionality**:
  - A "Reset" button (styled like `background: linear-gradient(#E57373, #D32F2F); color: #FFFFFF;`) to reset the count to zero and update AsyncStorage.

## UI Overview

The app’s UI is clean and user-friendly, designed with a focus on simplicity and interaction:
- **Color Palette** (like CSS variables):
  - Background gradient (`background: linear-gradient(#F8F1E9, #EDE4E0);`) for a soft, calming effect.
  - Pink gradient (`background: linear-gradient(#D4A5A5, #C68B8B);`) for the counter button, "Set" button, and "Close" button.
  - Red gradient (`background: linear-gradient(#E57373, #D32F2F);`) for the "Reset" button.
- **Layout** (like CSS `flexbox`):
  - The title "Mantra Counter" is at the top (`text-align: center; font-size: 36px; font-weight: bold; color: #2D3748;`).
  - The target input and "Set" button are in a row (`display: flex; flex-direction: row; justify-content: space-between; align-items: center;`) inside a white container with rounded corners (`border-radius: 12px; background-color: #FFFFFF;`).
  - The large counter button is centered (`display: flex; justify-content: center; align-items: center;`) with a circular shape (`border-radius: 90px; width: 180px; height: 180px;`) inside a larger white circle with a progress ring (`border-radius: 150px; background-color: #FFFFFF;`).
  - "Tap to Chant" and "Target: X" text are below the counter button (`text-align: center; font-size: 16px; color: #718096;`).
  - The "Reset" button is at the bottom (`width: 50%; border-radius: 12px;`).
- **Modal**:
  - Appears with a semi-transparent backdrop (`background-color: rgba(0, 0, 0, 0.4);`) and a white container (`background-color: #FFFFFF; border-radius: 20px;`).
  - Contains a title ("Target Reached!") in pink (`color: #D4A5A5; font-size: 28px;`), a subtitle (`color: #718096; font-size: 16px;`), a religious quote (`font-style: italic; color: #718096;`), and a "Close" button.

## APK Download

Download the APK from Google Drive:  
[Download APK](https://drive.google.com/file/d/1svARV4mDfZpc5ttCD1_Ywt53aGyqGiaA/view?usp=sharing)
