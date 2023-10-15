import subprocess
import os

def extract_audio(input_file, output_file):
    command = [
        "ffmpeg",
        "-i", input_file,
        "-y",  # Overwrite output files
        output_file
    ]
    
    subprocess.run(command)

def voice_extraction_main():
    input_file = "/home/jegathees5555/Documents/recruitz/backend/server/uploaded_video.webm"  # Replace with the path to your WebM file
    output_file = "/home/jegathees5555/Documents/recruitz/backend/audio/output.mp3"  # Replace with the desired name for the output MP3 file

    extract_audio(input_file, output_file)

if __name__ == "__main__":
    voice_extraction_main()
