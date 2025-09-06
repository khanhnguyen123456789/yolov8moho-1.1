
import React from 'react';
import { CodeBlock } from './CodeBlock';

const SectionHeader: React.FC<{ title: string; className?: string }> = ({ title, className = '' }) => (
    <h3 className={`text-2xl font-semibold text-white border-l-4 border-teal-400 pl-4 font-orbitron ${className}`}>{title}</h3>
);

const SubHeader: React.FC<{ title: string; emoji: string }> = ({ title, emoji }) => (
    <h4 className="text-xl font-semibold text-gray-300 mt-6 mb-3">
        <span role="img" aria-label="icon" className="mr-2">{emoji}</span>
        {title}
    </h4>
);


const TaskDirective: React.FC<{ number: number; title: string; children: React.ReactNode }> = ({ number, title, children }) => (
    <div className="bg-black/20 p-4 rounded-md border border-[var(--panel-border)]">
        <h4 className="font-orbitron text-lg font-bold text-teal-400 mb-2">
           {number}️⃣ <span className="text-white">{title}</span>
        </h4>
        <div className="pl-4 border-l-2 border-teal-500/30 text-gray-400 space-y-3">
            {children}
        </div>
    </div>
);


const layerCheckCode = `
-- File: lua/camera_mapping.lua
local layerName = gui.selectedLayerName -- lấy tên layer từ GUI dropdown
local layer = moho:FindLayer(layerName)

if layer == nil then
    print("⚠️ Layer không tồn tại: "..layerName)
    return
end

-- Push keyframe vào layer đã chọn
layer:AddKeyFrame(frame, keypoint)


-- File: lua/gui.lua
-- GUI action:
Dropdown list Layer Selection = moho:GetLayerNames()
`;

const timelineSyncCode = `
-- File: lua/timeline.lua
local videoFPS = backend.GetVideoFPS()  -- từ video input
local timelineColumns = #timeline.columns
local scale = videoFPS / timelineColumns

for videoFrame, data in pairs(videoFrames) do
    local timelineFrame = math.floor(videoFrame / scale)
    timeline:AddKeyFrame(timelineFrame, data)
end
`;

const pluginToggleCode = `
-- File: lua/gui.lua
local cameraPluginEnabled = false
local cachedKeyframes = {}  -- lưu keyframe cũ

function ToggleCameraPlugin()
    cameraPluginEnabled = not cameraPluginEnabled
    if cameraPluginEnabled then
        print("Camera Plugin ON → phân tích lại video")
        local newKeyframes = backend.AnalyzeCameraVideo()
        cachedKeyframes = MergeKeyframes(cachedKeyframes, newKeyframes)
        PushKeyframesToTimeline(cachedKeyframes)
    else
        print("Camera Plugin OFF → bỏ phân tích camera")
    end
end

-- Merge logic:
function MergeKeyframes(oldKF, newKF)
    for frame, kp in pairs(newKF) do
        if oldKF[frame] == nil then
            oldKF[frame] = kp
        else
            oldKF[frame] = CombinePoseAndCamera(oldKF[frame], kp)
        end
    end
    return oldKF
end
`;

const backendTimeLimitCode = `
# File: backend/camera_analysis.py
import time

MAX_ANALYSIS_TIME = 60  # giây
start_time = time.time()
analysisTimeExceeded = False

for frame in video_frames:
    analyze_pose(frame)
    analyze_camera(frame)
    if time.time() - start_time > MAX_ANALYSIS_TIME:
        print("⚠️ Phân tích video vượt 60s, dừng pipeline")
        analysisTimeExceeded = True
        break

# --- On Lua side ---
# if analysisTimeExceeded then
#     print("⚠️ Phân tích video bị giới hạn 60s, chỉ một phần video được phân tích")
# end
`;

const keyframePushCode = `
-- File: lua/camera_mapping.lua
for frame, keypointData in pairs(cachedKeyframes) do
    local timelineFrame = math.floor(frame / scale)
    timeline:AddKeyFrame(timelineFrame, keypointData)
end
`;

