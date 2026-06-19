import { Audio } from 'expo-av';

class SoundManagerClass {
  constructor() {
    this.bgm = null;
    this.clickSound = null;
    this.isMuted = false;
    this.isLoaded = false;
  }

  async init() {
    if (this.isLoaded) return;
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
      });

      // BGM: Sakin Lofi / Piyano müziği (Yerel Dosya) - Yavaşlatılmış ve Sesi Kısılmış
      const { sound: bgmSound } = await Audio.Sound.createAsync(
        require('../../assets/bgm.mp3'),
        { shouldPlay: false, isLooping: true, volume: 0.04, rate: 0.8, shouldCorrectPitch: true }
      );
      this.bgm = bgmSound;

      // SFX: Click
      const { sound: click } = await Audio.Sound.createAsync(
        { uri: 'https://www.myinstants.com/media/sounds/click.mp3' },
        { shouldPlay: false, volume: 0.8 }
      );
      this.clickSound = click;

      this.isLoaded = true;
      // Web'de otomatik oynatma hatasını önlemek için (NotAllowedError) 
      // BGM'yi ilk kullanıcı etkileşimine kadar başlatmıyoruz.
    } catch (e) {
      console.log('Ses yüklenirken hata oluştu:', e);
    }
  }

  async playClick() {
    if (this.isMuted) return;

    // İlk tıklamada arkaplan müziğini başlat (Web auto-play kısıtlamasını aşmak için)
    if (this.bgm && !this.bgmStarted) {
      try {
        await this.bgm.playAsync();
        this.bgmStarted = true;
      } catch (e) {
        console.log('BGM başlatılamadı:', e);
      }
    }

    if (!this.clickSound) return;
    try {
      await this.clickSound.replayAsync();
    } catch (e) {
      // ignore
    }
  }

  async toggleMute() {
    this.isMuted = !this.isMuted;
    if (!this.bgm) return this.isMuted;

    try {
      if (this.isMuted) {
        await this.bgm.pauseAsync();
      } else {
        await this.bgm.playAsync();
      }
    } catch (e) {}
    
    return this.isMuted;
  }
}

export const SoundManager = new SoundManagerClass();
