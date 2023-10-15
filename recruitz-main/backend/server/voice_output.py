import librosa
import numpy as np

def calculate_clarity():
    audio_file = "/home/jegathees5555/Documents/recruitz/backend/audio/output.mp3"  # Replace with the path to your audio file
    
    # Load the audio file
    y, sr = librosa.load(audio_file)
    
    # Calculate the spectrogram
    spectrogram = np.abs(librosa.stft(y))
    # Calculate the spectral centroid
    spectral_centroid = librosa.feature.spectral_centroid(S=spectrogram)
    
    # Calculate the mean of the spectral centroid
    mean_centroid = np.mean(spectral_centroid)
    
    return mean_centroid/25

def calculate_boldness():
    audio_file = "/home/jegathees5555/Documents/recruitz/backend/audio/output.mp3"  # Replace with the path to your audio file
    
    # Load the audio file
    y, sr = librosa.load(audio_file)
    
    # Calculate the spectrogram
    spectrogram = np.abs(librosa.stft(y))
    # Calculate the spectral contrast
    spectral_contrast = librosa.feature.spectral_contrast(S=spectrogram)
    
    # Calculate the mean of the spectral contrast
    mean_contrast = np.mean(spectral_contrast)
    
    return mean_contrast*3.2

def voice_quality():
    audio_file = "/home/jegathees5555/Documents/recruitz/backend/audio/output.mp3"  # Replace with the path to your audio file
    
    # Load the audio file
    y, sr = librosa.load(audio_file)
    
    # Calculate the spectrogram
    spectrogram = np.abs(librosa.stft(y))
    
    clarity = calculate_clarity()
    boldness = calculate_boldness()

    print(f"Clarity: {clarity:.2f}")
    print(f"Boldness: {boldness:.2f}")


if __name__ == "__main__":
    voice_quality()