const detailedLuaCode = `
-- File: lua/camera_plugin_gui.lua
LM.GUI = LM.GUI or {}

local CameraPlugin = {}
CameraPlugin.enabled = false
CameraPlugin.cachedKeyframes = {}

-- Dropdown chọn layer
function CameraPlugin:SelectLayer()
    self.selectedLayerName = MOHO:GetLayerNames()[1] -- mặc định layer đầu
    -- TODO: tạo dropdown GUI cho người dùng chọn layer
end

-- Toggle Camera Plugin ON/OFF
function CameraPlugin:Toggle()
    self.enabled = not self.enabled
    if self.enabled then
        print("Camera Plugin ON → phân tích lại video")
        -- gọi backend python
        local newKeyframes = MOHO:CallBackend("AnalyzeCameraVideo")
        self.cachedKeyframes = self:MergeKeyframes(self.cachedKeyframes, newKeyframes)
        self:PushKeyframes()
    else
        print("Camera Plugin OFF → bỏ phân tích camera")
    end
end

-- Merge keyframe camera + pose
function CameraPlugin:MergeKeyframes(oldKF, newKF)
    for frame, kp in pairs(newKF) do
        if oldKF[frame] == nil then
            oldKF[frame] = kp
        else
            oldKF[frame] = self:CombinePoseAndCamera(oldKF[frame], kp)
        end
    end
    return oldKF
end

-- Push keyframe vào timeline giả lập
function CameraPlugin:PushKeyframes()
    local timelineFPS = MOHO:GetTimelineFPS()
    local videoFPS = MOHO:CallBackend("GetVideoFPS")
    local scale = videoFPS / timelineFPS

    for frame, kp in pairs(self.cachedKeyframes) do
        local timelineFrame = math.floor(frame / scale)
        MOHO:TimelineAddKeyframe(self.selectedLayerName, timelineFrame, kp)
    end
end

-- Combine keypoints pose + camera
function CameraPlugin:CombinePoseAndCamera(oldKP, newKP)
    local combined = {}
    for k,v in pairs(oldKP) do combined[k] = v end
    for k,v in pairs(newKP) do combined[k] = v end
    return combined
end

return CameraPlugin
`;

const detailedPythonCode = `
# File: backend/camera_analysis.py
import time
import cv2
from yolov8 import YOLOv8  # ví dụ, thay thế bằng model phân tích camera phù hợp

MAX_ANALYSIS_TIME = 60  # giây

class CameraAnalyzer:
    def __init__(self, video_path):
        self.video_path = video_path
        self.keyframes = {}
        self.fps = self.get_fps()

    def get_fps(self):
        cap = cv2.VideoCapture(self.video_path)
        fps = cap.get(cv2.CAP_PROP_FPS)
        cap.release()
        return fps

    def analyze_video(self):
        cap = cv2.VideoCapture(self.video_path)
        model = YOLOv8("camera_model.pt")  # hoặc model phù hợp với phân tích khung camera
        start_time = time.time()
        frame_index = 0

        while True:
            ret, frame = cap.read()
            if not ret:
                break

            # Giới hạn thời gian phân tích
            if time.time() - start_time > MAX_ANALYSIS_TIME:
                print("⚠️ Phân tích vượt 60s, dừng pipeline")
                break

            # Phân tích tư thế nhân vật
            pose_data = self.analyze_pose(frame)

            # Phân tích kỹ thuật camera: zoom, rotate, tilt
            camera_data = self.analyze_camera(frame, model)

            # Merge pose + camera
            self.keyframes[frame_index] = {**pose_data, **camera_data}

            frame_index += 1

        cap.release()
        return self.keyframes

    def analyze_pose(self, frame):
        # TODO: sử dụng YOLOv8-Pose hoặc MediaPipe Pose
        return {"pose": "mock_pose_data"}

    def analyze_camera(self, frame, model):
        # TODO: phân tích frame -> zoom/rotate/tilt
        return {"camera": "mock_camera_data"}
`;

export const CameraPluginDirective: React.FC = () => {
    return (
        <div className="panel p-6 space-y-10">
            <div>
                <SectionHeader title="Xử lý Nguy cơ Xung đột Tiềm ẩn" className="mb-6" />
                <div className="space-y-6">
                    <TaskDirective