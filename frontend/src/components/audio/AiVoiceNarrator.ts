/**
 * MissionX Web Speech API AI Game Master Voice Narrator
 * Synthesizes dynamic futuristic voice briefings and emergency alerts using browser speech synthesis.
 */

class AiVoiceNarrator {
  private synth: SpeechSynthesis | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  speak(text: string, pitch = 1.1, rate = 1.0) {
    if (!this.synth) return;

    this.synth.cancel(); // Stop any active speech
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = pitch;
    utterance.rate = rate;

    // Pick futuristic/English voice if available
    const voices = this.synth.getVoices();
    const selectedVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Zira') || v.name.includes('David')));
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    this.synth.speak(utterance);
  }

  speakBriefing(missionName: string) {
    this.speak(`Alert! Initiating emergency protocol for ${missionName}. Solenoid vault doors engaged. Prepare for technical challenges.`, 1.05, 0.95);
  }

  speakSuccess() {
    this.speak(`Challenge cleared successfully. Stage advancement synchronized.`, 1.2, 1.1);
  }

  speakWarning() {
    this.speak(`Warning: System intrusion detected. Penalty clock activated.`, 0.9, 1.0);
  }
}

export const aiVoiceNarrator = new AiVoiceNarrator();
