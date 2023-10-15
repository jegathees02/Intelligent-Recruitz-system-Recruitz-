from flask import Flask, request, jsonify
import os
import base64

app = Flask(__name__)

# Set the path to store videos
UPLOAD_FOLDER = '../backend/video'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/upload_video', methods=['POST'])
def upload_video():
    try:
        data = request.json

        if 'videoData' not in data:
            return jsonify({'error': 'No video data provided'}), 400
        
        video_data = data['videoData']
        video_name = 'uploaded_video.webm'

        video_path = os.path.join(app.config['UPLOAD_FOLDER'], video_name)
        
        with open(video_path, 'wb') as f:
            f.write(base64.b64decode(video_data))
        
        return jsonify({'message': 'Video uploaded successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
