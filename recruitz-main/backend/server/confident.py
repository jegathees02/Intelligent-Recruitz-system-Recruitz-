import cv2

def analyze_confidentiality(video_path):
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    video_capture = cv2.VideoCapture(video_path)
    frame_count = int(video_capture.get(cv2.CAP_PROP_FRAME_COUNT))

    face_detected_frames = 0

    while video_capture.isOpened():
        ret, frame = video_capture.read()
        if not ret:
            break
        
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray_frame, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
        
        if len(faces) > 0:
            face_detected_frames += 1

        # Remove cv2.imshow() - No need to display frames

    video_capture.release()

    confidentiality_score = face_detected_frames / frame_count
    return confidentiality_score

if __name__ == "__main__":
    video_path = "/home/jegathees5555/Documents/recruitz/backend/voice/sample_voice1.mp4"  # Replace with the path to your WebM video file
    
    confidentiality_score = analyze_confidentiality(video_path)
    print(f"Confidentiality Score: {confidentiality_score:.2f}")
