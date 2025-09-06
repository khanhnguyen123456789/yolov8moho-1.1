
import React from 'react';
import { CodeBlock } from './CodeBlock';

const SectionHeader: React.FC<{ title: string; className?: string }> = ({ title, className = '' }) => (
    <h3 className={`text-2xl font-semibold text-white border-l-4 border-teal-400 pl-4 font-orbitron ${className}`}>{title}</h3>
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

// Code snippets for each task
const task1Code = `
-- TASK 1: Layer name check trước khi push keyframe
-- Nếu user đổi tên layer Moho, hiển thị thông báo và không push keyframe
local selectedLayer = moho.document:LayerByName(selectedLayerName)
if selectedLayer == nil then
    Alert("Layer '" .. selectedLayerName .. "' không tồn tại. Vui lòng chọn lại layer đúng tên.")
    return -- thoát script để tránh ghi keyframe sai
end
`;

const task2Code = `
-- TASK 2: Tự động scale timeline giả lập theo FPS video
-- Nếu video FPS khác timeline FPS, điều chỉnh column keyframe
local videoFPS = backend.getVideoFPS() -- giả lập hàm lấy FPS video
local timelineFPS = timeline.getFPS()
local scaleFactor = videoFPS / timelineFPS

-- Khi push keyframe:
local timelineFrameIndex = math.floor(videoFrameIndex / scaleFactor)
timeline.pushKeyframe(layerName, timelineFrameIndex, keyData)
`;

const task3Code = `
-- TASK 3: Merge keyframe thay vì overwrite
-- Khi Camera Plugin ON lại, merge dữ liệu camera với pose keyframe cũ
local existingKF = timeline.getKeyframe(layerName, timelineFrameIndex)
if existingKF then
    existingKF.cameraData = newCameraData -- merge dữ liệu mới vào
else
    timeline.pushKeyframe(layerName, timelineFrameIndex, newCameraData)
end
`;

const task4Code = `
-- TASK 4: Backend phân tích video tách biệt
-- Nếu plugin OFF -> dừng pipeline camera
-- Nếu plugin ON -> chạy lại pipeline camera từ đầu, merge với pose
if CameraPlugin.isON() then
    backend.runCameraAnalysis(videoFile)
    timeline.mergeCameraKeyframes()
else
    backend.stopCameraAnalysis()
end
`;

const task5Code = `
# TASK 5: Backend Python - phân tích tối đa 60s / chunk
max_analysis_duration = 60 # seconds
video_duration = get_video_duration(video_file)
if video_duration > max_analysis_duration:
    chunks = split_video_into_chunks(video_file, max_analysis_duration)
else:
    chunks = [video_file]

for chunk in chunks:
    analyze_chunk(chunk)
`;

const task6CodeLua = `
-- Lua: kiểm tra layer trước khi push keyframe
if not selectedLayer then
    Alert("Layer không tồn tại!")
    return
end
`;

const task6CodePython = `
# Python: kiểm tra file video tồn tại + lỗi đọc
try:
    cap = cv2.VideoCapture(video_file)
    if not cap.isOpened():
        raise Exception("Không mở được video")
except Exception as e:
    print(f"[ERROR] {e}")
    return
`;

const task7Code = `
-- TASK 7: Tooltip cho từng icon camera trên timeline giả lập
toolbarCameraFollow:setTooltip("Theo dõi camera (phím tắt 4)")
toolbarCameraZoom:setTooltip("Thu phóng camera (phím tắt 5)")
toolbarCameraRotate:setTooltip("Xoay camera (phím tắt 6)")
toolbarCameraPan:setTooltip("Quét/nghiêng camera (phím tắt 7)")
`;

const task8Code = `
-- TASK 8: Cho user chọn phân tích chỉ Pose / Camera / Both
local option = GUI.getPipelineOption() -- "pose", "camera", "both"
if option == "pose" then
    backend.runPoseAnalysis()
elseif option == "camera" then
    backend.runCameraAnalysis()
elseif option == "both" then
    backend.runPoseAnalysis()
    backend.runCameraAnalysis()
end
`;


export const CameraPluginDirective: React.FC = () => {
    return (
        <div className="panel p-6 space-y-10">
            <div>
                <SectionHeader title="Chỉ thị Kỹ thuật: Cải tiến & Nâng cấp Camera Plugin" className="mb-6" />
                <div className="space-y-6">
                    <TaskDirective number={1} title="Kiểm tra và xác thực Layer Name (Lua)">
                        <p>Kiểm tra nếu người dùng đã đổi tên layer trong Moho. Nếu layer không tồn tại, hiển thị thông báo lỗi và ngăn việc ghi keyframe sai chỗ.</p>
                        <CodeBlock code={task1Code} language="lua" />
                    </TaskDirective>
                    <TaskDirective number={2} title="Đồng bộ Frame Index với Video FPS">
                        <p>Tự động điều chỉnh timeline giả lập dựa trên FPS của video đầu vào. Điều này đảm bảo keyframes luôn được đặt chính xác, bất kể sự khác biệt về tốc độ khung hình.</p>
                        <CodeBlock code={task2Code} language="lua" />
                    </TaskDirective>
                    <TaskDirective number={3} title="Merge Keyframe Pose + Camera">
                        <p>Khi bật lại Camera Plugin, dữ liệu camera mới sẽ được hợp nhất (merge) với các keyframe tư thế (pose) đã có, thay vì ghi đè. Điều này bảo toàn dữ liệu cũ và cho phép làm việc song song.</p>
                        <CodeBlock code={task3Code} language="lua" />
                    </TaskDirective>
                    <TaskDirective number={4} title="Bật/Tắt Camera Plugin an toàn">
                        <p>Tách biệt pipeline phân tích camera. Khi plugin bị tắt, chỉ có pipeline camera dừng lại, không ảnh hưởng đến pipeline pose. Khi bật lại, nó sẽ phân tích lại từ đầu và hợp nhất kết quả.</p>
                        <CodeBlock code={task4Code} language="lua" />
                    </TaskDirective>
                    <TaskDirective number={5} title="Giới hạn Phân tích Video dài">
                        <p>Để tránh treo máy hoặc lag khi xử lý video quá dài, backend Python sẽ tự động chia video thành các đoạn (chunks) tối đa 60 giây và xử lý tuần tự.</p>
                        <CodeBlock code={task5Code} language="python" />
                    </TaskDirective>
                    <TaskDirective number={6} title="Xử lý Ngoại lệ (Exception Handling)">
                        <p>Triển khai cơ chế bắt lỗi ở cả Lua (kiểm tra sự tồn tại của layer) và Python (kiểm tra tệp video hợp lệ) để ngăn ngừa các sự cố và cung cấp thông báo lỗi rõ ràng.</p>
                        <h5 className="text-md font-semibold text-white mt-4 mb-2">Phía Lua</h5>
                        <CodeBlock code={task6CodeLua} language="lua" />
                        <h5 className="text-md font-semibold text-white mt-4 mb-2">Phía Python</h5>
                        <CodeBlock code={task6CodePython} language="python" />
                    </TaskDirective>
                    <TaskDirective number={7} title="Cải thiện Hướng dẫn Người dùng (UX)">
                        <p>Thêm các tooltip hướng dẫn chi tiết cho từng icon và chức năng liên quan đến camera trên timeline, giúp người dùng mới dễ dàng nắm bắt cách sử dụng.</p>
                        <CodeBlock code={task7Code} language="lua" />
                    </TaskDirective>
                    <TaskDirective number={8} title="Tùy chọn Pipeline để Tối ưu Hiệu suất">
                        <p>Cung cấp cho người dùng các tùy chọn để chỉ chạy pipeline phân tích tư thế (Pose), chỉ camera, hoặc cả hai. Điều này giúp giảm tải cho máy tính khi không cần thiết phải phân tích tất cả mọi thứ.</p>
                        <CodeBlock code={task8Code} language="lua" />
                    </TaskDirective>
                </div>
            </div>
        </div>
    );
};
