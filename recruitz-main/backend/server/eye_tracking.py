import cv2
from flask import jsonify
import numpy as np

def eye_tracking_method(video_path):
    eye_detector = cv2.CascadeClassifier("/home/jegathees5555/Documents/recruitz/backend/eye_track/haarcascade_eye.xml")

    cap = cv2.VideoCapture(video_path)

    gaze_percentages = []

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        eyes = eye_detector.detectMultiScale(gray, 1.3, 5)

        eye_centers = []
        for eye in eyes:
            eye_center = (eye[0] + eye[2] // 2, eye[1] + eye[3] // 2)
            eye_centers.append(eye_center)

        if len(eye_centers) >= 2:
            eye_distance = np.linalg.norm(np.array(eye_centers[0]) - np.array(eye_centers[1]))
            gaze_percentage = eye_distance / (frame.shape[1] // 2)
        else:
            gaze_percentage = -1

        gaze_percentages.append(gaze_percentage)

    cap.release()

    average_gaze = 0
    if gaze_percentages:
        average_gaze = sum(gaze_percentages) / len(gaze_percentages)
        final_output = average_gaze * 100 * -1
        print(f"Average Gaze Percentage: {average_gaze:.2f}")
        print(f"{final_output:.2f}")
        # return jsonify({"average_gaze": average_gaze, "final_output": final_output})
        return final_output
    else:
        print("No gaze data available.")
        return jsonify({"error": "No gaze data available."})


# def eye_tracking_method(video_path):
#     # Load the eye detector
#     eye_detector = cv2.CascadeClassifier("/home/jegathees5555/Documents/recruitz/backend/eye_track/haarcascade_eye.xml")

#     # Open the video file
#     cap = cv2.VideoCapture(video_path)

#     gaze_percentages = []

#     while cap.isOpened():
#         ret, frame = cap.read()
#         if not ret:
#             break

#         # Convert the frame to grayscale
#         gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

#         # Detect the eyes in the frame
#         eyes = eye_detector.detectMultiScale(gray, 1.3, 5)

#         # Find the center of the eyes
#         eye_centers = []
#         for eye in eyes:
#             eye_center = (eye[0] + eye[2] // 2, eye[1] + eye[3] // 2)
#             eye_centers.append(eye_center)

#         if len(eye_centers) >= 2:
#             # Calculate the distance between the eyes
#             eye_distance = np.linalg.norm(np.array(eye_centers[0]) - np.array(eye_centers[1]))

#             # Calculate the percentage of how much the user is looking into the camera
#             gaze_percentage = eye_distance / (frame.shape[1] // 2)
#         else:
#             gaze_percentage = -1  # Default value if eyes are not detected

#         gaze_percentages.append(gaze_percentage)

#         # Display the gaze percentage on the frame
#         cv2.putText(frame, f"Gaze Percentage: {gaze_percentage:.2f}", (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)

#         # Show the frame
#         cv2.imshow("Frame", frame)

#         # Break the loop if 'q' key is pressed
#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             break

#     # Release the video capture object and close the windows
#     cap.release()
#     cv2.destroyAllWindows()

#     average_gaze = 0
#     if gaze_percentages:
#         average_gaze = sum(gaze_percentages) / len(gaze_percentages)
#         final_output = average_gaze * -1
#         print(f"Average Gaze Percentage: {average_gaze:.2f}")
#         print(f"{final_output:.2f}")

#     print(final_output)
#     return final_output


if __name__ == "__main__":
    eye_tracking_method('/home/jegathees5555/Documents/recruitz/backend/video/uploaded_video.webm')